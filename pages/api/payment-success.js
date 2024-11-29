// pages/api/payment-success.js
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { code, merchantId, transactionId, amount } = req.body;

  const redirectUrl = `/payment-success?code=${code}&transactionId=${transactionId}&amount=${amount}`;

  res.redirect(303, redirectUrl);
}

// pages/api/payment-success.js
// import { initializeApp, getApps, cert } from "firebase-admin/app";
// import { getFirestore } from "firebase-admin/firestore";
// import crypto from "crypto";

// if (!getApps().length) {
//   initializeApp({
//     credential: cert({
//       projectId: process.env.FIREBASE_PROJECT_ID,
//       clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
//       privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//     }),
//   });
// }

// const db = getFirestore();

// async function checkPaymentStatus(merchantId, merchantTransactionId) {
//   const string =
//     `/pg/v1/status/${merchantId}/${merchantTransactionId}` +
//     process.env.PHONEPE_MERCHANT_SALT_KEY;
//   const sha256 = crypto.createHash("sha256").update(string).digest("hex");
//   const xVerify = sha256 + "###" + process.env.PHONEPE_SALT_INDEX;

//   // Fix: Add 'pg/v1' to the path
//   const apiUrl = process.env.PHONEPE_API_URL;

//   const response = await fetch(
//     `${apiUrl}/${merchantId}/${merchantTransactionId}`,
//     {
//       headers: {
//         "Content-Type": "application/json",
//         "X-VERIFY": xVerify,
//         "X-MERCHANT-ID": merchantId,
//       },
//     }
//   );

//   if (!response.ok) {
//     console.error("Status check failed:", await response.text());
//     throw new Error("Payment status check failed");
//   }

//   return response.json();
// }

// async function updateFirestore(merchantTransactionId, paymentStatus) {
//   const ordersRef = db.collection("orders");
//   const orderSnapshot = await ordersRef
//     .where("orderNumber", "==", merchantTransactionId)
//     .get();

//   if (!orderSnapshot.empty) {
//     const orderDoc = orderSnapshot.docs[0];
//     await orderDoc.ref.update({
//       paymentStatus: paymentStatus.data.state,
//       paymentResponseCode: paymentStatus.data.responseCode,
//       lastUpdated: new Date().toISOString(),
//       transactionId: paymentStatus.data.transactionId,
//       paymentInstrument: paymentStatus.data.paymentInstrument || null,
//     });
//   }
// }

// export default async function handler(req, res) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method not allowed" });
//   }

//   const {
//     code,
//     merchantId,
//     transactionId: merchantTransactionId,
//     amount,
//   } = req.body;

//   console.log(req.body);

//   try {
//     const paymentStatus = await checkPaymentStatus(
//       merchantId,
//       merchantTransactionId
//     );

//     console.log(`this is payment status ${paymentStatus}`);
//     await updateFirestore(merchantTransactionId, paymentStatus);

//     const redirectUrl = `/payment-success?code=${code}&transactionId=${merchantTransactionId}&amount=${amount}`;
//     res.redirect(303, redirectUrl);
//   } catch (error) {
//     console.error("Payment status check error:", error);
//     res.redirect(303, `/payment-success?error=true`);
//   }
// }
