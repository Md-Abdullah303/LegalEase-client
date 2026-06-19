"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { SkeletonDemo, SkeletonCard } from "@/components/ui/skeleton"; // আপনার প্রোভাইড করা স্কেলিটন অনুযায়ী
import Image from "next/image";

export default function LawyerProfile() {
  // ডাটাবেজ থেকে আসা ইনিশিয়াল ডাটা স্টেট (ধরে নেওয়া হচ্ছে আপনার ডাটা স্ট্রাকচার অনুযায়ী আসছে)
  const [lawyerData, setLawyerData] = useState({
    name: "MD Abdulla",
    email: "mdabdulla01715940008+user@gmail.com",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=256&h=256", // ডামি ইমেজ
    location: "Dhaka, Bangladesh",
    // নিচের ফিল্ডগুলো শুরুতে ডাটাবেজে না থাকলে None/Empty থাকবে, পরে আপডেট হবে
    bio: "Experienced criminal defense lawyer with 5+ years of practice.",
    specialty: "Criminal Law",
    experience: "5 Years",
    hourlyRate: "$50",
  });

  const [loading, setLoading] = useState(false);

  const handleUpdate = (e, section) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updatedValues = Object.fromEntries(formData.entries());

    console.log(updatedValues);

    console.log(`${section} Updated Data:`, updatedValues);
  };

  if (loading) {
    return (
      //   <div className="container mx-auto p-6 space-y-6 max-w-4xl">
      //     <SkeletonDemo />
      //     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      //       <SkeletonCard />
      //       <SkeletonCard />
      //     </div>
      //   </div>
      <Spinner />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Title */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Lawyer Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your professional identity and legal consultation details.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 1. Primary Information Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="flex flex-col h-full justify-between shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Primary Info</CardTitle>
                <CardDescription>
                  Your identity visible to clients.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <Image
                    src={lawyerData.image || "/avatar-placeholder.png"}
                    alt={lawyerData.name}
                    width={700}
                    height={500}
                    className="h-16 w-16 rounded-full object-cover border-2 border-slate-100"
                  />
                  <div>
                    <h3 className="font-semibold text-slate-800 text-lg">
                      {lawyerData.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {lawyerData.email}
                    </p>
                  </div>
                </div>

                {/* Edit Dialog for Primary Info */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-slate-300 hover:bg-slate-50"
                    >
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <form onSubmit={(e) => handleUpdate(e, "Primary Info")}>
                      <DialogHeader>
                        <DialogTitle>Edit Profile Info</DialogTitle>
                        <DialogDescription>
                          Update your public identity details here.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup className="py-4">
                        <Field>
                          <Label htmlFor="edit-name">Full Name</Label>
                          <Input
                            id="edit-name"
                            name="name"
                            defaultValue={lawyerData.name}
                            required
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="edit-img">Profile Image URL</Label>
                          <Input
                            id="edit-img"
                            name="image"
                            defaultValue={lawyerData.image}
                          />
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>

          {/* 2. Location Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="flex flex-col h-full justify-between shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Chamber Location</CardTitle>
                <CardDescription>
                  Where clients can locate you physically.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="py-2">
                  <p className="text-sm font-medium text-slate-500">
                    Current Location
                  </p>
                  <p className="text-base text-slate-800 font-semibold mt-1">
                    {lawyerData.location || (
                      <span className="text-destructive text-sm font-normal">
                        None (Please Add)
                      </span>
                    )}
                  </p>
                </div>

                {/* Edit Dialog for Location */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-slate-300 hover:bg-slate-50"
                    >
                      Edit Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <form onSubmit={(e) => handleUpdate(e, "Location")}>
                      <DialogHeader>
                        <DialogTitle>Update Location</DialogTitle>
                        <DialogDescription>
                          Add your chamber address or city.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup className="py-4">
                        <Field>
                          <Label htmlFor="edit-location">
                            Chamber/City Location
                          </Label>
                          <Input
                            id="edit-location"
                            name="location"
                            defaultValue={lawyerData.location}
                            placeholder="e.g., Dhaka, Bangladesh"
                            required
                          />
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit">Save Location</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3. Professional Information (যা শুরুতে database এ না থাকলে None দেখাবে) */}
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="shadow-sm border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">
                  Professional Information
                </CardTitle>
                <CardDescription>
                  Legal practice areas, rates, and overview.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Specialty
                    </p>
                    <p className="text-sm font-medium text-slate-800 mt-1">
                      {lawyerData.specialty || (
                        <span className="text-muted-foreground italic text-xs">
                          None
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Experience
                    </p>
                    <p className="text-sm font-medium text-slate-800 mt-1">
                      {lawyerData.experience || (
                        <span className="text-muted-foreground italic text-xs">
                          None
                        </span>
                      )}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Hourly Rate
                    </p>
                    <p className="text-sm font-medium text-slate-800 mt-1">
                      {lawyerData.hourlyRate || (
                        <span className="text-muted-foreground italic text-xs">
                          None
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="sm:col-span-3">
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      About / Bio
                    </p>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                      {lawyerData.bio || (
                        <span className="text-muted-foreground italic text-xs">
                          None
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Edit Dialog for Professional Info */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full border-slate-300 hover:bg-slate-50"
                    >
                      Edit Professional Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <form
                      onSubmit={(e) => handleUpdate(e, "Professional Info")}
                    >
                      <DialogHeader>
                        <DialogTitle>Edit Professional Details</DialogTitle>
                        <DialogDescription>
                          Provide accurate data for legal consultation clients.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup className="py-4 space-y-3">
                        <Field>
                          <Label htmlFor="edit-specialty">Specialty</Label>
                          <Input
                            id="edit-specialty"
                            name="specialty"
                            defaultValue={lawyerData.specialty}
                            placeholder="e.g., Family Law, Criminal Law"
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field>
                            <Label htmlFor="edit-exp">Experience</Label>
                            <Input
                              id="edit-exp"
                              name="experience"
                              defaultValue={lawyerData.experience}
                              placeholder="e.g., 5 Years"
                            />
                          </Field>
                          <Field>
                            <Label htmlFor="edit-rate">Hourly Rate</Label>
                            <Input
                              id="edit-rate"
                              name="hourlyRate"
                              defaultValue={lawyerData.hourlyRate}
                              placeholder="e.g., $100"
                            />
                          </Field>
                        </div>
                        <Field>
                          <Label htmlFor="edit-bio">Bio</Label>
                          <Input
                            id="edit-bio"
                            name="bio"
                            defaultValue={lawyerData.bio}
                            placeholder="Tell clients about your practice..."
                          />
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit">Save Information</Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
