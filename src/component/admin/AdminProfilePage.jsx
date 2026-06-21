"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function AdminProfilePage() {
  const [form, setForm] = useState({
    name: "Admin Name",
    email: "admin@example.com",
    phone: "+8801XXXXXXXXX",
    role: "Admin",
    bio: "System administrator managing platform operations.",
    location: "Chattogram, Bangladesh",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    console.log("Updated Admin Data:", form);
    alert("Profile Updated (UI only)");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold">Admin Profile</h1>
        <p className="text-sm text-gray-500">
          Manage your personal and system information
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT PROFILE CARD */}
        <motion.div whileHover={{ scale: 1.02 }}>
          <Card>
            <CardHeader>
              <CardTitle>Profile Summary</CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col items-center text-center space-y-3">
              <div className="w-24 h-24 rounded-full bg-gray-300" />

              <h2 className="text-xl font-bold">{form.name}</h2>
              <p className="text-sm text-gray-500">{form.email}</p>

              <Badge className="bg-black text-white">{form.role}</Badge>

              <p className="text-xs text-gray-500 mt-2">{form.location}</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* RIGHT FORM */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Edit Profile</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">Full Name</label>
                  <Input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm">Email</label>
                  <Input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm">Phone</label>
                  <Input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm">Location</label>
                  <Input
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div>
                <label className="text-sm">Bio</label>
                <Textarea name="bio" value={form.bio} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm">New Password</label>
                  <Input
                    type="password"
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                  />
                </div>

                <div>
                  <label className="text-sm">Confirm Password</label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 pt-4">
                <Button onClick={handleSave}>Save Changes</Button>

                <Button variant="outline">Cancel</Button>
              </div>
            </CardContent>
          </Card>

          {/* EXTRA SETTINGS CARD */}
          <motion.div className="mt-6" whileHover={{ scale: 1.01 }}>
            <Card>
              <CardHeader>
                <CardTitle>Admin Controls</CardTitle>
              </CardHeader>

              <CardContent className="flex flex-wrap gap-3">
                <Button variant="outline">Manage Users</Button>
                <Button variant="outline">View Transactions</Button>
                <Button variant="outline">Analytics</Button>
                <Button variant="outline">System Logs</Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
