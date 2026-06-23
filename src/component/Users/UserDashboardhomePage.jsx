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
  FiPhone,
  FiMapPin,
  FiLinkedin,
  FiFileText,
  FiUser,
} from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

const UserDashboardHome = ({
  userData,
  userHiringHistories,
  userComments,
  userServerData,
  totalPay,
}) => {
  const totalHires = userHiringHistories?.length || 0;
  const pendingCount =
    userHiringHistories?.filter((request) => request.status === "Pending")
      .length || 0;
  const userCommentsLength = userComments?.length || 0;

  const stats = [
    {
      title: "Total Hires",
      count: totalHires,
      icon: (
        <FiBriefcase className="w-6 h-6 text-[#c4a482] dark:text-[#d9bfa2]" />
      ),
      bg: "bg-[#f9f4ef] dark:bg-[#1a1815]",
    },
    {
      title: "Pending Requests",
      count: pendingCount,
      icon: <FiClock className="w-6 h-6 text-[#c4a482] dark:text-[#d9bfa2]" />,
      bg: "bg-[#f9f4ef] dark:bg-[#1a1815]",
    },
    {
      title: "To Pay",
      count: totalPay.length || 0,
      icon: (
        <FiCreditCard className="w-6 h-6 text-[#c4a482] dark:text-[#d9bfa2]" />
      ),
      bg: "bg-[#f9f4ef] dark:bg-[#1a1815]",
    },
    {
      title: "Total Comments",
      count: userCommentsLength,
      icon: (
        <FiMessageSquare className="w-6 h-6 text-[#c4a482] dark:text-[#d9bfa2]" />
      ),
      bg: "bg-[#f9f4ef] dark:bg-[#1a1815]",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#f8f5f2] dark:bg-[#0a0a0a] transition-colors duration-500 p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900 dark:text-[#d9bfa2] tracking-wide">
            Welcome back,{" "}
            {userData?.name ? userData.name.split(" ")[0] : "User"}! 👋
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            Manage your legal hiring profile and activities here.
          </p>
        </div>

        {/* Premium Profile Card Section */}
        <div className="bg-white dark:bg-[#121212] border border-[#e5ded5] dark:border-[#222222] rounded-2xl shadow-xl p-6 md:p-8 flex flex-col gap-8 transition-colors">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col md:flex-row items-center md:items-center gap-6">
              <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[#f9f4ef] dark:border-[#1a1a1a] shadow-md shrink-0 bg-gray-200">
                <Image
                  width={600}
                  height={400}
                  src={
                    userData?.image ||
                    `https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168`
                  }
                  alt={userData?.name || "Profile Picture"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
              </div>

              <div className="text-center md:text-left space-y-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {userData?.name || "N/A"}
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm font-medium">
                  <span className="flex items-center gap-1.5 bg-[#f9f4ef] dark:bg-[#1a1a1a] text-[#c4a482] dark:text-[#d9bfa2] px-3 py-1 rounded-full border border-[#e5ded5] dark:border-[#333]">
                    <FiShield className="w-4 h-4" /> {userData?.role || "User"}
                  </span>
                  <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                    <FiCalendar className="w-4 h-4" /> Joined:{" "}
                    {userData?.createdAt
                      ? new Date(userData?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Update Profile Button */}
            <Link
              href="/dashboard/user/update-profile"
              className="flex items-center justify-center gap-2 bg-[#222] hover:bg-black text-[#d9bfa2] dark:bg-[#d9bfa2] dark:hover:bg-[#cbb092] dark:text-[#0a0a0a] px-6 py-3 rounded-lg font-bold text-sm uppercase tracking-widest transition-all shadow-md shrink-0 w-full md:w-auto"
            >
              <FiEdit className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>

          <hr className="border-[#e5ded5] dark:border-[#222222]" />

          {/* New Expanded Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-[#f9f4ef] dark:bg-[#1a1a1a] rounded-md text-[#c4a482] dark:text-[#d9bfa2]">
                <FiMail className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                  Email Address
                </p>
                <p className="font-medium">{userData?.email || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-[#f9f4ef] dark:bg-[#1a1a1a] rounded-md text-[#c4a482] dark:text-[#d9bfa2]">
                <FiPhone className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                  Phone Number
                </p>
                <p className="font-medium">{userServerData?.phone || "N/A"}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-[#f9f4ef] dark:bg-[#1a1a1a] rounded-md text-[#c4a482] dark:text-[#d9bfa2]">
                <FiMapPin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                  Location / Address
                </p>
                <p className="font-medium">
                  {userServerData?.address || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
              <div className="p-2 bg-[#f9f4ef] dark:bg-[#1a1a1a] rounded-md text-[#c4a482] dark:text-[#d9bfa2]">
                <FiLinkedin className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-0.5">
                  LinkedIn Profile
                </p>
                {userServerData?.linkedinUrl ? (
                  <a
                    href={userServerData?.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#c4a482] dark:text-[#d9bfa2] hover:underline"
                  >
                    View Profile ↗
                  </a>
                ) : (
                  <p className="font-medium">N/A</p>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-[#fdfdfc] dark:bg-[#1a1a1a] p-5 rounded-xl border border-[#e5ded5] dark:border-[#333]">
            <div className="flex items-center gap-2 mb-2 text-gray-800 dark:text-gray-200 font-semibold uppercase tracking-wider text-xs">
              <FiFileText className="text-[#c4a482] dark:text-[#d9bfa2] text-lg" />
              Bio / About
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
              {userServerData?.bio ||
                "No bio provided yet. Update your profile to tell us a bit about yourself."}
            </p>
          </div>
        </div>

        {/* Quick Overview (Stats Cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#121212] border border-[#e5ded5] dark:border-[#222222] rounded-xl shadow-md p-6 flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300"
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} shrink-0`}
              >
                {stat.icon}
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider mb-1">
                  {stat.title}
                </p>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.count}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Mini-Table */}
        <div className="bg-white dark:bg-[#121212] border border-[#e5ded5] dark:border-[#222222] rounded-xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-[#e5ded5] dark:border-[#222222] flex justify-between items-center bg-[#fdfdfc] dark:bg-[#1a1a1a]">
            <h3 className="text-lg font-serif font-semibold text-gray-900 dark:text-[#d9bfa2]">
              Recent Hiring Activity
            </h3>
            <Link
              href="/dashboard/user/hiring-history"
              className="text-[#c4a482] dark:text-[#d9bfa2] hover:text-black dark:hover:text-white text-sm font-semibold uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              View All <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#f9f4ef] dark:bg-[#151515] text-gray-600 dark:text-gray-400 uppercase tracking-wider text-xs font-semibold">
                <tr>
                  <th className="px-6 py-4">Lawyer Name</th>
                  <th className="px-6 py-4">Specialization</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e5ded5] dark:divide-[#222222]">
                {userHiringHistories?.length > 0 ? (
                  userHiringHistories.slice(0, 2).map((history) => (
                    <tr
                      key={history?._id}
                      className="bg-white dark:bg-[#121212] hover:bg-[#fdfdfc] dark:hover:bg-[#1a1a1a] transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                        {history?.lawyerName || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">
                        {history?.specialization || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide ${
                            history?.status === "Approved"
                              ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              : history?.status === "Rejected"
                                ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                : "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                          }`}
                        >
                          {history?.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {history?.status === "Approved" ? (
                          <Link
                            href={`/dashboard/user/hiring-history`}
                            className="px-4 py-2 text-xs font-bold text-[#0a0a0a] bg-[#d9bfa2] hover:bg-[#cbb092] rounded-md transition-colors uppercase tracking-wider"
                          >
                            Pay Now
                          </Link>
                        ) : (
                          <span className="text-xs text-gray-400 dark:text-gray-600 italic font-medium">
                            Awaiting Action
                          </span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="4"
                      className="px-6 py-8 text-center text-gray-500 dark:text-gray-400 font-medium"
                    >
                      No hiring history found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardHome;
