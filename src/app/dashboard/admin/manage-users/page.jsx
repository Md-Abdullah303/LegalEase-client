import AdminManageUsers from "@/component/admin/AdminManageUsers";
import {
  getAllAdminData,
  getAllLawyersData,
  getAllMembers,
  getAllUsersData,
} from "@/lib/api/admin";
import React from "react";

const page = async () => {
  const totalMembers = await getAllMembers();
  const totalAdmin = await getAllAdminData();
  const totalUsersData = await getAllUsersData();
  const totalLawyerData = await getAllLawyersData();
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
