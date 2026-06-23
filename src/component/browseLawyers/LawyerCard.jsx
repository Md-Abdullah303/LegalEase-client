"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LawyerCard = ({ lawyer, user }) => {
  const router = useRouter();

  // কার্ড লোড হওয়ার এনিমেশন ভ্যারিয়েন্ট
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  const handleDetails = async () => {
    if (user) {
      router.push(`/lawyers/${lawyer._id}`);
    } else {
      router.push(`/auth/signin?callback=/lawyers/${lawyer._id}`);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }} // হোভার করলে কার্ড একটু উপরে উঠবে
      className="h-full px-3"
    >
      {/* 
        কার্ডের ব্যাকগ্রাউন্ড লাইট মোডে সাদা এবং ডার্ক মোডে #1d1d1d।
        বর্ডার কালার হিসেবে #c4a482 এর হালকা ভার্সন ব্যবহার করা হয়েছে।
      */}
      <Card className="h-full overflow-hidden border border-[#c4a482]/30 dark:border-[#c4a482]/20 rounded-xl shadow-sm bg-white dark:bg-[#1d1d1d] hover:shadow-xl dark:hover:shadow-[#c4a482]/10 transition-all duration-300 group">
        {/* Image Section */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <Image
            src={
              lawyer?.image ||
              "https://images.unsplash.com/photo-1707396172424-f3293f788364"
            }
            alt={lawyer?.name || "Lawyer"}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          {/* ছবির উপরে একটা হালকা গ্রাডিয়েন্ট দিলে ডার্ক মোডের সাথে ভালো ব্লেন্ড হয় */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Content Section */}
        <CardContent className="pt-6 pb-5">
          <div className="flex justify-between items-start gap-2">
            {/* Name & Specialty */}
            <div className="flex-1">
              {/* লাইট মোডে ডার্ক টেক্সট এবং ডার্ক মোডে গোল্ডেন (#c4a482) টেক্সট */}
              <h3 className="text-[1.35rem] font-semibold text-[#1d1d1d] dark:text-[#c4a482] font-serif leading-tight capitalize transition-colors line-clamp-1">
                {lawyer?.name?.toLowerCase() || "Unknown"}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1.5 transition-colors">
                {lawyer?.specialty || "General Practice"}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-sm text-[#1d1d1d] dark:text-gray-200 font-medium mt-1 shrink-0 transition-colors">
              <Star className="w-4 h-4 fill-[#c4a482] text-[#c4a482]" />
              <span>4.9</span>
            </div>
          </div>

          {/* Rate & Hires */}
          <div className="flex justify-between items-end mt-8">
            <div className="text-[#1d1d1d] dark:text-white transition-colors">
              <span className="text-2xl font-bold">
                ${lawyer?.hourlyRate || "0"}
              </span>
              <span className="text-sm text-gray-500 dark:text-gray-400 font-medium ml-1">
                /hr
              </span>
            </div>

            <div className="text-sm text-gray-500 dark:text-[#c4a482]/80 font-medium mb-1 transition-colors">
              {lawyer?.hire || 0} hires
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-5">
            {/* 
              লাইট মোডে বাটনটি হবে ডার্ক (#1d1d1d) এবং ডার্ক মোডে এটি হবে গোল্ডেন (#c4a482)।
              এটি ডিজাইনে একটি প্রিমিয়াম কন্ট্রাস্ট তৈরি করবে।
            */}
            <Button
              onClick={handleDetails}
              className="w-full cursor-pointer bg-[#1d1d1d] hover:bg-[#333333] text-white dark:bg-[#c4a482] dark:hover:bg-[#b09270] dark:text-[#1d1d1d] font-medium transition-colors duration-300"
            >
              See Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LawyerCard;
