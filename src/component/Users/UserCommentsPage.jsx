// app/dashboard/user/comments/page.jsx
"use client";

import React from "react";
// import CommentCard from "@/components/dashboard/CommentCard";
import { MessageSquare } from "lucide-react";
import CommentCard from "./CommentCard";

const UserCommentsPage = ({ comments }) => {
  const handleEdit = (comment) => console.log("Edit", comment);
  const handleDelete = (id) => console.log("Delete", id);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          My Comments
        </h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          Manage your feedback on professional services.
        </p>
      </div>

      {comments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-lg">
          <MessageSquare className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
            No comments yet
          </h3>
          <p className="text-slate-500">{`You haven't posted any feedback on lawyers.`}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
  );
};

export default UserCommentsPage;
