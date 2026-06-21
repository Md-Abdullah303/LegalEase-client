import AdminProfilePage from "@/component/admin/AdminProfilePage";
import { getAdminData } from "@/lib/api/admin";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const user = await getUserSession();
  const adminData = await getAdminData(user?.id);
  return (
    <div>
      <AdminProfilePage adminData={adminData} />
    </div>
  );
};

export default page;
