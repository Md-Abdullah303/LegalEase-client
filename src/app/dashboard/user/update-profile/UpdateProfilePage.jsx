"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";

// React Icons
import {
  FiUploadCloud,
  FiUser,
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiFileText,
  FiSave,
} from "react-icons/fi";
import { CgSpinner } from "react-icons/cg";
import Image from "next/image";

export default function UpdateProfilePage() {
  // ১. সাধারণ State ম্যানেজমেন্ট
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    linkedin: "",
    bio: "",
    imageFile: null, // ছবি এখানে সেভ হবে
  });

  const [previewImg, setPreviewImg] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  // ইনপুটের ডেটা স্টেটে সেভ করার ফাংশন
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ড্র্যাগ এবং ড্রপ হ্যান্ডলার
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setFormData({ ...formData, imageFile: file });
    setPreviewImg(URL.createObjectURL(file));
  };

  const onUploadClick = () => {
    fileInputRef.current?.click();
  };

  // ২. ফর্ম সাবমিট এবং ImgBB-তে আপলোড করার লজিক
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    let uploadedImageUrl = "";

    try {
      // যদি ইউজার ছবি সিলেক্ট করে থাকে, তবে আগে সেটি ImgBB তে আপলোড হবে
      if (formData.imageFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", formData.imageFile);

        // .env.local থেকে সিক্রেট কী আনা হচ্ছে
        const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

        const response = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbKey}`,
          {
            method: "POST",
            body: imgFormData,
          },
        );

        const data = await response.json();

        if (data.success) {
          uploadedImageUrl = data.data.display_url;
        } else {
          throw new Error("Image upload failed!");
        }
      }

      // ডাটাবেসে পাঠানোর জন্য ফাইনাল অবজেক্ট
      const finalDataToSubmit = {
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        linkedinUrl: formData.linkedin,
        bio: formData.bio,
        image: uploadedImageUrl, // ImgBB থেকে পাওয়া URL
      };

      console.log("🔥 Final Data Saved:", finalDataToSubmit);
      // TODO: এখানে আপনার ব্যাকএন্ডে API Call (fetch বা axios) করবেন
    } catch (error) {
      console.error("Error during submission:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 md:p-8 bg-[#f8f5f2] dark:bg-[#0a0a0a] transition-colors duration-500 font-sans"
    >
      <div className="w-full max-w-3xl p-8 md:p-10 rounded-2xl shadow-2xl bg-white dark:bg-[#121212] border border-[#e5ded5] dark:border-[#222222]">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-serif mb-2 text-gray-900 dark:text-[#d9bfa2] tracking-wide uppercase">
            Update Profile
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Ensure your client information is up to date.
          </p>
        </div>

        {/* ৩. সাধারণ HTML ফর্ম */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Drag & Drop Image Upload Section */}
          <div className="flex flex-col items-center mb-8">
            <label className="block text-sm font-semibold text-gray-700 dark:text-[#d9bfa2] mb-3 w-full text-left uppercase tracking-wider">
              Profile Picture
            </label>
            <div
              className={`w-full relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-300 ${
                dragActive
                  ? "border-[#c4a482] dark:border-[#d9bfa2] bg-[#f9f4ef] dark:bg-[#1a1815]"
                  : "border-gray-300 dark:border-[#333333] hover:border-[#c4a482] dark:hover:border-[#d9bfa2]"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onUploadClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              {previewImg ? (
                <div className="flex flex-col items-center">
                  <Image
                    width={600}
                    height={400}
                    src={previewImg}
                    alt="Preview"
                    className="w-32 h-32 object-cover rounded-full shadow-lg border-4 border-white dark:border-[#1a1a1a]"
                  />
                  <span className="mt-4 text-sm text-[#c4a482] dark:text-[#d9bfa2] font-medium underline">
                    Click or drag to change image
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-4">
                  <FiUploadCloud className="w-12 h-12 mb-3 text-gray-400 dark:text-[#555]" />
                  <p className="text-gray-600 dark:text-gray-400">
                    <span className="font-bold text-[#c4a482] dark:text-[#d9bfa2]">
                      Click to upload
                    </span>{" "}
                    or drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                    SVG, PNG, JPG or GIF
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Full Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Carter"
                  required
                  className="w-full pl-12 p-4 h-14 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white focus:border-[#c4a482] dark:focus:border-[#d9bfa2] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Phone Number
              </label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full pl-12 p-4 h-14 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white focus:border-[#c4a482] dark:focus:border-[#d9bfa2] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Address (City / Area)
              </label>
              <div className="relative">
                <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="New York, NY"
                  className="w-full pl-12 p-4 h-14 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white focus:border-[#c4a482] dark:focus:border-[#d9bfa2] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>
            </div>

            {/* LinkedIn Profile */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                LinkedIn Profile
              </label>
              <div className="relative">
                <FiLinkedin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-lg" />
                <input
                  type="url"
                  name="linkedin"
                  value={formData.linkedin}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/username"
                  className="w-full pl-12 p-4 h-14 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white focus:border-[#c4a482] dark:focus:border-[#d9bfa2] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600"
                />
              </div>
            </div>

            {/* Bio */}
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Bio / About Me
              </label>
              <div className="relative">
                <FiFileText className="absolute left-4 top-5 text-gray-400 dark:text-gray-500 text-lg" />
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us a bit about yourself or your business..."
                  className="w-full pl-12 p-4 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white focus:border-[#c4a482] dark:focus:border-[#d9bfa2] outline-none transition-all placeholder-gray-400 dark:placeholder-gray-600 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isUploading}
              className={`w-full flex items-center justify-center py-4 bg-[#222] hover:bg-black text-[#d9bfa2] dark:bg-[#d9bfa2] dark:hover:bg-[#cbb092] dark:text-[#0a0a0a] font-bold text-lg uppercase tracking-widest rounded-lg transition-all shadow-md ${
                isUploading ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              {isUploading ? (
                <>
                  <CgSpinner className="animate-spin text-2xl mr-3" />
                  Uploading & Saving...
                </>
              ) : (
                <>
                  <FiSave className="text-xl mr-3" />
                  Save Changes
                </>
              )}
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
