"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, MessageCircle, User, Briefcase } from "lucide-react";
import toast from "react-hot-toast";
import { createComment } from "@/lib/actions/comments";
import { useRouter } from "next/navigation";

const CommentBoxForUserAndLawyer = ({
  userId,
  lawyerId,
  userData,
  comments,
}) => {
  const [comment, setComment] = useState("");

  const router = useRouter();

  const messages = comments;

  const handleComment = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return;

    const commentData = {
      text: comment,
      userId,
      lawyerId,
      sender: userData?.role,
      name: userData?.role === "user" ? "You" : "Lawyer",
    };
    console.log("Comment Information:", commentData);

    const res = await createComment(commentData);
    if (res) {
      toast.success("Message sent!");
      setComment("");
      router.refresh();
    } else {
      toast.error("Failed to send message. Please try again.");
    }

    toast.success("Message sent!");
    setComment("");
  };

  return (
    <div className="mt-10 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-indigo-500" />
        <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-100">
          Consultation Chat
        </h2>
      </div>

      {/* মেসেজ থ্রেড লিস্ট */}
      <div className="space-y-6 mb-8">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-3 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.sender === "lawyer" && (
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center shrink-0">
                <Briefcase className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
            )}

            <div
              className={`max-w-[70%] p-4 rounded-2xl ${
                msg.sender === "user"
                  ? "bg-indigo-600 text-white rounded-tr-none"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none"
              }`}
            >
              <p className="text-sm font-semibold mb-1 opacity-80">
                {msg.name}
              </p>
              <p className="text-sm">{msg.text}</p>
            </div>

            {msg.sender === "user" && (
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0">
                <User className="w-4 h-4 text-slate-600 dark:text-slate-300" />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* নতুন মেসেজ লেখার বক্স */}
      <form
        onSubmit={handleComment}
        className="space-y-4 pt-6 border-t border-slate-100 dark:border-slate-800"
      >
        <Textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Write a message..."
          className="min-h-[100px] bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus-visible:ring-indigo-500"
        />
        <div className="flex justify-end">
          <Button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white gap-2"
          >
            <Send className="w-4 h-4" /> Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentBoxForUserAndLawyer;
