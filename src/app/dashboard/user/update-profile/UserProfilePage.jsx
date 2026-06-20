"use client";

import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import HiringRow from "@/component/table/HiringRaw";
// import HiringRow from "./HiringRow";

const UserHiringTable = ({ hiringHistory }) => {
  const handlePay = (request) => {
    // Payment logic goes here
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
          {hiringHistory?.map((request) => (
            <HiringRow
              key={request._id}
              request={request}
              handlePay={handlePay}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserHiringTable;
