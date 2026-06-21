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
  empty: <Star className="w-5 h-5 text-gray-300 dark:text-gray-600" />,
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
      <div className="min-h-screen flex items-center justify-center bg-[#fcf9f5] dark:bg-[#0a0a0a] text-gray-900 dark:text-white">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#fcf9f5] dark:bg-[#0a0a0a] transition-colors py-10 px-4 sm:px-6 lg:px-8 text-gray-800 dark:text-gray-100">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header Title */}
        <motion.div {...fadeInUp}>
          <h1 className="text-4xl font-extrabold tracking-tighter text-gray-900 dark:text-white">
            Attorney Hub
          </h1>
          <p className="text-lg text-gray-500 dark:text-gray-400 mt-2">
            Build and optimize your legal professional portfolio.
          </p>
        </motion.div>

        {/* 1. TOP SECTION: Primary Information Box */}
        <motion.div {...fadeInUp} transition={{ delay: 0.1 }}>
          <Card className="relative overflow-hidden shadow-sm border border-gray-200 dark:border-[#222] bg-white dark:bg-[#121212] group rounded-3xl">
            <div className="absolute top-0 left-0 right-0 h-2 bg-[#c4a482]" />
            <CardContent className="pt-12 pb-10 px-8 sm:px-12 flex flex-col md:flex-row items-center md:items-start gap-10">
              <div className="relative group">
                <div className="absolute inset-0 bg-[#c4a482]/20 blur-3xl opacity-60 group-hover:opacity-100 transition-opacity rounded-full"></div>
                <div className="relative">
                  <Image
                    width={600}
                    height={400}
                    src={
                      preview ||
                      "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168"
                    }
                    alt={lawyerData?.name || "lawyer img"}
                    className="h-32 w-32 rounded-3xl object-cover border-4 border-white dark:border-[#121212] shadow-sm transition-transform group-hover:scale-105 duration-300"
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
                  <h3 className="font-extrabold text-gray-900 dark:text-white text-3xl tracking-tight leading-tight">
                    {lawyerData?.name || "Johan Lebart"}
                  </h3>
                  <p className="text-base text-gray-500 dark:text-gray-400 font-medium mt-1">
                    {lawyerData?.email ||
                      "mdabdulla01715940008+lawyer3@gmail.com"}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-[#333] mt-2">
                  <Award className="w-5 h-5 text-[#c4a482]" />
                  <span className="text-sm font-semibold uppercase tracking-wider text-gray-800 dark:text-gray-200">
                    Expected Comp:
                  </span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {lawyerData?.salary || lawyerData?.expectedBill ? (
                      `$${lawyerData?.salary || lawyerData?.expectedBill}`
                    ) : (
                      <span className="text-gray-400 font-normal italic">
                        Set Rate
                      </span>
                    )}
                  </span>
                </div>

                {/* Rating Display */}
                {lawyerData?.rating > 0 && (
                  <div className="flex items-center gap-1.5 justify-center md:justify-start">
                    {renderStars(lawyerData.rating)}
                    <span className="text-lg font-semibold text-gray-900 dark:text-white ml-2">
                      {lawyerData.rating.toFixed(1)} / 5
                    </span>
                  </div>
                )}
              </div>

              {/* Editing primary box */}
              <Dialog open={isPrimaryOpen} onOpenChange={setIsPrimaryOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="self-center md:self-start border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300 hover:border-[#c4a482] hover:text-[#c4a482] hover:bg-[#c4a482]/10 shadow-sm gap-2 rounded-2xl px-5 py-6 transition-all"
                  >
                    <Edit2 className="w-5 h-5" />
                    Edit Primary Info
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md bg-white dark:bg-[#121212] border-gray-200 dark:border-[#222]">
                  <form
                    onSubmit={(e) =>
                      handleUpdate(e, "Primary", setIsPrimaryOpen)
                    }
                    className="space-y-6"
                  >
                    <DialogHeader>
                      <DialogTitle className="text-gray-900 dark:text-white text-2xl font-bold">
                        Edit Primary Info
                      </DialogTitle>
                      <DialogDescription className="text-gray-500 dark:text-gray-400">
                        Update your identity, rate, and upload a new profile
                        image.
                      </DialogDescription>
                    </DialogHeader>

                    {/* Drag & Drop Image Upload Zone */}
                    <FieldGroup className="space-y-6">
                      <Field>
                        <Label className="text-gray-700 dark:text-gray-300">
                          Profile Image (Drag & Drop or Click)
                        </Label>
                        <div
                          {...getRootProps()}
                          className={`mt-2 border-2 border-dashed rounded-3xl p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                            isDragActive
                              ? "border-[#c4a482] bg-[#c4a482]/10"
                              : "border-gray-300 dark:border-[#333] bg-gray-50 dark:bg-[#1a1a1a]"
                          } hover:border-[#c4a482]`}
                        >
                          <input {...getInputProps()} />
                          {preview ? (
                            <div className="relative">
                              <img
                                src={preview}
                                alt="preview"
                                className="h-28 w-28 rounded-3xl object-cover border-2 border-gray-200 dark:border-[#333] shadow-md"
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
                              <UploadCloud className="w-12 h-12 text-gray-400 dark:text-gray-600 mb-3" />
                              <p className="text-sm text-gray-500 mt-2 font-medium">
                                Drag & drop an image or click to choose
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                Max file size: 5MB
                              </p>
                            </>
                          )}
                        </div>
                      </Field>

                      <Field>
                        <Label
                          htmlFor="edit-name"
                          className="text-gray-700 dark:text-gray-300"
                        >
                          Full Name
                        </Label>
                        <Input
                          id="edit-name"
                          name="name"
                          defaultValue={lawyerData?.name}
                          required
                          className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white p-6 rounded-xl"
                        />
                      </Field>
                      <Field>
                        <Label
                          htmlFor="edit-salary"
                          className="text-gray-700 dark:text-gray-300"
                        >
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
                          className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white p-6 rounded-xl"
                        />
                      </Field>
                    </FieldGroup>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          variant="ghost"
                          className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        >
                          Cancel
                        </Button>
                      </DialogClose>
                      <Button
                        type="submit"
                        className="bg-gray-900 hover:bg-black dark:bg-[#d9bfa2] dark:hover:bg-[#c4a482] text-white dark:text-black font-bold p-6 rounded-xl"
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
          {/* 2. Bio Box */}
          <motion.div {...fadeInUp} transition={{ delay: 0.2 }}>
            <Card className="flex flex-col h-full justify-between shadow-sm border border-gray-200 dark:border-[#222] bg-white dark:bg-[#121212] rounded-3xl p-8">
              <CardHeader className="p-0 mb-6">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <Award className="w-6 h-6 text-[#c4a482]" /> Attorney Bio
                </CardTitle>
                <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
                  Your professional background and narrative.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-0 flex-grow space-y-6">
                <p className="text-base text-gray-600 dark:text-gray-300 leading-relaxed min-h-[100px]">
                  {lawyerData?.bio || (
                    <span className="text-red-500 text-sm font-normal italic">
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
                      className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white rounded-xl resize-none"
                    />
                  </Field>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gray-900 hover:bg-black dark:bg-[#d9bfa2] dark:hover:bg-[#c4a482] text-white dark:text-black font-semibold p-6 rounded-xl"
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

          {/* 3. Location Box */}
          <motion.div {...fadeInUp} transition={{ delay: 0.25 }}>
            <Card className="flex flex-col h-full justify-between shadow-sm border border-gray-200 dark:border-[#222] bg-white dark:bg-[#121212] rounded-3xl p-8">
              <CardHeader className="p-0 mb-6 flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-[#c4a482]" /> Chamber
                    Location
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
                    Where clients physically consult you.
                  </CardDescription>
                </div>
                <Dialog open={isLocationOpen} onOpenChange={setIsLocationOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white dark:bg-[#121212] border-gray-200 dark:border-[#222]">
                    <form
                      onSubmit={(e) =>
                        handleUpdate(e, "Location", setIsLocationOpen)
                      }
                    >
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white text-2xl font-bold">
                          Update Location
                        </DialogTitle>
                      </DialogHeader>
                      <FieldGroup className="py-6">
                        <Field>
                          <Label
                            htmlFor="edit-location"
                            className="text-gray-700 dark:text-gray-300"
                          >
                            Chamber/City Address
                          </Label>
                          <Input
                            id="edit-location"
                            name="location"
                            defaultValue={lawyerData?.location}
                            placeholder="e.g., Dhaka, Bangladesh"
                            required
                            className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white p-6 rounded-xl"
                          />
                        </Field>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant="ghost"
                            className="text-gray-500 dark:text-gray-400"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          className="bg-gray-900 dark:bg-[#d9bfa2] text-white dark:text-black hover:bg-black dark:hover:bg-[#c4a482]"
                        >
                          Save Location
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent className="p-0 flex-grow space-y-4">
                <p className="text-2xl text-gray-900 dark:text-white font-extrabold transition-colors">
                  {lawyerData?.location || (
                    <span className="text-red-500 text-sm font-normal italic">
                      None (Please Add)
                    </span>
                  )}
                </p>
                <div className="w-full h-40 bg-gray-50 dark:bg-[#1a1a1a] rounded-2xl border border-gray-200 dark:border-[#333] flex items-center justify-center text-gray-400 dark:text-gray-500 italic shadow-inner">
                  Static Map Conceptualized
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* 4. Professional Information */}
          <motion.div {...fadeInUp} transition={{ delay: 0.3 }}>
            <Card className="flex flex-col h-full justify-between shadow-sm border border-gray-200 dark:border-[#222] bg-white dark:bg-[#121212] rounded-3xl p-8">
              <CardHeader className="p-0 mb-8 flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-[#c4a482]" /> Profession
                    Details
                  </CardTitle>
                  <CardDescription className="text-gray-500 dark:text-gray-400 mt-1">
                    Practice areas, rates, and experience.
                  </CardDescription>
                </div>
                <Dialog open={isProfOpen} onOpenChange={setIsProfOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      className="border-gray-200 dark:border-[#333] text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#1a1a1a]"
                    >
                      <Edit2 className="w-4 h-4 mr-2" /> Edit
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md bg-white dark:bg-[#121212] border-gray-200 dark:border-[#222]">
                    <form
                      onSubmit={(e) =>
                        handleUpdate(e, "Profession", setIsProfOpen)
                      }
                    >
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-white text-2xl font-bold">
                          Edit Details
                        </DialogTitle>
                      </DialogHeader>
                      <FieldGroup className="py-6 space-y-5">
                        <Field>
                          <Label className="text-gray-700 dark:text-gray-300">
                            Specialty
                          </Label>
                          <Input
                            name="specialty"
                            defaultValue={lawyerData?.specialty}
                            placeholder="e.g., Criminal Law"
                            className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white"
                          />
                        </Field>
                        <div className="grid grid-cols-2 gap-4">
                          <Field>
                            <Label className="text-gray-700 dark:text-gray-300">
                              Experience
                            </Label>
                            <Input
                              name="experience"
                              defaultValue={lawyerData?.experience}
                              placeholder="e.g., 5 Yrs"
                              className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white"
                            />
                          </Field>
                          <Field>
                            <Label className="text-gray-700 dark:text-gray-300">
                              Hourly Rate (USD)
                            </Label>
                            <Input
                              type="number"
                              name="hourlyRate"
                              defaultValue={lawyerData?.hourlyRate}
                              placeholder="e.g., 150"
                              className="bg-gray-50 dark:bg-[#1a1a1a] border-gray-200 dark:border-[#333] text-gray-900 dark:text-white"
                            />
                          </Field>
                        </div>
                      </FieldGroup>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            variant="ghost"
                            className="text-gray-500 dark:text-gray-400"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          type="submit"
                          className="bg-gray-900 dark:bg-[#d9bfa2] text-white dark:text-black hover:bg-black dark:hover:bg-[#c4a482]"
                        >
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
                    icon: <Award className="w-5 h-5 text-[#c4a482]" />,
                    label: "Specialty",
                    value: lawyerData?.specialty,
                  },
                  {
                    icon: <Briefcase className="w-5 h-5 text-[#c4a482]" />,
                    label: "Experience",
                    value: lawyerData?.experience,
                  },
                  {
                    icon: <DollarSign className="w-5 h-5 text-[#c4a482]" />,
                    label: "Hourly Rate",
                    value: lawyerData?.hourlyRate
                      ? `$${lawyerData.hourlyRate}/hr`
                      : null,
                  },
                ].map((info, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-[#333] rounded-2xl p-6 flex flex-col items-center text-center gap-3 shadow-sm hover:border-[#c4a482] dark:hover:border-[#c4a482] hover:scale-105 transition"
                  >
                    {info.icon}
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest">
                      {info.label}
                    </p>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {info.value || (
                        <span className="text-gray-400 italic">Set</span>
                      )}
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* 5. Hiring Readiness */}
          <motion.div {...fadeInUp} transition={{ delay: 0.35 }}>
            <Card className="shadow-sm border border-gray-200 dark:border-[#222] bg-white dark:bg-[#121212] rounded-3xl p-8 flex flex-col md:flex-row h-full items-center justify-between gap-6">
              <div className="flex-grow space-y-2 text-center md:text-left">
                <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white flex items-center justify-center md:justify-start gap-3">
                  <Star className="w-7 h-7 text-yellow-400" /> Active Hiring
                  State
                </CardTitle>
                <p className="text-base text-gray-500 dark:text-gray-400 mt-2">
                  Toggle your visibility to LegalEase clients and accept
                  consults.
                </p>
              </div>
              <div className="shrink-0 flex items-center gap-6">
                {lawyerData?.status === true ? (
                  <div className="flex flex-col items-center gap-2 p-6 bg-green-50 dark:bg-green-900/20 rounded-2xl border border-green-200 dark:border-green-900/50">
                    <CheckCircle className="w-12 h-12 text-green-500 dark:text-green-400" />
                    <span className="text-sm font-bold text-green-700 dark:text-green-300">
                      Ready For Hires
                    </span>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-2 p-6 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-200 dark:border-red-900/50">
                    <BiXCircle className="w-12 h-12 text-red-500 dark:text-red-400" />
                    <span className="text-sm font-bold text-red-700 dark:text-red-300">
                      Not Visible
                    </span>
                  </div>
                )}
                <Button
                  onClick={handleHiringStatus}
                  className="p-8 rounded-2xl font-bold text-lg bg-gray-900 hover:bg-black dark:bg-[#d9bfa2] dark:hover:bg-[#c4a482] text-white dark:text-black transition-all disabled:opacity-50 disabled:pointer-events-none"
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
