import AdminDashboardHome from "@/component/admin/AdminDashboardHome";
import {
  getAdminData,
  getAllLawyersData,
  getAllUsersData,
  getApprovedData,
} from "@/lib/api/admin";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const user = await getUserSession();
  const adminData = await getAdminData(user?.id);
  const totalUsersData = await getAllUsersData();
  const totalLawyerData = await getAllLawyersData();
  const totalApprovedData = await getApprovedData();

  // console.log(totalApprovedData);
  return (
    <div>
      <AdminDashboardHome
        adminData={adminData}
        totalUsersData={totalUsersData}
        totalLawyerData={totalLawyerData}
        totalApprovedData={totalApprovedData}
      />
    </div>
  );
};

export default page;
