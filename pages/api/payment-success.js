// pages/api/payment-success.js
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
    const { code, merchantId, transactionId, amount } = req.body;

    // Find the order from Firebase
    const ordersRef = db.collection("orders");
    const orderSnapshot = await ordersRef
      .where("orderNumber", "==", transactionId)
      .get();

    if (orderSnapshot.empty) {
      throw new Error("Order not found");
    }

    // Get the order data
    const orderDoc = orderSnapshot.docs[0];
    const orderData = orderDoc.data();

    // Configure email message
    const msg = {
      to: orderData.email,
      from: "sales@coredes.io",
      subject: "Order Confirmation - Thank you for your order!",
      text: `
        Dear ${orderData.fullName},

        Thank you for your order!

        Order Details:
        Order Number: ${orderData.orderNumber}
        Order Date: ${new Date(orderData.createdAt).toLocaleString()}
        Amount Paid: ₹${orderData.paidAmount / 100}

        Shipping Address:
        ${orderData.addressLine1}
        ${orderData.addressLine2}
        ${orderData.state} ${orderData.pinCode}
        
        We’ll process your order soon as soon as the payment is confirmed!

        If you need any assistance, feel free to reach out to us at sales@coredes.io or call us at +91 725969 3630.

        Thank you for shopping with us!
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Order Confirmation</h2>
          <p>Dear ${orderData.fullName},</p>
          <p>Thank you for your order!</p>
          
          <h3>Order Details</h3>
          <p>
            <strong>Order Number:</strong> ${orderData.orderNumber}<br>
            <strong>Order Date:</strong> ${new Date(
              orderData.createdAt
            ).toLocaleString()}<br>
            <strong>Amount Paid:</strong> ₹${orderData.paidAmount / 100}<br>
            <strong>Quantity:</strong> ${orderData.quantity}
          </p>

          <h3>Shipping Address</h3>
          <p>
            ${orderData.addressLine1}<br>
            ${orderData.addressLine2}<br>
            ${orderData.state} ${orderData.pinCode}
          </p>

          <p>We’ll process your order soon as soon as the payment is confirmed!</p>
          <p>f you need any assistance, feel free to reach out to us at sales@coredes.io or call us at +91 725969 3630.</p>
          <p>Thank you for shopping with us!</p>
        </div>
      `,
    };

    // Send email
    await sgMail.send(msg);

    // Redirect to success page
    const redirectUrl = `/payment-success?code=${code}&transactionId=${transactionId}&amount=${amount}`;
    res.redirect(303, redirectUrl);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "Failed to process payment notification",
      details: error.message,
    });
  }
}
