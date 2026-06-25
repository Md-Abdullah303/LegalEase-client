import ManageUsersPage from "@/component/admin/AdminAllUsersManagPage";
import {
  getAllAdminData,
  getAllLawyersData,
  getAllMembers,
  getAllUsersData,
} from "@/lib/api/admin";
import React from "react";

export const metadata = {
  title: "Admin Dashboard | All Users",
};

const page = async () => {
  const [totalUsersData, totalLawyerData, totalAdminData, totalMembers] =
    await Promise.all([
      getAllUsersData(),
      getAllLawyersData(),
      getAllAdminData(),
      getAllMembers(),
    ]);

  return (
    <div>
      <ManageUsersPage
        totalMembers={totalMembers}
        totalUsersData={totalUsersData}
        totalLawyerData={totalLawyerData}
        totalAdminData={totalAdminData}
      />
    </div>
  );
};

export default page;
