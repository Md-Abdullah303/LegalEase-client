"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link"; // এখানে ভুল ছিল, ফিক্সড করা হয়েছে
import React from "react";
import { motion } from "motion/react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden bg-black">
      {/* Background Image */}
      <div
        className="
          absolute inset-0
          bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f')]
          bg-cover bg-center bg-no-repeat
        "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" />

      {/* Blur/Fade Edges */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.9)]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] items-center justify-center px-4">
        <div className="max-w-3xl text-center text-white">
          {/* হেডিং: ক্লাসিক Serif ফন্ট এবং গোল্ডেন শেড */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-4xl md:text-6xl font-serif tracking-wide leading-tight text-neutral-100"
          >
            Find & Hire <span className="text-[#c4a482]">Expert</span> Legal
            Counsel
          </motion.h1>

          {/* প্যারাগ্রাফ: ক্লিন এবং হাই-লেজিবিলিটি Sans ফন্ট */}
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="mt-6 text-base md:text-xl font-sans tracking-wide text-neutral-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Connect with top-rated attorneys across all specialties. Secure the
            legal representation you deserve with LegalEase.
          </motion.p>

          {/* বাটন: থিম ম্যাচিং গোল্ডেন কালার */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            <Link href="/lawyers">
              <Button
                size="lg"
                className="mt-10 rounded-none bg-[#c4a482] text-black font-sans font-semibold tracking-wider uppercase text-xs px-8 py-6 hover:bg-[#b39371] transition-colors duration-300 shadow-lg"
              >
                Browse Lawyers
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
