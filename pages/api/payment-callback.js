// pages/api/payment-callback.js
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

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Verify X-VERIFY header
    const xVerify = req.headers["x-verify"];
    // Implement verification logic here

    const { merchantTransactionId, transactionId, amount, status } = req.body;

    // Find the order
    const ordersRef = db.collection("orders");
    const orderSnapshot = await ordersRef
      .where("orderNumber", "==", merchantTransactionId)
      .limit(1)
      .get();

    if (orderSnapshot.empty) {
      return res.status(404).json({ error: "Order not found" });
    }

    const orderDoc = orderSnapshot.docs[0];

    // Update order status based on payment status
    await orderDoc.ref.update({
      paymentStatus: status,
      paymentId: transactionId,
      paymentUpdatedAt: new Date().toISOString(),
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Payment callback error:", error);
    res.status(500).json({ error: "Failed to process payment callback" });
  }
}
