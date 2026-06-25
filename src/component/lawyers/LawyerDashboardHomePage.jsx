"use client";

import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiClock,
  FiCreditCard,
  FiMessageSquare,
  FiEdit2,
  FiMail,
  FiMapPin,
  FiDollarSign,
  FiAward,
  FiCheckCircle,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

const LawyerDashboardHome = ({ lawyer, totalHires }) => {
  const stats = [
    {
      title: "HOURLY RATE",
      count: `$${lawyer?.hourlyRate || "0"}`,
      icon: <FiDollarSign />,
    },
    {
      title: "EXPERIENCE",
      count: lawyer?.experience || "N/A",
      icon: <FiAward />,
    },
    {
      title: "STATUS",
      count: lawyer?.status ? "Available" : "Busy",
      icon: <FiCheckCircle />,
    },
    {
      title: "TOTAL HIRES",
      count: totalHires.length || "0",
      icon: <FiBriefcase />,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-[#fcf9f5] dark:bg-[#0a0a0a] min-h-screen text-gray-800 dark:text-gray-100"
    >
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome back, {lawyer?.name}! 👋</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your legal services and hiring requests here.
        </p>
      </div>

      {/* Lawyer Profile Card */}
      <motion.div className="bg-white dark:bg-[#121212] p-8 rounded-2xl shadow-sm border border-gray-200 dark:border-[#222] mb-8">
        <div className="flex justify-between items-start">
          <div className="flex gap-6 items-center">
            <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-[#c4a482]">
              <Image
                loading="lazy"
                width={600}
                height={400}
                src={
                  lawyer?.image ||
                  `https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168`
                }
                alt={lawyer?.name}
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{lawyer?.name}</h2>
              <p className="text-[#c4a482] font-semibold">
                {lawyer?.specialty}
              </p>
              <span className="text-xs bg-gray-100 dark:bg-[#1a1a1a] px-3 py-1 rounded-full border border-gray-200 dark:border-[#333] mt-2 inline-block">
                {lawyer?.role}
              </span>
            </div>
          </div>
          <Link href={"/dashboard/lawyer/profile"}>
            <button className="flex items-center gap-2 bg-gray-900 dark:bg-[#d9bfa2] text-white dark:text-black px-6 py-2 rounded-xl font-medium">
              <FiEdit2 /> MANAGE PROFILE
            </button>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-8 mt-8 border-t pt-8 border-gray-100 dark:border-[#222]">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
              <FiMail />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">
                EMAIL
              </p>
              <p className="font-medium">{lawyer?.email || "N/A"}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gray-50 dark:bg-[#1a1a1a] rounded-lg">
              <FiMapPin />
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-gray-400">
                LOCATION
              </p>
              <p className="font-medium">{lawyer?.location || "N/A"}</p>
            </div>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-50 dark:bg-[#1a1a1a] rounded-xl border border-gray-100 dark:border-[#333]">
          <p className="text-[10px] uppercase font-bold text-gray-400 mb-1">
            BIO / ABOUT
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {lawyer?.bio || "N/A"}
          </p>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -5 }}
            className="bg-white dark:bg-[#121212] p-6 rounded-2xl border border-gray-200 dark:border-[#222] flex items-center gap-4"
          >
            <div className="text-xl text-[#c4a482]">{stat.icon}</div>
            <div>
              <p className="text-[10px] font-bold text-gray-400">
                {stat.title}
              </p>
              <p className="text-xl font-bold">{stat.count}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default LawyerDashboardHome;
