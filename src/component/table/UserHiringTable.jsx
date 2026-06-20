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
import { getLawyerByLawyerId } from "@/lib/api/lawyers";

// Mock data for the UI
// const hiringHistory = [
//   {
//     id: "REQ001",
//     lawyerName: "Harvey Specter",
//     specialisation: "Corporate Law",
//     fee: "$500/hr",
//     hiringDate: "2026-06-18",
//     status: "Accepted",
//   },
//   {
//     id: "REQ002",
//     lawyerName: "Saul Goodman",
//     specialisation: "Criminal Defense",
//     fee: "$200/hr",
//     hiringDate: "2026-06-19",
//     status: "Pending",
//   },
//   {
//     id: "REQ003",
//     lawyerName: "Kim Wexler",
//     specialisation: "Banking Law",
//     fee: "$400/hr",
//     hiringDate: "2026-06-15",
//     status: "Rejected",
//   },
// ];

const UserHiringTable = ({ hiringHistory }) => {
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
          {hiringHistory.map(async (request) => {
            const lawyerData = await getLawyerByLawyerId(request?.lawyerId);
            console.log(request);
            return (
              <TableRow key={request._id}>
                <TableCell className="font-medium">
                  {lawyerData?.name || "Unknown Lawyer"}
                </TableCell>
                <TableCell className="text-gray-500 dark:text-gray-400">
                  {lawyerData?.specialty || "N/A"}
                </TableCell>
                <TableCell>{lawyerData?.salary || "N/A"}</TableCell>
                <TableCell>
                  {request.createdAt
                    ? new Date(request.createdAt).toLocaleDateString()
                    : "N/A"}
                </TableCell>

                {/* Status Column with conditional badge styling */}
                <TableCell>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium 
                  ${
                    request.status === "Pending"
                      ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-500"
                      : request.status === "Accepted"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-500"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-500"
                  }`}
                  >
                    {request.status}
                  </span>
                </TableCell>

                {/* Action Column for Payment */}
                <TableCell className="text-right">
                  {request.status === "Accepted" ? (
                    <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
                      Pay Now
                    </button>
                  ) : (
                    <span className="text-sm text-gray-400 dark:text-gray-600 italic">
                      Awaiting Action
                    </span>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserHiringTable;
