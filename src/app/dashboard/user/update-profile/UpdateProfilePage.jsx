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
import { updatedUserData } from "@/lib/actions/users";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function UpdateProfilePage({ user }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    phone: user?.phone || "",
    address: user?.address || "",
    linkedin: user?.linkedinUrl || "",
    bio: user?.bio || "",
    imageFile: null,
  });

  const [previewImg, setPreviewImg] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ভ্যালিডেশন: কোনো ফিল্ড খালি আছে কি না চেক করা হচ্ছে
    // এখানে imageFile বাদে সবগুলোকে চেক করা হচ্ছে (ইমেজ অপশনাল হলে)
    const { fullName, phone, address, linkedin, bio } = formData;

    if (!fullName || !phone || !address || !linkedin || !bio) {
      toast.error("Please fill in all the fields before saving!");
      return; // এখানেই প্রসেস আটকে যাবে
    }

    setIsUploading(true);
    let uploadedImageUrl = "";

    try {
      if (formData.imageFile) {
        const imgFormData = new FormData();
        imgFormData.append("image", formData.imageFile);

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

      const finalDataToSubmit = {
        name: formData.fullName,
        phone: formData.phone,
        address: formData.address,
        linkedinUrl: formData.linkedin,
        bio: formData.bio,
        image: uploadedImageUrl,
      };

      const result = await updatedUserData(user?.id, finalDataToSubmit);
      if (result) {
        toast.success("Profile Updated.");
        router.push("/dashboard/user");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Failed to update profile.");
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
            Ensure all fields are filled to save changes.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* বাকি সব কোড একই থাকবে */}
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
                    loading="lazy"
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
            {/* Input fields */}
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full p-4 h-14 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-4 h-14 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Address <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="w-full p-4 h-14 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                LinkedIn <span className="text-red-500">*</span>
              </label>
              <input
                type="url"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
                className="w-full p-4 h-14 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">
                Bio <span className="text-red-500">*</span>
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                rows="4"
                className="w-full p-4 rounded-lg bg-[#fdfdfc] dark:bg-[#1a1a1a] border border-[#e5ded5] dark:border-[#333] text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={isUploading}
              className="w-full py-4 bg-[#222] text-[#d9bfa2] rounded-lg font-bold"
            >
              {isUploading ? "Uploading..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
