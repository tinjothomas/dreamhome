"use client";

import React, { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Minus, Plus } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const SuccessPage = ({ orderDetails }) => {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-green-600">
          Pre-booking Confirmed!
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Alert className="mb-6">
          <AlertTitle>Pre-booking Successfully Placed!</AlertTitle>
          <AlertDescription>
            You’ll receive an email within 24 hours, containing the payment link
            and further instructions. Once you’ve made the payment, your order
            will be confirmed.
          </AlertDescription>
        </Alert>

        <div className="space-y-4">
          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Pre-booking Summary</h3>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Booking ID:</span>{" "}
                {orderDetails.orderId}
              </p>
              <p>
                <span className="font-medium">Name:</span>{" "}
                {orderDetails.fullName}
              </p>
              <p>
                <span className="font-medium">Email:</span> {orderDetails.email}
              </p>
              <p>
                <span className="font-medium">Quantity:</span>{" "}
                {orderDetails.quantity}
              </p>
              <p>
                <span className="font-medium">Amount to be Paid:</span> ₹
                {orderDetails.totalAmount}
              </p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-4">Delivery Details</h3>
            <div className="space-y-2">
              <p>{orderDetails.addressLine1}</p>
              {orderDetails.addressLine2 && <p>{orderDetails.addressLine2}</p>}
              <p>
                {orderDetails.state} - {orderDetails.pinCode}
              </p>
              <p>
                <span className="font-medium">Phone:</span> {orderDetails.phone}
              </p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-md mt-6">
            <h4 className="font-medium mb-2">Next Steps:</h4>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Check your email for the payment link</li>
              <li>Complete the payment to confirm your order</li>
              <li>You'll receive an order confirmation after payment</li>
            </ol>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PrebookForm = () => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    state: "Kerala",
    pinCode: "",
  });

  // Validation function
  const validateForm = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pinCodeRegex = /^[0-9]{6}$/;

    const isValid =
      formData.email.match(emailRegex) &&
      formData.phone.match(phoneRegex) &&
      formData.fullName.trim().length > 0 &&
      formData.addressLine1.trim().length > 0 &&
      formData.state &&
      formData.pinCode.match(pinCodeRegex);

    setIsFormValid(isValid);
  };

  // Run validation whenever form data changes
  useEffect(() => {
    validateForm();
  }, [formData]);

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const handleQuantityChange = (action) => {
    if (action === "increase") {
      setQuantity((prev) => prev + 1);
    } else if (action === "decrease" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      state: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    setIsLoading(true);

    try {
      const orderData = {
        ...formData,
        quantity,
        totalAmount: quantity * 299,
        timestamp: new Date().toISOString(),
        status: "pending",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Failed to save order");
      }

      const data = await response.json();

      setOrderDetails({
        ...orderData,
        orderId: data.orderId,
      });

      setOrderComplete(true);
    } catch (error) {
      console.error("Error saving order:", error);
      alert("There was an error placing your order. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderComplete && orderDetails) {
    return <SuccessPage orderDetails={orderDetails} />;
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-semibold">
          Pre-book 2025 Calendar by SujithNavam
        </h2>
        <p className="text-sm text-muted-foreground mt-2">
          Complete the pre-booking form below. Payment link will be sent to your
          email after confirmation.
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Quantity Section */}
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium text-slate-600">Product Price:</span>
              <span>₹299</span>
            </div>
            <div className="flex justify-between border-t border-b py-4 items-center">
              <span className="font-medium text-slate-600">Quantity:</span>
              <div className="flex items-center space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange("decrease")}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleQuantityChange("increase")}>
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2 font-medium">
              <span className="text-slate-600">Total Amount:</span>
              <span className="text-xl">₹{quantity * 299}</span>
            </div>
          </div>
          {/* Contact Information */}
          <div className="grid gap-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                required
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label htmlFor="phone">
                Phone Number{" "}
                {/* <span className="tex-sm text-slate-500">
                  (avoid country code and 0)
                </span> */}
              </Label>
              <Input
                required
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                pattern="[0-9]{10}"
              />
            </div>

            <div>
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                required
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label htmlFor="addressLine1">Address Line 1</Label>
              <Input
                required
                type="text"
                id="addressLine1"
                name="addressLine1"
                value={formData.addressLine1}
                onChange={handleInputChange}
                placeholder="Enter your address"
              />
            </div>

            <div>
              <Label htmlFor="addressLine2">Address Line 2</Label>
              <Input
                type="text"
                id="addressLine2"
                name="addressLine2"
                value={formData.addressLine2}
                onChange={handleInputChange}
                placeholder="Apartment, suite, etc. (optional)"
              />
            </div>

            <div>
              <Label htmlFor="state">State</Label>
              <Select
                name="state"
                value={formData.state}
                onValueChange={handleStateChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {indianStates.map((state) => (
                    <SelectItem key={state} value={state}>
                      {state}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="pinCode">PIN Code</Label>
              <Input
                required
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleInputChange}
                placeholder="Enter PIN code"
                pattern="[0-9]{6}"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          type="submit"
          onClick={handleSubmit}
          disabled={isLoading || !isFormValid}>
          {isLoading
            ? "Processing..."
            : "Pre-book Now (₹" + quantity * 299 + ")"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PrebookForm;
