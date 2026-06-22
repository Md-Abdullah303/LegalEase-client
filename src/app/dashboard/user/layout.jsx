import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const UserLayout = async ({ children }) => {
  const user = await getUserSession();
  if (user.role !== "user") {
    return redirect("/forbidden");
  }
  return children;
};

export default UserLayout;
