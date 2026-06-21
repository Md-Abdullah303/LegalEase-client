import UserDashboardHome from "@/component/Users/UserDashboardhomePage";
import { getUserCommentByUserid } from "@/lib/api/comments";
import { getUserHiringHistory, getUserProfile } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const userData = await getUserSession();
  const userHiringHistories = await getUserHiringHistory(userData?.id);
  const userComments = await getUserCommentByUserid(userData?.id);
  const userDataFormServer = await getUserProfile(userData?.id);

  const userServerData = userDataFormServer[0];

  // console.log(userHiringHistories);
  console.log(userServerData);

  return (
    <div>
      <UserDashboardHome
        userServerData={userServerData}
        userData={userData}
        userHiringHistories={userHiringHistories}
        userComments={userComments}
      />
    </div>
  );
};

export default page;
