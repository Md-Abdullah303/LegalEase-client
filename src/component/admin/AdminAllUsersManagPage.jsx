"use client";

// Place this file at: app/dashboard/admin/manage-users/page.jsx
// UI only — no fetch/mutation logic wired up yet. Swap the MOCK_USERS array
// for real data, and fill in the TODO handlers when the API routes are ready.

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

// ---- design tokens (kept local to this page for now) ----
const NAVY = "#1B2A4A";
const BRASS = "#A8823C";
const CANVAS = "#F5F4F0";
const INK = "#161D2E";
const INK_MUTED = "#5B6472";
const BORDER = "#E4E1DA";
const DESTRUCTIVE = "#B3261E";

const ROLE_CONFIG = {
  admin: { label: "Admin", icon: Shield, color: NAVY, bg: "#1B2A4A14" },
  lawyer: { label: "Lawyer", icon: Scale, color: BRASS, bg: "#A8823C16" },
  user: { label: "Client", icon: User, color: INK_MUTED, bg: "#5B647214" },
};

const MOCK_USERS = [
  {
    id: 1,
    name: "Ayesha Rahman",
    email: "ayesha.rahman@gmail.com",
    role: "admin",
    joined: "Jan 14, 2025",
    avatar: "AR",
  },
  {
    id: 2,
    name: "Tanvir Hossain",
    email: "tanvir.legal@gmail.com",
    role: "lawyer",
    joined: "Feb 02, 2025",
    avatar: "TH",
  },
  {
    id: 3,
    name: "Nusrat Jahan",
    email: "nusrat.j@gmail.com",
    role: "user",
    joined: "Feb 19, 2025",
    avatar: "NJ",
  },
  {
    id: 4,
    name: "Imran Chowdhury",
    email: "imran.c@outlook.com",
    role: "lawyer",
    joined: "Mar 03, 2025",
    avatar: "IC",
  },
  {
    id: 5,
    name: "Farzana Akter",
    email: "farzana.akter@gmail.com",
    role: "user",
    joined: "Mar 21, 2025",
    avatar: "FA",
  },
  {
    id: 6,
    name: "Shahriar Kabir",
    email: "shahriar.k@gmail.com",
    role: "lawyer",
    joined: "Apr 09, 2025",
    avatar: "SK",
  },
  {
    id: 7,
    name: "Mehjabin Islam",
    email: "mehjabin.i@gmail.com",
    role: "user",
    joined: "Apr 27, 2025",
    avatar: "MI",
  },
  {
    id: 8,
    name: "Rafiqul Karim",
    email: "rafiqul.karim@gmail.com",
    role: "admin",
    joined: "May 11, 2025",
    avatar: "RK",
  },
];

const STATS = [
  { label: "Total members", value: 142, icon: Users, color: NAVY },
  { label: "Lawyers", value: 56, icon: Briefcase, color: BRASS },
  { label: "Clients", value: 83, icon: User, color: INK_MUTED },
  { label: "Joined this month", value: 12, icon: TrendingUp, color: NAVY },
];

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
      className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium"
      style={{
        color: config.color,
        backgroundColor: config.bg,
        borderColor: `${config.color}33`,
      }}
    >
      <Icon className="h-3.5 w-3.5" />
      {config.label}
    </span>
  );
}

export default function ManageUsersPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: CANVAS }}>
      <div className="mx-auto max-w-6xl px-6 py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8 flex flex-col gap-2 border-b pb-6"
          style={{ borderColor: BORDER }}
        >
          <p
            className="text-xs font-medium uppercase tracking-wider"
            style={{ color: BRASS }}
          >
            Admin · Member directory
          </p>
          <h1
            className="font-serif text-3xl font-semibold"
            style={{ color: INK }}
          >
            Manage users
          </h1>
          <p className="max-w-xl text-sm" style={{ color: INK_MUTED }}>
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
                className="rounded-xl border bg-white p-4"
                style={{ borderColor: BORDER }}
              >
                <div
                  className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor: `${stat.color}14`,
                    color: stat.color,
                  }}
                >
                  <Icon className="h-4.5 w-4.5" />
                </div>
                <p className="text-2xl font-semibold" style={{ color: INK }}>
                  {stat.value}
                </p>
                <p className="text-xs" style={{ color: INK_MUTED }}>
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Toolbar */}
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: INK_MUTED }}
            />
            <Input
              placeholder="Search by name or email"
              className="pl-9"
              // TODO: wire up onChange to filter MOCK_USERS / query param
            />
          </div>
          <div className="flex items-center gap-2">
            {["All", "Admin", "Lawyer", "Client"].map((label, i) => (
              <button
                key={label}
                className="rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
                style={
                  i === 0
                    ? {
                        backgroundColor: NAVY,
                        borderColor: NAVY,
                        color: "#fff",
                      }
                    : { borderColor: BORDER, color: INK_MUTED }
                }
                // TODO: wire up role filter
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="overflow-hidden rounded-xl border bg-white"
          style={{ borderColor: BORDER }}
        >
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: BORDER }}>
                <TableHead style={{ color: INK_MUTED }}>Member</TableHead>
                <TableHead style={{ color: INK_MUTED }}>Email</TableHead>
                <TableHead style={{ color: INK_MUTED }}>Role</TableHead>
                <TableHead style={{ color: INK_MUTED }}>Joined</TableHead>
                <TableHead className="text-right" style={{ color: INK_MUTED }}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {MOCK_USERS.map((user) => (
                <TableRow
                  key={user.id}
                  className="group transition-colors"
                  style={{ borderColor: BORDER }}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar
                        className="h-9 w-9 border-2"
                        style={{ borderColor: `${BRASS}55` }}
                      >
                        <AvatarFallback
                          className="text-xs font-medium"
                          style={{ backgroundColor: `${NAVY}10`, color: NAVY }}
                        >
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium" style={{ color: INK }}>
                        {user.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell style={{ color: INK_MUTED }}>
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <RoleBadge role={user.role} />
                  </TableCell>
                  <TableCell style={{ color: INK_MUTED }}>
                    {user.joined}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 gap-1 text-xs"
                          >
                            Change role
                            <MoreVertical className="h-3.5 w-3.5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            {/* TODO: PATCH /users/:id { role: "user" } */}
                            Make client
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {/* TODO: PATCH /users/:id { role: "lawyer" } */}
                            Make lawyer
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            {/* TODO: PATCH /users/:id { role: "admin" } */}
                            Make admin
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="gap-2"
                            style={{ color: DESTRUCTIVE }}
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            {/* TODO: DELETE /users/:id */}
                            Remove user
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Pagination (UI only) */}
        <div
          className="mt-4 flex items-center justify-between text-xs"
          style={{ color: INK_MUTED }}
        >
          <span>Showing 8 of 142 members</span>
          <div className="flex items-center gap-1">
            <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="h-7 px-3 text-xs"
              style={{ borderColor: NAVY, color: NAVY }}
            >
              1
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-3 text-xs">
              2
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-3 text-xs">
              3
            </Button>
            <Button variant="outline" size="sm" className="h-7 px-3 text-xs">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
