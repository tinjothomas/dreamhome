"use client";

import React, { useState, useEffect } from "react";
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

const PrebookForm = () => {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [errors, setErrors] = useState({});
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
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;
    const pinCodeRegex = /^[0-9]{6}$/;

    if (!formData.email.match(emailRegex)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone.match(phoneRegex)) {
      newErrors.phone =
        "Only include 10-digit phone number without space. Remove area codes (+91, 0) etc";
    }
    if (formData.fullName.trim().length === 0) {
      newErrors.fullName = "Full name is required";
    }
    if (formData.addressLine1.trim().length === 0) {
      newErrors.addressLine1 = "Address is required";
    }
    if (!formData.pinCode.match(pinCodeRegex)) {
      newErrors.pinCode = "Please enter a valid 6-digit PIN code";
    }

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
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
    if (!isFormValid) {
      // Show all validation errors when attempting to submit
      validateForm();
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        ...formData,
        quantity,
        totalAmount: quantity * 368,
        timestamp: new Date().toISOString(),
        status: "pending",
      };

      const response = await fetch("/api/initiate-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderData }),
      });

      if (!response.ok) {
        throw new Error("Failed to initiate payment");
      }

      const data = await response.json();

      if (data.success) {
        window.location.href = data.paymentRedirectUrl;
      } else {
        throw new Error("Payment initiation failed");
      }
    } catch (error) {
      console.error("Error processing order:", error);
      alert("There was an error processing your payment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (orderComplete && orderDetails) {
    return <SuccessPage orderDetails={orderDetails} />;
  }

  return (
    <div>
      {/* container */}
      <div className="flex flex-col bg-white rounded-md border shadow-md p-4">
        {/* header */}
        <div className="flex items-center flex-row border-b pb-4 mb-3">
          <img
            className="w-40 rounded-lg mr-4"
            src="mockup.jpg"
            alt="calendar image"
          />
          <div>
            <h2 className="md:text-2xl text-xl font-semibold">
              Buy 2025 Calendar by SujithNavam
            </h2>
            <p className="text-slate-500 mt-2">Delivery in 4-6 days</p>
          </div>
        </div>
        {/* header ends */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="md:w-[448px]">
            <form onSubmit={handleSubmit} className="space-y-4">
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
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <p className="text-sm text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    required
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                    pattern="[0-9]{10}"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <p className="text-sm text-red-500 mt-1">{errors.phone}</p>
                  )}
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
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.fullName}
                    </p>
                  )}
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
                    className={errors.addressLine1 ? "border-red-500" : ""}
                  />
                  {errors.addressLine1 && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.addressLine1}
                    </p>
                  )}
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
                    className={errors.pinCode ? "border-red-500" : ""}
                  />
                  {errors.pinCode && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.pinCode}
                    </p>
                  )}
                </div>
              </div>
            </form>
          </div>
          <div>
            <div className="bg-yellow-50 border border-yellow-200 p-4 min-w-[280px] rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium text-slate-600">
                  Product Price:
                </span>
                <span>₹368</span>
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
                <span className="text-xl">₹{quantity * 368}</span>
              </div>
            </div>
            <Button
              data-splitbee-event="Order clicked"
              className="w-full"
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading || !isFormValid}>
              {isLoading ? "Processing..." : `Order Now (₹${quantity * 368})`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrebookForm;
