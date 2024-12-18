'use client'
import React, { useState } from "react";
import {
  Card,
  Typography,
  Input,
  Button,
  Select,
  Option,
} from "@material-tailwind/react";
import { Database, Phone, CreditCard } from "lucide-react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";

const DataPurchase = () => {
  const user = useSelector((state) => state.auth.user);
  const [purchaseDetails, setPurchaseDetails] = useState({
    phoneNumber: "",
    plan: "",
    provider: "",
  });

  const dataplans = [
    { value: "1gb", label: "1GB - ₦500", price: 500 },
    { value: "2gb", label: "2GB - ₦1000", price: 1000 },
    { value: "5gb", label: "5GB - ₦2000", price: 2000 },
    { value: "10gb", label: "10GB - ₦3500", price: 3500 },
  ];

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
      !purchaseDetails.plan ||
      !purchaseDetails.provider
    ) {
      toast.error("Please fill all fields");
      return;
    }

    // Simulate purchase logic
    try {
      // Redux action would be dispatched here to process purchase
      const selectedPlan = dataplans.find(
        (plan) => plan.value === purchaseDetails.plan
      );

      toast.success(`${selectedPlan.label} data purchased successfully!`);

      // Reset form
      setPurchaseDetails({
        phoneNumber: "",
        plan: "",
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
            <Database className="text-purple-500 mr-3" size={40} />
            <Typography variant="h4" className="text-purple-800">
              Buy Data
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
              className="border-purple-200 focus:border-purple-500"
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

          {/* Data Plan Selection */}
          <div className="mb-6">
            <Typography variant="small" className="mb-2 text-gray-700">
              Select Data Plan
            </Typography>
            <Select
              name="plan"
              value={purchaseDetails.plan}
              onChange={(val) =>
                setPurchaseDetails((prev) => ({
                  ...prev,
                  plan: val,
                }))
              }
              label="Choose Data Plan"
            >
              {dataplans.map((plan) => (
                <Option key={plan.value} value={plan.value}>
                  {plan.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Purchase Button */}
          <Button
            fullWidth
            onClick={handlePurchase}
            className="bg-purple-500 hover:bg-purple-700 transition-all duration-300"
          >
            Purchase Data
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default DataPurchase;
