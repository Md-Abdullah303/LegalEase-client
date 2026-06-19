"use client";

import { useState } from "react";
import { LuMenu, LuX } from "react-icons/lu";

export default function MobileSidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="lg:hidden relative">
      {/* 
        বাটনটিকে absolute করা হয়েছে যাতে এটি নিজের জায়গা ব্লক না করে কন্টেন্টের ওপর ভাসে।
        top-[12px] left-[16px] দিয়ে এটিকে সার্চবারের নিচে সুন্দর একটি অ্যালাইনমেন্ট দেওয়া হয়েছে।
      */}
      <button
        onClick={() => setIsOpen(true)}
        className="absolute top-[12px] left-[16px] z-30 p-2 rounded-md border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0a09] text-neutral-700 dark:text-neutral-300 shadow-sm hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors"
      >
        <LuMenu className="h-[20px] w-[20px]" />
      </button>

      {/* ব্যাকড্রপ ওভারলে */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm transition-opacity"
        />
      )}

      {/* মোবাইল ড্রয়ার কন্টেইনার */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-[#0c0a09] shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* ড্রয়ার বন্ধ করার বাটন */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-md text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-900"
        >
          <LuX className="h-5 w-5" />
        </button>

        {/* সাইডবারের ভেতরের কন্টেন্ট */}
        <div className="h-full pt-12 overflow-y-auto">{children}</div>
      </div>
    </div>
  );
}
