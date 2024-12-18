"use client";
import React, { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { CreditCard, Phone } from "lucide-react";
// import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const AirtimePurchase = () => {
  const user = useSelector((state) => state.auth.user);
  const [purchaseDetails, setPurchaseDetails] = useState({
    phoneNumber: "",
    amount: "",
    provider: "",
  });

  const providers = [
    { value: "mtn", label: "MTN" },
    { value: "airtel", label: "Airtel" },
    { value: "glo", label: "Glo" },
    { value: "9mobile", label: "9mobile" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPurchaseDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePurchase = () => {
    // Validate inputs
    if (
      !purchaseDetails.phoneNumber ||
      !purchaseDetails.amount ||
      !purchaseDetails.provider
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Simulate purchase logic
    try {
      // Redux action would be dispatched here to process purchase
      toast.success("Airtime purchased successfully!");

      // Reset form
      setPurchaseDetails({
        phoneNumber: "",
        amount: "",
        provider: "",
      });
    } catch (error) {
      toast.error("Purchase failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-md">
        <Card className="p-8 bg-white shadow-xl rounded-xl">
          <div className="flex items-center justify-center mb-6">
            <Phone className="text-blue-500 mr-3" size={40} />
            <Typography variant="h4" className="text-blue-800">
              Buy Airtime
            </Typography>
          </div>

          {/* Phone Number Input */}
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-gray-700">
              Phone Number
            </Typography>
            <Input
              name="phoneNumber"
              value={purchaseDetails.phoneNumber}
              onChange={handleInputChange}
              type="tel"
              placeholder="Enter phone number"
              icon={<Phone />}
              className="border-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Provider Selection */}
          <div className="mb-4">
            <Typography variant="small" className="mb-2 text-gray-700">
              Select Provider
            </Typography>
            <Select
              name="provider"
              value={purchaseDetails.provider}
              onChange={(val) =>
                setPurchaseDetails((prev) => ({
                  ...prev,
                  provider: val,
                }))
              }
              label="Choose Provider"
            >
              {providers.map((provider) => (
                <Option key={provider.value} value={provider.value}>
                  {provider.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Amount Input */}
          <div className="mb-6">
            <Typography variant="small" className="mb-2 text-gray-700">
              Amount
            </Typography>
            <Input
              name="amount"
              value={purchaseDetails.amount}
              onChange={handleInputChange}
              type="number"
              placeholder="Enter amount"
              icon={<CreditCard />}
              className="border-blue-200 focus:border-blue-500"
            />
          </div>

          {/* Purchase Button */}
          <Button
            fullWidth
            onClick={handlePurchase}
            className="bg-blue-500 hover:bg-blue-700 transition-all duration-300"
          >
            Purchase Airtime
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default AirtimePurchase;
