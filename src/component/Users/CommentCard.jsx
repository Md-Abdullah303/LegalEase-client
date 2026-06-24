import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Eye } from "lucide-react";
import Link from "next/link";
import { CommentEditModal } from "../modals/CommentEditModal";
import { CommentDeleteModal } from "../modals/CommentDeleteModal";

export default function CommentCard({ comment, onEdit, onDelete }) {
  return (
    <Card className="hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 bg-white dark:bg-[#121212] border-[#e5ded5] dark:border-neutral-800/70 rounded-2xl overflow-hidden flex flex-col justify-between group">
      <CardContent className="p-5 flex flex-col h-full justify-between gap-5">
        <div className="space-y-3">
          {/* Lawyer Info Badge */}
          <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400">
            <div className="p-1.5 rounded-lg bg-[#f9f4ef] dark:bg-[#1c1a17] text-[#c4a482] dark:text-[#d9bfa2]">
              <MessageSquare className="w-3.5 h-3.5" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500 truncate">
              To:{" "}
              <span className="text-neutral-800 dark:text-neutral-200 capitalize font-serif font-bold">
                {comment?.lawyerName || "N/A"}
              </span>
            </span>
          </div>

          {/* Comment Text */}
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium line-clamp-3 italic">
            {`"${comment?.comment || `user comment`}"`}
          </p>
        </div>

        {/* Footer Info & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-900">
          <span className="text-[10px] text-neutral-400 font-bold uppercase tracking-widest">
            {comment?.createdAt
              ? new Date(comment?.createdAt).toLocaleDateString("en-Us", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A"}
          </span>

          {/* Action Row */}
          <div className="flex gap-1.5 items-center">
            {/* View Button */}
            <Link href={`/lawyers/${comment?.lawyerId}`}>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition-colors"
                title="View Lawyer Profile"
              >
                <Eye className="w-4 h-4" />
              </Button>
            </Link>

            {/* Modals with preserved exact props */}
            <CommentEditModal
              userId={comment?.userId}
              lawyerId={comment?.lawyerId}
              currentComment={comment?.comment}
            />
            <CommentDeleteModal
              userId={comment?.userId}
              lawyerId={comment?.lawyerId}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
