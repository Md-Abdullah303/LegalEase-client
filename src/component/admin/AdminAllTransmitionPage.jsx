"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

// shadcn/ui components (assume already installed)
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

/* =======================
   SAMPLE DATA
======================= */

const revenueData = [
  { month: "Jan", revenue: 5000 },
  { month: "Feb", revenue: 7200 },
  { month: "Mar", revenue: 8500 },
  { month: "Apr", revenue: 9800 },
  { month: "May", revenue: 12000 },
  { month: "Jun", revenue: 14500 },
];

const paymentStatusData = [
  { name: "Completed", value: 75 },
  { name: "Pending", value: 15 },
  { name: "Failed", value: 10 },
];

const topLawyers = [
  { name: "John Doe", revenue: 12000 },
  { name: "Sarah Khan", revenue: 9800 },
  { name: "Michael Lee", revenue: 8700 },
  { name: "Emma Watson", revenue: 7600 },
];

const transactions = Array.from({ length: 25 }).map((_, i) => ({
  id: `TXN-${1000 + i}`,
  user: `User ${i + 1}`,
  lawyer: `Lawyer ${i + 1}`,
  amount: Math.floor(Math.random() * 5000 + 500),
  status: i % 3 === 0 ? "Pending" : i % 2 === 0 ? "Completed" : "Failed",
  date: `2026-06-${(i % 28) + 1}`,
}));

/* =======================
   COLORS
======================= */

const COLORS = ["#22c55e", "#f59e0b", "#ef4444"];

/* =======================
   MAIN COMPONENT
======================= */

export default function AllTransactionsPage() {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl font-bold">All Transactions</h1>
          <p className="text-sm text-gray-500">
            Manage all lawyer payments and user transactions
          </p>
        </div>

        <Button>Export CSV</Button>
      </motion.div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: "Total Revenue", value: "$52,300" },
          { title: "Completed", value: "75%" },
          { title: "Pending", value: "15%" },
          { title: "Failed", value: "10%" },
        ].map((stat, i) => (
          <motion.div key={i} whileHover={{ scale: 1.03 }}>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">{stat.title}</p>
                <h2 className="text-xl font-bold">{stat.value}</h2>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* REVENUE CHART */}
        <Card>
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#6366f1"
                  fill="#6366f1"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* PAYMENT STATUS PIE */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentStatusData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {paymentStatusData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* TOP LAWYERS */}
      <Card>
        <CardHeader>
          <CardTitle>Top Lawyers Revenue</CardTitle>
        </CardHeader>
        <CardContent className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topLawyers}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="revenue" fill="#0ea5e9" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* TRANSACTIONS TABLE */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>

        <CardContent>
          {/* SEARCH */}
          <div className="flex gap-3 mb-4">
            <Input placeholder="Search transaction..." />
            <Button variant="outline">Filter</Button>
          </div>

          {/* TABLE */}
          <div className="overflow-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="p-2">ID</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Lawyer</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                </tr>
              </thead>

              <tbody>
                {transactions.map((tx, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-2">{tx.id}</td>
                    <td className="p-2">{tx.user}</td>
                    <td className="p-2">{tx.lawyer}</td>
                    <td className="p-2">${tx.amount}</td>
                    <td className="p-2">
                      <Badge
                        className={
                          tx.status === "Completed"
                            ? "bg-green-500"
                            : tx.status === "Pending"
                              ? "bg-yellow-500"
                              : "bg-red-500"
                        }
                      >
                        {tx.status}
                      </Badge>
                    </td>
                    <td className="p-2">{tx.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="flex justify-between items-center mt-4">
            <p className="text-sm text-gray-500">
              Showing 1–25 of 120 transactions
            </p>

            <div className="flex gap-2">
              <Button variant="outline">Prev</Button>
              <Button variant="outline">Next</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
