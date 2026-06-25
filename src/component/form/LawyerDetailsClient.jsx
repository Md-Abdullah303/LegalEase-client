"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin, Briefcase, DollarSign, Users, Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { postHiringApplication } from "@/lib/actions/applications";
import CommentSection from "../lawyers/CommentSection"; // আপনার পাথ অনুযায়ী ঠিক রাখবেন

const LawyerDetailsClient = ({
  lawyer,
  user,
  lawyerHiresHistory,
  areHeApplied,
  comments,
  userData,
  isPaid,
}) => {
  const applicationData = areHeApplied[0];
  const status = applicationData?.status;
  const alreadyApplied = areHeApplied.length > 0;
  const router = useRouter();

  const [hireFormData, setHireFormData] = useState({
    userName: "",
    reason: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setHireFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHireSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      router.push("/auth/signup");
      toast.error("Please signup first");
      return;
    }

    if (alreadyApplied) return;

    if (user?.role !== "user") {
      router.push("/auth/signin");
      toast.error("Please sign in with UserID.");
      return;
    }

    const hiringData = {
      ...hireFormData,
      lawyerId: lawyer?._id,
      lawyerName: lawyer?.name,
      lawyerSalary: lawyer?.salary,
      lawyerSpecialty: lawyer?.specialty,
      lawyerHrRate: lawyer?.hourlyRate,
      hiringApplicantId: user?.id,
      hiringApplicantName: user?.name,
      status: "Pending",
    };

    const res = await postHiringApplication(hiringData);
    if (res) {
      router.refresh();
      toast.success("Successfully Sent..");
    } else {
      toast.error("Something was wrong!");
    }
  };

  // Framer Motion Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 16 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };

  return (
    <div className="max-w-6xl mx-auto py-6 md:py-12 px-4 sm:px-6 lg:px-8 bg-transparent text-neutral-900 dark:text-neutral-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column: Lawyer Profile Info */}
        <motion.div
          className="lg:col-span-2 space-y-6 md:space-y-8"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {/* Main Profile Card */}
          <motion.div variants={fadeInUp}>
            <Card className="overflow-hidden border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-[#1d1d1d] shadow-sm rounded-2xl p-4 md:p-6 transition-all duration-300">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8">
                {/* Image Container */}
                <div className="relative w-full sm:w-[280px] h-[280px] sm:h-[320px] shrink-0 rounded-xl overflow-hidden border border-neutral-100 dark:border-neutral-800">
                  <Image
                    src={
                      lawyer?.image ||
                      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7"
                    }
                    alt={lawyer?.name || "Lawyer"}
                    fill
                    loading="lazy"
                    className="object-cover transition-transform duration-500 hover:scale-103"
                    sizes="(max-width: 640px) 100vw, 280px"
                  />
                </div>

                {/* Profile Details Text */}
                <div className="flex-1 w-full flex flex-col justify-between py-1">
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-3 w-full">
                    <div>
                      <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1d1d1d] dark:text-white font-serif tracking-wide capitalize">
                        {lawyer?.name}
                      </h1>
                      <p className="text-[#c4a482] font-semibold text-base sm:text-lg mt-1 tracking-medium">
                        {lawyer?.specialty} Lawyer
                      </p>
                    </div>
                    {lawyer?.status && (
                      <span className="shrink-0 bg-[#c4a482]/10 text-[#c4a482] border border-[#c4a482]/20 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                        Available
                      </span>
                    )}
                  </div>

                  {/* Info Meta Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 sm:mt-8 pt-4 border-t border-neutral-100 dark:border-neutral-800/50">
                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 text-sm font-medium">
                      <div className="p-2 bg-neutral-50 dark:bg-[#151515] rounded-lg text-[#c4a482]">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <span>{lawyer?.experience || "N/A"} Experience</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 text-sm font-medium">
                      <div className="p-2 bg-neutral-50 dark:bg-[#151515] rounded-lg text-[#c4a482]">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <span>{lawyer?.location || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 text-sm font-medium">
                      <div className="p-2 bg-neutral-50 dark:bg-[#151515] rounded-lg text-[#c4a482]">
                        <DollarSign className="w-4 h-4" />
                      </div>
                      <span className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                        ${lawyer?.hourlyRate || 0}
                        <span className="text-xs text-neutral-400 font-normal">
                          /hr
                        </span>
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-neutral-600 dark:text-neutral-300 text-sm font-medium">
                      <div className="p-2 bg-neutral-50 dark:bg-[#151515] rounded-lg text-[#c4a482]">
                        <Users className="w-4 h-4" />
                      </div>
                      <span>
                        {lawyer?.hire || lawyerHiresHistory.length || 0} Hires
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Bio & Details Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-[#1d1d1d] rounded-2xl p-2 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg md:text-xl text-[#1d1d1d] dark:text-[#c4a482] font-serif font-bold">
                  About {lawyer?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-neutral-600 dark:text-neutral-300 text-sm md:text-base leading-relaxed whitespace-pre-line">
                  {lawyer?.bio || "No biography provided by this lawyer."}
                </p>
                <div className="flex items-center gap-2.5 pt-3 text-sm text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/50">
                  <Mail className="w-4 h-4 text-[#c4a482] shrink-0" />
                  <span className="truncate">Contact: {lawyer?.email}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Approved Banner & Payment Action */}
          {status === "Approved" && (
            <motion.div variants={fadeInUp}>
              <Card className="p-6 md:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-[#1d1d1d] rounded-2xl shadow-sm">
                <h2 className="text-center sm:text-left text-base md:text-lg font-bold text-neutral-800 dark:text-white max-w-md font-serif">
                  🎉 Your hiring has been Approved by this lawyer! Please
                  proceed to secure the contract.
                </h2>
                <form
                  action="/api/checkout_sessions"
                  method="POST"
                  className="w-full sm:w-auto shrink-0 flex justify-center"
                >
                  <input type="hidden" name="userId" value={user?.id} />
                  <input
                    type="hidden"
                    name="price"
                    value={lawyer?.hourlyRate}
                  />
                  <input type="hidden" name="lawyerId" value={lawyer?._id} />
                  <input type="hidden" name="lawyerName" value={lawyer?.name} />

                  {isPaid?._id ? (
                    <span className="w-full sm:w-auto text-center py-2.5 px-6 bg-emerald-600 dark:bg-emerald-700 rounded-xl text-white font-semibold text-sm shadow">
                      Paid & Verified
                    </span>
                  ) : (
                    <Button
                      type="submit"
                      className="w-full sm:w-auto py-5 px-6 bg-[#c4a482] hover:bg-[#b09270] text-[#1d1d1d] font-bold rounded-xl transition-all duration-300 shadow-md active:scale-98"
                    >
                      Pay the Lawyer
                    </Button>
                  )}
                </form>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Right Column: Sticky Hire Form */}
        <motion.div
          className="lg:col-span-1 lg:sticky lg:top-8"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 15,
            delay: 0.15,
          }}
        >
          <Card className="border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-[#1d1d1d] shadow-md rounded-2xl overflow-hidden">
            <CardHeader className="bg-neutral-50/70 dark:bg-[#151515] border-b border-neutral-100 dark:border-neutral-800/60 p-5 md:p-6">
              <CardTitle className="text-lg md:text-xl text-[#1d1d1d] dark:text-[#c4a482] font-serif font-bold">
                Hire this Lawyer
              </CardTitle>
              <p className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                Fill out the case requirements to request legal consulting.
              </p>
            </CardHeader>
            <CardContent className="p-5 md:p-6">
              <form
                onSubmit={handleHireSubmit}
                className="space-y-4 md:space-y-5"
              >
                {/* User Name */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="userName"
                    className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 font-semibold"
                  >
                    Your Full Name
                  </Label>
                  <Input
                    id="userName"
                    name="userName"
                    value={hireFormData.userName}
                    onChange={handleInputChange}
                    placeholder="e.g., John Doe"
                    required
                    disabled={alreadyApplied}
                    className="h-10 md:h-11 bg-neutral-50 dark:bg-[#1a1a1a] border-neutral-200 dark:border-neutral-800 focus-visible:ring-[#c4a482] disabled:opacity-40 disabled:cursor-not-allowed text-neutral-900 dark:text-white rounded-lg"
                  />
                </div>

                {/* Reason Field */}
                <div className="space-y-1.5">
                  <Label
                    htmlFor="reason"
                    className="text-xs md:text-sm text-neutral-700 dark:text-neutral-300 font-semibold"
                  >
                    Brief Case Description
                  </Label>
                  <Textarea
                    id="reason"
                    name="reason"
                    value={hireFormData.reason}
                    onChange={handleInputChange}
                    placeholder="Describe your legal matter or reason for hiring..."
                    rows={4}
                    required
                    disabled={alreadyApplied}
                    className="bg-neutral-50 dark:bg-[#1a1a1a] border-neutral-200 dark:border-neutral-800 focus-visible:ring-[#c4a482] resize-none disabled:opacity-40 disabled:cursor-not-allowed text-neutral-900 dark:text-white rounded-lg p-3"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={alreadyApplied}
                  className={`w-full py-5 md:py-6 text-sm md:text-base font-bold rounded-xl transition-all duration-300 active:scale-98 ${
                    alreadyApplied
                      ? "bg-neutral-100 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-500 cursor-not-allowed border border-neutral-200 dark:border-neutral-700"
                      : "bg-[#1d1d1d] hover:bg-[#2c2c2c] text-white dark:bg-[#c4a482] dark:hover:bg-[#b09270] dark:text-[#1d1d1d] shadow-md hover:shadow-lg cursor-pointer"
                  }`}
                >
                  {alreadyApplied
                    ? "Application Pending"
                    : "Send Hiring Request"}
                </Button>

                <p className="text-[11px] text-center text-neutral-400 dark:text-neutral-500 mt-2 leading-normal">
                  ⚠️ Hiring requests are safe. Retainer payments are only
                  captured once the lawyer officially accepts your case.
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Embedded Comments Layout */}
      <div className="mt-12 md:mt-16">
        <CommentSection
          user={user}
          lawyer={lawyer}
          comments={comments}
          status={status}
          isPaid={isPaid}
        />
      </div>
    </div>
  );
};

export default LawyerDetailsClient;
