import LawyerDetailsClient from "@/component/form/LawyerDetailsClient";
import { isUserApplied } from "@/lib/api/applications";
import { getLawyerByLawyerId } from "@/lib/api/lawyers";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;
  const lawyer = await getLawyerByLawyerId(id);
  const user = await getUserSession();
  const areHeApplied = await isUserApplied(user?.id, lawyer._id);
  // console.log(areHeApplied);
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black transition-colors">
      <LawyerDetailsClient
        lawyer={lawyer}
        areHeApplied={areHeApplied}
        user={user}
      />
    </div>
  );
};

export default LawyersDetailsPage;
