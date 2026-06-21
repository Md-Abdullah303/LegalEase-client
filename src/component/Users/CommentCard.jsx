// components/dashboard/CommentCard.jsx
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MessageSquare, Eye } from "lucide-react";
import Link from "next/link";
import { CommentEditModal } from "../modals/CommentEditModal";
import { CommentDeleteModal } from "../modals/CommentDeleteModal";

export default function CommentCard({ comment, onEdit, onDelete }) {
  // console.log(comment);
  return (
    <Card className="hover:shadow-md transition-shadow bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
      <CardContent className="p-4 flex flex-col h-full justify-between">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <MessageSquare className="w-4 h-4" />
            <span className="text-xs font-medium">
              To: {comment?.lawyerName || "N/A"}
            </span>
          </div>
          <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3">
            "{comment?.comment || `user comment`}"
          </p>
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
          <span className="text-[10px] text-slate-400">
            {comment?.createdAt
              ? new Date(comment?.createdAt).toLocaleDateString("en-Us", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : "N/A"}
          </span>
          <div className="flex gap-1 items-center">
            {/* View Button */}
            <Link href={`/lawyers/${comment?.lawyerId}`}>
              <Button
                variant="ghost"
                className="h-8 w-8 text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950"
              >
                <Eye className="w-3.5 h-3.5" />
              </Button>
            </Link>

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
