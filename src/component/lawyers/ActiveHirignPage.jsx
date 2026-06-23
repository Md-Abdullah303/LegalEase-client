import React from "react";
import {
  User,
  CalendarDays,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Clock,
  Inbox, // নতুন আইকন ইম্পোর্ট করা হয়েছে খালি অবস্থার জন্য
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ActiveHiringPage = ({ lawyerHirings }) => {
  return (
    <div className="max-w-7xl mx-auto mt-10 px-4 md:px-6 mb-20">
      {/* Page Header */}
      <div className="mb-8 space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Active Hiring Requests
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-2xl">
          Review and manage your incoming legal consultation requests. Accept or
          decline clients based on your current availability.
        </p>
      </div>

      {/* Conditional Rendering: হায়ারিং রিকোয়েস্ট চেক করা হচ্ছে */}
      {!lawyerHirings || lawyerHirings.length === 0 ? (
        // সুন্দর এবং রেসপন্সিভ Empty State UI
        <div className="flex flex-col items-center justify-center text-center p-8 md:p-16 bg-white dark:bg-[#1a1a1a] rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm max-w-3xl mx-auto mt-12 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center border border-amber-100 dark:border-amber-500/20 mb-5 shadow-sm">
            <Inbox className="w-8 h-8 text-[#a17232]" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
            No Active Requests Found
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm md:text-base max-w-sm mt-2 leading-relaxed">
            You don't have any incoming client requests at the moment. When
            clients hire you, their details will appear right here.
          </p>
        </div>
      ) : (
        // গ্রিড কন্টেইনার (যদি রিকোয়েস্ট থাকে)
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {lawyerHirings.map((request) => (
            <div
              key={request?._id}
              className="relative flex flex-col bg-white dark:bg-[#1a1a1a] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group"
            >
              {/* Top Status Accent Line */}
              <div
                className={`h-1 w-full ${
                  request?.status === "Approved"
                    ? "bg-emerald-500"
                    : request?.status === "Rejected"
                      ? "bg-rose-500"
                      : "bg-amber-400"
                }`}
              />

              <div className="p-5 flex-1 flex flex-col">
                {/* Card Header: User Info & Status */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700">
                      <User className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900 dark:text-slate-100 text-lg leading-tight">
                        {request?.userName}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        <CalendarDays className="w-3.5 h-3.5" />
                        {request?.createdAt
                          ? new Date(request?.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              },
                            )
                          : "N/A"}
                      </div>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      request?.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/20"
                        : request?.status === "Rejected"
                          ? "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/20"
                          : "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20"
                    }`}
                  >
                    {request?.status === "Pending" && (
                      <Clock className="w-3 h-3 mr-1" />
                    )}
                    {request?.status}
                  </span>
                </div>

                {/* Card Body: Reason Quote Box */}
                <div className="flex-1 bg-slate-50 dark:bg-slate-800/30 rounded-xl p-4 border border-slate-100 dark:border-slate-800/60 mb-5 relative">
                  <MessageSquare className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute top-4 left-4" />
                  <p className="pl-6 text-sm text-slate-700 dark:text-slate-300 leading-relaxed italic line-clamp-3">
                    {`"${request?.reason}"`}
                  </p>
                </div>

                {/* কমেন্ট করে রাখা আগের বাটন সেকশন */}
                {/* <div className="pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                  ... (বাটন লজিক)
                </div> */}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ActiveHiringPage;
