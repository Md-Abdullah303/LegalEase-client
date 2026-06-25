import LawyerDetailsClient from "@/component/form/LawyerDetailsClient";
import {
  getLawyerHiringByLawerId,
  isUserApplied,
} from "@/lib/api/applications";
import { getCommentsByLawyerId } from "@/lib/api/comments";
import { getLawyerByLawyerId } from "@/lib/api/lawyers";
import { getIsPaid } from "@/lib/api/payments";
import { getUserProfile } from "@/lib/api/users";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";
import React from "react";

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;
  const user = await getUserSession();

  const lawyer = await getLawyerByLawyerId(id);
  const lawyerHiresHistory = await getLawyerHiringByLawerId(id);
  const userData = await getUserProfile(user?.id);
  const areHeApplied = await isUserApplied(user?.id, lawyer._id);
  const comments = await getCommentsByLawyerId(lawyer?._id);
  const isPaid = await getIsPaid(user?.id, lawyer?._id);
  // console.log("isPaid", isPaid);

  // console.log(userData[0]);
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black transition-colors">
      <LawyerDetailsClient
        lawyer={lawyer}
        areHeApplied={areHeApplied}
        user={user}
        comments={comments}
        lawyerHiresHistory={lawyerHiresHistory}
        userData={userData[0]}
        isPaid={isPaid}
      />
    </div>
  );
};

export default LawyersDetailsPage;
