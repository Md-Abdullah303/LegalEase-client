import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const DashboardLayout = async ({ children }) => {
  const user = await getUserSession();
  if (user.role !== "admin") {
    return redirect("/forbidden");
  }
  return children;
};

export default DashboardLayout;
