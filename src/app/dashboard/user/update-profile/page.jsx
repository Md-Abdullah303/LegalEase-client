import { getUserProfile } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import UserProfilePage from "./UserProfilePage";

const page = async () => {
  const user = await getUserSession();
  const userData = (await getUserProfile(user.id)) || null;
  //   console.log(userData[0]);
  return (
    <div>
      <UserProfilePage userData={userData[0]} />{" "}
    </div>
  );
};

export default page;
