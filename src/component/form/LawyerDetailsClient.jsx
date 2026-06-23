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
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { postHiringApplication } from "@/lib/actions/applications";
import CommentSection from "../lawyers/CommentSection";

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
  const alreadyApplied = areHeApplied.length > 0 ? true : false;
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

  // Framer Motion Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

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
            {/* লাইট মোডে সাদা এবং ডার্ক মোডে #1d1d1d ব্যাকগ্রাউন্ড */}
            <Card className="overflow-hidden border-[#c4a482]/30 dark:border-[#c4a482]/20 bg-white dark:bg-[#1d1d1d] transition-colors px-3 py-3">
              <div className="md:flex md:items-center">
                <div className="relative w-full md:w-[280px] h-[300px] shrink-0">
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
                      <h1 className="text-3xl font-bold text-[#1d1d1d] dark:text-white transition-colors font-serif">
                        {lawyer?.name}
                      </h1>
                      {/* টেক্সট হাইলাইটের জন্য #c4a482 ব্যবহার করা হয়েছে */}
                      <p className="text-[#c4a482] font-medium text-lg mt-1">
                        {lawyer?.specialty} Lawyer
                      </p>
                    </div>
                    {lawyer?.status && (
                      <span className="bg-[#c4a482]/10 text-[#c4a482] border border-[#c4a482]/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wide uppercase">
                        Available
                      </span>
                    )}
                  </div>

                  {/* আইকন কালার হিসেবে #c4a482 দিয়ে প্রিমিয়াম ভাইব আনা হয়েছে */}
                  <div className="grid grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Briefcase className="w-5 h-5 text-[#c4a482]" />
                      <span>{lawyer?.experience || "N/A"} Exp.</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <MapPin className="w-5 h-5 text-[#c4a482]" />
                      <span>{lawyer?.location || "N/A"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <DollarSign className="w-5 h-5 text-[#c4a482]" />
                      <span>${lawyer?.hourlyRate || 0}/hr</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                      <Users className="w-5 h-5 text-[#c4a482]" />
                      <span>
                        {lawyer?.hire || lawyerHiresHistory.length || 0} Hires
                      </span>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </motion.div>

          {/* Bio & Details Card */}
          <motion.div variants={fadeInUp}>
            <Card className="border-[#c4a482]/30 dark:border-[#c4a482]/20 bg-white dark:bg-[#1d1d1d] transition-colors">
              <CardHeader>
                <CardTitle className="text-xl text-[#1d1d1d] dark:text-[#c4a482] font-serif">
                  About {lawyer?.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {lawyer?.bio || "No biography provided by this lawyer."}
                </p>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <Mail className="w-4 h-4 text-[#c4a482]" />
                  <span>Contact: {lawyer?.email}</span>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Approved Banner & Payment Action */}
          {status === "Approved" && (
            <Card className="p-8 flex items-center flex-col justify-center border-[#c4a482]/30 dark:border-[#c4a482]/20 bg-white dark:bg-[#1d1d1d]">
              <h1 className="text-center text-[14px] md:text-xl font-bold text-[#1d1d1d] dark:text-white mb-4">
                Your hiring is Approved by this lawyer
              </h1>
              <form action="/api/checkout_sessions" method="POST">
                <input type="hidden" name="userId" value={user?.id} />
                <input type="hidden" name="price" value={lawyer?.hourlyRate} />
                <input type="hidden" name="lawyerId" value={lawyer?._id} />
                <input type="hidden" name="lawyerName" value={lawyer?.name} />

                {isPaid?._id ? (
                  <p className="w-fit py-2 px-6 bg-emerald-600 rounded-lg text-white font-medium shadow text-sm">
                    Paid
                  </p>
                ) : (
                  <Button
                    type="submit"
                    className="w-fit py-2 px-6 bg-[#c4a482] hover:bg-[#b09270] text-[#1d1d1d] font-semibold rounded-lg transition-colors duration-300"
                  >
                    Pay the Lawyer
                  </Button>
                )}
              </form>
            </Card>
          )}
        </motion.div>

        {/* Right Column: Hire Form */}
        <motion.div
          className="lg:col-span-1"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="sticky top-6 border-[#c4a482]/30 dark:border-[#c4a482]/20 bg-white dark:bg-[#1d1d1d] shadow-lg transition-colors">
            <CardHeader className="bg-gray-50 dark:bg-[#151515] border-b border-[#c4a482]/20 rounded-t-xl">
              <CardTitle className="text-xl text-[#1d1d1d] dark:text-[#c4a482] font-serif">
                Hire this Lawyer
              </CardTitle>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Fill out the form below to initiate a consultation.
              </p>
            </CardHeader>
            <CardContent className="p-6">
              <form onSubmit={handleHireSubmit} className="space-y-5">
                {/* User Name Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="userName"
                    className="text-gray-700 dark:text-gray-300 font-medium"
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
                    disabled={alreadyApplied}
                    className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-zinc-800 focus-visible:ring-[#c4a482] disabled:opacity-50 disabled:cursor-not-allowed text-[#1d1d1d] dark:text-white"
                  />
                </div>

                {/* Reason Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="reason"
                    className="text-gray-700 dark:text-gray-300 font-medium"
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
                    disabled={alreadyApplied}
                    className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-zinc-800 focus-visible:ring-[#c4a482] resize-none disabled:opacity-50 disabled:cursor-not-allowed text-[#1d1d1d] dark:text-white"
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  disabled={alreadyApplied}
                  className={`w-full py-6 text-lg font-medium rounded-xl transition-all duration-300 shadow-md ${
                    alreadyApplied
                      ? "bg-gray-300 dark:bg-zinc-800 text-gray-500 dark:text-gray-400 cursor-not-allowed shadow-none"
                      : "bg-[#1d1d1d] hover:bg-[#2c2c2c] text-white dark:bg-[#c4a482] dark:hover:bg-[#b09270] dark:text-[#1d1d1d] hover:shadow-lg cursor-pointer"
                  }`}
                >
                  {alreadyApplied ? "Already Applied" : "Send Hiring Request"}
                </Button>

                <p className="text-xs text-center text-gray-400 dark:text-gray-500 mt-4">
                  {`You won't be charged until the lawyer accepts your case.`}
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Comment Section */}
      <div className="mt-10">
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
