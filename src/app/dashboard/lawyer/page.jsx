import LawyerDashboardHomePage from "@/component/lawyers/LawyerDashboardHomePage";
import HiringRequestsTable from "@/component/table/HiringRequestsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { getLawyerByLawyerId } from "@/lib/api/lawyers";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const LawyerHomePage = async () => {
  const user = await getUserSession();
  const lawyerData = await getLawyerByLawyerId(user?.id);
  console.log(lawyerData);

  return (
    <div className="">
      <LawyerDashboardHomePage lawyer={lawyerData} />
    </div>
  );
};

export default LawyerHomePage;
