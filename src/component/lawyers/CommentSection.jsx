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
import { CommentEditModal } from "../modals/CommentEditModal";
import { CommentDeleteModal } from "../modals/CommentDeleteModal";

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
    /* কার্ডের বর্ডার ও ব্যাকগ্রাউন্ড কালার পরিবর্তন */
    <Card className="w-full shadow-sm border-[#c4a482]/30 dark:border-[#c4a482]/20 bg-white dark:bg-[#1d1d1d] transition-colors">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 text-[#1d1d1d] dark:text-white font-serif">
          {/* আইকন কালার হিসেবে #c4a482 দেওয়া হয়েছে */}
          <MessageSquare className="w-5 h-5 text-[#c4a482]" />
          Comments ({comments.length})
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Input Box */}
        {commentPermision && (
          <div className="flex gap-4 items-start">
            <Avatar className="w-10 h-10 border border-gray-200 dark:border-zinc-800">
              <AvatarFallback className="bg-gray-100 dark:bg-zinc-800 text-[#1d1d1d] dark:text-gray-300">
                Me
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-2">
              <Textarea
                placeholder="Write a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="resize-none min-h-[80px] bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-zinc-800 focus-visible:ring-[#c4a482] text-[#1d1d1d] dark:text-white"
              />
              <div className="flex justify-end">
                {/* 
                  পোস্ট বাটনটিকে আগের বাটনগুলোর মতো লাইট মোডে ডার্ক (#1d1d1d) 
                  এবং ডার্ক মোডে গোল্ডেন (#c4a482) লুক দেওয়া হয়েছে।
                */}
                <Button
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  size="sm"
                  className="bg-[#1d1d1d] hover:bg-[#2c2c2c] text-white dark:bg-[#c4a482] dark:hover:bg-[#b09270] dark:text-[#1d1d1d] font-medium transition-colors duration-300 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 mr-2" /> Post
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* সেপারেটরের কালার গোল্ডেন টোনের হালকা অপাসিটি করা হয়েছে */}
        <Separator className="bg-[#c4a482]/20" />

        {/* Empty State */}
        {comments.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400 italic">
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
                  <Avatar className="w-10 h-10 border border-gray-200 dark:border-zinc-800">
                    <AvatarFallback className="bg-gray-100 dark:bg-zinc-800 text-[#1d1d1d] dark:text-gray-300 font-medium">
                      {comment?.userName?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      {/* ইউজারনেম ডার্ক মোডে গোল্ডেন হাইলাইট পাবে */}
                      <h4 className="text-sm font-semibold text-[#1d1d1d] dark:text-[#c4a482]">
                        {comment?.userName}
                      </h4>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {comment?.createdAt
                            ? new Date(comment.createdAt).toLocaleDateString()
                            : "N/A"}
                        </span>

                        {/* Edit & Delete Buttons */}
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
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {comment?.comment}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Show More / Less Button */}
            {comments.length > 2 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="w-full text-gray-600 dark:text-gray-400 hover:text-[#c4a482] dark:hover:text-[#c4a482] hover:bg-[#c4a482]/5 transition-colors duration-200"
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
