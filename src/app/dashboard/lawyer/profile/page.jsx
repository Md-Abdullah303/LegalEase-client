import React from "react";
import LawyerProfile from "./LawyerProfile";
import { getUserSession } from "@/lib/core/session";
import { getLawyerByLawyerId } from "@/lib/api/lawyers";

export const metadata = {
  title: "User Dashboard | Update Profile",
};

const page = async () => {
  const userData = await getUserSession();
  const fetchLawyerData = await getLawyerByLawyerId(userData?.id);

  //   console.log(userData?.id);
  // console.log(fetchLawyerData);

  return (
    <div>
      <LawyerProfile lawyerData={fetchLawyerData} userData={userData} />
    </div>
  );
};

export default page;
