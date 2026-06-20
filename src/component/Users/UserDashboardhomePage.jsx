"use client";

import React from "react";
import {
  FiMail,
  FiShield,
  FiCalendar,
  FiEdit,
  FiBriefcase,
  FiClock,
  FiCreditCard,
  FiMessageSquare,
  FiArrowRight,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const UserDashboardHome = ({ userData, userHiringHistories, userComments }) => {
  const totalHires = userHiringHistories.length || "0";
  const pendingCount = userHiringHistories.filter(
    (request) => request.status === "Pending",
  ).length;
  const userCommentsLength = userComments.length || "0";

  const stats = [
    {
      title: "Total Hires",
      count: totalHires || 0,
      icon: <FiBriefcase className="w-6 h-6 text-blue-500" />,
      bg: "bg-blue-100",
    },
    {
      title: "Pending Requests",
      count: pendingCount || 0,
      icon: <FiClock className="w-6 h-6 text-orange-500" />,
      bg: "bg-orange-100",
    },
    {
      title: "To Pay",
      count: 0,
      icon: <FiCreditCard className="w-6 h-6 text-red-500" />,
      bg: "bg-red-100",
    },
    {
      title: "Total Comments",
      count: userCommentsLength || 0,
      icon: <FiMessageSquare className="w-6 h-6 text-green-500" />,
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          Welcome back, {userData?.name.split(" ")[0]}! 👋
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your legal hiring profile and activities here.
        </p>
      </div>

      {/* Profile Card Section */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-gray-100 dark:border-gray-800 shrink-0 bg-gray-200">
            <Image
              width={600}
              height={400}
              src={
                userData?.image ||
                `https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168`
              }
              alt={userData?.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150";
              }}
            />
          </div>

          {/* User Info */}
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">
              {userData?.name}
            </h2>
            <div className="flex flex-col gap-1.5 text-sm text-gray-600 dark:text-gray-400">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <FiMail className="w-4 h-4" /> {userData?.email}
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <FiShield className="w-4 h-4" /> {userData?.role}
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <FiCalendar className="w-4 h-4" /> Joined:{" "}
                {userData?.createdAt
                  ? new Date(userData?.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "N/A"}
              </p>
            </div>
          </div>
        </div>

        {/* Update Profile Button */}
        <Link
          href="/dashboard/user/update-profile"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200"
        >
          <FiEdit className="w-4 h-4" />
          Update Profile
        </Link>
      </div>

      {/* Quick Overview (Stats Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 flex items-center gap-4"
          >
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} dark:bg-opacity-10 shrink-0`}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                {stat.title}
              </p>
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {stat.count}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Mini-Table (Optional but recommended) */}
      <div className="bg-white dark:bg-[#1f1f1f] border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Recent Hiring Activity
          </h3>
          <Link
            href="/dashboard/user/hiring-history"
            className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1"
          >
            View All <FiArrowRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-600 dark:text-gray-300">
              <tr>
                <th className="px-6 py-3 font-medium">Lawyer Name</th>
                <th className="px-6 py-3 font-medium">Specialization</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {userHiringHistories.slice(0, 2).map((history) => (
                <tr
                  key={history?._id}
                  className="bg-white dark:bg-[#1f1f1f] hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200">
                    {history?.lawyerName || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                    {history?.specialization || "N/A"}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        history?.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400"
                          : history?.status === "Rejected"
                            ? "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400"
                      }`}
                    >
                      {history?.status || "N/A"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {history?.status === "Approved" ? (
                      <Link
                        href={`/dashboard/user/hiring-history`}
                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors"
                      >
                        Go and Pay
                      </Link>
                    ) : (
                      <span className="text-sm text-gray-400 dark:text-gray-600 italic">
                        Awaiting Action
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
