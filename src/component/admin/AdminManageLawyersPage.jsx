"use client";

import { motion } from "framer-motion";
import {
  Search,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Users,
  ShieldCheck,
  Clock3,
  Ban,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { useMemo, useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { AdminMembersDeleteDayalog } from "./AdminUserDeleteDayalog";
import { AdminManageMemberShowModal } from "../modals/AdminManageUserShowModal";

const lawyers = [
  {
    id: 1,
    name: "John Smith",
    email: "john@example.com",
    category: "Corporate Law",
    fee: "$120/hr",
    status: "Published",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@example.com",
    category: "Family Law",
    fee: "$80/hr",
    status: "Pending",
  },
  {
    id: 3,
    name: "David Brown",
    email: "david@example.com",
    category: "Criminal Law",
    fee: "$150/hr",
    status: "Blocked",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily@example.com",
    category: "Property Law",
    fee: "$95/hr",
    status: "Published",
  },
];

export default function ManageLawyersPage({ totalLawyerData }) {
  const approvedCount = totalLawyerData.filter(
    (item) => item.status === true,
  ).length;
  const pendingCount = totalLawyerData.filter(
    (item) => item.status !== true,
  ).length;
  // console.log(approvedCount);

  const statsData = [
    {
      id: "total",
      title: "Total Lawyers",
      value: totalLawyerData.length || "0",
      icon: Users,
      iconColor: "text-indigo-500",
    },
    {
      id: "published",
      title: "Approved",
      value: approvedCount || 0,
      icon: ShieldCheck,
      iconColor: "text-emerald-500",
    },
    {
      id: "pending",
      title: "Pending",
      value: pendingCount || 0,
      icon: Clock3,
      iconColor: "text-amber-500",
    },
    {
      id: "blocked",
      title: "Blocked",
      value: 0,
      icon: Ban,
      iconColor: "text-rose-500",
    },
  ];
  const ITEMS_PER_PAGE = 10;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil((totalLawyerData?.length || 0) / ITEMS_PER_PAGE);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;

    return totalLawyerData.slice(start, end);
  }, [totalLawyerData, currentPage]);

  return (
    <div className="space-y-8 p-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Lawyers</h1>
          <p className="text-muted-foreground">
            Manage lawyer profiles, publishing status and actions.
          </p>
        </div>

        <div className="relative w-full lg:w-87.5">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />
          <Input placeholder="Search lawyers..." className="pl-10" />
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statsData.map((stat) => {
          const IconComponent = stat.icon; // Lucide icon কম্পোনেন্ট অ্যাসাইন করা হচ্ছে

          return (
            <motion.div
              key={stat.id}
              whileHover={{ y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div>
                    <p className="text-muted-foreground text-sm">
                      {stat.title}
                    </p>
                    <h2 className="mt-2 text-3xl font-bold">{stat.value}</h2>
                  </div>
                  <IconComponent className={`h-10 w-10 ${stat.iconColor}`} />
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lawyer List</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lawyer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Fee</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {paginatedUsers.map((lawyer) => (
                  <TableRow key={lawyer?._id}>
                    <TableCell>
                      <div>
                        <h3 className="font-medium">{lawyer?.name || "N/A"}</h3>
                        <p className="text-muted-foreground text-sm">
                          {lawyer?.email || "N/A"}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      {lawyer?.specialty ||
                        (lawyer?.status === true ? "N/A" : "waiting")}
                    </TableCell>
                    <TableCell>
                      {lawyer?.salary ||
                        (lawyer?.status === true ? "N/A" : "waiting")}
                    </TableCell>

                    <TableCell>
                      {lawyer?.status === true && (
                        <Badge className="bg-emerald-500">Approved</Badge>
                      )}

                      {lawyer.status !== true && (
                        <Badge className="bg-yellow-500">Pending</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <AdminManageMemberShowModal data={lawyer} />

                        {/* futurely added */}
                        {/* <Button size="icon" variant="outline">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </Button>

                        <Button size="icon" variant="outline">
                          <XCircle className="h-4 w-4 text-amber-500" />
                        </Button> */}

                        <AdminMembersDeleteDayalog data={lawyer} />
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end gap-2 border-t p-4">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    className={`cursor-pointer ${
                      currentPage === 1 ? "pointer-events-none opacity-50" : ""
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
        </CardContent>
      </Card>
    </div>
  );
}
