import HiringRequestsTable from "@/component/table/HiringRequestsTable";
import React from "react";

const LawyerHomePage = () => {
  return (
    <div className="max-w-4xl md:max-w-6xl mx-auto mt-10">
      {/* headers */}
      <div className="space-y-5">
        <h1 className="text-2xl md:text-4xl font-bold">Hiring Requests</h1>
        <HiringRequestsTable />
      </div>
    </div>
  );
};

export default LawyerHomePage;
