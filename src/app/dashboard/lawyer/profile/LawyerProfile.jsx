"use client";

import { useState } from "react";
// import { useRouter } from "navigation"; // অথবা 'next/router' আপনার প্রজেক্টের কনফিগুরেশন অনুযায়ী
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
import Image from "next/image";
import { Edit2, DollarSign } from "lucide-react";
import { updateLawyerByLawyerId } from "@/lib/actions/lawyers";
import { useRouter } from "next/navigation";

export default function LawyerProfile({ lawyerData, userData }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // ডায়ালগগুলো ওপেন/ক্লোজ স্টেট কন্ট্রোল করার জন্য (ঐচ্ছিক, তবে রিফ্রেশ দিলে অটো বন্ধ হবে)
  const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isProfOpen, setIsProfOpen] = useState(false);

  const handleUpdate = async (e, section, setDialogOpen) => {
    e.preventDefault();
    setLoading(true); // লোডিং স্টেট চালু

    try {
      const formData = new FormData(e.target);
      const updatedValues = Object.fromEntries(formData.entries());

      // সার্ভার অ্যাকশন কল
      const result = await updateLawyerByLawyerId(userData?.id, updatedValues);
      console.log(`${section} Updated Data:`, result);

      // ডায়ালগ বন্ধ করা
      if (setDialogOpen) setDialogOpen(false);

      // নতুন ডেটা স্ক্রিনে দেখানোর জন্য পেজটি রিফ্রেশ করা
      router.refresh();
    } catch (error) {
      console.error("Update failed:", error);
    } finally {
      setLoading(false); // লোডিং স্টেট বন্ধ
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Header Title */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            Lawyer Profile
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your professional identity and legal consultation details.
          </p>
        </div>

        {/* 1. TOP SECTION: Primary Information Box */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="relative overflow-hidden shadow-md border-slate-200 bg-white group">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />

            <CardContent className="pt-8 pb-6 px-6 sm:px-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5 w-full">
                  <div className="relative">
                    <Image
                      src={
                        lawyerData?.image ||
                        "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168"
                      }
                      alt={lawyerData?.name || "lawyer img"}
                      width={700}
                      height={500}
                      className="h-24 w-24 rounded-2xl object-cover border-4 border-slate-50 shadow-inner"
                    />
                  </div>

                  <div className="space-y-2 mt-1">
                    <div>
                      <h3 className="font-bold text-slate-900 text-2xl tracking-tight">
                        {lawyerData?.name || "None"}
                      </h3>
                      <p className="text-sm text-muted-foreground font-medium">
                        {lawyerData?.email || "None"}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 mt-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-semibold uppercase tracking-wider">
                        Expected Salary / Bill:
                      </span>
                      <span className="text-sm font-bold">
                        {lawyerData?.salary || lawyerData?.expectedBill ? (
                          `${lawyerData?.salary || lawyerData?.expectedBill}`
                        ) : (
                          <span className="text-emerald-600/70 font-normal italic">
                            None
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                <Dialog open={isPrimaryOpen} onOpenChange={setIsPrimaryOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="self-center sm:self-start border-slate-200 hover:border-indigo-500 hover:text-indigo-600 hover:bg-indigo-50/50 shadow-sm transition-all duration-200 gap-2 font-medium shrink-0 rounded-xl px-4 py-5"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit Profile
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <form
                      onSubmit={(e) =>
                        handleUpdate(e, "Primary Info", setIsPrimaryOpen)
                      }
                    >
                      <DialogHeader>
                        <DialogTitle>Edit Profile Info</DialogTitle>
                        <DialogDescription>
                          Update your public identity and salary/bill rates
                          here.
                        </DialogDescription>
                      </DialogHeader>
                      <FieldGroup className="py-4 space-y-4">
                        <Field>
                          <Label htmlFor="edit-name">Full Name</Label>
                          <Input
                            id="edit-name"
                            name="name"
                            defaultValue={lawyerData?.name}
                            required
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="edit-img">Profile Image URL</Label>
                          <Input
                            id="edit-img"
                            name="image"
                            defaultValue={lawyerData?.image}
                          />
                        </Field>
                        <Field>
                          <Label htmlFor="edit-salary">
                            Expected Salary / Bill
                          </Label>
                          <Input
                            id="edit-salary"
                            name="salary"
                            placeholder="e.g., $5000/month or $50/hr"
                            defaultValue={
                              lawyerData?.salary || lawyerData?.expectedBill
                            }
                          />
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button type="button" variant="outline">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          className="bg-indigo-600 hover:bg-indigo-700 text-white"
                        >
                          Save changes
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* BOTTOM SECTIONS: 2 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 2. Location Box */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <Card className="flex flex-col h-full justify-between shadow-sm border-slate-200 bg-white">
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
                    {lawyerData?.location || (
                      <span className="text-destructive text-sm font-normal">
                        None (Please Add)
                      </span>
                    )}
                  </p>
                </div>

                <Dialog open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-4 border-slate-300 hover:bg-slate-50"
                    >
                      Edit Location
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-sm">
                    <form
                      onSubmit={(e) =>
                        handleUpdate(e, "Location", setIsLocationOpen)
                      }
                    >
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
                            defaultValue={lawyerData?.location}
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

          {/* 3. Professional Information */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            <Card className="flex flex-col h-full justify-between shadow-sm border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-lg">
                  Professional Information
                </CardTitle>
                <CardDescription>
                  Legal practice areas, rates, and overview.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                      Specialty
                    </p>
                    <p className="text-sm font-medium text-slate-800 mt-1">
                      {lawyerData?.specialty || (
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
                      {lawyerData?.experience || (
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
                      {lawyerData?.hourlyRate || (
                        <span className="text-muted-foreground italic text-xs">
                          None
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="pt-2">
                  <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">
                    About / Bio
                  </p>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed line-clamp-2">
                    {lawyerData?.bio || (
                      <span className="text-muted-foreground italic text-xs">
                        None
                      </span>
                    )}
                  </p>
                </div>

                <Dialog open={isProfOpen} onOpenChange={setIsProfOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full mt-2 border-slate-300 hover:bg-slate-50"
                    >
                      Edit Professional Info
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <form
                      onSubmit={(e) =>
                        handleUpdate(e, "Professional Info", setIsProfOpen)
                      }
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
                            defaultValue={lawyerData?.specialty}
                            placeholder="e.g., Family Law, Criminal Law"
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field>
                            <Label htmlFor="edit-exp">Experience</Label>
                            <Input
                              id="edit-exp"
                              name="experience"
                              defaultValue={lawyerData?.experience}
                              placeholder="e.g., 5 Years"
                            />
                          </Field>
                          <Field>
                            <Label htmlFor="edit-rate">Hourly Rate</Label>
                            <Input
                              id="edit-rate"
                              name="hourlyRate"
                              defaultValue={lawyerData?.hourlyRate}
                              placeholder="e.g., $100"
                            />
                          </Field>
                        </div>
                        <Field>
                          <Label htmlFor="edit-bio">Bio</Label>
                          <Input
                            id="edit-bio"
                            name="bio"
                            defaultValue={lawyerData?.bio}
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
