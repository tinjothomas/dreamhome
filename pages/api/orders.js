// pages/api/orders.js
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin if it hasn't been initialized
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
  console.log(req.body);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const orderData = req.body;

    // Basic validation
    if (
      !orderData.email ||
      !orderData.phone ||
      !orderData.fullName ||
      !orderData.addressLine1
    ) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Add additional metadata
    const enrichedOrderData = {
      ...orderData,
      createdAt: new Date().toISOString(),
      status: "pending",
      orderNumber: `ORD${Date.now()}`,
    };

    // Save to Firestore
    const docRef = await db.collection("orders").add(enrichedOrderData);

    // Return success response
    res.status(200).json({
      success: true,
      orderId: docRef.id,
      orderNumber: enrichedOrderData.orderNumber,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    res.status(500).json({ error: "Failed to process order" });
  }
}
