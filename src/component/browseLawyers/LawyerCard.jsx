"use client";

import React from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Star, ShieldCheck, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

const LawyerCard = ({ lawyer, user }) => {
  const router = useRouter();

  // ১. হায়ার ইনফোর ওপর ভিত্তি করে ডাইনামিক রেটিং ক্যালকুলেশন (১.০ থেকে ৫.০ এর মধ্যে সীমাবদ্ধ)
  const calculateRating = (hires = 0) => {
    if (hires <= 0) return "4.2"; // কোনো হায়ার না থাকলে ডিফল্ট বেইজ রেটিং

    // প্রতি ১০টি হায়ারের জন্য ০.১ করে রেটিং বাড়বে
    const dynamicRating = 4.2 + hires / 10;

    // Math.min এবং Math.max ব্যবহার করে রেটিং ১.০ এবং ৫.০ এর মধ্যে লক করা হয়েছে
    const finalRating = Math.min(5.0, Math.max(1.0, dynamicRating));

    return finalRating.toFixed(1); // ১ দশমিক স্থান পর্যন্ত দেখাবে (যেমন: ৪.৫, ৫.০)
  };

  const currentRating = calculateRating(lawyer?.hire);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 120, damping: 18 },
    },
  };

  const handleDetails = () => {
    if (user) {
      router.push(`/lawyers/${lawyer._id}`);
    } else {
      router.push(`/auth/signin?callback=/lawyers/${lawyer._id}`);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -6 }}
      className="h-full"
    >
      <Card
        onClick={handleDetails}
        className="group relative h-full flex flex-col justify-between overflow-hidden cursor-pointer rounded-xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-[#151515] hover:border-[#c4a482]/50 dark:hover:border-[#c4a482]/40 hover:shadow-[0_12px_30px_rgba(196,164,130,0.08)] transition-all duration-300"
      >
        {/* টপ ইমেজ সেকশন */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
          <Image
            src={
              lawyer?.image ||
              "https://images.unsplash.com/photo-1707396172424-f3293f788364"
            }
            alt={lawyer?.name || "Lawyer"}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* ভেরিফাইড আইকন এবং ডাইনামিক রেটিং ব্যাজ */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
            <div className="p-1.5 bg-white/95 dark:bg-[#1d1d1d]/95 backdrop-blur-md rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-800 text-[#c4a482]">
              <ShieldCheck className="w-4 h-4" />
            </div>

            {/* ২. এখানে স্ট্যাটিক ৪.৯ এর জায়গায় ক্যালকুলেট করা `currentRating` বসানো হয়েছে */}
            <div className="flex items-center gap-1 px-2 py-1 bg-white/95 dark:bg-[#1d1d1d]/95 backdrop-blur-md rounded-lg shadow-sm border border-neutral-100 dark:border-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200">
              <Star className="w-3.5 h-3.5 fill-[#c4a482] text-[#c4a482]" />
              <span>{currentRating}</span>
            </div>
          </div>
        </div>

        {/* কন্টেন্ট সেকশন */}
        <div className="p-5 flex-1 flex flex-col justify-between gap-5">
          <div className="space-y-1.5">
            <span className="text-[11px] font-medium tracking-wider uppercase text-[#c4a482] block">
              {lawyer?.specialty || "General Practice"}
            </span>

            <h3 className="text-lg font-bold text-[#1d1d1d] dark:text-neutral-100 font-serif tracking-wide capitalize group-hover:text-[#c4a482] dark:group-hover:text-[#c4a482] transition-colors duration-200 line-clamp-1">
              {lawyer?.name?.toLowerCase() || "Unknown"}
            </h3>
          </div>

          {/* ফুটার সেকশন */}
          <div className="pt-4 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between">
            <div>
              <p className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium uppercase tracking-wider">
                Hourly Rate
              </p>
              <div className="flex items-baseline gap-0.5 mt-0.5">
                <span className="text-xl font-bold text-[#1d1d1d] dark:text-white">
                  ${lawyer?.hourlyRate || "0"}
                </span>
                <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
                  /hr
                </span>
              </div>
            </div>

            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium bg-neutral-100 dark:bg-neutral-900 px-2 py-0.5 rounded-full">
                {lawyer?.hire || 0} hires
              </span>

              <div className="flex items-center gap-0.5 text-xs font-semibold text-[#1d1d1d] dark:text-[#c4a482] opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                <span>Details</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default LawyerCard;
