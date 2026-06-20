import HiringRequestsTable from "@/component/table/HiringRequestsTable";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const LawyerHomePage = () => {
  return (
    <div className="max-w-4xl space-y-3 md:max-w-6xl mx-auto mt-10">
      <h1>Coming Soon</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <Skeleton className="h-42 w-full rounded-md" />
        <Skeleton className="h-42 w-full rounded-md" />
      </div>
      <Skeleton className="h-4 w-full rounded-md" />
    </div>
  );
};

export default LawyerHomePage;
