"use client";

import React, { useMemo, useState } from "react";
import LawyerCard from "./LawyerCard";
import { motion } from "framer-motion";
import { SearchX, RefreshCw } from "lucide-react"; // আইকন অ্যাড করা হয়েছে
import { Button } from "@/components/ui/button"; // শ্যাডসিএন বাটন
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const LawyersContainer = ({ lawyers = [], user }) => {
  const ITEMS_PER_PAGE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(lawyers.length / ITEMS_PER_PAGE);

  const currentLawyers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return lawyers.slice(start, end);
  }, [lawyers, currentPage]);

  // Container Animation
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  // Page Numbers Generator
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
      return pages;
    }

    pages.push(1);

    if (currentPage > 3) {
      pages.push("...");
    }

    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 2) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  // ডাটা না পাওয়া গেলে এই সুন্দর UI-টি শো করবে
  if (!lawyers || lawyers.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col items-center justify-center text-center py-20 px-4 min-h-[50vh]"
      >
        <div className="p-4 rounded-full bg-[#C4A482]/10 text-[#C4A482] mb-5 dark:bg-[#C4A482]/5">
          <SearchX className="h-12 w-12 stroke-[1.5]" />
        </div>
        <h3 className="font-serif text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          No Lawyers Found
        </h3>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-sm mt-2 text-sm leading-relaxed">
          We couldn't find any legal experts matching your current filters or
          search terms. Try adjusting your query.
        </p>
        <Button
          onClick={() => window.location.reload()}
          className="mt-6 bg-[#C4A482] hover:bg-[#b39371] text-white font-medium shadow-sm gap-2"
        >
          <RefreshCw className="h-4 w-4" /> Clear Filters
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="mt-10 py-4">
      {/* Lawyers Grid */}
      <motion.div
        key={currentPage}
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6"
      >
        {currentLawyers?.map((lawyer) => (
          <LawyerCard lawyer={lawyer} user={user} key={lawyer?._id} />
        ))}
      </motion.div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-12">
          <Pagination>
            <PaginationContent>
              {/* Previous */}
              <PaginationItem>
                <PaginationPrevious
                  className={`cursor-pointer ${
                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                  }`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                />
              </PaginationItem>

              {/* Page Numbers */}
              {getPageNumbers().map((page, index) => (
                <PaginationItem key={index}>
                  {page === "..." ? (
                    <PaginationEllipsis />
                  ) : (
                    <PaginationLink
                      isActive={currentPage === page}
                      className="cursor-pointer"
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next */}
              <PaginationItem>
                <PaginationNext
                  className={`cursor-pointer ${
                    currentPage === totalPages
                      ? "pointer-events-none opacity-50"
                      : ""
                  }`}
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default LawyersContainer;
