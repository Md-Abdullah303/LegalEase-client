"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  MapPin,
  Briefcase,
  DollarSign,
  Users,
  Clock,
  Mail,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Textarea component না থাকলে সাধারণ <textarea> ব্যবহার করতে পারেন

const LawyerDetailsClient = ({ lawyer }) => {
  // ফর্ম ডেটা একটি অবজেক্টে রাখা হয়েছে, যাতে ভবিষ্যতে সহজে নতুন ফিল্ড যুক্ত করা যায়
  const [hireFormData, setHireFormData] = useState({
    userName: "",
    reason: "",
    // future fields can be added here easily:
    // phone: "",
    // date: ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHireFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHireSubmit = (e) => {
    e.preventDefault();
    console.log("Hiring Request Data:", hireFormData);
    console.log("Hiring Lawyer ID:", lawyer?._id);
    // TODO: Send data to API
  };

  // Framer Motion Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  if (!lawyer) {
    return (
      <div className="text-center py-20 text-slate-500">Lawyer not found!</div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Lawyer Info */}
        <motion.div
          className="lg:col-span-2 space-y-6"
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {/* Main Profile Card */}
          <motion.div variants={fadeInUp}>
            <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors px-3">
              <div className="md:flex">
                <div className="relative  w-full md:w-[280px] h-[300px] shrink-0">
                  <Image
                    src={
                      lawyer?.image ||
                      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
                    }
                    alt={lawyer?.name || "Lawyer"}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <CardContent className="p-8 flex flex-col justify-center w-full">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 transition-colors">
                        {lawyer?.name}
                      </h1>
                      <p className="text-indigo-600 dark:text-indigo-400 font-medium text-lg mt-1">
                        {lawyer?.specialty} Lawyer
                      </p>
                    </div>
                    {lawyer?.status && (
                      <span className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                        Available
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Briefcase className="w-5 h-5 text-slate-400" />
                      <span>{lawyer?.experience || "N/A"} Exp.</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <MapPin className="w-5 h-5 text-slate-400" />
                      <span>{lawyer?.location || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <DollarSign className="w-5 h-5 text-slate-400" />
                      <span>${lawyer?.hourlyRate || 0}/hr</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                      <Users className="w-5 h-5 text-slate-400" />
                      {/* ভবিষ্যতে কতোজন হায়ার করেছে তার ডেটা না পেলে ডিফল্ট 0 দেখাবে */}
                      <span>{lawyer?.hiresCount || 0} Hires</span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Bio & Details Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors">
              <CardHeader>
                <CardTitle className="text-xl text-slate-800 dark:text-slate-200">
                  About {lawyer?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {lawyer?.bio || "No biography provided by this lawyer."}
                </p>
                <div className="flex items-center gap-2 mt-4 text-sm text-slate-500 dark:text-slate-500">
                  <Mail className="w-4 h-4" />
                  <span>Contact: {lawyer?.email}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Right Column: Hire Form */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="sticky top-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-lg transition-colors">
            <CardHeader className="bg-slate-50 dark:bg-slate-900/50 border-b border-slate-100 dark:border-slate-800 rounded-t-xl">
              <CardTitle className="text-xl text-slate-800 dark:text-slate-100">
                Hire this Lawyer
              </CardTitle>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Fill out the form below to initiate a consultation.
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleHireSubmit} className="space-y-5">
                {/* User Name Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="userName"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Your Name
                  </Label>
                  <Input
                    id="userName"
                    name="userName"
                    value={hireFormData.userName}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    required
                    className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
                  />
                </div>

                {/* Reason Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="reason"
                    className="text-slate-700 dark:text-slate-300"
                  >
                    Why do you want to hire?
                  </Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={hireFormData.reason}
                    onChange={handleInputChange}
                    placeholder="Briefly describe your case or reason..."
                    rows={4}
                    required
                    className="bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-6 text-lg font-medium rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  Send Hiring Request
                </Button>

                <p className="text-xs text-center text-slate-400 mt-4">
                  {`You won't be charged until the lawyer accepts your case.`}
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default LawyerDetailsClient;
