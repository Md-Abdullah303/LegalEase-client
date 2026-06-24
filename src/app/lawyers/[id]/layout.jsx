import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const LawyerDetailsLayout = async ({ children }) => {
  const user = await getUserSession();
  if (!user) {
    return redirect("/unauthorized");
  }
  return children;
};

export default LawyerDetailsLayout;
