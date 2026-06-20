"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserHiringTable = ({ hiringHistory }) => {
  const handlePay = async (historyData) => {
    console.log(`History Data From HandlePay => ${historyData}`);
  };
  return (
    <div className="w-full rounded-md border bg-white dark:bg-[#1f1f1f] shadow-sm overflow-hidden">
      <Table>
        <TableCaption className="pb-4">
          A list of your recent hiring requests.
        </TableCaption>
        <TableHeader className="bg-gray-50/50 dark:bg-[#1f1f1f]/50">
          <TableRow>
            <TableHead>Lawyer Name</TableHead>
            <TableHead>Specialisation</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Hiring Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {hiringHistory.map((history) => (
            <TableRow key={history?._id}>
              <TableCell className="font-medium">
                {history?.lawyerName || "N/A"}
              </TableCell>
              <TableCell className="text-gray-500 dark:text-gray-400">
                {history?.lawyerSpecialty || "N/A"}
              </TableCell>
              <TableCell>{history?.lawyerSalary || "N/A"}</TableCell>
              <TableCell>
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
                  <button
                    onClick={() => handlePay(history)}
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                  >
                    Pay Now
                  </button>
                ) : (
                  <span className="text-sm text-gray-400 dark:text-gray-600 italic">
                    Awaiting Action
                  </span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserHiringTable;
