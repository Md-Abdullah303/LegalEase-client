"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Edit3,
  Users,
  Scale,
  CheckCircle,
  DollarSign,
  ShieldCheck,
} from "lucide-react";

export default function AdminDashboardHome() {
  // Static Data (Tomar dewa data theke neya)
  const adminData = {
    name: "Ridme",
    email: "mdabdulla01715940008+user5@gmail.com",
    role: "Admin",
    location: "Chandpur, Bangladesh",
    bio: "Bio is Bio. Overseeing the LegalEase platform operations, managing users, and ensuring smooth legal consultations.",
    image: "https://i.ibb.co/LDR30Dbz/images.jpg",
  };

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen p-6 md:p-10 bg-zinc-50 dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 font-sans">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome back, {adminData.name}!{" "}
          <span className="inline-block origin-bottom-right animate-wave">
            👋
          </span>
        </h1>
        <p className="text-zinc-500 dark:text-zinc-400 mt-1">
          Manage platform operations, users, and overall system health here.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {/* Profile Card (Matching your image style) */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] shadow-sm"
        >
          {/* Top Section: Avatar, Name, Role, Button */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800/60">
            <div className="flex items-center gap-5">
              <img
                src={adminData.image}
                alt={adminData.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-zinc-200 dark:border-zinc-700"
              />
              <div>
                <h2 className="text-2xl font-bold">{adminData.name}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <ShieldCheck className="w-4 h-4 text-amber-600 dark:text-[#E5D4B6]" />
                  <span className="text-sm font-medium text-amber-700 dark:text-[#E5D4B6] uppercase tracking-wider">
                    {adminData.role}
                  </span>
                </div>
              </div>
            </div>

            <button className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-[#E5D4B6] dark:text-black dark:hover:opacity-90">
              <Edit3 className="w-4 h-4" />
              MANAGE PROFILE
            </button>
          </div>

          {/* Middle Section: Contact & Location Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
            <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-[#1A1A1C]">
              <div className="p-3 rounded-lg bg-white dark:bg-[#27272A] shadow-sm border border-zinc-200 dark:border-zinc-700">
                <Mail className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">
                  Email
                </p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {adminData.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-[#1A1A1C]">
              <div className="p-3 rounded-lg bg-white dark:bg-[#27272A] shadow-sm border border-zinc-200 dark:border-zinc-700">
                <MapPin className="w-5 h-5 text-zinc-600 dark:text-zinc-300" />
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-0.5">
                  Location
                </p>
                <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {adminData.location}
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Section: Bio */}
          <div className="p-4 rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50 dark:bg-[#1A1A1C]">
            <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-2">
              Bio / About
            </p>
            <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {adminData.bio}
            </p>
          </div>
        </motion.div>

        {/* Quick Stats Grid (At a Glance) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <motion.div
            variants={itemVariants}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Total Users
              </p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                1,240
              </h3>
            </div>
            <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
              <Users className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Total Lawyers
              </p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                345
              </h3>
            </div>
            <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
              <Scale className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Approved Hires
              </p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                89
              </h3>
            </div>
            <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
              <CheckCircle className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="p-5 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#121214] flex items-center justify-between shadow-sm"
          >
            <div>
              <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1">
                Total Revenue
              </p>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                $12,450
              </h3>
            </div>
            <div className="p-3 rounded-full bg-zinc-100 dark:bg-zinc-800/50">
              <DollarSign className="w-6 h-6 text-zinc-600 dark:text-zinc-300" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
