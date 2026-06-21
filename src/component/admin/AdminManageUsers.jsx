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

const users = [
  {
    id: 1,
    name: "Abdullah",
    email: "abdullah@gmail.com",
    role: "Admin",
    status: "Active",
    joined: "12 Jun 2026",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah@gmail.com",
    role: "Lawyer",
    status: "Active",
    joined: "10 Jun 2026",
  },
  {
    id: 3,
    name: "David Brown",
    email: "david@gmail.com",
    role: "User",
    status: "Suspended",
    joined: "05 Jun 2026",
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "emily@gmail.com",
    role: "User",
    status: "Active",
    joined: "01 Jun 2026",
  },
];

export default function AdminManageUsers() {
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
        <motion.div whileHover={{ y: -5 }}>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-muted-foreground text-sm">Total Users</p>
                <h2 className="mt-2 text-3xl font-bold">2,450</h2>
              </div>

              <Users className="h-10 w-10 text-blue-500" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }}>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-muted-foreground text-sm">Clients</p>
                <h2 className="mt-2 text-3xl font-bold">1,920</h2>
              </div>

              <UserCheck className="h-10 w-10 text-emerald-500" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }}>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-muted-foreground text-sm">Lawyers</p>
                <h2 className="mt-2 text-3xl font-bold">500</h2>
              </div>

              <Scale className="h-10 w-10 text-amber-500" />
            </CardContent>
          </Card>
        </motion.div>

        <motion.div whileHover={{ y: -5 }}>
          <Card>
            <CardContent className="flex items-center justify-between p-6">
              <div>
                <p className="text-muted-foreground text-sm">Admins</p>
                <h2 className="mt-2 text-3xl font-bold">30</h2>
              </div>

              <Shield className="h-10 w-10 text-violet-500" />
            </CardContent>
          </Card>
        </motion.div>
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
                  <TableHead>Status</TableHead>
                  <TableHead>Joined</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {users.map((user) => (
                  <TableRow
                    key={user.id}
                    className="transition-all hover:bg-muted/50"
                  >
                    <TableCell>
                      <div>
                        <h3 className="font-medium">{user.name}</h3>

                        <p className="text-muted-foreground text-sm">
                          {user.email}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell>
                      {user.role === "Admin" && (
                        <Badge className="bg-violet-500 hover:bg-violet-500">
                          Admin
                        </Badge>
                      )}

                      {user.role === "Lawyer" && (
                        <Badge className="bg-amber-500 hover:bg-amber-500">
                          Lawyer
                        </Badge>
                      )}

                      {user.role === "User" && (
                        <Badge className="bg-emerald-500 hover:bg-emerald-500">
                          User
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      {user.status === "Active" ? (
                        <Badge
                          variant="outline"
                          className="border-emerald-500 text-emerald-500"
                        >
                          Active
                        </Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="border-rose-500 text-rose-500"
                        >
                          Suspended
                        </Badge>
                      )}
                    </TableCell>

                    <TableCell>{user.joined}</TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>

                        <Button size="icon" variant="outline">
                          <UserCog className="h-4 w-4 text-blue-500" />
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
          <div className="flex items-center justify-end gap-2 border-t p-4">
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
