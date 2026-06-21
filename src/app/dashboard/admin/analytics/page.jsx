import AnalyticsPage from "@/component/admin/AdminAnalyticsPage";
import {
  getAdminData,
  getAllLawyersData,
  getAllUsersData,
  getHiresData,
  getTopCategories,
} from "@/lib/api/admin";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  // const user = await getUserSession();
  // const adminData = await getAdminData(user?.id);
  const totalUsersData = await getAllUsersData();
  const totalLawyerData = await getAllLawyersData();
  const totalHiresData = await getHiresData();
  const topCategories = await getTopCategories();

  // console.log(topCategories);
  return (
    <div>
      <AnalyticsPage
        totalUsersData={totalUsersData}
        totalLawyerData={totalLawyerData}
        totalHiresData={totalHiresData}
        topCategories={topCategories}
      />
    </div>
  );
};

export default page;
