"use client";

import React from "react";
import { motion } from "framer-motion";
import { Lock, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";

export default function ForbiddenPage() {
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* মেইন কন্টেইনার অ্যানিমেশন */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="w-full max-w-md text-center space-y-6"
      >
        {/* লক আইকন অ্যানিমেশন (সামান্য রোটেট হবে এন্ট্রি নেওয়ার সময়) */}
        <motion.div
          initial={{ rotate: -15, scale: 0.5 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
          className="flex justify-center"
        >
          <div className="p-4 rounded-full bg-[#E5D4B6]/20 dark:bg-[#E5D4B6]/10 text-[#E5D4B6] relative">
            <Lock className="h-16 w-16" />
            {/* একটি ছোট লাল ডট বা নোটিফিকেশন থিম দিতে চাইলে দিতে পারেন, তবে সিম্পল রাখাই ভালো */}
          </div>
        </motion.div>

        {/* টেক্সট সেকশন */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-7xl font-extrabold tracking-tighter text-[#E5D4B6]"
          >
            403
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-2xl font-bold tracking-tight"
          >
            Access Forbidden
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs mx-auto"
          >
            You do not have the required legal permissions or admin rights to
            access this resource.
          </motion.p>
        </div>

        {/* অ্যাকশন বাটন */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center pt-4"
        >
          <Button
            asChild
            className="bg-[#E5D4B6] hover:bg-[#d4bf9c] text-black font-semibold px-6 transition-colors shadow-sm"
          >
            <Link
              href={`/dashboard/${user?.role}`}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Return to Dashboard
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
