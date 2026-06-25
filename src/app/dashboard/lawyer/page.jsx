import LawyerDashboardHomePage from "@/component/lawyers/LawyerDashboardHomePage";
import HiringRequestsTable from "@/component/table/HiringRequestsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { getLawyerHiringByLawerId } from "@/lib/api/applications";
import { getLawyerByLawyerId } from "@/lib/api/lawyers";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const LawyerHomePage = async () => {
  const user = await getUserSession();
  const lawyerData = await getLawyerByLawyerId(user?.id);
  const totalHires = await getLawyerHiringByLawerId(lawyerData?._id);
  // console.log(totalHires);

  return (
    <div className="">
      <LawyerDashboardHomePage lawyer={lawyerData} totalHires={totalHires} />
    </div>
  );
};

export default LawyerHomePage;
