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

export default function ManageLawyersPage() {
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

        <div className="relative w-full lg:w-[350px]">
          <Search className="text-muted-foreground absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2" />

          <Input placeholder="Search lawyers..." className="pl-10" />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-muted-foreground text-sm">Total Lawyers</p>

                <h2 className="mt-2 text-3xl font-bold">120</h2>
              </div>

              <Users className="h-10 w-10 text-indigo-500" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-muted-foreground text-sm">Published</p>

                <h2 className="mt-2 text-3xl font-bold">92</h2>
              </div>

              <ShieldCheck className="h-10 w-10 text-emerald-500" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-muted-foreground text-sm">Pending</p>

                <h2 className="mt-2 text-3xl font-bold">18</h2>
              </div>

              <Clock3 className="h-10 w-10 text-amber-500" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-muted-foreground text-sm">Blocked</p>

                <h2 className="mt-2 text-3xl font-bold">10</h2>
              </div>

              <Ban className="h-10 w-10 text-rose-500" />
            </CardContent>
          </Card>
        </motion.div>
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
                {lawyers.map((lawyer) => (
                  <TableRow key={lawyer.id}>
                    <TableCell>
                      <div>
                        <h3 className="font-medium">{lawyer.name}</h3>

                        <p className="text-muted-foreground text-sm">
                          {lawyer.email}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>{lawyer.category}</TableCell>

                    <TableCell>{lawyer.fee}</TableCell>

                    <TableCell>
                      {lawyer.status === "Published" && (
                        <Badge className="bg-emerald-500">Published</Badge>
                      )}

                      {lawyer.status === "Pending" && (
                        <Badge className="bg-amber-500">Pending</Badge>
                      )}

                      {lawyer.status === "Blocked" && (
                        <Badge className="bg-rose-500">Blocked</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button size="icon" variant="outline">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        </Button>

                        <Button size="icon" variant="outline">
                          <XCircle className="h-4 w-4 text-amber-500" />
                        </Button>

                        <Button size="icon" variant="destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-end gap-2">
            <Button variant="outline">Previous</Button>

            <Button>1</Button>

            <Button variant="outline">2</Button>

            <Button variant="outline">3</Button>

            <Button variant="outline">Next</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
