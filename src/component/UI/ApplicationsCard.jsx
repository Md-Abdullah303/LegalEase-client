"use client";
import { changeApplicationsStatus } from "@/lib/actions/applications";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ApplicationsCard = ({ application }) => {
  const router = useRouter();
  const getStatusColor = (status) => {
    switch (status) {
      case "Approved":
        return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400";
      case "Rejected":
        return "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400";
      default:
        return "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400";
    }
  };

  const handleApproved = async () => {
    const res = await changeApplicationsStatus(application?._id, {
      status: "Approved",
    });
    if (res) {
      router.refresh("/dashboard/lawyer/hiring-history");
      toast.success("Updated..");
    } else {
      toast.error("Sorry try again later.");
    }
  };
  const handleRejected = async () => {
    const res = await changeApplicationsStatus(application?._id, {
      status: "Rejected",
    });
    if (res) {
      router.refresh("/dashboard/lawyer/hiring-history");
      toast.success("Updated..");
    } else {
      toast.error("Sorry try again later.");
    }
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        {/* ইনফরমেশন সেকশন */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
            Applicant: {application.userName}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            <span className="font-medium text-slate-600 dark:text-slate-300">
              Reason:
            </span>{" "}
            {application.reason}
          </p>
          <div className="mt-3">
            <span
              className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(application.status)}`}
            >
              {application.status}
            </span>
          </div>
        </div>

        {/* অ্যাকশন বাটনস */}
        <div className="flex gap-3">
          {application.status !== "Approved" && (
            <button
              onClick={handleApproved}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Approve
            </button>
          )}
          {application.status !== "Rejected" && (
            <button
              onClick={handleRejected}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg transition-colors"
            >
              Reject
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApplicationsCard;
