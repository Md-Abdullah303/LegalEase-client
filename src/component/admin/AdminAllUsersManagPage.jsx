"use client";

// Place this file at: app/dashboard/admin/manage-users/page.jsx

import { motion } from "motion/react";
import {
  Shield,
  Scale,
  User,
  Search,
  Trash2,
  MoreVertical,
  Users,
  Briefcase,
  TrendingUp,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import Image from "next/image";
import { editUsersRole, memberDltByMemberId } from "@/lib/actions/admin";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useMemo, useState } from "react";

// ---- design tokens transformed into Tailwind-friendly objects ----
const ROLE_CONFIG = {
  admin: {
    label: "Admin",
    icon: Shield,
    className:
      "text-purple-700 bg-purple-500/15 border-purple-500/30 dark:text-purple-300 dark:bg-purple-500/20 dark:border-purple-500/40",
  },
  lawyer: {
    label: "Lawyer",
    icon: Scale,
    className:
      "text-[#A8823C] bg-[#A8823C]/10 border-[#A8823C]/20 dark:text-[#A8823C] dark:bg-[#A8823C]/10 dark:border-[#A8823C]/30",
  },
  user: {
    label: "Client",
    icon: User,
    className:
      "text-[#5B6472] bg-[#5B6472]/10 border-[#5B6472]/20 dark:text-zinc-400 dark:bg-zinc-800 dark:border-zinc-700",
  },
};

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: "easeOut" } },
};

function RoleBadge({ role }) {
  const config = ROLE_CONFIG[role];
  const Icon = config.icon;
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}

