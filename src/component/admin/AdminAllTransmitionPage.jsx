"use client";

import React, { useMemo } from "react";
import {
  DollarSign,
  ArrowUpRight,
  Calendar,
  User,
  ShieldCheck,
  Search,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AdminAllTransmitionPage = ({ payments = [] }) => {
  const [searchQuery, setSearchQuery] = React.useState("");

  // ১. সব পেমেন্ট থেকে টোটাল রেভিনিউ ক্যালকুলেশন
  const totalRevenue = useMemo(() => {
    return payments.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  }, [payments]);

  // ২. রিচার্টস (Recharts) এর জন্য ডেট অনুযায়ী ডাটা ফরম্যাটিং
  const chartData = useMemo(() => {
    const dailyData = {};
    payments.forEach((item) => {
      if (!item.createdAt) return;
      const date = new Date(item.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
      dailyData[date] = (dailyData[date] || 0) + (Number(item.price) || 0);
    });

    return Object.keys(dailyData)
      .map((date) => ({
        date,
        amount: dailyData[date],
      }))
      .reverse(); // সর্বশেষ দিনগুলো ডানপাশে রাখার জন্য
  }, [payments]);

  // ৩. সার্চ ফিল্টারিং (Transaction ID বা User ID দিয়ে খোঁজা)
  const filteredPayments = useMemo(() => {
    return payments.filter(
      (item) =>
        item._id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.userId?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.lawyerId?.toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [payments, searchQuery]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10 space-y-8">
      {/* হেডার */}
      <div className="flex flex-col gap-1 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#C4A482]">
          Financial Overview
        </p>
        <h1 className="font-serif text-3xl font-semibold text-zinc-900 dark:text-zinc-100">
          All Transactions
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Monitor all income, platforms fees, and detailed log of LegalEase
          client-to-lawyer contracts.
        </p>
      </div>

      {/* স্ট্যাটস ও চার্ট গ্রিড */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* টোটাল কার্ড */}
        <Card className="bg-white dark:bg-black border-zinc-200 dark:border-zinc-800 shadow-sm md:col-span-1 h-full flex flex-col justify-between">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-500 dark:text-zinc-400 flex items-center justify-between">
              Total Revenue
              <span className="p-2 rounded-full bg-[#C4A482]/10 text-[#C4A482]">
                <DollarSign className="h-4 w-4" />
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4 pb-6">
            <div className="text-4xl font-bold text-zinc-900 dark:text-white flex items-baseline gap-1">
              <span className="text-2xl text-[#C4A482] font-medium">$</span>
              {totalRevenue}
            </div>
            <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1 mt-2">
              <ArrowUpRight className="h-3.5 w-3.5" /> +12.5% from last week
            </p>
          </CardContent>
        </Card>

        {/* রিচার্টস এরিয়া চার্ট (Recharts Area Chart) */}
        <Card className="bg-white dark:bg-black border-zinc-200 dark:border-zinc-800 shadow-sm md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Revenue Flow
            </CardTitle>
            <CardDescription className="text-xs text-zinc-500">
              Visualizing earnings over time
            </CardDescription>
          </CardHeader>
          <CardContent className="h-48 pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={
                  chartData.length
                    ? chartData
                    : [{ date: "No Data", amount: 0 }]
                }
              >
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#C4A482" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#C4A482" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#E4E4E7"
                  className="dark:stroke-zinc-800"
                />
                <XAxis
                  dataKey="date"
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={11}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip
                  contentStyle={{
                    background: "var(--background-card, window)",
                    borderColor: "#C4A482",
                    borderRadius: "8px",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="amount"
                  stroke="#C4A482"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorAmount)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* সার্চ টুলবার */}
      <div className="relative max-w-sm">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
        <Input
          placeholder="Search by ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#C4A482]"
        />
      </div>

      {/* ট্রানজেকশন টেবিল (Transaction Table) */}
      <div className="overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black shadow-sm">
        <Table>
          <TableHeader className="bg-zinc-50 dark:bg-zinc-950/50">
            <TableRow className="border-zinc-200 dark:border-zinc-800 hover:bg-transparent">
              <TableHead className="text-zinc-500 dark:text-zinc-400 font-medium">
                Transaction ID
              </TableHead>
              <TableHead className="text-zinc-500 dark:text-zinc-400 font-medium">
                User ID
              </TableHead>
              <TableHead className="text-zinc-500 dark:text-zinc-400 font-medium">
                Lawyer ID
              </TableHead>
              <TableHead className="text-zinc-500 dark:text-zinc-400 font-medium">
                Date & Time
              </TableHead>
              <TableHead className="text-right text-zinc-500 dark:text-zinc-400 font-medium">
                Amount
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPayments.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-10 text-zinc-400 text-sm"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              filteredPayments.map((payment) => (
                <TableRow
                  key={payment._id}
                  className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-900/30 transition-colors"
                >
                  {/* Transaction ID */}
                  <TableCell className="font-mono text-xs text-zinc-600 dark:text-zinc-400">
                    #{payment._id}
                  </TableCell>

                  {/* User ID */}
                  <TableCell className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    <div className="flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-zinc-400" />
                      <span className="truncate max-w-[120px]">
                        {payment.userId}
                      </span>
                    </div>
                  </TableCell>

                  {/* Lawyer ID */}
                  <TableCell className="text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#C4A482]" />
                      <span className="truncate max-w-[120px]">
                        {payment.lawyerId}
                      </span>
                    </div>
                  </TableCell>

                  {/* Date */}
                  <TableCell className="text-xs text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                      {payment.createdAt
                        ? new Date(payment.createdAt).toLocaleString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                        : "N/A"}
                    </div>
                  </TableCell>

                  {/* Amount */}
                  <TableCell className="text-right font-semibold text-zinc-900 dark:text-white">
                    <span className="text-xs text-[#C4A482] font-medium mr-0.5">
                      $
                    </span>
                    {payment.price}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminAllTransmitionPage;
