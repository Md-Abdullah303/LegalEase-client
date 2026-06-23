"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

const LawyerCard = ({ lawyer, user }) => {
  const router = useRouter();
  // কার্ড লোড হওয়ার এনিমেশন ভ্যারিয়েন্ট
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
    } else if (!user) {
      router.push(`/auth/signin?callback=/lawyers/${lawyer._id}`);
    }
  };

  return (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -8 }} // হোভার করলে কার্ড একটু উপরে উঠবে
      className="h-full px-3"
    >
      <Card className="h-full overflow-hidden border border-[#e8dcc4]/60 dark:border-slate-800 rounded-xl shadow-sm bg-[#fdfbf7] dark:bg-slate-950 hover:shadow-xl dark:hover:shadow-indigo-900/20 transition-shadow duration-300 group">
        {/* Image Section - একদম ফুল উইডথ ও হাইট নেবে */}
        <div className="relative h-[280px] w-full overflow-hidden">
          <Image
            src={
              lawyer?.image ||
              "https://images.unsplash.com/photo-1707396172424-f3293f788364"
            }
            alt={lawyer?.name || "Lawyer"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110" // হোভার করলে ছবি জুম হবে
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Content Section */}
        <CardContent className="pt-6 pb-2">
          <div className="flex justify-between items-start gap-2">
            {/* Name & Specialty */}
            <div className="flex-1">
              <h3 className="text-[1.35rem] font-medium text-[#b58e3f] dark:text-[#d4af37] font-serif leading-tight capitalize transition-colors">
                {lawyer?.name?.toLowerCase() || "Unknown"}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 transition-colors">
                {lawyer?.specialty || "General Practice"}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300 font-medium mt-1 shrink-0 transition-colors">
              <Star className="w-4 h-4 fill-[#d4af37] text-[#d4af37]" />
              <span>4.9</span>
            </div>
          </div>

          {/* Rate & Hires */}
          <div className="flex justify-between items-end mt-8">
            <div className="text-slate-800 dark:text-slate-100 transition-colors">
              <span className="text-2xl font-bold">
                ${lawyer?.hourlyRate || "0"}
              </span>
              <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                /hr
              </span>
            </div>

            <div className="text-sm text-slate-400 dark:text-slate-500 font-medium mb-1 transition-colors">
              {lawyer?.hire || 0} hires
            </div>
          </div>
          <div className="mt-4">
            <Button onClick={handleDetails} className={"cursor-pointer"}>
              See Details
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default LawyerCard;
