import AnalyticsPage from "@/component/admin/AdminAnalyticsPage";
import {
  getAllLawyersData,
  getAllUsersData,
  getHiresData,
  getTopCategories,
} from "@/lib/api/admin";
import { getAllPayments } from "@/lib/api/payments";
import React from "react";

const page = async () => {
  try {
    const [
      totalUsersData,
      totalLawyerData,
      totalHiresData,
      topCategories,
      totalPaymentData,
    ] = await Promise.all([
      getAllUsersData(),
      getAllLawyersData(),
      getHiresData(),
      getTopCategories(),
      getAllPayments(),
    ]);

    console.log(totalPaymentData);

    const totalRevenue = totalPaymentData.reduce(
      (acc, item) => acc + item.price,
      0,
    );

    return (
      <div>
        <AnalyticsPage
          totalUsersData={totalUsersData}
          totalLawyerData={totalLawyerData}
          totalHiresData={totalHiresData}
          topCategories={topCategories}
          totalRevenue={totalRevenue}
          totalPaymentData={totalPaymentData}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="p-8 text-red-500">
        Failed to load analytics. Please try again.
      </div>
    );
  }
};

export default page;
