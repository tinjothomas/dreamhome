// pages/api/export-orders.js
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

// Verify access key
const verifyAccessKey = (key) => {
  const validKey = process.env.EXPORT_ACCESS_KEY;
  return key === validKey;
};

// Convert orders data to CSV
const convertToCSV = (orders) => {
  // Define CSV headers
  const headers = [
    "Order ID",
    "Order Number",
    "Date",
    "Full Name",
    "Email",
    "Phone",
    "Quantity",
    "Total Amount",
    "Address Line 1",
    "Address Line 2",
    "State",
    "PIN Code",
    "Status",
  ];

  // Create CSV rows
  const rows = orders.map((order) => [
    order.id,
    order.orderNumber,
    new Date(order.timestamp).toLocaleDateString(),
    order.fullName,
    order.email,
    order.phone,
    order.quantity,
    order.totalAmount,
    order.addressLine1,
    order.addressLine2 || "",
    order.state,
    order.pinCode,
    order.status,
  ]);

  // Combine headers and rows
  return [
    headers.join(","),
    ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
  ].join("\n");
};

export default async function handler(req, res) {
  try {
    // Check if it's a GET request
    if (req.method !== "GET") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    // Get the access key from query parameters
    const { key } = req.query;

    // Verify the access key
    if (!verifyAccessKey(key)) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    // Get date range from query parameters (optional)
    const { startDate, endDate } = req.query;

    // Build the query
    let ordersRef = db.collection("orders");

    if (startDate && endDate) {
      ordersRef = ordersRef
        .where("timestamp", ">=", startDate)
        .where("timestamp", "<=", endDate);
    }

    // Get all orders
    const snapshot = await ordersRef.orderBy("timestamp", "desc").get();

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Generate CSV content
    const csv = convertToCSV(orders);

    // Set response headers for CSV download
    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="orders-${
        new Date().toISOString().split("T")[0]
      }.csv"`
    );

    // Send the CSV file
    res.status(200).send(csv);
  } catch (error) {
    console.error("Error exporting orders:", error);
    res.status(500).json({ error: "Failed to export orders" });
  }
}
