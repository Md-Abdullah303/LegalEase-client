import ManageLawyersPage from "@/component/admin/AdminManageLawyersPage";
import { getAllLawyersData } from "@/lib/api/admin";
import React from "react";

const page = async () => {
  const totalLawyerData = await getAllLawyersData();
  return (
    <div>
      <ManageLawyersPage totalLawyerData={totalLawyerData} />
    </div>
  );
};

export default page;
