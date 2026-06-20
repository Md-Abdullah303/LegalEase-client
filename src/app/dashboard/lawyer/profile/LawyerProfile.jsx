"use client";

import { useState, useCallback, Fragment } from "react";
import { motion } from "framer-motion";
import { useDropzone } from "react-dropzone";
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
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // Using Textarea for Bio
import Image from "next/image";
import {
  Edit2,
  DollarSign,
  CheckCircle,
  UploadCloud,
  MapPin,
  Briefcase,
  Award,
  Star,
  StarHalf,
  X,
  Loader2,
} from "lucide-react";
import { updateLawyerByLawyerId } from "@/lib/actions/lawyers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BiXCircle } from "react-icons/bi";
import { Spinner } from "@/components/ui/spinner";

const STAR_RATING_ICONS = {
  filled: <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />,
  half: <StarHalf className="w-5 h-5 fill-yellow-400 text-yellow-400" />,
  empty: <Star className="w-5 h-5 text-gray-400" />,
};

const renderStars = (rating) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(
        <Fragment key={`filled-${i}`}>{STAR_RATING_ICONS.filled}</Fragment>,
      );
    } else if (i === fullStars && hasHalfStar) {
      stars.push(<Fragment key="half">{STAR_RATING_ICONS.half}</Fragment>);
    } else {
      stars.push(
        <Fragment key={`empty-${i}`}>{STAR_RATING_ICONS.empty}</Fragment>,
      );
    }
  }
  return stars;
};

