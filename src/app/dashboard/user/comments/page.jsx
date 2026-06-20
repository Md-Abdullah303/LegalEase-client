import UserCommentsPage from "@/component/Users/UserCommentsPage";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserCommentByUserid } from "@/lib/api/comments";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const page = async () => {
  const user = await getUserSession();
  const userComments = await getUserCommentByUserid(user?.id);
  return (
    <div className="">
      <UserCommentsPage comments={userComments} />
    </div>
  );
};

export default page;
