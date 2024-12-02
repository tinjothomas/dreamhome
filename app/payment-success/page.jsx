// app/payment-success/page.js
"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Link from "next/link";

function PaymentStatusContent() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState({ loading: true });
  const code = searchParams.get("code");
  const transactionId = searchParams.get("transactionId");
  const amount = searchParams.get("amount");
  const isSuccess = code === "PAYMENT_SUCCESS";

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await fetch(
          `/api/check-payment-status?merchantTransactionId=${transactionId}`
        );
        const data = await response.json();
        console.log(data);
        setPaymentStatus({ loading: false, ...data });
      } catch (error) {
        setPaymentStatus({ loading: false, error: true });
      }
    };

    if (transactionId) {
      checkStatus();
      // Set up polling based on PhonePe's recommended intervals
      const intervals = [3000, 6000, 10000, 30000, 60000];
      let currentIntervalIndex = 0;

      const pollStatus = setInterval(async () => {
        if (currentIntervalIndex < intervals.length) {
          await checkStatus();
          currentIntervalIndex++;
        } else {
          clearInterval(pollStatus);
        }
      }, intervals[currentIntervalIndex]);

      return () => clearInterval(pollStatus);
    }
  }, [transactionId]);

  return (
    <div className="bg-slate-100 w-full min-h-screen">
      <Card className="w-full max-w-2xl mx-auto mt-8">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            {isSuccess ? "Payment Successful!" : "Payment Status"}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className={isSuccess ? "bg-green-50" : "bg-yellow-50"}>
            <AlertDescription>
              {isSuccess
                ? "Your payment has been processed successfully."
                : "Verifying payment status..."}
            </AlertDescription>
          </Alert>

          {transactionId && amount && (
            <div className="mt-6 space-y-2">
              <p>
                <strong>Transaction ID:</strong> {transactionId}
              </p>
              <p>
                <strong>Amount:</strong> ₹{(parseInt(amount) / 100).toFixed(2)}
              </p>
            </div>
          )}
          <div className="w-full flex items-center justify-center">
            <Link href="/">
              <div className="max-w-xl p-2 rounded-md shadow-md bg-slate-800 hover:bg-slate-600 mt-12 text-white flex items-center gap-4 w-full mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="lucide lucide-arrow-left"
                  viewBox="0 0 24 24">
                  <path d="m12 19-7-7 7-7M19 12H5"></path>
                </svg>
                <span>Back to main site</span>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentStatusContent />
    </Suspense>
  );
}
