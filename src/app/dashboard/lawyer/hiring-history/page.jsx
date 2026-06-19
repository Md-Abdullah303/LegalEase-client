import ApplicationsContainer from "@/component/container/ApplicationsContainer";
import { getLawyerHirings } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const LawyerHiringHistoryPage = async () => {
  const user = await getUserSession();
  const applications = await getLawyerHirings(user?.id);
  //   console.log(applications);

  return (
    <div className="">
      <ApplicationsContainer applications={applications} />
    </div>
  );
};

export default LawyerHiringHistoryPage;
