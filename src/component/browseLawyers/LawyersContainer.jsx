"use client";

import React from "react";
import LawyerCard from "./LawyerCard";
import { motion } from "framer-motion";

const LawyersContainer = ({ lawyers }) => {
  // কন্টেইনার এনিমেশন ভ্যারিয়েন্ট (Staggered Effect)
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15, // একটার পর একটা কার্ড আসবে 0.15s গ্যাপে
      },
    },
  };

  return (
    <div className="mt-10 py-4">
      {/* Grid with Motion */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
      >
        {lawyers?.map((lawyer) => (
          <LawyerCard lawyer={lawyer} key={lawyer?._id} />
        ))}
      </motion.div>
    </div>
  );
};

export default LawyersContainer;
