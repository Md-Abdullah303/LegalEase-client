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
import React from "react";

export const metadata = {
  title: "LegalEase | Lawyers Details",
};

const LawyersDetailsPage = async ({ params }) => {
  const { id } = await params;

  // user আর lawyer আগে fetch — বাকি সব এদের উপর নির্ভরশীল
  const [user, lawyer] = await Promise.all([
    getUserSession(),
    getLawyerByLawyerId(id),
  ]);

  // lawyer._id পাওয়ার পর বাকি ৫টা একসাথে
  const [lawyerHiresHistory, userData, areHeApplied, comments, isPaid] =
    await Promise.all([
      getLawyerHiringByLawerId(id),
      getUserProfile(user?.id),
      isUserApplied(user?.id, lawyer._id),
      getCommentsByLawyerId(lawyer._id),
      getIsPaid(user?.id, lawyer._id),
    ]);

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black transition-colors">
      <LawyerDetailsClient
        lawyer={lawyer}
        areHeApplied={areHeApplied}
        user={user}
        comments={comments}
        lawyerHiresHistory={lawyerHiresHistory}
        userData={userData?.[0]}
        isPaid={isPaid}
      />
    </div>
  );
};

export default LawyersDetailsPage;
