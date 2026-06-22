import LawyerDetailsClient from "@/component/form/LawyerDetailsClient";
import {
  getLawyerHiringByLawerId,
  isUserApplied,
} from "@/lib/api/applications";
import { getCommentsByLawyerId } from "@/lib/api/comments";
import { getLawyerByLawyerId } from "@/lib/api/lawyers";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;
  const lawyer = await getLawyerByLawyerId(id);
  const lawyerHiresHistory = await getLawyerHiringByLawerId(id);
  const user = await getUserSession();
  const areHeApplied = await isUserApplied(user?.id, lawyer._id);
  const comments = await getCommentsByLawyerId(lawyer?._id);

  // console.log(lawyerHiresHistory);
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black transition-colors">
      <LawyerDetailsClient
        lawyer={lawyer}
        areHeApplied={areHeApplied}
        user={user}
        comments={comments}
        lawyerHiresHistory={lawyerHiresHistory}
      />
    </div>
  );
};

export default LawyersDetailsPage;
