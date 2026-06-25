"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import toast from "react-hot-toast";
import { editAdminData } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import { UploadCloud, Loader2, Image as ImageIcon } from "lucide-react"; // আইকনের জন্য lucide-react ব্যবহার করা হয়েছে
import Image from "next/image";

export default function AdminProfilePage({ adminData }) {
  const router = useRouter();
  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);

  // স্টেট থেকে email বাদ দিয়ে image যুক্ত করা হয়েছে
  const [form, setForm] = useState({
    name: adminData?.name || "",
    image: adminData?.image || "",
    phone: adminData?.phone || "+8801XXXXXXXXX",
    role: adminData?.role || "Admin",
    bio: adminData?.bio || "N/A",
    location: adminData?.location || "N/A",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ImgBB-তে ইমেজ আপলোড করার ফাংশন
  const uploadToImgBB = async (file) => {
    if (!file) return;

    // শুধু ইমেজ ফাইল অ্যালাউ করার জন্য ভ্যালিডেশন
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file!");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
      if (!apiKey) {
        throw new Error("ImgBB API Key is missing in env variables!");
      }

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await response.json();

      if (data.success) {
        const uploadedImageUrl = data.data.url;
        setForm((prev) => ({ ...prev, image: uploadedImageUrl }));
        toast.success("Image uploaded successfully!");
      } else {
        toast.error("Failed to upload image to ImgBB");
      }
    } catch (error) {
      console.error("ImgBB Upload Error:", error);
      toast.error("Something went wrong during upload!");
    } finally {
      setUploading(false);
    }
  };

  // Drag & Drop হ্যান্ডলারস
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      uploadToImgBB(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadToImgBB(file);
    }
  };

  const handleSave = async () => {
    const res = await editAdminData(adminData?._id, form);
    if (res) {
      toast.success(`Profile Updated`);
      router.refresh();
    } else {
      toast.error("Something went wrong!");
    }
  };

  return (
    // থিম অনুযায়ী ব্যাকগ্রাউন্ড কালার সেট করা হয়েছে (Light: White, Dark: Black)
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 p-6 transition-colors duration-200">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your personal and system information
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT PROFILE CARD */}
        <motion.div whileHover={{ scale: 1.02 }}>
          {/* Light: border-[#E5D4B6], Dark: bg-[#1d1d1d] */}
          <Card className="bg-white dark:bg-[#1d1d1d] border border-[#E5D4B6] dark:border-zinc-800 shadow-sm">
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center space-y-3">
              {/* ডাটাবেজে ইমেজ থাকলে সেটা দেখাবে, না থাকলে ডিফল্ট প্লেসহোল্ডার */}
              {form.image ? (
                <Image
                  loading="lazy"
                  width={600}
                  height={400}
                  src={form.image}
                  alt="Admin Avatar"
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#E5D4B6]"
                />
              ) : (
                <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-zinc-700 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-gray-400" />
                </div>
              )}

              <h2 className="text-xl font-bold">{form.name || "N/A"}</h2>

              <Badge className="bg-[#E5D4B6] text-black hover:bg-[#d6c4a5] dark:bg-zinc-800 dark:text-white">
                {form.role}
              </Badge>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                {form.location}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT FORM */}
        <div className="md:col-span-2">
          <Card className="bg-white dark:bg-[#1d1d1d] border border-[#E5D4B6] dark:border-zinc-800 shadow-sm">
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* DRAG & DROP IMAGE UPLOAD AREA */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Profile Image</label>
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-all
                    ${
                      isDragging
                        ? "border-black dark:border-white bg-gray-50 dark:bg-zinc-800"
                        : "border-[#E5D4B6] dark:border-zinc-700 bg-white dark:bg-[#1d1d1d] hover:bg-gray-50 dark:hover:bg-zinc-800"
                    }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="image/*"
                  />

                  {uploading ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
                      <p className="text-sm text-gray-500">
                        Uploading to ImgBB...
                      </p>
                    </div>
                  ) : form.image ? (
                    <div className="flex flex-col items-center space-y-2">
                      <Image
                        loading="lazy"
                        width={600}
                        height={400}
                        src={form.image}
                        alt="Preview"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Image Linked! Click or drag to change
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <UploadCloud className="w-8 h-8 text-gray-400" />
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                        Drag & drop an image here, or{" "}
                        <span className="text-blue-500 underline">browse</span>
                      </p>
                      <p className="text-xs text-gray-400">
                        Supports JPG, PNG, WEBP
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* INPUT FIELDS (Email field has been removed) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Full Name</label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="bg-white dark:bg-zinc-950 border-[#E5D4B6] dark:border-zinc-800"
                  />
                </div>

                <div>
                  <label className="text-sm">Phone</label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="bg-white dark:bg-zinc-950 border-[#E5D4B6] dark:border-zinc-800"
                  />
                </div>

                <div>
                  <label className="text-sm">Location</label>
                  <Input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="bg-white dark:bg-zinc-950 border-[#E5D4B6] dark:border-zinc-800"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm">Bio</label>
                <Textarea
                  name="bio"
                  value={form.bio}
                  onChange={handleChange}
                  className="bg-white dark:bg-zinc-950 border-[#E5D4B6] dark:border-zinc-800"
                />
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleSave}
                  disabled={uploading}
                  className="bg-[#E5D4B6] text-black hover:bg-[#d6c4a5] dark:bg-white dark:text-black dark:hover:bg-gray-200"
                >
                  Save Changes
                </Button>

                <Button
                  variant="outline"
                  className="border-[#E5D4B6] dark:border-zinc-700"
                >
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* EXTRA SETTINGS CARD */}
          <motion.div className="mt-6" whileHover={{ scale: 1.01 }}>
            <Card className="bg-white dark:bg-[#1d1d1d] border border-[#E5D4B6] dark:border-zinc-800 shadow-sm">
              <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-3">
                <Button
                  variant="outline"
                  className="border-[#E5D4B6] dark:border-zinc-700"
                >
                  Manage Users
                </Button>
                <Button
                  variant="outline"
                  className="border-[#E5D4B6] dark:border-zinc-700"
                >
                  View Transactions
                </Button>
                <Button
                  variant="outline"
                  className="border-[#E5D4B6] dark:border-zinc-700"
                >
                  Analytics
                </Button>
                <Button
                  variant="outline"
                  className="border-[#E5D4B6] dark:border-zinc-700"
                >
                  System Logs
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
