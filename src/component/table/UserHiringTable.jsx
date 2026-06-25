"use client";

import React from "react";
import { GoArrowUpLeft } from "react-icons/go";
import { FolderOpen } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const UserHiringTable = ({ hiringHistory = [] }) => {
  const handlePay = async (historyData) => {
    console.log("History Data From HandlePay =>", historyData);
  };

  // লজিক: ডেটা না থাকলে টেবিল রেন্ডার না করে সরাসরি 'No Data Found Box' দেখাবে
  if (hiringHistory.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-[#e5ded5] dark:border-neutral-800/70 bg-white dark:bg-[#121212] p-8 sm:p-12 text-center shadow-sm max-w-2xl mx-auto transition-all">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-2xl bg-[#f9f4ef] dark:bg-[#1c1a17] text-[#c4a482] dark:text-[#d9bfa2] border border-[#e5ded5]/40 dark:border-neutral-800/50 shadow-inner">
            <FolderOpen className="h-8 w-8 stroke-[1.5]" />
          </div>
          <div className="space-y-1.5">
            <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-white tracking-wide">
              No Hiring Requests
            </h3>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium">
              {` You haven't made any booking requests yet. Your applied requests
              will safely appear here.`}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ডেটা থাকলে এই টেবিল স্ট্রাকচারটি দেখাবে
  return (
    <div className="w-full rounded-2xl border border-[#e5ded5] dark:border-neutral-800/70 bg-white dark:bg-[#121212] shadow-sm overflow-hidden transition-all">
      {/* Mobile Card Layout (Visible only on small devices) */}
      <div className="block md:hidden divide-y divide-neutral-100 dark:divide-neutral-900">
        {hiringHistory.map((history) => (
          <div key={history?._id} className="p-5 space-y-4">
            <div className="flex justify-between items-start gap-4">
              <div>
                <h4 className="font-serif font-bold text-base text-neutral-900 dark:text-white capitalize">
                  {history?.lawyerName || "N/A"}
                </h4>
                <p className="text-xs text-neutral-400 dark:text-neutral-500 font-semibold mt-0.5">
                  {history?.lawyerSpecialty || "N/A"}
                </p>
              </div>
              <span
                className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                  history?.status === "Pending"
                    ? "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                    : history?.status === "Approved"
                      ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                }`}
              >
                {history?.status || "N/A"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs font-medium text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-[#161616] p-2.5 rounded-xl border border-neutral-100 dark:border-neutral-900/50">
              <div>
                <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider mb-0.5">
                  Fee
                </span>
                <span className="text-neutral-800 dark:text-neutral-200 font-bold">
                  {history?.lawyerSalary || "N/A"}
                </span>
              </div>
              <div>
                <span className="block text-[10px] text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider mb-0.5">
                  Hiring Date
                </span>
                <span className="text-neutral-700 dark:text-neutral-300">
                  {history?.createdAt
                    ? new Date(history?.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end pt-1">
              {history?.status === "Approved" ? (
                history?.isPaid ? (
                  <span className="w-full text-center py-2 text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-xl border border-emerald-100 dark:border-emerald-900/40 uppercase tracking-widest">
                    Paid
                  </span>
                ) : (
                  <form
                    action="/api/checkout_sessions"
                    method="POST"
                    className="w-full"
                  >
                    <input
                      type="hidden"
                      name="userId"
                      value={history?.hiringApplicantId}
                    />
                    <input
                      type="hidden"
                      name="price"
                      value={history?.lawyerHrRate}
                    />
                    <input
                      type="hidden"
                      name="lawyerId"
                      value={history?.lawyerId}
                    />
                    <input
                      type="hidden"
                      name="lawyerName"
                      value={history?.lawyerName}
                    />
                    <button
                      type="submit"
                      onClick={() => handlePay(history)}
                      className="w-full py-2.5 text-xs font-bold text-white bg-[#1d1d1d] hover:bg-neutral-800 dark:text-[#1d1d1d] dark:bg-[#c4a482] dark:hover:bg-[#b09270] rounded-xl transition-all shadow-sm uppercase tracking-widest"
                    >
                      Pay Now
                    </button>
                  </form>
                )
              ) : (
                <span className="text-xs text-neutral-400 dark:text-neutral-500 italic font-medium">
                  Awaiting Action
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table Layout (Visible from Medium screens and up) */}
      <div className="hidden md:block overflow-x-auto">
        <Table>
          <TableCaption className="pb-4 text-xs font-medium text-neutral-400 dark:text-neutral-500">
            A list of your recent hiring requests.
          </TableCaption>
          <TableHeader className="bg-[#f9f4ef]/60 dark:bg-[#161616] border-b border-neutral-100 dark:border-neutral-900">
            <TableRow className="border-neutral-100 dark:border-neutral-900 hover:bg-transparent">
              <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Lawyer Name
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Specialisation
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Fee
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Hiring Date
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                Status
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">
                View
              </TableHead>
              <TableHead className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 text-right">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="divide-y divide-neutral-100 dark:divide-neutral-900/60 font-medium text-sm">
            {hiringHistory.map((history) => (
              <TableRow
                key={history?._id}
                className="border-neutral-100 dark:border-neutral-900/60 hover:bg-neutral-50/50 dark:hover:bg-[#161616]/40 transition-colors"
              >
                <TableCell className="px-6 py-4 font-serif font-bold text-neutral-900 dark:text-white capitalize">
                  {history?.lawyerName || "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4 text-neutral-500 dark:text-neutral-400 text-xs">
                  {history?.lawyerSpecialty || "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4 text-neutral-800 dark:text-neutral-200 font-bold">
                  {history?.lawyerSalary || "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4 text-neutral-500 dark:text-neutral-400 text-xs">
                  {history?.createdAt
                    ? new Date(history?.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </TableCell>
                <TableCell className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                      history?.status === "Pending"
                        ? "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                        : history?.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                          : "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                    }`}
                  >
                    {history?.status}
                  </span>
                </TableCell>
                <TableCell>
                  <Link
                    href={`/lawyers/${history?.lawyerId}`}
                    className="flex items-center gap-1 w-fit hover:bg-[#dfdfdf] dark:hover:bg-[#1d1d1d] py-1 px-2 rounded-lg cursor-pointer"
                  >
                    <GoArrowUpLeft /> View
                  </Link>
                </TableCell>

                <TableCell className="px-6 py-4 text-right">
                  {history?.status === "Approved" ? (
                    history?.isPaid ? (
                      <span className="inline-block px-4 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 rounded-lg border border-emerald-100 dark:border-emerald-900/40 uppercase tracking-widest">
                        Paid
                      </span>
                    ) : (
                      <form
                        action="/api/checkout_sessions"
                        method="POST"
                        className="inline-block"
                      >
                        <input
                          type="hidden"
                          name="userId"
                          value={history?.hiringApplicantId}
                        />
                        <input
                          type="hidden"
                          name="price"
                          value={history?.lawyerHrRate}
                        />
                        <input
                          type="hidden"
                          name="lawyerId"
                          value={history?.lawyerId}
                        />
                        <input
                          type="hidden"
                          name="lawyerName"
                          value={history?.lawyerName}
                        />

                        <button
                          type="submit"
                          onClick={() => handlePay(history)}
                          className="px-4 py-2 text-xs font-bold text-white bg-[#1d1d1d] hover:bg-neutral-800 dark:text-[#1d1d1d] dark:bg-[#c4a482] dark:hover:bg-[#b09270] rounded-lg transition-all shadow-sm uppercase tracking-widest active:scale-98"
                        >
                          Pay Now
                        </button>
                      </form>
                    )
                  ) : (
                    <span className="text-xs text-neutral-400 dark:text-neutral-600 italic font-medium">
                      Awaiting Action
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UserHiringTable;
