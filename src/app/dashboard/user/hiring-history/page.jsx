// import UserHiringTable from "@/component/table/UserHiringTable";
import UserHiringTable from "@/component/table/UserHiringTable";
import { getUserHiringHistory as getUserHiringHistoryByUserId } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const UserHiringHistoryPage = async () => {
  const user = await getUserSession();
  const userHistory = await getUserHiringHistoryByUserId(user.id);
  // console.log(userHistory);

  return (
    <div className="container mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Hiring History
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2">
          Track the status of your lawyer requests and complete payments.
        </p>
      </div>

      {/* Table Component */}
      <UserHiringTable hiringHistory={userHistory} />
    </div>
  );
};

export default UserHiringHistoryPage;
