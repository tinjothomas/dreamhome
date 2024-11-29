// app/payment-success/page.js
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const transactionId = searchParams.get("transactionId");
  const merchantTransactionId = searchParams.get("merchantTransactionId");
  const status =
    transactionId && merchantTransactionId ? "success" : "processing";

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
            <p>Transaction ID: {transactionId}</p>
            <p>Order Number: {merchantTransactionId}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function LoadingState() {
  return (
    <Card className="w-full max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Loading...</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertDescription>
            Please wait while we load your payment details...
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <PaymentStatusContent />
    </Suspense>
  );
}
