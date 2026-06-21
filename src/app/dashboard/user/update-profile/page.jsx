import { getUserProfile } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import UserProfilePage from "./UserProfilePage";
import { Skeleton } from "@/components/ui/skeleton";
import UpdateProfilePage from "./UpdateProfilePage";

const page = async () => {
  const user = await getUserSession();
  const userData = (await getUserProfile(user.id)) || null;
  //   console.log(userData[0]);
  return (
    <div className="">
      <UpdateProfilePage />
    </div>
  );
};

export default page;
