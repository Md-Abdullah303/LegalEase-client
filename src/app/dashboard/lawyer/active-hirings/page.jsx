import ActiveHiringPage from "@/component/lawyers/ActiveHirignPage";
import { Skeleton } from "@/components/ui/skeleton";
import { getLawyerHiringByLawerId } from "@/lib/api/applications";
import { getUserSession } from "@/lib/core/session";
import React from "react";
export const metadata = {
  title: "User Dashboard | Active Hiring",
};

const page = async () => {
  const user = await getUserSession();
  const lawyerHirings = await getLawyerHiringByLawerId(user?.id);
  // console.log(lawyerHirings);
  return (
    <div className="">
      <ActiveHiringPage lawyerHirings={lawyerHirings} />
    </div>
  );
};

export default page;
