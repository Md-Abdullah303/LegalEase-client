"use client";

import React from "react";
import Link from "next/link";
import { motion } from "motion/react"; // Framer Motion ইম্পোর্ট করা হয়েছে
import { Card, CardContent } from "@/components/ui/card";
import {
  Gavel,
  Briefcase,
  Users,
  ShieldAlert,
  Home,
  FileText,
} from "lucide-react";

// ১. প্যারেন্ট কন্টেইনারের জন্য স্ট্যাগার অ্যানিমেশন লজিক
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12, // প্রতিটি কার্ড একটার পর একটা স্মুথলি আসবে
    },
  },
};

// ২. প্রতিটি সিঙ্গেল কার্ডের জন্য অ্যানিমেশন লজিক (নিচ থেকে ওপরে ওঠার ইফেক্ট)
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25, // মোবাইলের কথা চিন্তা করে অতিরিক্ত y অফসেট কমানো হয়েছে
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const LegalCategories = () => {
  const categories = [
    {
      id: 1,
      title: "Criminal Law",
      slug: "Criminal Law",
      description:
        "Defense strategy, criminal charges, and courtroom representation.",
      icon: Gavel,
    },
    {
      id: 2,
      title: "Corporate Law",
      slug: "Corporate Law",
      description:
        "Business formations, mergers, acquisitions, and compliance.",
      icon: Briefcase,
    },
    {
      id: 3,
      title: "Family Law",
      slug: "Family Law",
      description:
        "Divorce, child custody, guardianship, and family settlements.",
      icon: Users,
    },
    {
      id: 4,
      title: "Cyber Security",
      slug: "Cyber Security",
      description: "Data privacy laws, cyber crimes, and digital compliance.",
      icon: ShieldAlert,
    },
    {
      id: 5,
      title: "Property Law",
      slug: "Property Law",
      description: "Real estate disputes, title deeds, and asset management.",
      icon: Home,
    },
    {
      id: 6,
      title: "Civil Litigation",
      slug: "Civil Litigation",
      description:
        "Private disputes, contract breaches, and negligence claims.",
      icon: FileText,
    },
  ];

  return (
    <section className="py-12 md:py-20 px-4 md:px-8 lg:px-16 bg-background text-foreground transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* সেকশন হেডার */}
        <div className="flex flex-col mb-12">
          <span className="text-[#c4a482] font-medium tracking-wider uppercase text-sm mb-2">
            Areas of Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-foreground font-semibold">
            Legal Categories
          </h2>
          <div className="h-[2px] w-16 bg-[#c4a482] mt-4" />
        </div>

        {/* ৩. গ্রিড কন্টেইনারকে motion.div করা হয়েছে */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.05, // পিসি এবং মোবাইলে পারফেক্ট টাইমিংয়ে শো করার জন্য
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {categories.map((category) => {
            const IconComponent = category.icon;

            return (
              /* ৪. প্রতিটি কার্ডকে motion.div দিয়ে র‍্যাপ করা হয়েছে এবং হোভার অ্যানিমেশন দেওয়া হয়েছে */
              <motion.div
                key={category.id}
                variants={itemVariants}
                whileHover={{
                  y: -5, // হোভার করলে কার্ডটি সামান্য ওপরে উঠবে
                }}
                className="group h-full"
              >
                <Card className="h-full rounded-none border border-border bg-card transition-all duration-300 group-hover:border-[#c4a482] group-hover:shadow-[0_10px_25px_rgba(196,164,130,0.12)]">
                  <CardContent className="p-8 flex flex-col items-start gap-4">
                    {/* আইকন কন্টেইনার */}
                    <div className="p-3 bg-neutral-100 dark:bg-zinc-900 group-hover:bg-[#c4a482] group-hover:text-black text-[#c4a482] transition-colors duration-300">
                      <IconComponent className="w-6 h-6" />
                    </div>

                    {/* টেক্সট কন্টেন্ট */}
                    <div className="space-y-2">
                      <h3 className="font-serif text-xl font-medium tracking-wide text-foreground group-hover:text-[#c4a482] transition-colors duration-200">
                        {category.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-sans leading-relaxed line-clamp-2">
                        {category.description}
                      </p>
                    </div>

                    {/* এক্সট্রা ইন্ডিকেটর */}
                    <span className="text-xs font-medium text-[#c4a482] uppercase tracking-wider pt-2 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                      Explore Lawyers &rarr;
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default LegalCategories;
