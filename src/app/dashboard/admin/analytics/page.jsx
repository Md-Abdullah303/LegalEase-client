import AnalyticsPage from "@/component/admin/AdminAnalyticsPage";
import {
  getAdminData,
  getAllLawyersData,
  getAllUsersData,
  getHiresData,
  getTopCategories,
} from "@/lib/api/admin";
import { getAllPayments, getMonthlyRevenue } from "@/lib/api/payments";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  // const user = await getUserSession();
  // const adminData = await getAdminData(user?.id);
  const totalUsersData = await getAllUsersData();
  const totalLawyerData = await getAllLawyersData();
  const totalHiresData = await getHiresData();
  const topCategories = await getTopCategories();
  const totalPaymentData = await getAllPayments();
  const sum = totalPaymentData.reduce(
    (accumulator, item) => accumulator + item.price,
    0,
  );

  // console.log(monthlyRevenue);
  return (
    <div>
      <AnalyticsPage
        totalUsersData={totalUsersData}
        totalLawyerData={totalLawyerData}
        totalHiresData={totalHiresData}
        topCategories={topCategories}
        totalRevenue={Number(sum)}
      />
    </div>
  );
};

export default page;
