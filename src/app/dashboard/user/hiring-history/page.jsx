import UserHiringTable from "@/component/table/UserHiringTable";
import { getUserHiringHistory as getUserHiringHistoryByUserId } from "@/lib/api/users";
import { getIsPaid } from "@/lib/api/payments";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const UserHiringHistoryPage = async () => {
  const user = await getUserSession();
  const userHistory = await getUserHiringHistoryByUserId(user.id);

  // প্রতিটি hiring history-র জন্য পেমেন্ট স্ট্যাটাস চেক করা হচ্ছে
  const enrichedHistory = await Promise.all(
    userHistory.map(async (history) => {
      const paymentStatus = await getIsPaid(user.id, history?.lawyerId);
      const isPaid = paymentStatus && Object.keys(paymentStatus).length > 0;

      return {
        ...history,
        isPaid: isPaid,
      };
    }),
  );

  return (
    <div className="w-full min-h-screen bg-[#fcfaf7] dark:bg-[#090909] transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-neutral-800 dark:text-neutral-200">
      <div className="max-w-6xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-5">
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-neutral-900 dark:text-white tracking-wide">
            Hiring History
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 font-medium">
            Track the status of your lawyer requests and manage premium secure
            payments.
          </p>
        </div>

        {/* Hiring Table / Empty State Loader Component */}
        <UserHiringTable hiringHistory={enrichedHistory} />
      </div>
    </div>
  );
};

export default UserHiringHistoryPage;