export default function ManageUsersPage({
  totalMembers,
  totalLawyerData,
  totalUsersData,
  totalAdminData,
}) {
  const STATS = [
    {
      label: "Total members",
      value: totalMembers.length || 0,
      icon: Users,
      colorClass:
        "text-[#1B2A4A] bg-[#1B2A4A]/10 dark:text-blue-400 dark:bg-blue-500/10",
    },
    {
      label: "Lawyers",
      value: totalLawyerData.length || 0,
      icon: Briefcase,
      colorClass:
        "text-[#A8823C] bg-[#A8823C]/10 dark:text-[#A8823C] dark:bg-[#A8823C]/20",
    },
    {
      label: "Clients",
      value: totalUsersData.length || 0,
      icon: User,
      colorClass:
        "text-[#5B6472] bg-[#5B6472]/10 dark:text-zinc-400 dark:bg-zinc-800",
    },
    {
      label: "Joined this month",
      value: totalMembers.length || 0,
      icon: TrendingUp,
      colorClass:
        "text-[#1B2A4A] bg-[#1B2A4A]/10 dark:text-blue-400 dark:bg-blue-500/10",
    },
  ];

  const [showingMember, setShowingMember] = useState(totalMembers);
  const [showingLabel, setShowingLabel] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(showingMember.length / ITEMS_PER_PAGE);

  const paginatedMembers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return showingMember.slice(start, end);
  }, [showingMember, currentPage]);

  const router = useRouter();

  const handleMakeClient = async (user) => {
    const res = await editUsersRole(user?._id, { role: "user" });
    if (res) {
      toast.success("Get role set user..");
      router.refresh();
    } else {
      toast.error("Something was wrong!");
    }
  };
  const handleMakeLawyer = async (user) => {
    const res = await editUsersRole(user?._id, { role: "lawyer" });
    if (res) {
      toast.success("Get role set lawyer..");
      router.refresh();
    } else {
      toast.error("Something was wrong!");
    }
  };
  const handleMakeAdmin = async (user) => {
    const res = await editUsersRole(user?._id, { role: "admin" });
    if (res) {
      toast.success("Get role set user..");
      router.refresh();
    } else {
      toast.error("Something was wrong!");
    }
  };
  const handleDeleteUser = async (user) => {
    // console.log("delete", user);
    const res = await memberDltByMemberId(user?._id);
    if (res.deletedCount > 0) {
      toast.success("Member Deleted.");
      router.refresh();
    } else {
      toast.error("Something was wrong!");
    }
  };
  const handleShowingUsers = async (label) => {
    setCurrentPage(1);

    if (label === "Client") {
      setShowingLabel("Client");
      setShowingMember(totalUsersData);
      router.refresh();
    } else if (label === "Lawyer") {
      setShowingLabel("Lawyer");
      setShowingMember(totalLawyerData);
      router.refresh();
    } else if (label === "Admin") {
      setShowingMember(totalAdminData);
      setShowingLabel("Admin");
      router.refresh();
    } else if (label === "All") {
      setShowingLabel("All");
      setShowingMember(totalMembers);
      router.refresh();
    }
  };
  // const handleSearch = async (e) => {
  //   e.preventDefault();
  //   if (!searchQuery.trim()) return;

  //   router.push(
  //     `/dashboard/admin/all-users-manage?search=${encodeURIComponent(searchQuery.trim())}`,
  //   );
  // };

  return (
    // Light Background: #F5F4F0, Dark Background: black
    <div className="min-h-screen bg-[#F5F4F0] dark:bg-black transition-colors duration-200">
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col gap-2 border-b border-[#E4E1DA] dark:border-zinc-800 pb-6"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-[#A8823C]">
            Admin · Member directory
          </p>
          <h1 className="font-serif text-3xl font-semibold text-[#161D2E] dark:text-zinc-100">
            Manage users
          </h1>
          <p className="max-w-xl text-sm text-[#5B6472] dark:text-zinc-400">
            View every account on LegalEase, promote a client to lawyer, demote
            a lawyer back to client, or remove an account entirely.
          </p>
        </motion.div>

        {/* Stat cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="mb-8 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                className="rounded-xl border border-[#E4E1DA] dark:border-zinc-800 bg-white dark:bg-[#1d1d1d] p-4 shadow-sm transition-colors"
              >
                <div
                  className={`mb-3 flex h-9 w-9 items-center justify-center rounded-lg ${stat.colorClass}`}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-2xl font-semibold text-[#161D2E] dark:text-white">
                  {stat.value}
                </p>
                <p className="text-xs text-[#5B6472] dark:text-zinc-400">
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          {/* <div className="relative w-full max-w-sm">
            <form
            onSubmit={handleSearch}
            className="relative w-full max-w-xs xl:max-w-sm"
          >
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5B6472] dark:text-zinc-400" />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or email"
              className="pl-9 bg-white dark:bg-zinc-950 text-[#161D2E] dark:text-zinc-100 border-[#E4E1DA] dark:border-zinc-800 focus-visible:ring-zinc-400"
            />
          </form>
          </div> */}
          <div className="flex items-center gap-2">
            {["All", "Admin", "Lawyer", "Client"].map((label, i) => (
              <button
                onClick={() => handleShowingUsers(label)}
                key={label}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                  showingLabel === label
                    ? "bg-[#1B2A4A] border-[#1B2A4A] text-white dark:bg-[#E5D4B6] dark:border-[#E5D4B6] dark:text-black"
                    : "border-[#E4E1DA] dark:border-zinc-800 text-[#5B6472] dark:text-zinc-400 hover:bg-white/50 dark:hover:bg-zinc-800"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table Panel */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="overflow-hidden rounded-xl border border-[#E4E1DA] dark:border-zinc-800 bg-white dark:bg-[#1d1d1d] shadow-sm transition-colors"
        >
          <Table>
            <TableHeader>
              <TableRow className="border-[#E4E1DA] dark:border-zinc-800 hover:bg-transparent">
                <TableHead className="text-[#5B6472] dark:text-zinc-400">
                  Member
                </TableHead>
                <TableHead className="text-[#5B6472] dark:text-zinc-400">
                  Email
                </TableHead>
                <TableHead className="text-[#5B6472] dark:text-zinc-400">
                  Role
                </TableHead>
                <TableHead className="text-[#5B6472] dark:text-zinc-400">
                  Joined
                </TableHead>
                <TableHead className="text-right text-[#5B6472] dark:text-zinc-400">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedMembers.map((user) => (
                <TableRow
                  key={user._id}
                  className="group border-[#E4E1DA] dark:border-zinc-800 hover:bg-zinc-50/50 dark:hover:bg-zinc-800/40 transition-colors"
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-[#A8823C]/30 dark:border-zinc-700">
                        <Image
                          src={
                            user?.image ||
                            `https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168`
                          }
                          alt="user img"
                          width={600}
                          height={400}
                          className="rounded-full bg-center bg-contain w-full"
                        />
                      </Avatar>
                      <span className="font-medium text-[#161D2E] dark:text-zinc-100">
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-[#5B6472] dark:text-zinc-400">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell className="text-[#5B6472] dark:text-zinc-400">
                    {user.createdAt
                      ? new Date(user?.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "June 19, 2026"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      {user?._id === "6a34678e5f84932c67ade68c" || (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 gap-1 text-xs text-[#5B6472] dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                            >
                              Change role
                              <MoreVertical className="h-3.5 w-3.5" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="dark:bg-[#1d1d1d] dark:border-zinc-800"
                          >
                            <DropdownMenuItem
                              onClick={() => handleMakeClient(user)}
                              className="dark:focus:bg-zinc-800 dark:text-zinc-200"
                            >
                              Make client
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleMakeLawyer(user)}
                              className="dark:focus:bg-zinc-800 dark:text-zinc-200"
                            >
                              Make lawyer
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => handleMakeAdmin(user)}
                              className="dark:focus:bg-zinc-800 dark:text-zinc-200"
                            >
                              Make admin
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="dark:bg-zinc-800" />
                            <DropdownMenuItem
                              onClick={() => handleDeleteUser(user)}
                              className="gap-2 text-[#B3261E] dark:text-red-400 focus:text-[#B3261E] dark:focus:text-red-400 dark:focus:bg-red-950/20"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                              Remove user
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Pagination */}

        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                className={`cursor-pointer ${
                  currentPage === 1 ? "pointer-events-none opacity-50" : ""
                }`}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              />
            </PaginationItem>

            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2),
              )
              .map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={currentPage === page}
                    className="cursor-pointer"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {totalPages > 5 && currentPage < totalPages - 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                className={`cursor-pointer ${
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : ""
                }`}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
