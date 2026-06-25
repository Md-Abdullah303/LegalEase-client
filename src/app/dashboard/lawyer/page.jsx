import LawyerDashboardHomePage from "@/component/lawyers/LawyerDashboardHomePage";
import HiringRequestsTable from "@/component/table/HiringRequestsTable";
import { Skeleton } from "@/components/ui/skeleton";
import { getLawyerHiringByLawerId } from "@/lib/api/applications";
import { getLawyerByLawyerId } from "@/lib/api/lawyers";
import { getUserSession } from "@/lib/core/session";
import React from "react";

export const metadata = {
  title: "User Dashboard | Lawyer Dashboard",
};

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
