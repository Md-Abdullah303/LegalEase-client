import ApplicationsContainer from "@/component/container/ApplicationsContainer";
import HiringRequestsTable from "@/component/table/HiringRequestsTable";
import { getLawyerHiringByLawerId } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import React, { Suspense } from "react";

// --- SKELETON COMPONENT ---
const HiringRequestsSkeleton = () => {
  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#1a1a1a]/50 shadow-sm overflow-hidden animate-pulse">
      <div className="w-full bg-slate-50 dark:bg-slate-800/50 h-12 border-b border-slate-200 dark:border-slate-800" />
      <div className="divide-y divide-slate-100 dark:divide-slate-800/50">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700/50" />
              <div className="w-32 h-4 rounded-md bg-slate-200 dark:bg-slate-700/50" />
            </div>
            <div className="w-24 h-4 rounded-md bg-slate-200 dark:bg-slate-700/50" />
            <div className="w-20 h-6 rounded-full bg-slate-200 dark:bg-slate-700/50" />
            <div className="flex gap-2">
              <div className="w-20 h-8 rounded-md bg-slate-200 dark:bg-slate-700/50" />
              <div className="w-20 h-8 rounded-md bg-slate-200 dark:bg-slate-700/50" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- DATA FETCHER COMPONENT ---
// Pure JavaScript (No TS types)
const ApplicationsWrapper = async ({ userId }) => {
  const applications = await getLawyerHiringByLawerId(userId);
  return <HiringRequestsTable applications={applications} />;
};

// --- MAIN PAGE ---
const LawyerHiringHistoryPage = async () => {
  const user = await getUserSession();

  return (
    <div className="max-w-4xl md:max-w-6xl mx-auto mt-10 px-4 md:px-0">
      {/* headers */}
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Hiring Requests
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your incoming client requests and applications.
          </p>
        </div>

        {/* Suspense wrapper handles the skeleton loading automatically */}
        <Suspense fallback={<HiringRequestsSkeleton />}>
          <ApplicationsWrapper userId={user?.id} />
        </Suspense>
      </div>
    </div>
  );
};

export default LawyerHiringHistoryPage;
