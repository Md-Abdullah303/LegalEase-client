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
  const adminData = await getAdminData(user?.id);
  const totalUsersData = await getAllUsersData();
  const totalLawyerData = await getAllLawyersData();
  const totalApprovedData = await getApprovedData();
  const totalPaymentData = await getAllPayments();
  const sum = totalPaymentData.reduce(
    (accumulator, item) => accumulator + item.price,
    0,
  );

  // console.log(totalPaymentData);
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
