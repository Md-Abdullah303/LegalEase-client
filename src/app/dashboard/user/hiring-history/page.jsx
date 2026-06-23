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
      // getIsPaid-এ userId এবং lawyerId পাঠানো হচ্ছে
      // (নিশ্চিত হয়ে নিন আপনার ডাটাবেজ অবজেক্টে ফিল্ডের নাম 'lawyerId' ই আছে কিনা)
      const paymentStatus = await getIsPaid(user.id, history?.lawyerId);

      // যদি অবজেক্টে ডেটা থাকে (ফাঁকা না হয়), তাহলে true অন্যথায় false
      const isPaid = paymentStatus && Object.keys(paymentStatus).length > 0;

      return {
        ...history,
        isPaid: isPaid, // নতুন প্রোপার্টি যোগ করা হলো
      };
    }),
  );

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

      {/* মডিফাইড বা সমৃদ্ধ হিস্ট্রি পাঠানো হচ্ছে */}
      <UserHiringTable hiringHistory={enrichedHistory} />
    </div>
  );
};

export default UserHiringHistoryPage;
