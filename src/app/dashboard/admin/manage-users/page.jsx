import AdminManageUsers from "@/component/admin/AdminManageUsers";
import {
  getAllAdminData,
  getAllLawyersData,
  getAllMembers,
  getAllUsersData,
} from "@/lib/api/admin";
import React from "react";

const page = async () => {
  const [totalMembers, totalAdmin, totalUsersData, totalLawyerData] =
    await Promise.all([
      getAllMembers(),
      getAllAdminData(),
      getAllUsersData(),
      getAllLawyersData(),
    ]);

  return (
    <div>
      <AdminManageUsers
        totalUsersData={totalUsersData}
        totalAdmin={totalAdmin}
        totalLawyerData={totalLawyerData}
        totalMembers={totalMembers}
      />
    </div>
  );
};

export default page;
