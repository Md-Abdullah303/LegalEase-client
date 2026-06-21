"use client";

import React from "react";
import {
  MoreHorizontal,
  CheckCircle,
  XCircle,
  User,
  Inbox,
} from "lucide-react";
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
      <div className="flex flex-col items-center justify-center py-24 px-4 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 bg-gradient-to-b from-slate-50/50 to-white dark:from-[#1a1a1a]/50 dark:to-[#1a1a1a]/20 text-center shadow-sm">
        <div className="w-16 h-16 bg-white dark:bg-slate-800 shadow-sm border border-slate-100 dark:border-slate-700 rounded-2xl flex items-center justify-center mb-5 rotate-3 hover:rotate-0 transition-transform">
          <Inbox className="w-8 h-8 text-indigo-400 dark:text-indigo-500" />
        </div>
        <h3 className="text-xl font-semibold text-slate-800 dark:text-slate-200">
          No Hiring Requests Yet
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-sm mt-2 text-sm leading-relaxed">
          Currently, there are no pending or active hiring requests. New
          applications will appear here once submitted by clients.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a1a1a] shadow-sm overflow-hidden transition-all">
      <Table>
        <TableHeader className="bg-slate-50/80 dark:bg-slate-900/50 backdrop-blur-sm">
          <TableRow className="border-b border-slate-200 dark:border-slate-800 hover:bg-transparent">
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300 h-12">
              Client
            </TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300 h-12">
              Request Date
            </TableHead>
            <TableHead className="font-semibold text-slate-700 dark:text-slate-300 h-12">
              Status
            </TableHead>
            <TableHead className="text-right font-semibold text-slate-700 dark:text-slate-300 h-12">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-slate-100 dark:divide-slate-800/60">
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
              <TableRow
                key={item._id}
                className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors border-none group"
              >
                <TableCell className="flex items-center gap-3 font-medium py-4">
                  <div className="w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center group-hover:scale-105 transition-transform">
                    <User className="w-4 h-4 text-slate-500 dark:text-slate-400" />
                  </div>
                  <span className="text-slate-700 dark:text-slate-200">
                    {item?.userName}
                  </span>
                </TableCell>

                <TableCell className="text-slate-600 dark:text-slate-400">
                  {item?.createdAt
                    ? new Date(item.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })
                    : "N/A"}
                </TableCell>

                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      item.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                        : item.status === "Rejected"
                          ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                          : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                    }`}
                  >
                    {item.status}
                  </span>
                </TableCell>

                <TableCell className="text-right py-4">
                  <div className="flex items-center justify-end gap-2 opacity-100 md:opacity-80 md:group-hover:opacity-100 transition-opacity">
                    {item.status !== "Approved" && (
                      <Button
                        onClick={handleApproved}
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1.5 bg-transparent text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 dark:text-emerald-400 dark:border-emerald-900/50 dark:hover:bg-emerald-900/20 dark:hover:border-emerald-800 transition-colors"
                      >
                        <CheckCircle className="w-3.5 h-3.5" /> Accept
                      </Button>
                    )}
                    {item.status !== "Rejected" && (
                      <Button
                        onClick={handleRejected}
                        variant="outline"
                        size="sm"
                        className="h-8 gap-1.5 bg-transparent text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300 dark:text-rose-400 dark:border-rose-900/50 dark:hover:bg-rose-900/20 dark:hover:border-rose-800 transition-colors"
                      >
                        <XCircle className="w-3.5 h-3.5" /> Reject
                      </Button>
                    )}

                    {/* future applyfication */}
                    {/* <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-1 text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 dark:hover:bg-slate-800"
                        >
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="w-40 dark:bg-[#1a1a1a] dark:border-slate-800"
                      >
                        <DropdownMenuItem className="cursor-pointer dark:focus:bg-slate-800 dark:hover:text-white">
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem className="cursor-pointer dark:focus:bg-slate-800 dark:hover:text-white">
                          Contact
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu> */}
                  </div>
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