export default function LawyerProfile({ lawyerData, userData }) {
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(lawyerData?.image || null);
  const router = useRouter();

  const [isPrimaryOpen, setIsPrimaryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [isProfOpen, setIsProfOpen] = useState(false);

  // Dropzone setup
  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    maxFiles: 1,
  });

  const clearImage = (e) => {
    e.stopPropagation();
    setImageFile(null);
    setPreview(lawyerData?.image || null);
  };

  const handleUpdate = async (e, section, setDialogOpen) => {
    e.preventDefault();
    setLoading(true);

    try {
      let finalImageUrl = lawyerData?.image;

      if (imageFile) {
        const imgBbFormData = new FormData();
        imgBbFormData.append("image", imageFile);

        const imgBbRes = await fetch(
          `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
          { method: "POST", body: imgBbFormData },
        );

        const imgBbData = await imgBbRes.json();

        if (imgBbData?.success) {
          finalImageUrl = imgBbData.data.url;
          console.log("Image successfully uploaded to ImgBB:", finalImageUrl);
          router.refresh();
        } else {
          toast.error("ImgBB upload failed.");
          return;
        }
      }

      const formData = new FormData(e.target);
      const updatedValues = Object.fromEntries(formData.entries());

      updatedValues.image = finalImageUrl;

      if (updatedValues.salary) {
        updatedValues.salary = Number(updatedValues.salary);
      }
      if (updatedValues.hourlyRate) {
        updatedValues.hourlyRate = Number(updatedValues.hourlyRate);
      }

      const result = await updateLawyerByLawyerId(userData?.id, updatedValues);
      console.log(`${section} Updated Data:`, result);

      if (result?.modifiedCount > 0) {
        if (setDialogOpen) setDialogOpen(false);
        router.refresh();
        toast.success(`${section} Info Updated.`);
      } else {
        toast.error("No modifications detected or update failed.");
      }
    } catch (error) {
      console.error("Update failed:", error);
      toast.error(`Failed to update ${section} info.`);
    } finally {
      setLoading(false);
    }
  };

  const handleHiringStatus = async () => {
    const isProfileComplete =
      lawyerData?.name &&
      lawyerData?.image &&
      lawyerData?.bio &&
      (lawyerData?.salary || lawyerData?.expectedBill) &&
      lawyerData?.location &&
      lawyerData?.specialty &&
      lawyerData?.experience &&
      lawyerData?.hourlyRate;

    if (!isProfileComplete) {
      toast.error(
        "Complete your entire profile (Image, Bio, Location, Profession Info, Rates) before enabling hiring!",
      );
      return;
    }

    setLoading(true);
    try {
      const result = await updateLawyerByLawyerId(userData?.id, {
        status: true,
      });
      if (result?.modifiedCount > 0) {
        toast.success("Hiring status enabled! Clients can now see you.");
        router.refresh();
      } else {
        toast.error("Hiring status update failed.");
      }
    } catch (error) {
      console.error("Hiring status failure:", error);
      toast.error("Hiring status error.");
    } finally {
      setLoading(false);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4 },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070912] text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#070912] transition-colors py-10 px-4 sm:px-6 lg:px-8 text-slate-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Title */}
        <motion.div {...fadeInUp}>
          <h1 className="text-4xl font-extrabold tracking-tighter text-white">
            Attorney Hub
          </h1>
          <p className="text-lg text-slate-400 mt-2">
            Build and optimize your legal professional portfolio.
          </p>
        </motion.div>

        {/* 1. TOP SECTION: Primary Information Box (preserved structure from image_0.png/image_1.png) */}
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
          <Card className="relative overflow-hidden shadow-2xl border-slate-700 bg-[#101422] group rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600" />
            <CardContent className="pt-12 pb-10 px-8 sm:px-12 flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-blue-600/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity rounded-full"></div>
                <div className="relative">
                  <Image
                    width={600}
                    height={400}
                    src={
                      preview ||
                      "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168"
                    }
                    alt={lawyerData?.name || "lawyer img"}
                    className="h-32 w-32 rounded-3xl object-cover border-4 border-[#101422] shadow-inner transition-transform group-hover:scale-105 duration-300"
                  />
                  {/* Edit overlay icon for image only */}
                  <div
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl flex items-center justify-center cursor-pointer"
                    onClick={() => setIsPrimaryOpen(true)}
                  >
                    <UploadCloud className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              <div className="flex-grow space-y-6 text-center md:text-left">
                <div>
                  <h3 className="font-extrabold text-white text-3xl tracking-tight leading-tight">
                    {lawyerData?.name || "Johan Lebart"}
                  </h3>
                  <p className="text-base text-slate-400 font-medium">
                    {lawyerData?.email ||
                      "mdabdulla01715940008+lawyer3@gmail.com"}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#1a2034] text-slate-300 border border-slate-700 mt-2">
                  <Award className="w-5 h-5 text-indigo-400" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-slate-100">
                    Expected Comp:
                  </span>
                  <span className="text-lg font-bold text-white">
                    {lawyerData?.salary || lawyerData?.expectedBill ? (
                      `$${lawyerData?.salary || lawyerData?.expectedBill}`
                    ) : (
                      <span className="text-gray-500 font-normal italic">
                        Set Rate
                      </span>
                    )}
                  </span>
                </div>

                {/* Rating Display (preserved concept from image_0.png) */}
                {lawyerData?.rating > 0 && (
                  <div className="flex items-center gap-1.5 justify-center md:justify-start">
                    {renderStars(lawyerData.rating)}
                    <span className="text-lg font-semibold text-white ml-2">
                      {lawyerData.rating.toFixed(1)} / 5
                    </span>
                  </div>
                )}
              </div>

              {/* Editing primary box (as conceptualized from image_1.png Edit button) */}
              <Dialog open={isPrimaryOpen} onOpenChange={setIsPrimaryOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="self-center md:self-start border-slate-700 dark:border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white hover:bg-indigo-950/20 shadow-sm gap-2 rounded-2xl px-5 py-6 transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Primary Info
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-[#101422] border-slate-700">
                  <form
                    onSubmit={(e) =>
                      handleUpdate(e, "Primary", setIsPrimaryOpen)
                    }
                    className="space-y-6"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-white text-2xl font-bold">
                        Edit Primary Info
                      </DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Update your identity, rate, and upload a new profile
                        image.
                      </DialogDescription>
                    </DialogHeader>

                    {/* Drag & Drop Image Upload Zone */}
                    <FieldGroup className="space-y-6">
                      <Field>
                        <Label className="text-slate-200">
                          Profile Image (Drag & Drop or Click)
                        </Label>
                        <div
                          {...getRootProps()}
                          className={`mt-2 border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            isDragActive
                              ? "border-blue-600 bg-blue-950/20"
                              : "border-slate-700 bg-[#161a2b]"
                          } hover:border-blue-500`}
                        >
                          <input {...getInputProps()} />
                          {preview ? (
                            <div className="relative">
                              <img
                                src={preview}
                                alt="preview"
                                className="h-28 w-28 rounded-3xl object-cover border-2 border-slate-700 shadow-xl"
                              />
                              <button
                                type="button"
                                onClick={clearImage}
                                className="absolute -top-3 -right-3 bg-red-600 text-white rounded-full p-2.5 hover:bg-red-700 transition"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ) : (
                            <>
                              <UploadCloud className="w-12 h-12 text-slate-600 mb-3" />
                              <p className="text-sm text-slate-500 mt-2 font-medium">
                                Drag & drop an image or click to choose
                              </p>
                              <p className="text-xs text-slate-600">
                                Max file size: 5MB
                              </p>
                            </>
                          )}
                        </div>
                      </Field>

                      <Field>
                        <Label htmlFor="edit-name" className="text-slate-200">
                          Full Name
                        </Label>
                        <Input
                          id="edit-name"
                          name="name"
                          defaultValue={lawyerData?.name}
                          required
                          className="bg-[#1a2034] border-slate-700 text-white p-6 rounded-xl"
                        />
                      </Field>
                      <Field>
                        <Label htmlFor="edit-salary" className="text-slate-200">
                          Expected Salary / Bill (USD)
                        </Label>
                        <Input
                          type="number"
                          min="0"
                          id="edit-salary"
                          name="salary"
                          placeholder="e.g., 5000"
                          defaultValue={
                            lawyerData?.salary || lawyerData?.expectedBill
                          }
                          className="bg-[#1a2034] border-slate-700 text-white p-6 rounded-xl"
                        />
                      </Field>
                    </FieldGroup>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-slate-400 hover:text-white"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold p-6 rounded-xl"
                        disabled={loading}
                      >
                        {loading ? (
                          <Loader2 className="w-5 h-5 animate-spin mr-2" />
                        ) : (
                          <UploadCloud className="w-5 h-5 mr-2" />
                        )}
                        {imageFile ? "Upload & Save" : "Save Changes"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </motion.div>

        {/* BOTTOM SECTIONS: 2 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 2. Bio Box (from preserved structure) */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Card className="flex flex-col h-full justify-between shadow-2xl border-slate-700 bg-[#101422] rounded-3xl p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                  <award className="w-6 h-6 text-indigo-400" /> Attorney Bio
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Your professional background and narrative.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-grow space-y-6">
                <p className="text-base text-slate-300 leading-relaxed min-h-[100px]">
                  {lawyerData?.bio || (
                    <span className="text-destructive text-sm font-normal italic">
                      None (Please Add)
                    </span>
                  )}
                </p>
                <form
                  onSubmit={(e) => handleUpdate(e, "Bio", null)}
                  className="space-y-4"
                >
                  <Field>
                    <Textarea
                      name="bio"
                      defaultValue={lawyerData?.bio}
                      placeholder="Share your experience and legal philosophy..."
                      rows={6}
                      className="bg-[#1a2034] border-slate-700 text-white rounded-xl resize-none"
                    />
                  </Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 p-6 rounded-xl"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : (
                      <Edit2 className="w-4 h-4 mr-2" />
                    )}
                    Save Bio Changes
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* 3. Location Box (from preserved structure) */}
          <motion.div {...fadeInUp} transition={{ delay: 0.25 }}>
            <Card className="flex flex-col h-full justify-between shadow-2xl border-slate-700 bg-[#101422] rounded-3xl p-8">
              <CardHeader className="p-0 mb-6 flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-blue-400" /> Chamber
                    Location
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Where clients physically consult you.
                  </CardDescription>
                </div>
                <Dialog open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-[#1a2034]"
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-[#101422] border-slate-700">
                    <form
                      onSubmit={(e) =>
                        handleUpdate(e, "Location", setIsLocationOpen)
                      }
                    >
                      <DialogHeader>
                        <DialogTitle className="text-white text-2xl font-bold">
                          Update Location
                        </DialogTitle>
                      </DialogHeader>
                      <FieldGroup className="py-6">
                        <Field>
                          <Label
                            htmlFor="edit-location"
                            className="text-slate-200"
                          >
                            Chamber/City Address
                          </Label>
                          <Input
                            id="edit-location"
                            name="location"
                            defaultValue={lawyerData?.location}
                            placeholder="e.g., Dhaka, Bangladesh"
                            required
                            className="bg-[#1a2034] border-slate-700 text-white p-6 rounded-xl"
                          />
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost" className="text-slate-400">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-indigo-600">
                          Save Location
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-0 flex-grow space-y-4">
                <p className="text-2xl text-slate-100 font-extrabold transition-colors">
                  {lawyerData?.location || (
                    <span className="text-destructive text-sm font-normal italic">
                      None (Please Add)
                    </span>
                  )}
                </p>
                <div className="w-full h-40 bg-[#1a2034] rounded-2xl border border-slate-700 flex items-center justify-center text-slate-500 italic">
                  Static Map Conceptualized
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4. Professional Information (from preserved structure) */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <Card className="flex flex-col h-full justify-between shadow-2xl border-slate-700 bg-[#101422] rounded-3xl p-8">
              <CardHeader className="p-0 mb-8 flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-white flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-violet-400" /> Profession
                    Details
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    Practice areas, rates, and experience.
                  </CardDescription>
                </div>
                <Dialog open={isProfOpen} onOpenChange={setIsProfOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-slate-700 text-slate-300 hover:bg-[#1a2034]"
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-[#101422] border-slate-700">
                    <form
                      onSubmit={(e) =>
                        handleUpdate(e, "Profession", setIsProfOpen)
                      }
                    >
                      <DialogHeader>
                        <DialogTitle className="text-white text-2xl font-bold">
                          Edit Details
                        </DialogTitle>
                      </DialogHeader>
                      <FieldGroup className="py-6 space-y-5">
                        <Field>
                          <Label className="text-slate-200">Specialty</Label>
                          <Input
                            name="specialty"
                            defaultValue={lawyerData?.specialty}
                            placeholder="e.g., Criminal Law"
                            className="bg-[#1a2034] border-slate-700"
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field>
                            <Label>Experience</Label>
                            <Input
                              name="experience"
                              defaultValue={lawyerData?.experience}
                              placeholder="e.g., 5 Yrs"
                              className="bg-[#1a2034] border-slate-700"
                            />
                          </Field>
                          <Field>
                            <Label>Hourly Rate (USD)</Label>
                            <Input
                              type="number"
                              name="hourlyRate"
                              defaultValue={lawyerData?.hourlyRate}
                              placeholder="e.g., 150"
                              className="bg-[#1a2034] border-slate-700"
                            />
                          </Field>
                        </div>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button variant="ghost" className="text-slate-400">
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button type="submit" className="bg-indigo-600">
                          Save Details
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-0 flex-grow grid grid-cols-1 sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: <Award className="w-5 h-5 text-indigo-400" />,
                    label: "Specialty",
                    value: lawyerData?.specialty,
                  },
                  {
                    icon: <Briefcase className="w-5 h-5 text-violet-400" />,
                    label: "Experience",
                    value: lawyerData?.experience,
                  },
                  {
                    icon: <DollarSign className="w-5 h-5 text-emerald-400" />,
                    label: "Hourly Rate",
                    value: lawyerData?.hourlyRate
                      ? `$${lawyerData.hourlyRate}/hr`
                      : null,
                  },
                ].map((info, index) => (
                  <div
                    key={index}
                    className="bg-[#1a2034] border border-slate-700 rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-md hover:border-indigo-700 hover:scale-105 transition"
                  >
                    {info.icon}
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">
                      {info.label}
                    </p>
                    <p className="text-lg font-bold text-slate-100">
                      {info.value || (
                        <span className="text-gray-500 italic">Set</span>
                      )}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* 5. NEW Hiring Readiness (conceptualized from preserved structure) */}
          <motion.div {...fadeInUp} transition={{ delay: 0.35 }}>
            <Card className="shadow-2xl border-slate-700 bg-[#101422] rounded-3xl p-8 flex flex-col md:flex-row h-full items-center justify-between gap-6">
              <div className="flex-grow space-y-2 text-center md:text-left">
                <CardTitle className="text-2xl font-bold text-white flex items-center justify-center md:justify-start gap-3">
                  <Star className="w-7 h-7 text-yellow-400" /> Active Hiring
                  State
                </CardTitle>
                <p className="text-base text-slate-400">
                  Toggle your visibility to legalEase clients and accept
                  consults.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-6">
                {lawyerData?.status === true ? (
                  <div className="flex flex-col items-center gap-2 p-6 bg-emerald-950/20 rounded-2xl border border-emerald-800">
                    <CheckCircle className="w-12 h-12 text-emerald-400" />
                    <span className="text-sm font-bold text-emerald-300">
                      Ready For Hires
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-6 bg-red-950/20 rounded-2xl border border-red-800">
                    <BiXCircle className="w-12 h-12 text-red-400" />
                    <span className="text-sm font-bold text-red-300">
                      Not Visible
                    </span>
                  </div>
                )}
                <Button
                  onClick={handleHiringStatus}
                  className="p-8 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all disabled:opacity-50 disabled:pointer-events-none"
                  disabled={loading || lawyerData?.status === true}
                >
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin mr-2" />
                  ) : null}
                  {lawyerData?.status === true
                    ? "Status Active"
                    : "Enable Visibility"}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
