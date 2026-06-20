import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const page = () => {
  return (
    <div className="p-6">
      <h1>user comments</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-3">
        <Skeleton className="w-full h-20 rounded-md" />
        <Skeleton className="w-full h-20 rounded-md" />
        <Skeleton className="w-full h-20 rounded-md" />
      </div>
    </div>
  );
};

export default page;
