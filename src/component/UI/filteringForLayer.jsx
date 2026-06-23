"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, DollarSign, Award } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LawyerFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // URL থেকে বর্তমান স্টেটগুলো ইনিশিয়াল করা হচ্ছে
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("search") || "",
  );
  const [salarySort, setSalarySort] = useState(
    searchParams.get("salary") || "default",
  );
  const [popularSort, setPopularSort] = useState(
    searchParams.get("popularity") || "default",
  );

  // বাইরে থেকে বা অন্য কোনো উপায়ে URL পরিবর্তন হলে স্টেট সিঙ্ক করার জন্য
  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSalarySort(searchParams.get("salary") || "default");
    setPopularSort(searchParams.get("popularity") || "default");
  }, [searchParams]);

  // সার্চ সাবমিট হ্যান্ডলার
  const handleSearch = (e) => {
    e?.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (searchTerm) {
      params.set("search", searchTerm);
    } else {
      params.delete("search");
    }

    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  // স্যালারি ফিল্টার হ্যান্ডলার
  const handleSalaryChange = (value) => {
    setSalarySort(value);
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "default") {
      params.set("salary", value);
    } else {
      params.delete("salary");
    }

    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  // পপুলারিটি (Hiring) ফিল্টার হ্যান্ডলার
  const handlePopularChange = (value) => {
    setPopularSort(value);
    const params = new URLSearchParams(searchParams.toString());

    if (value && value !== "default") {
      params.set("popularity", value);
    } else {
      params.delete("popularity");
    }

    params.delete("page");
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full bg-white dark:bg-black border border-zinc-200 dark:border-zinc-800 rounded-xl p-4 mt-6 mb-8 shadow-sm transition-colors duration-300">
      <form
        onSubmit={handleSearch}
        className="flex flex-col lg:flex-row gap-4 items-center justify-between"
      >
        {/* সার্চ ইনপুট এবং বাটন */}
        <div className="relative w-full lg:flex-1 flex gap-2">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400 dark:text-zinc-500" />
            <Input
              type="text"
              placeholder="Search by lawyer name, speciality..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-transparent border-zinc-200 dark:border-zinc-800 focus-visible:ring-[#E5D4B6] focus-visible:ring-offset-0 text-zinc-900 dark:text-zinc-100"
            />
          </div>
          <Button
            type="submit"
            className="bg-[#E5D4B6] hover:bg-[#d4bf9c] text-black font-semibold transition-colors shrink-0"
          >
            Search
          </Button>
        </div>

        {/* ফিল্টারিং ড্রপডাউনস */}
        <div className="flex flex-col sm:flex-row w-full lg:w-auto items-center gap-3 shrink-0">
          {/* ১. স্যালারি ফিল্টার */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <DollarSign className="h-4 w-4 text-zinc-400 dark:text-zinc-500 hidden sm:block shrink-0" />
            <Select value={salarySort} onValueChange={handleSalaryChange}>
              <SelectTrigger className="w-full sm:w-[180px] bg-transparent border-zinc-200 dark:border-zinc-800 focus:ring-[#E5D4B6] focus:ring-offset-0 text-zinc-800 dark:text-zinc-200">
                <SelectValue placeholder="Salary" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                <SelectItem
                  value="default"
                  className="focus:bg-[#E5D4B6]/20 dark:focus:bg-[#E5D4B6]/10"
                >
                  Any Salary
                </SelectItem>
                <SelectItem
                  value="salary_desc"
                  className="focus:bg-[#E5D4B6]/20 dark:focus:bg-[#E5D4B6]/10"
                >
                  High to Low
                </SelectItem>
                <SelectItem
                  value="salary_asc"
                  className="focus:bg-[#E5D4B6]/20 dark:focus:bg-[#E5D4B6]/10"
                >
                  Low to High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* ২. পপুলারিটি (Hiring Count) ফিল্টার */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Award className="h-4 w-4 text-zinc-400 dark:text-zinc-500 hidden sm:block shrink-0" />
            <Select value={popularSort} onValueChange={handlePopularChange}>
              <SelectTrigger className="w-full sm:w-[180px] bg-transparent border-zinc-200 dark:border-zinc-800 focus:ring-[#E5D4B6] focus:ring-offset-0 text-zinc-800 dark:text-zinc-200">
                <SelectValue placeholder="Popularity" />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800">
                <SelectItem
                  value="default"
                  className="focus:bg-[#E5D4B6]/20 dark:focus:bg-[#E5D4B6]/10"
                >
                  Default Popularity
                </SelectItem>
                <SelectItem
                  value="popular_desc"
                  className="focus:bg-[#E5D4B6]/20 dark:focus:bg-[#E5D4B6]/10"
                >
                  Popular: High to Low
                </SelectItem>
                <SelectItem
                  value="popular_asc"
                  className="focus:bg-[#E5D4B6]/20 dark:focus:bg-[#E5D4B6]/10"
                >
                  Popular: Low to High
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </form>
    </div>
  );
}
