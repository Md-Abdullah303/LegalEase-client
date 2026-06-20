import UserDashboardHome from "@/component/Users/UserDashboardhomePage";
import { getUserHiringHistory } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const userData = await getUserSession();
  const userHiringHistories = await getUserHiringHistory(userData?.id);
  console.log(userHiringHistories);

  // console.log(userData);

  return (
    <div>
      <UserDashboardHome
        userData={userData}
        userHiringHistories={userHiringHistories}
      />
    </div>
  );
};

export default page;
