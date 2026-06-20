import UserDashboardHome from "@/component/Users/UserDashboardhomePage";
import { getUserCommentByUserid } from "@/lib/api/comments";
import { getUserHiringHistory } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const userData = await getUserSession();
  const userHiringHistories = await getUserHiringHistory(userData?.id);
  const userComments = await getUserCommentByUserid(userData?.id);

  // console.log(userHiringHistories);
  // console.log(userComments);

  return (
    <div>
      <UserDashboardHome
        userData={userData}
        userHiringHistories={userHiringHistories}
        userComments={userComments}
      />
    </div>
  );
};

export default page;
