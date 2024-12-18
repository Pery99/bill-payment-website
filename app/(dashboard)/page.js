"use client";
import React, { useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
// import {
//   CreditCard,
//   TrendingUp,
//   PhoneAndroid,
//   DataUsage,
//   Wallet,
// } from "lucide-react";
import { useSelector } from "react-redux";
import { Database, Phone, TrendingUp, Wallet } from "lucide-react";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);
  const [stats, setStats] = useState({
    balance: 5000.0,
    recentTransactions: [
      { id: 1, type: "Airtime", amount: 500, date: "2024-01-15" },
      { id: 2, type: "Data", amount: 1200, date: "2024-01-10" },
    ],
  });

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <Typography variant="h4" className="mb-6 text-blue-800 font-bold">
          Welcome, {user?.name || "User"}
        </Typography>

        {/* Quick Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Wallet Balance Card */}
          <Card className="p-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h5" className="text-gray-700">
                  Wallet Balance
                </Typography>
                <Typography variant="h4" className="text-blue-600 font-bold">
                  ₦{stats.balance.toLocaleString()}
                </Typography>
              </div>
              <Wallet className="text-blue-400" size={48} />
            </div>
            <Button
              variant="gradient"
              fullWidth
              className="mt-4 bg-blue-500 hover:bg-blue-700"
            >
              Fund Wallet
            </Button>
          </Card>

          {/* Airtime Purchase Card */}
          <Card className="p-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h5" className="text-gray-700">
                  Buy Airtime
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Quick and easy mobile top-up
                </Typography>
              </div>
              <Phone className="text-green-400" size={48} />
            </div>
            <Button
              variant="gradient"
              fullWidth
              className="mt-4 bg-green-500 hover:bg-green-700"
            >
              Purchase Airtime
            </Button>
          </Card>

          {/* Data Purchase Card */}
          <Card className="p-6 bg-white shadow-lg rounded-xl">
            <div className="flex items-center justify-between">
              <div>
                <Typography variant="h5" className="text-gray-700">
                  Buy Data
                </Typography>
                <Typography variant="small" className="text-gray-500">
                  Affordable data plans
                </Typography>
              </div>
              <Database className="text-purple-400" size={48} />
            </div>
            <Button
              variant="gradient"
              fullWidth
              className="mt-4 bg-purple-500 hover:bg-purple-700"
            >
              Purchase Data
            </Button>
          </Card>
        </div>

        {/* Recent Transactions */}
        <Card className="p-6 bg-white shadow-lg rounded-xl">
          <div className="flex justify-between items-center mb-4">
            <Typography variant="h5" className="text-gray-700">
              Recent Transactions
            </Typography>
            <TrendingUp className="text-blue-400" />
          </div>
          <div className="space-y-4">
            {stats.recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex justify-between border-b pb-2 last:border-b-0"
              >
                <div>
                  <Typography variant="small" className="font-bold">
                    {transaction.type} Purchase
                  </Typography>
                  <Typography variant="small" className="text-gray-500">
                    {transaction.date}
                  </Typography>
                </div>
                <Typography
                  variant="small"
                  className="text-green-600 font-bold"
                >
                  ₦{transaction.amount.toLocaleString()}
                </Typography>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
