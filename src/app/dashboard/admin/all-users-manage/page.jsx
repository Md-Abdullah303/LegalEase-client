import ManageUsersPage from "@/component/admin/AdminAllUsersManagPage";
import {
  getAllLawyersData,
  getAllMembers,
  getAllUsersData,
} from "@/lib/api/admin";
import React from "react";

const page = async () => {
  const totalUsersData = await getAllUsersData();
  const totalLawyerData = await getAllLawyersData();
  const totalMembers = await getAllMembers();
  return (
    <div>
      <ManageUsersPage
        totalMembers={totalMembers}
        totalUsersData={totalUsersData}
        totalLawyerData={totalLawyerData}
      />
    </div>
  );
};

export default page;
