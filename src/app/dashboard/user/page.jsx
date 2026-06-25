import UserDashboardHome from "@/component/Users/UserDashboardhomePage";
import { getUserCommentByUserid } from "@/lib/api/comments";
import { getTotalPayForUser } from "@/lib/api/payments";
import { getUserHiringHistory, getUserProfile } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";

export const metadata = {
  title: "LegalEase | User Dashboard",
};

const page = async () => {
  const userData = await getUserSession();

  // userData আগে fetch — বাকি সব user?.id এর উপর নির্ভরশীল
  const [userHiringHistories, userComments, userDataFormServer, totalPay] =
    await Promise.all([
      getUserHiringHistory(userData?.id),
      getUserCommentByUserid(userData?.id),
      getUserProfile(userData?.id),
      getTotalPayForUser(userData?.id),
    ]);

  console.log(userDataFormServer?.[0]);

  return (
    <div>
      <UserDashboardHome
        userServerData={userDataFormServer?.[0]}
        userData={userData}
        userHiringHistories={userHiringHistories}
        userComments={userComments}
        totalPay={totalPay}
      />
    </div>
  );
};

export default page;
