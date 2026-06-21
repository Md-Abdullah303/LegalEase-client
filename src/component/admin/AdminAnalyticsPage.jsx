"use client";

import { motion } from "framer-motion";
import {
  Users,
  Scale,
  Briefcase,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

export default function AnalyticsPage() {
  // Static Mock Data
  const stats = [
    { title: "Total Users", value: "1,240", increase: "+12%", icon: Users },
    { title: "Total Lawyers", value: "345", increase: "+5%", icon: Scale },
    { title: "Total Hires", value: "89", increase: "+18%", icon: Briefcase },
    {
      title: "Total Revenue",
      value: "$12,450",
      increase: "+24%",
      icon: DollarSign,
    },
  ];

  // Data for Custom Tailwind Bar Chart
  const monthlyRevenue = [
    { month: "Jan", amount: 30, value: "$3k" },
    { month: "Feb", amount: 45, value: "$4.5k" },
    { month: "Mar", amount: 35, value: "$3.5k" },
    { month: "Apr", amount: 60, value: "$6k" },
    { month: "May", amount: 80, value: "$8k" },
    { month: "Jun", amount: 100, value: "$10k" }, // Current high
  ];

  // Data for Categories
  const topCategories = [
    { name: "Criminal Law", percentage: 75, count: 120 },
    { name: "Corporate Law", percentage: 60, count: 95 },
    { name: "Family Law", percentage: 45, count: 65 },
    { name: "Real Estate", percentage: 30, count: 40 },
  ];

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Analytics Overview
          </h1>
          <p className="text-zinc-500 dark:text-zinc-400 mt-1">
            {`Track your platform's growth, revenue, and lawyer performance.`}
          </p>
        </div>

        {/* Date Filter Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-[#121214] border border-zinc-200 dark:border-zinc-800 shadow-sm text-sm font-medium">
          <span>Last 6 Months</span>
          <TrendingUp className="w-4 h-4 text-zinc-500" />
        </div>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] shadow-sm flex flex-col justify-between"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/50">
                    <Icon className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
                  </div>
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-900/30 px-2 py-1 rounded-full">
                    <ArrowUpRight className="w-3 h-3" />
                    {stat.increase}
                  </span>
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-zinc-900 dark:text-white mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    {stat.title}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Charts & Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Revenue Chart (Tailwind Custom Bar Chart) */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-2 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] shadow-sm flex flex-col"
          >
            <div className="mb-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Revenue Growth
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Monthly hiring revenue breakdown.
              </p>
            </div>

            {/* CSS Bar Chart */}
            <div className="relative flex-1 flex items-end gap-2 sm:gap-6 pt-10 min-h-[250px]">
              {/* Background Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-8">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-full border-b border-zinc-100 dark:border-zinc-800/60 flex-1"
                  ></div>
                ))}
              </div>

              {/* Bars */}
              {monthlyRevenue.map((data, index) => (
                <div
                  key={index}
                  className="relative flex-1 flex flex-col items-center justify-end group h-full pb-8"
                >
                  <div className="absolute top-0 opacity-0 group-hover:opacity-100 transition-opacity -mt-8 text-xs font-bold bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black px-2 py-1 rounded">
                    {data.value}
                  </div>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.amount}%` }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className={`w-full max-w-[40px] rounded-t-sm ${
                      index === 5
                        ? "bg-zinc-900 dark:bg-[#E5D4B6]" // Highlight current month
                        : "bg-zinc-200 dark:bg-zinc-800"
                    } transition-colors group-hover:bg-zinc-400 dark:group-hover:bg-zinc-700`}
                  ></motion.div>
                  <span className="absolute bottom-0 text-xs font-medium text-zinc-500 dark:text-zinc-400 mt-2">
                    {data.month}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Categories */}
          <motion.div
            variants={itemVariants}
            className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] shadow-sm"
          >
            <div className="mb-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Top Legal Categories
              </h2>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Most demanded services.
              </p>
            </div>

            <div className="space-y-6">
              {topCategories.map((category, index) => (
                <div key={index}>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      {category.name}
                    </span>
                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                      {category.count} hires
                    </span>
                  </div>
                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${category.percentage}%` }}
                      transition={{ duration: 1, delay: 0.3 }}
                      className="h-full bg-zinc-900 dark:bg-[#E5D4B6] rounded-full"
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom CTA */}
            <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/60">
              <button className="w-full py-2.5 rounded-lg text-sm font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors">
                View Detailed Report
              </button>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
