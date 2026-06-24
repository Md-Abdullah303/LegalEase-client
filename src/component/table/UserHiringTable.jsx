"use client";

import React from "react";
import { FolderOpen } from "lucide-react"; // এম্পটি স্টেটের জন্য আইকন
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserHiringTable = ({ hiringHistory = [] }) => {
  const handlePay = async (historyData) => {
    console.log("History Data From HandlePay =>", historyData);
  };

  return (
    <div className="w-full rounded-md border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1f1f1f] shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="pb-4">
          A list of your recent hiring requests.
        </TableCaption>
        <TableHeader className="bg-zinc-50/50 dark:bg-[#1f1f1f]/50">
          <TableRow className="border-zinc-200 dark:border-zinc-800">
            <TableHead>Lawyer Name</TableHead>
            <TableHead>Specialisation</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Hiring Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* ডাটা যদি ০ হয় (Empty Check) */}
          {hiringHistory.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={6}
                className="h-64 text-center hover:bg-transparent"
              >
                <div className="flex flex-col items-center justify-center space-y-3 py-6">
                  {/* থিম কালার টোনের আইকন */}
                  <div className="p-3 rounded-full bg-[#C4A482]/10 text-[#C4A482] dark:bg-[#C4A482]/5">
                    <FolderOpen className="h-8 w-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-base font-medium text-zinc-900 dark:text-zinc-100">
                      No Hiring Requests
                    </p>
                    <p className="text-sm text-zinc-400 dark:text-zinc-500 max-w-xs mx-auto">
                      You haven't made any booking requests yet. Your applied
                      requests will appear here.
                    </p>
                  </div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            // ডাটা থাকলে আগের মতোই লুপ চলবে
            hiringHistory.map((history) => (
              <TableRow
                key={history?._id}
                className="border-zinc-200 dark:border-zinc-800"
              >
                <TableCell className="font-medium text-zinc-900 dark:text-zinc-100">
                  {history?.lawyerName || "N/A"}
                </TableCell>
                <TableCell className="text-zinc-500 dark:text-zinc-400">
                  {history?.lawyerSpecialty || "N/A"}
                </TableCell>
                <TableCell className="text-zinc-700 dark:text-zinc-300">
                  {history?.lawyerSalary || "N/A"}
                </TableCell>
                <TableCell className="text-zinc-600 dark:text-zinc-400">
                  {history?.createdAt
                    ? new Date(history?.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>
                <TableCell>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      history?.status === "Pending"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                        : history?.status === "Approved"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
                    }`}
                  >
                    {history?.status}
                  </span>
                </TableCell>

                <TableCell className="text-right">
                  {history?.status === "Approved" ? (
                    history?.isPaid ? (
                      <span className="inline-block px-3 py-1.5 text-sm font-semibold text-green-600 bg-green-100 dark:bg-green-950/50 dark:text-green-400 rounded-md border border-green-200 dark:border-green-900">
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
                          className="px-4 py-2 text-sm font-medium text-white bg-[#C4A482] hover:bg-[#b39371] dark:text-black dark:bg-[#C4A482] dark:hover:bg-[#b39371] rounded-md transition-colors shadow-sm"
                        >
                          Pay Now
                        </button>
                      </form>
                    )
                  ) : (
                    <span className="text-sm text-zinc-400 dark:text-zinc-600 italic">
                      Awaiting Action
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserHiringTable;
