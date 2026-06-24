"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Send, MessageSquare, ChevronDown, ChevronUp } from "lucide-react";
import { createComment } from "@/lib/actions/comments";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CommentEditModal } from "../modals/CommentEditModal"; // পাথ ঠিক রাখবেন
import { CommentDeleteModal } from "../modals/CommentDeleteModal"; // পাথ ঠিক রাখবেন

export default function CommentSection({
  user,
  lawyer,
  comments = [],
  status,
  isPaid,
}) {
  const [showAll, setShowAll] = useState(false);
  const [commentText, setCommentText] = useState("");

  const router = useRouter();
  const commentPermision = user?.role === "user" && isPaid?._id;

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
    <Card className="w-full border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-[#1d1d1d] shadow-sm rounded-2xl transition-colors overflow-hidden">
      <CardHeader className="p-5 md:p-6 border-b border-neutral-100 dark:border-neutral-800/60">
        <CardTitle className="text-lg md:text-xl flex items-center gap-2.5 text-[#1d1d1d] dark:text-white font-serif font-bold">
          <MessageSquare className="w-5 h-5 text-[#c4a482]" />
          <span>Discussion Matrix ({comments.length})</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="p-5 md:p-6 space-y-6">
        {/* Comment Entry Input Box */}
        {commentPermision && (
          <div className="flex gap-3 md:gap-4 items-start w-full">
            <Avatar className="w-9 h-9 md:w-10 md:h-10 border border-neutral-100 dark:border-neutral-800 shadow-sm shrink-0">
              <AvatarFallback className="bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 font-bold text-xs">
                Me
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2.5 w-full">
              <Textarea
                placeholder="Share your experience or inquiry regarding this counsel..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="resize-none min-h-[85px] w-full bg-neutral-50 dark:bg-[#1a1a1a] border-neutral-200 dark:border-neutral-800 focus-visible:ring-[#c4a482] text-neutral-900 dark:text-white rounded-xl p-3 text-sm md:text-base"
              />
              <div className="flex justify-end">
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  size="sm"
                  className="bg-[#1d1d1d] hover:bg-[#2c2c2c] text-white dark:bg-[#c4a482] dark:hover:bg-[#b09270] dark:text-[#1d1d1d] font-bold transition-all duration-300 cursor-pointer disabled:opacity-40 px-4 py-2.5 rounded-xl h-auto active:scale-97 text-xs md:text-sm"
                >
                  <Send className="w-3.5 h-3.5 mr-2" /> Post Feed
                </Button>
              </div>
            </div>
          </div>
        )}

        {commentPermision && <Separator className="bg-[#c4a482]/15" />}

        {/* Empty State vs Comment List */}
        {comments.length === 0 ? (
          <div className="text-center py-10 text-neutral-400 dark:text-neutral-500 text-sm italic">
            No public interactions listed yet. Be the first to share your
            thoughts!
          </div>
        ) : (
          <div className="space-y-5 md:space-y-6">
            <AnimatePresence initial={false}>
              {displayedComments.map((comment) => (
                <motion.div
                  key={comment?._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex gap-3 md:gap-4 items-start w-full"
                >
                  <Avatar className="w-9 h-9 md:w-10 md:h-10 border border-neutral-100 dark:border-neutral-800 shadow-sm shrink-0">
                    <AvatarFallback className="bg-neutral-100 dark:bg-neutral-800 text-[#1d1d1d] dark:text-[#c4a482] font-bold text-sm">
                      {comment?.userName?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1 bg-neutral-50/50 dark:bg-[#151515]/40 rounded-xl p-3 md:p-4 border border-neutral-100/50 dark:border-neutral-900/40 w-full overflow-hidden">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                      <h4 className="text-xs md:text-sm font-bold text-[#1d1d1d] dark:text-[#c4a482] capitalize">
                        {comment?.userName}
                      </h4>
                      <div className="flex items-center gap-2.5 shrink-0">
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-medium">
                          {comment?.createdAt
                            ? new Date(comment.createdAt).toLocaleDateString(
                                undefined,
                                {
                                  year: "numeric",
                                  month: "short",
                                  day: "numeric",
                                },
                              )
                            : "N/A"}
                        </span>

                        {/* Edit & Delete Action Modals */}
                        {user?.id === comment?.userId && (
                          <div className="flex gap-1 items-center scale-90 md:scale-100 origin-right">
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
                    <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed break-words">
                      {comment?.comment}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* View More / Show Less Pagination Button */}
            {comments.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="w-full text-neutral-500 dark:text-neutral-400 hover:text-[#c4a482] dark:hover:text-[#c4a482] hover:bg-[#c4a482]/5 transition-colors duration-200 mt-2 py-3 rounded-xl font-semibold text-xs md:text-sm"
              >
                {showAll ? (
                  <span className="flex items-center justify-center gap-1.5">
                    Collapse Thread <ChevronUp className="w-4 h-4" />
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    View Complete Thread ({comments.length - 2} more){" "}
                    <ChevronDown className="w-4 h-4" />
                  </span>
                )}
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
