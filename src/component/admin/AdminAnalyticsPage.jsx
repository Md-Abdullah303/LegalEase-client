"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  Users,
  Briefcase,
  FileText,
  DollarSign,
  Receipt,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

const GOLD = "#c4a482";
const GOLD_LIGHT = "#d4b898";
const GOLD_MUTED = "rgba(196,164,130,0.15)";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.45, ease: "easeOut" },
  }),
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

function StatCard({ icon: Icon, label, value, sub, index }) {
  return (
    <motion.div
      variants={fadeUp}
      custom={index}
      className="rounded-xl border border-border bg-card p-5 flex flex-col gap-2"
    >
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
          {label}
        </span>
        <span
          className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: GOLD_MUTED }}
        >
          <Icon size={16} style={{ color: GOLD }} />
        </span>
      </div>
      <p className="text-3xl font-semibold text-foreground">{value}</p>
      {sub && (
        <p className="text-xs flex items-center gap-1" style={{ color: GOLD }}>
          <ArrowUpRight size={12} />
          {sub}
        </p>
      )}
    </motion.div>
  );
}

export default function AdminAnalyticsPage({
  totalUsersData = [],
  totalLawyerData = [],
  totalHiresData = [],
  topCategories = [],
  totalRevenue = 0,
  totalPaymentData = [],
}) {
  const totalUsers = Array.isArray(totalUsersData)
    ? totalUsersData.length
    : totalUsersData;
  const totalLawyers = Array.isArray(totalLawyerData)
    ? totalLawyerData.length
    : totalLawyerData;
  const totalHires = Array.isArray(totalHiresData)
    ? totalHiresData.length
    : totalHiresData;
  const txCount = totalPaymentData.length;
  const avgFee = txCount ? Math.round(totalRevenue / txCount) : 0;

  const byDate = useMemo(() => {
    const map = {};
    totalPaymentData.forEach((p) => {
      const d = p.createdAt?.slice(0, 10) || "unknown";
      map[d] = (map[d] || 0) + p.price;
    });
    return map;
  }, [totalPaymentData]);

  const dateLabels = Object.keys(byDate)
    .sort()
    .map((d) => {
      const dt = new Date(d);
      return dt.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    });
  const dateValues = Object.keys(byDate)
    .sort()
    .map((d) => byDate[d]);

  const lawyerMap = useMemo(() => {
    const map = {};
    totalPaymentData.forEach((p) => {
      const key = "..." + (p.lawyerId || "").slice(-5);
      map[key] = (map[key] || 0) + p.price;
    });
    return map;
  }, [totalPaymentData]);

  const lawyerLabels = Object.keys(lawyerMap);
  const lawyerValues = lawyerLabels.map((k) => lawyerMap[k]);
  const donutColors = ["#c4a482", "#a07850", "#d4b898", "#7a5c38", "#e8d4bc"];

  const lineLabels = totalPaymentData.map((_, i) => `#${i + 1}`);
  const lineValues = totalPaymentData.map((p) => p.price);

  const chartFont = { family: "inherit", size: 12 };

  const barData = {
    labels: dateLabels,
    datasets: [
      {
        label: "Revenue",
        data: dateValues,
        backgroundColor: GOLD,
        borderRadius: 6,
        borderSkipped: false,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (c) => ` $${c.raw}` } },
    },
    scales: {
      y: {
        ticks: { callback: (v) => "$" + v, color: "#888", font: chartFont },
        grid: { color: "rgba(196,164,130,0.1)" },
        border: { dash: [4, 4] },
      },
      x: {
        ticks: { color: "#888", font: chartFont },
        grid: { display: false },
      },
    },
  };

  const donutData = {
    labels: lawyerLabels,
    datasets: [
      {
        data: lawyerValues,
        backgroundColor: donutColors,
        borderWidth: 0,
        hoverOffset: 6,
      },
    ],
  };

  const donutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "68%",
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (c) => ` $${c.raw}` } },
    },
  };

  const lineData = {
    labels: lineLabels,
    datasets: [
      {
        label: "Amount",
        data: lineValues,
        borderColor: GOLD,
        backgroundColor: "rgba(196,164,130,0.10)",
        fill: true,
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: GOLD,
        pointBorderColor: "transparent",
      },
    ],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (c) => ` $${c.raw}` } },
    },
    scales: {
      y: {
        ticks: { callback: (v) => "$" + v, color: "#888", font: chartFont },
        grid: { color: "rgba(196,164,130,0.1)" },
        border: { dash: [4, 4] },
      },
      x: {
        ticks: { color: "#888", font: chartFont },
        grid: { display: false },
      },
    },
  };

  const stats = [
    {
      icon: Users,
      label: "Total users",
      value: totalUsers || "—",
      sub: "Registered clients",
    },
    {
      icon: Briefcase,
      label: "Total lawyers",
      value: totalLawyers || "—",
      sub: "Active listings",
    },
    {
      icon: FileText,
      label: "Total hires",
      value: totalHires || "—",
      sub: "All time requests",
    },
    {
      icon: DollarSign,
      label: "Total revenue",
      value: "$" + Number(totalRevenue).toLocaleString(),
      sub: "From Stripe payments",
    },
    {
      icon: Receipt,
      label: "Transactions",
      value: txCount,
      sub: "Completed payments",
    },
    {
      icon: TrendingUp,
      label: "Avg. fee",
      value: "$" + avgFee,
      sub: "Per transaction",
    },
  ];

  const sortedTx = [...totalPaymentData].reverse();

  return (
    <div className="p-6 space-y-8 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h1 className="text-2xl font-semibold text-foreground">
          Analytics overview
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Platform performance at a glance
        </p>
        <div
          className="mt-3 h-0.5 w-16 rounded-full"
          style={{ background: GOLD }}
        />
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4"
      >
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </motion.div>

      {/* Charts row 1 */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-2 gap-6"
      >
        {/* Bar chart */}
        <motion.div
          variants={fadeUp}
          custom={0}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Revenue by date
              </p>
              <p className="text-xs text-muted-foreground">
                Daily payment totals
              </p>
            </div>
            <span
              className="text-xs px-2 py-1 rounded-md font-medium"
              style={{ background: GOLD_MUTED, color: GOLD }}
            >
              Last 7 days
            </span>
          </div>
          <div style={{ height: 220 }}>
            <Bar data={barData} options={barOptions} />
          </div>
        </motion.div>

        {/* Doughnut */}
        <motion.div
          variants={fadeUp}
          custom={1}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-foreground">
                Revenue by lawyer
              </p>
              <p className="text-xs text-muted-foreground">
                Share of total earnings
              </p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div style={{ height: 180, width: 180, flexShrink: 0 }}>
              <Doughnut data={donutData} options={donutOptions} />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              {lawyerLabels.map((l, i) => (
                <div
                  key={l}
                  className="flex items-center justify-between text-xs"
                >
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <span
                      className="w-2.5 h-2.5 rounded-sm shrink-0"
                      style={{ background: donutColors[i] }}
                    />
                    {l}
                  </span>
                  <span className="font-medium text-foreground">
                    ${lawyerValues[i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Line chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.45 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-medium text-foreground">
              Transaction history
            </p>
            <p className="text-xs text-muted-foreground">
              All payment amounts over time
            </p>
          </div>
          <span
            className="text-xs px-2 py-1 rounded-md font-medium"
            style={{ background: GOLD_MUTED, color: GOLD }}
          >
            {txCount} payments
          </span>
        </div>
        <div style={{ height: 200 }}>
          <Line data={lineData} options={lineOptions} />
        </div>
      </motion.div>

      {/* Top categories */}
      {topCategories?.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <p className="text-sm font-medium text-foreground mb-4">
            Top legal categories
          </p>
          <div className="space-y-3">
            {topCategories.map((cat, i) => {
              const max = topCategories[0]?.count || 1;
              const pct = Math.round(((cat.count || 1) / max) * 100);
              return (
                <div key={cat._id || i} className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground w-28 truncate">
                    {cat._id || cat.name}
                  </span>
                  <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                    <motion.div
                      className="h-full rounded-full"
                      style={{ background: GOLD }}
                      initial={{ width: 0 }}
                      animate={{ width: pct + "%" }}
                      transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                    />
                  </div>
                  <span className="text-xs font-medium text-foreground w-8 text-right">
                    {cat.count || 0}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Recent transactions table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.45 }}
        className="rounded-xl border border-border bg-card p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-medium text-foreground">
            Recent transactions
          </p>
          <span className="text-xs text-muted-foreground">{txCount} total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-fixed text-sm">
            <thead>
              <tr className="border-b border-border">
                {["Transaction ID", "User", "Lawyer", "Amount", "Date"].map(
                  (h) => (
                    <th
                      key={h}
                      className="pb-2 text-left text-xs font-medium text-muted-foreground"
                      style={{
                        width:
                          h === "Transaction ID"
                            ? "22%"
                            : h === "Amount"
                              ? "12%"
                              : "auto",
                      }}
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {sortedTx.map((tx, i) => (
                <motion.tr
                  key={tx._id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45 + i * 0.04 }}
                  className="border-b border-border last:border-0 hover:bg-muted/40 transition-colors"
                >
                  <td className="py-3 pr-2">
                    <span className="font-mono text-xs text-muted-foreground">
                      {tx._id?.slice(0, 16)}...
                    </span>
                  </td>
                  <td className="py-3 pr-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      ...{tx.userId?.slice(-6)}
                    </span>
                  </td>
                  <td className="py-3 pr-2">
                    <span className="text-xs text-muted-foreground font-mono">
                      ...{tx.lawyerId?.slice(-6)}
                    </span>
                  </td>
                  <td className="py-3 pr-2">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: GOLD }}
                    >
                      ${tx.price}
                    </span>
                  </td>
                  <td className="py-3">
                    <span className="text-xs text-muted-foreground">
                      {new Date(tx.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
