import AllTransactionsPage from "@/component/admin/AdminAllTransmitionPage";
import { getAllPayments } from "@/lib/api/payments";
import React from "react";

export const metadata = {
  title: "Admin Dashboard | All Transactions",
};

const page = async () => {
  const allPayment = await getAllPayments();

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-200">
      <AllTransactionsPage payments={allPayment || []} />
    </div>
  );
};

export default page;
