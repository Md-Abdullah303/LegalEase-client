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
        <FiBriefcase className="w-5 h-5 md:w-6 h-6 text-[#c4a482] dark:text-[#d9bfa2]" />
      ),
      bg: "bg-[#f9f4ef] dark:bg-[#1e1b18]",
    },
    {
      title: "Pending Requests",
      count: pendingCount,
      icon: (
        <FiClock className="w-5 h-5 md:w-6 h-6 text-[#c4a482] dark:text-[#d9bfa2]" />
      ),
      bg: "bg-[#f9f4ef] dark:bg-[#1e1b18]",
    },
    {
      title: "To Pay",
      count: totalPay?.length || 0,
      icon: (
        <FiCreditCard className="w-5 h-5 md:w-6 h-6 text-[#c4a482] dark:text-[#d9bfa2]" />
      ),
      bg: "bg-[#f9f4ef] dark:bg-[#1e1b18]",
    },
    {
      title: "Total Comments",
      count: userCommentsLength,
      icon: (
        <FiMessageSquare className="w-5 h-5 md:w-6 h-6 text-[#c4a482] dark:text-[#d9bfa2]" />
      ),
      bg: "bg-[#f9f4ef] dark:bg-[#1e1b18]",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[#fcfaf7] dark:bg-[#090909] transition-colors duration-300 p-4 sm:p-6 lg:p-8 font-sans antialiased text-neutral-800 dark:text-neutral-200">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-neutral-200/50 dark:border-neutral-800/50 pb-5">
          <div>
            <h1 className="text-2xl sm:text-3xl font-serif font-extrabold text-neutral-900 dark:text-white tracking-wide">
              Welcome back,{" "}
              <span className="text-[#c4a482] dark:text-[#d9bfa2]">
                {userData?.name ? userData.name.split(" ")[0] : "User"}
              </span>
              ! 👋
            </h1>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1 font-medium">
              Manage your legal hiring profile and real-time activities here.
            </p>
          </div>
        </div>

        {/* Premium Profile Card Section */}
        <div className="bg-white dark:bg-[#121212] border border-[#e5ded5] dark:border-neutral-800/70 rounded-2xl shadow-sm hover:shadow-md p-5 sm:p-6 lg:p-8 flex flex-col gap-6 md:gap-8 transition-all">
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-6">
            {/* Avatar & Basic Info */}
            <div className="flex flex-col sm:flex-row items-center gap-5 w-full lg:w-auto">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden ring-4 ring-[#f9f4ef] dark:ring-[#1a1a1a] shadow-inner shrink-0 bg-neutral-100 dark:bg-neutral-800 relative">
                <Image
                  fill
                  src={
                    userData?.image ||
                    `https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168`
                  }
                  alt={userData?.name || "Profile Picture"}
                  className="object-cover"
                  sizes="(max-width: 640px) 96px, 112px"
                  loading="lazy"
                />
              </div>

              <div className="text-center sm:text-left space-y-2 w-full">
                <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif tracking-wide capitalize">
                  {userData?.name || "N/A"}
                </h2>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 text-xs sm:text-sm font-semibold">
                  <span className="flex items-center gap-1.5 bg-[#f9f4ef] dark:bg-[#1c1a17] text-[#c4a482] dark:text-[#d9bfa2] px-3 py-1 rounded-lg border border-[#e5ded5]/60 dark:border-neutral-800 uppercase tracking-wider text-[11px]">
                    <FiShield className="w-3.5 h-3.5" />{" "}
                    {userData?.role || "User"}
                  </span>
                  <span className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900 px-3 py-1 rounded-lg border border-neutral-100 dark:border-neutral-800/40">
                    <FiCalendar className="w-3.5 h-3.5 text-[#c4a482]" />{" "}
                    Joined:{" "}
                    {userData?.createdAt
                      ? new Date(userData?.createdAt).toLocaleDateString(
                          "en-US",
                          { month: "short", day: "numeric", year: "numeric" },
                        )
                      : "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* Update Profile Button */}
            <Link
              href="/dashboard/user/update-profile"
              className="flex items-center justify-center gap-2 bg-[#1d1d1d] hover:bg-neutral-800 text-white dark:bg-[#c4a482] dark:hover:bg-[#b09270] dark:text-[#1d1d1d] px-5 py-3 rounded-xl font-bold text-xs sm:text-sm uppercase tracking-widest transition-all shadow-sm active:scale-98 w-full sm:w-max lg:w-auto shrink-0"
            >
              <FiEdit className="w-4 h-4" />
              Edit Profile
            </Link>
          </div>

          <hr className="border-neutral-100 dark:border-neutral-800/60" />

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 text-sm">
            <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 dark:bg-[#161616]/40 rounded-xl border border-neutral-100/70 dark:border-neutral-900/40">
              <div className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg text-[#c4a482] dark:text-[#d9bfa2] shadow-sm shrink-0">
                <FiMail className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-bold mb-0.5">
                  Email Address
                </p>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                  {userData?.email || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 dark:bg-[#161616]/40 rounded-xl border border-neutral-100/70 dark:border-neutral-900/40">
              <div className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg text-[#c4a482] dark:text-[#d9bfa2] shadow-sm shrink-0">
                <FiPhone className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-bold mb-0.5">
                  Phone Number
                </p>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                  {userServerData?.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 dark:bg-[#161616]/40 rounded-xl border border-neutral-100/70 dark:border-neutral-900/40">
              <div className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg text-[#c4a482] dark:text-[#d9bfa2] shadow-sm shrink-0">
                <FiMapPin className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-bold mb-0.5">
                  Location / Address
                </p>
                <p className="font-semibold text-neutral-800 dark:text-neutral-200 truncate">
                  {userServerData?.address || "N/A"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 bg-neutral-50 dark:bg-[#161616]/40 rounded-xl border border-neutral-100/70 dark:border-neutral-900/40">
              <div className="p-2.5 bg-white dark:bg-neutral-800 rounded-lg text-[#c4a482] dark:text-[#d9bfa2] shadow-sm shrink-0">
                <FiLinkedin className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[10px] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest font-bold mb-0.5">
                  LinkedIn Profile
                </p>
                {userServerData?.linkedinUrl ? (
                  <a
                    href={userServerData?.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[#c4a482] dark:text-[#d9bfa2] hover:underline flex items-center gap-1 text-sm truncate"
                  >
                    View Profile ↗
                  </a>
                ) : (
                  <p className="font-semibold text-neutral-400 dark:text-neutral-500">
                    N/A
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="bg-neutral-50 dark:bg-[#161616] p-4 sm:p-5 rounded-xl border border-neutral-100 dark:border-neutral-900">
            <div className="flex items-center gap-2 mb-2.5 text-neutral-800 dark:text-neutral-200 font-bold uppercase tracking-wider text-xs">
              <FiFileText className="text-[#c4a482] dark:text-[#d9bfa2] text-base" />
              Bio / About
            </div>
            <p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap font-medium">
              {userServerData?.bio ||
                "No bio provided yet. Update your profile to tell us a bit about yourself."}
            </p>
          </div>
        </div>

        {/* Quick Overview (Stats Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-[#121212] border border-[#e5ded5]/80 dark:border-neutral-800/70 rounded-xl shadow-sm p-4 sm:p-5 md:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5"
            >
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center ${stat.bg} shrink-0 shadow-inner`}
              >
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] sm:text-xs text-neutral-400 dark:text-neutral-500 font-bold uppercase tracking-wider mb-0.5 truncate">
                  {stat.title}
                </p>
                <h3 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white font-serif">
                  {stat.count}
                </h3>
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity Mini-Table */}
        <div className="bg-white dark:bg-[#121212] border border-[#e5ded5]/80 dark:border-neutral-800/70 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-5 py-4 sm:px-6 sm:py-5 border-b border-neutral-100 dark:border-neutral-800/70 flex justify-between items-center bg-neutral-50/60 dark:bg-[#151515]">
            <h3 className="text-base sm:text-lg font-serif font-bold text-neutral-900 dark:text-[#d9bfa2]">
              Recent Hiring Activity
            </h3>
            <Link
              href="/dashboard/user/hiring-history"
              className="text-[#c4a482] dark:text-[#d9bfa2] hover:text-[#b09270] text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              View All <FiArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Card Based Layout for Mobile, Table layout for Tablet/Desktop */}
          <div className="block md:hidden divide-y divide-neutral-100 dark:divide-neutral-900">
            {userHiringHistories?.length > 0 ? (
              userHiringHistories.slice(0, 2).map((history) => (
                <div
                  key={history?._id}
                  className="p-4 space-y-3 bg-white dark:bg-[#121212]"
                >
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="font-bold text-sm text-neutral-900 dark:text-white capitalize">
                        {history?.lawyerName || "N/A"}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-0.5">
                        {history?.specialization || "N/A"}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider ${
                        history?.status === "Approved"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : history?.status === "Rejected"
                            ? "bg-rose-50 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400"
                            : "bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400"
                      }`}
                    >
                      {history?.status || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-end pt-1">
                    {history?.status === "Approved" ? (
                      <Link
                        href={`/dashboard/user/hiring-history`}
                        className="w-full text-center py-2 text-xs font-bold text-[#1d1d1d] bg-[#d9bfa2] hover:bg-[#cbb092] rounded-lg transition-colors uppercase tracking-widest shadow-sm"
                      >
                        Pay Now
                      </Link>
                    ) : (
                      <span className="text-[11px] text-neutral-400 dark:text-neutral-500 italic font-medium">
                        Awaiting Action
                      </span>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-xs text-neutral-400 font-medium">
                No hiring history found.
              </div>
            )}
          </div>

          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#f9f4ef]/60 dark:bg-[#161616] text-neutral-400 dark:text-neutral-500 uppercase tracking-widest text-[10px] font-bold border-b border-neutral-100 dark:border-neutral-900">
                <tr>
                  <th className="px-6 py-3.5">Lawyer Name</th>
                  <th className="px-6 py-3.5">Specialization</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-900 font-medium">
                {userHiringHistories?.length > 0 ? (
                  userHiringHistories.slice(0, 2).map((history) => (
                    <tr
                      key={history?._id}
                      className="bg-white dark:bg-[#121212] hover:bg-neutral-50/50 dark:hover:bg-[#161616]/40 transition-colors"
                    >
                      <td className="px-6 py-4 font-bold text-neutral-900 dark:text-white capitalize">
                        {history?.lawyerName || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-neutral-500 dark:text-neutral-400 text-xs">
                        {history?.specialization || "N/A"}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                            history?.status === "Approved"
                              ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400"
                              : history?.status === "Rejected"
                                ? "bg-rose-50 text-rose-700 dark:bg-rose-950/30 dark:text-rose-400"
                                : "bg-amber-50 text-amber-600 dark:bg-amber-950/30 dark:text-amber-400"
                          }`}
                        >
                          {history?.status || "N/A"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        {history?.status === "Approved" ? (
                          <Link
                            href={`/dashboard/user/hiring-history`}
                            className="px-4 py-2 text-xs font-bold text-[#0a0a0a] bg-[#d9bfa2] hover:bg-[#cbb092] rounded-lg transition-colors uppercase tracking-widest shadow-sm inline-block"
                          >
                            Pay Now
                          </Link>
                        ) : (
                          <span className="text-xs text-neutral-400 dark:text-neutral-600 italic font-medium">
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
                      className="px-6 py-8 text-center text-neutral-400 dark:text-neutral-500 font-medium text-xs sm:text-sm"
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
