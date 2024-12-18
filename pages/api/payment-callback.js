// pages/api/payment-callback.js
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import sgMail from "@sendgrid/mail";

// Initialize SendGrid with your API key
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Log the incoming request for debugging
    console.log("Payment callback received:", {
      body: req.body,
      headers: req.headers,
    });

    // Decode base64 response
    const decodedResponse = JSON.parse(
      Buffer.from(req.body.response, "base64").toString("utf-8")
    );

    console.log("Decoded response:", decodedResponse);

    // Extract data from decoded response
    const {
      data: {
        merchantId,
        merchantTransactionId,
        transactionId,
        amount,
        responseCode,
        state: status,
      },
    } = decodedResponse;

    // Validate required fields
    if (!merchantTransactionId) {
      throw new Error("merchantTransactionId is required");
    }

    // Find the order
    const ordersRef = db.collection("orders");
    const orderSnapshot = await ordersRef
      .where("orderNumber", "==", merchantTransactionId)
      .get();

    if (orderSnapshot.empty) {
      console.error(
        "Order not found for merchantTransactionId:",
        merchantTransactionId
      );
      return res.status(404).json({ error: "Order not found" });
    }

    const orderDoc = orderSnapshot.docs[0];
    const updateData = {
      lastUpdated: new Date().toISOString(),
      paymentStatus: status || "unknown",
      paymentResponseCode: responseCode || "",
    };

    // Only add fields if they exist
    if (transactionId) updateData.paymentId = transactionId;
    if (amount) updateData.paidAmount = amount;

    // Add payment instrument details if available
    if (decodedResponse.data.paymentInstrument) {
      updateData.paymentInstrument = decodedResponse.data.paymentInstrument;
    }

    // Update the order
    await orderDoc.ref.update(updateData);

    // Log successful update
    console.log("Order updated successfully:", {
      orderId: orderDoc.id,
      status: status,
      transactionId: transactionId,
    });

    //mail send
    const msg = {
      to: "tinjothomasc@gmail.com",
      from: "sales@coredes.io",
      subject: "A new order has been received!",
      text: `
        Dear Tinjo},

        A new order has been received

        Order Details:
        Order Number: ${merchantTransactionId}
        Status: ${status}
        Amount Paid: ₹${amount / 100}

        Thank you for shopping with us!
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Order has been received</h2>
          <p>Dear Tinjo Thomas,</p>
          <p>A new order has been received!</p>
          
          <h3>Order Details</h3>
          <p>
            <strong>Order Number:</strong> ${merchantTransactionId}<br>
            <strong>Amount Paid:</strong> ₹${amount / 100}<br>
            <strong>Status:</strong> ${status}
          </p>
        </div>
      `,
    };

    // Send email
    await sgMail.send(msg);
    //

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Payment callback error:", {
      error: error.message,
      stack: error.stack,
    });
    res.status(500).json({
      error: "Failed to process payment callback",
      details: error.message,
    });
  }
}
