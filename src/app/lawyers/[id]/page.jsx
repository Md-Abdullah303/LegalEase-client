import LawyerDetailsClient from "@/component/form/LawyerDetailsClient";
import { getLawyerByLawyerId } from "@/lib/api/lawyers";
import React from "react";

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;
  const lawyer = await getLawyerByLawyerId(id);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black transition-colors">
      <LawyerDetailsClient lawyer={lawyer} />
    </div>
  );
};

export default LawyersDetailsPage;
