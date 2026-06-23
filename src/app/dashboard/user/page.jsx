import UserDashboardHome from "@/component/Users/UserDashboardhomePage";
import { getUserCommentByUserid } from "@/lib/api/comments";
import { getTotalPay } from "@/lib/api/payments";
import { getUserHiringHistory, getUserProfile } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const userData = await getUserSession();
  const userHiringHistories = await getUserHiringHistory(userData?.id);
  const userComments = await getUserCommentByUserid(userData?.id);
  const userDataFormServer = await getUserProfile(userData?.id);
  const totalPay = await getTotalPay(userData?.id);

  const userServerData = userDataFormServer[0];

  // console.log(userHiringHistories);
  console.log(totalPay);

  return (
    <div>
      <UserDashboardHome
        userServerData={userServerData}
        userData={userData}
        userHiringHistories={userHiringHistories}
        userComments={userComments}
        totalPay={totalPay}
      />
    </div>
  );
};

export default page;
