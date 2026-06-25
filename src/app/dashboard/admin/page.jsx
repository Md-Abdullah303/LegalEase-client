import AdminDashboardHome from "@/component/admin/AdminDashboardHome";
import {
  getAdminData,
  getAllLawyersData,
  getAllUsersData,
  getApprovedData,
} from "@/lib/api/admin";
import { getAllPayments } from "@/lib/api/payments";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const user = await getUserSession();

  // user আগে fetch — adminData তে user?.id দরকার
  const [
    adminData,
    totalUsersData,
    totalLawyerData,
    totalApprovedData,
    totalPaymentData,
  ] = await Promise.all([
    getAdminData(user?.id),
    getAllUsersData(),
    getAllLawyersData(),
    getApprovedData(),
    getAllPayments(),
  ]);

  const sum = totalPaymentData.reduce(
    (accumulator, item) => accumulator + item.price,
    0,
  );

  return (
    <div>
      <AdminDashboardHome
        adminData={adminData}
        totalUsersData={totalUsersData}
        totalLawyerData={totalLawyerData}
        totalApprovedData={totalApprovedData}
        totalRevenue={Number(sum)}
      />
    </div>
  );
};

export default page;
