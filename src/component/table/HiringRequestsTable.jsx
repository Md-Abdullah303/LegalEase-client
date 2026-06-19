"use client";

import React from "react";
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  User,
  Inbox,
} from "lucide-react"; // Inbox আইকন যোগ করেছি
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import toast from "react-hot-toast";
import { changeApplicationsStatus } from "@/lib/actions/applications";
import { useRouter } from "next/navigation";

const HiringRequestsTable = ({ applications }) => {
  const router = useRouter();

  // Empty State চেক করা
  if (!applications || applications.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/50 text-center">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <Inbox className="w-8 h-8 text-slate-400 dark:text-slate-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
          No Hiring Requests
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-1">
          Currently, there are no pending or active hiring requests to display.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>Client</TableHead>
            <TableHead>Request Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {applications?.map((item) => {
            const handleApproved = async () => {
              const res = await changeApplicationsStatus(item._id, {
                status: "Approved",
              });
              if (res) {
                router.refresh();
                toast.success("Status Updated to Approved!");
              } else {
                toast.error("Failed to update status.");
              }
            };

            const handleRejected = async () => {
              const res = await changeApplicationsStatus(item._id, {
                status: "Rejected",
              });
              if (res) {
                router.refresh();
                toast.success("Status Updated to Rejected!");
              } else {
                toast.error("Failed to update status.");
              }
            };

            return (
              <TableRow key={item._id}>
                <TableCell className="flex items-center gap-3 font-medium">
                  <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                    <User className="w-4 h-4 text-slate-500" />
                  </div>
                  {item?.userName}
                </TableCell>

                <TableCell>
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </TableCell>

                <TableCell>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Approved"
                        ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                        : item.status === "Rejected"
                          ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>

                <TableCell className="text-right space-x-2">
                  <Button
                    onClick={handleApproved}
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-emerald-600 border-emerald-200 hover:bg-emerald-50 dark:border-emerald-900 dark:hover:bg-emerald-900/20"
                  >
                    <CheckCircle className="w-3.5 h-3.5" /> Accept
                  </Button>
                  <Button
                    onClick={handleRejected}
                    variant="outline"
                    size="sm"
                    className="h-8 gap-1 text-red-600 border-red-200 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-900/20"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-2"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Details</DropdownMenuItem>
                      <DropdownMenuItem>Contact</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default HiringRequestsTable;
