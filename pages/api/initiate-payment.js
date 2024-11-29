// pages/api/initiate-payment.js
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import crypto from "crypto";

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  });
}

const db = getFirestore();

// Get API URL from environment variables
const PHONEPE_API_URL = process.env.PHONEPE_API_URL;

if (!PHONEPE_API_URL) {
  throw new Error("PHONEPE_API_URL environment variable is not set");
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { orderData } = req.body;

    // First save order to Firebase
    const enrichedOrderData = {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: "payment_pending",
      orderNumber: `ORD${Date.now()}`,
      paymentStatus: "pending",
    };

    const docRef = await db.collection("orders").add(enrichedOrderData);

    const paymentPayload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      merchantTransactionId: enrichedOrderData.orderNumber,
      merchantUserId: `MUID${Date.now()}`,
      amount: Math.round(orderData.totalAmount * 100), // Convert to paise
      redirectUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-success`,
      redirectMode: "POST",
      callbackUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payment-callback`,
      mobileNumber: orderData.phone,
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };

    console.log(paymentPayload.redirectUrl);

    console.log("Making request to:", PHONEPE_API_URL);

    const base64Payload = Buffer.from(JSON.stringify(paymentPayload)).toString(
      "base64"
    );
    const string =
      base64Payload + "/pg/v1/pay" + process.env.PHONEPE_MERCHANT_SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const xVerify = sha256 + "###" + process.env.PHONEPE_SALT_INDEX;

    const response = await fetch(PHONEPE_API_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": xVerify,
      },
      body: JSON.stringify({ request: base64Payload }),
    });

    const paymentData = await response.json();
    console.log("PhonePe Response:", paymentData);

    if (paymentData.success) {
      const updateData = {
        paymentStatus: "initiated",
        lastUpdated: new Date().toISOString(),
      };

      if (paymentData.data?.transactionId) {
        updateData.paymentId = paymentData.data.transactionId;
      }

      await docRef.update(updateData);

      res.status(200).json({
        success: true,
        orderId: docRef.id,
        orderNumber: enrichedOrderData.orderNumber,
        paymentRedirectUrl:
          paymentData.data.instrumentResponse.redirectInfo.url,
      });
    } else {
      await docRef.update({
        paymentStatus: "failed",
        lastUpdated: new Date().toISOString(),
        failureReason: paymentData.message || "Payment initiation failed",
      });

      throw new Error(paymentData.message || "Payment initiation failed");
    }
  } catch (error) {
    console.error("Detailed error:", error);
    res.status(500).json({
      error: "Payment initiation failed",
      details: error.message,
    });
  }
}
