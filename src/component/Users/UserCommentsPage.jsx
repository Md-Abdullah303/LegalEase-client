"use client";

import React from "react";
import { MessageSquare } from "lucide-react";
import CommentCard from "./CommentCard";

const UserCommentsPage = ({ comments = [] }) => {
  const handleEdit = (comment) => console.log("Edit", comment);
  const handleDelete = (id) => console.log("Delete", id);

  return (
    <div className="w-full min-h-screen bg-[#fcfaf7] dark:bg-[#090909] transition-colors duration-300 py-8 px-4 sm:px-6 lg:px-8 font-sans antialiased text-neutral-800 dark:text-neutral-200">
      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-8">
        {/* Header Section */}
        <div className="border-b border-neutral-200/60 dark:border-neutral-800/60 pb-5">
          <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-neutral-900 dark:text-white tracking-wide">
            My Comments
          </h1>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1.5 font-medium">
            Manage and view your submitted feedback on professional legal
            services.
          </p>
        </div>

        {/* Conditional Rendering based on Comments Data Array */}
        {comments.length === 0 ? (
          <div className="w-full rounded-2xl border border-[#e5ded5] dark:border-neutral-800/70 bg-white dark:bg-[#121212] p-8 sm:p-16 text-center shadow-sm max-w-xl mx-auto transition-all">
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="p-4 rounded-2xl bg-[#f9f4ef] dark:bg-[#1c1a17] text-[#c4a482] dark:text-[#d9bfa2] border border-[#e5ded5]/40 dark:border-neutral-800/50 shadow-inner">
                <MessageSquare className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg font-serif font-bold text-neutral-900 dark:text-white tracking-wide">
                  No Comments Yet
                </h3>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto leading-relaxed font-medium">
                  You haven't posted any feedback on lawyers. Your shared
                  experiences will safely appear here.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Grid system accommodating responsive layout shifts */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {comments.map((comment) => (
              <CommentCard
                key={comment._id}
                comment={comment}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCommentsPage;
