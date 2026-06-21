"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Send,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Pencil,
  Trash2,
} from "lucide-react";
import { createComment } from "@/lib/actions/comments";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CommentEditModal } from "../modals/CommentEditModal";
import { CommentDeleteModal } from "../modals/CommentDeleteModal";

export default function CommentSection({
  user,
  lawyer,
  comments = [],
  status,
}) {
  const [showAll, setShowAll] = useState(false);
  const [commentText, setCommentText] = useState("");

  const router = useRouter();
  const commentPermision = user?.role === "user" && status === "Approved";

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    const CommentData = {
      comment: commentText,
      userId: user?.id,
      userName: user?.name,
      userImage:
        user?.image ||
        "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168",
      lawyerId: lawyer?._id,
      lawyerName: lawyer?.name,
    };

    const res = await createComment(CommentData);
    if (res) {
      toast.success("Comment was added.");
      setCommentText("");
      router.refresh();
    } else {
      toast.error("Something went wrong!");
    }
  };

  const displayedComments = showAll ? comments : comments.slice(0, 2);

  return (
    <Card className="w-full shadow-sm border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 text-slate-900 dark:text-slate-100">
          <MessageSquare className="w-5 h-5" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Box */}
        {commentPermision && (
          <div className="flex gap-4 items-start">
            <Avatar className="w-10 h-10 border border-slate-200 dark:border-slate-700">
              <AvatarFallback className="bg-slate-100 dark:bg-slate-800">
                Me
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="resize-none min-h-[80px] bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  size="sm"
                >
                  <Send className="w-4 h-4 mr-2" /> Post
                </Button>
              </div>
            </div>
          </div>
        )}

        <Separator className="bg-slate-200 dark:bg-slate-800" />

        {/* Empty State */}
        {comments.length === 0 ? (
          <div className="text-center py-8 text-slate-500 dark:text-slate-400 italic">
            No comments yet. Be the first to share your thoughts!
          </div>
        ) : (
          <div className="space-y-6">
            <AnimatePresence initial={false}>
              {displayedComments.map((comment) => (
                <motion.div
                  key={comment?._id}
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-4 items-start"
                >
                  <Avatar className="w-10 h-10 border border-slate-200 dark:border-slate-700">
                    <AvatarFallback>
                      {comment?.userName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {comment?.userName}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          {comment?.createdAt
                            ? new Date(comment.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>

                        {/* Edit & Delete Buttons (Only show for comment owner) */}
                        {user?.id === comment?.userId && (
                          <div className="flex gap-1 items-center">
                            <CommentEditModal
                              userId={user?.id}
                              lawyerId={lawyer?._id}
                              currentComment={comment?.comment}
                            />
                            <CommentDeleteModal
                              userId={user?.id}
                              lawyerId={lawyer?._id}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300">
                      {comment?.comment}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {comments.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="w-full"
              >
                {showAll ? (
                  <>
                    Show Less <ChevronUp className="ml-2 w-4 h-4" />
                  </>
                ) : (
                  <>
                    Show More <ChevronDown className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
