// app/payment-success/page.js
"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState("processing");

  useEffect(() => {
    const transactionId = searchParams.get("transactionId");
    const merchantTransactionId = searchParams.get("merchantTransactionId");

    if (transactionId && merchantTransactionId) {
      setStatus("success");
    }
  }, [searchParams]);

  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">
          {status === "success"
            ? "Payment Successful!"
            : "Processing Payment..."}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertDescription>
            {status === "success"
              ? "Your payment has been processed successfully. You will receive a confirmation email shortly."
              : "Please wait while we confirm your payment..."}
          </AlertDescription>
        </Alert>

        {status === "success" && (
          <div className="text-center mt-4">
            <p>Transaction ID: {searchParams.get("transactionId")}</p>
            <p>Order Number: {searchParams.get("merchantTransactionId")}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
