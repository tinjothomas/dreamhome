// pages/api/check-payment-status.js
import crypto from "crypto";

export default async function handler(req, res) {
  const { merchantTransactionId } = req.query;
  const merchantId = process.env.PHONEPE_MERCHANT_ID;

  try {
    // Generate X-VERIFY
    const string =
      `/pg/v1/status/${merchantId}/${merchantTransactionId}` +
      process.env.PHONEPE_MERCHANT_SALT_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const xVerify = sha256 + "###" + process.env.PHONEPE_SALT_INDEX;

    const response = await fetch(
      `${process.env.PHONEPE_API_URL}/status/${merchantId}/${merchantTransactionId}`,
      {
        headers: {
          "Content-Type": "application/json",
          "X-VERIFY": xVerify,
          "X-MERCHANT-ID": merchantId,
        },
      }
    );

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Status check error:", error);
    res.status(500).json({ error: "Failed to check payment status" });
  }
}
