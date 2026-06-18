"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react"; // ADDED

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background Image */}
      <div
        className="
          absolute inset-0
          bg-[url('https://images.unsplash.com/photo-1589829545856-d10d557cf95f')]
          bg-cover bg-center bg-no-repeat
        "
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Blur/Fade Edges */}
      <div className="absolute inset-0 shadow-[inset_0_0_120px_40px_rgba(0,0,0,0.8)]" />

      {/* Content */}
      <div className="relative z-10 flex min-h-[90vh] items-center justify-center px-4">
        <div className="max-w-3xl text-center text-white">
          {/* ADDED: Animated Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
            }}
            className="text-4xl font-bold leading-tight md:text-6xl"
          >
            Find & Hire Expert Legal Counsel
          </motion.h1>

          {/* ADDED: Animated Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: "easeOut",
            }}
            className="mt-6 text-lg text-gray-200 md:text-xl"
          >
            Connect with top-rated attorneys across all specialties. Secure the
            legal representation you deserve with LegalEase.
          </motion.p>

          {/* ADDED: Animated Button */}
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.4,
              ease: "easeOut",
            }}
          >
            <Link href="/lawyers">
              <Button size="lg" className="mt-8">
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
