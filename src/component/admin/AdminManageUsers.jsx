"use client";

import { motion } from "framer-motion";
import {
  Search,
  Users,
  UserCheck,
  Shield,
  Scale,
  Eye,
  Trash2,
  UserCog,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Card, CardContent } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AdminManageMemberShowModal } from "../modals/AdminManageUserShowModal";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useMemo, useState } from "react";
import { AdminMembersDeleteDayalog } from "./AdminUserDeleteDayalog";

// const users = [
//   {
//     id: 1,
//     name: "Abdullah",
//     email: "abdullah@gmail.com",
//     role: "Admin",
//     status: "Active",
//     joined: "12 Jun 2026",
//   },
//   {
//     id: 2,
//     name: "Sarah Johnson",
//     email: "sarah@gmail.com",
//     role: "Lawyer",
//     status: "Active",
//     joined: "10 Jun 2026",
//   },
//   {
//     id: 3,
//     name: "David Brown",
//     email: "david@gmail.com",
//     role: "User",
//     status: "Suspended",
//     joined: "05 Jun 2026",
//   },
//   {
//     id: 4,
//     name: "Emily Wilson",
//     email: "emily@gmail.com",
//     role: "User",
//     status: "Active",
//     joined: "01 Jun 2026",
//   },
// ];

export default function AdminManageUsers({
  totalMembers,
  totalLawyerData,
  totalUsersData,
  totalAdmin,
}) {
  const STATS_CARDS = [
    {
      label: "Total Users",
      value: totalMembers.length || 0,
      icon: Users,
      iconColor: "text-blue-500",
    },
    {
      label: "Clients",
      value: totalUsersData.length || 0,
      icon: UserCheck,
      iconColor: "text-emerald-500",
    },
    {
      label: "Lawyers",
      value: totalLawyerData.length || 0,
      icon: Scale,
      iconColor: "text-amber-500",
    },
    {
      label: "Admins",
      value: totalAdmin.length || 0,
      icon: Shield,
      iconColor: "text-violet-500",
    },
  ];

  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((totalUsersData?.length || 0) / ITEMS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return totalUsersData.slice(start, end);
  }, [totalUsersData, currentPage]);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Users</h1>

          <p className="text-muted-foreground mt-1">
            Manage users, lawyers and admins from one place.
          </p>
        </div>

        <div className="relative w-full lg:w-[350px]">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

          <Input placeholder="Search users..." className="pl-10" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {STATS_CARDS.map((card, index) => {
          const IconComponent = card.icon;
          return (
            <motion.div key={index} whileHover={{ y: -5 }}>
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {card.label}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">{card.value}</h2>
                  </div>
                  <IconComponent className={`h-10 w-10 ${card.iconColor}`} />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow
                    key={user._id}
                    className="transition-all hover:bg-muted/50"
                  >
                    <TableCell>
                      <div>
                        <h3 className="font-medium">{user?.name || "N/A"}</h3>

                        <p className="text-muted-foreground text-sm">
                          {user?.email || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    {/* Role */}
                    <TableCell>
                      {user?.role === "admin" && (
                        <Badge className="bg-violet-500 hover:bg-violet-500">
                          Admin
                        </Badge>
                      )}

                      {user.role === "lawyer" && (
                        <Badge className="bg-amber-500 hover:bg-amber-500">
                          Lawyer
                        </Badge>
                      )}

                      {user.role === "user" && (
                        <Badge className="bg-emerald-500 hover:bg-emerald-500">
                          User
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {user?.createdAt
                        ? new Date(user?.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "N/A"}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <AdminManageMemberShowModal data={user} />

                        <AdminMembersDeleteDayalog data={user} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 border-t p-4">
            <div className="flex items-center justify-end gap-2 border-t p-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      className={`cursor-pointer ${
                        currentPage === 1
                          ? "pointer-events-none opacity-50"
                          : ""
                      }`}
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                      }
                    />
                  </PaginationItem>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <PaginationItem key={page}>
                        <PaginationLink
                          isActive={currentPage === page}
                          className="cursor-pointer"
                          onClick={() => setCurrentPage(page)}
                        >
                          {page}
                        </PaginationLink>
                      </PaginationItem>
                    ),
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
        </CardContent>
      </Card>
    </div>
  );
}
