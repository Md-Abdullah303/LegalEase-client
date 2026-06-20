import { getUserProfile } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";
import UserProfilePage from "./UserProfilePage";
import { Skeleton } from "@/components/ui/skeleton";

const page = async () => {
  const user = await getUserSession();
  const userData = (await getUserProfile(user.id)) || null;
  //   console.log(userData[0]);
  return (
    <div className="p-6">
      <UserProfilePage userData={userData[0]} />{" "}
      <Skeleton className="w-full h-40 mt-2" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
        <Skeleton className="w-full h-40" />
      </div>
    </div>
  );
};

export default page;
