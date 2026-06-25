"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, ArrowLeft, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6 bg-white dark:bg-black text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      {/* মেইন কন্টেইনার অ্যানিমেশন */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md text-center space-y-6"
      >
        {/* আইকন অ্যানিমেশন (পালস ইফেক্ট) */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 100,
            delay: 0.2,
          }}
          className="flex justify-center"
        >
          <div className="p-4 rounded-full bg-[#E5D4B6]/20 dark:bg-[#E5D4B6]/10 text-[#E5D4B6]">
            <ShieldAlert className="h-16 w-16" />
          </div>
        </motion.div>

        {/* টেক্সট সেকশন */}
        <div className="space-y-2">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-7xl font-extrabold tracking-tighter text-[#E5D4B6]"
          >
            401
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-2xl font-bold tracking-tight"
          >
            Access Unauthorized
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-zinc-500 dark:text-zinc-400 text-sm max-w-xs mx-auto"
          >
            You need to be logged in to view this lease agreement or legal
            document.
          </motion.p>
        </div>

        {/* অ্যাকশন বাটন্স */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-3 justify-center pt-4"
        >
          <Button
            asChild
            variant="outline"
            className="border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" /> Go Back Home
            </Link>
          </Button>

          <Button
            asChild
            className="bg-[#E5D4B6] hover:bg-[#d4bf9c] text-black font-semibold transition-colors"
          >
            <Link href="/auth/signup" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" /> Login Now
            </Link>
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
