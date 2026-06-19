import ApplicationsContainer from "@/component/container/ApplicationsContainer";
import HiringRequestsTable from "@/component/table/HiringRequestsTable";
import { getLawyerHiringByLawerId } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const LawyerHiringHistoryPage = async () => {
  const user = await getUserSession();
  const applications = await getLawyerHiringByLawerId(user?.id);
  //   console.log(applications);

  return (
    <div className="max-w-4xl md:max-w-6xl mx-auto mt-10">
      {/* headers */}
      <div className="space-y-5">
        <h1 className="text-2xl md:text-4xl font-bold">Hiring Requests</h1>
        <HiringRequestsTable applications={applications} />
      </div>
    </div>
    // <div className="">
    //   {/* <ApplicationsContainer applications={applications} /> */}
    //   <HiringRequestsTable applications={applications} />
    // </div>
  );
};

export default LawyerHiringHistoryPage;
