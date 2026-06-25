import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  FaEye,
  FaEnvelope,
  FaPhone,
  FaLocationDot,
  FaBriefcase,
  FaCalendarDays,
  FaLinkedin,
  FaCircleCheck,
  FaCircleXmark,
  FaIdCard,
} from "react-icons/fa6";
import Image from "next/image";

export function AdminManageMemberShowModal({ data }) {
  // console.log(data);
  if (!data) return null;

  // জয়েনিং ডেট ফরম্যাট করার জন্য
  const joinedDate = data.createdAt
    ? new Date(data.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "N/A";

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon" variant="outline" className="hover:bg-muted">
          <FaEye className="h-4 w-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-120 p-0 overflow-hidden border border-border bg-background text-foreground shadow-lg rounded-lg">
        {/* Top Unique Banner Gradient */}
        <div className="h-28 bg-linear-to-r from-blue-500 via-indigo-500 to-purple-600 dark:from-blue-600 dark:via-indigo-700 dark:to-purple-800" />

        {/* Profile Info Section */}
        <div className="px-6 pb-6 -mt-12">
          <div className="flex flex-col items-center text-center space-y-3 pb-5 border-b border-border">
            {/* Avatar / Image */}
            <Image
              width={600}
              height={400}
              src={
                data.avatar ||
                data.image ||
                "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168"
              }
              alt={data.name}
              className="w-24 h-24 rounded-full border-4 border-background dark:border-zinc-900 object-cover shadow-md bg-muted"
            />

            {/* Name and Role Badge */}
            <div>
              <div className="flex items-center justify-center gap-2">
                <h2 className="text-2xl font-bold tracking-tight">
                  {data.name || "User Profile"}
                </h2>
                <Badge className="capitalize text-xs px-2.5 py-0.5 font-semibold bg-primary text-primary-foreground">
                  {data.role || "User"}
                </Badge>
              </div>

              {/* Occupation */}
              <p className="text-sm text-muted-foreground flex items-center justify-center gap-1.5 mt-1">
                <FaBriefcase className="h-3.5 w-3.5 text-muted-foreground/70" />
                {data.occupation || data.specialty || "N/A"}
              </p>
            </div>

            {/* Bio Box */}
            {data.bio && (
              <p className="text-sm text-muted-foreground italic max-w-sm px-4 py-2 bg-muted/40 dark:bg-muted/20 border border-border/60 rounded-xl">
                {`"${data.bio}"`}
              </p>
            )}
          </div>

          {/* Scrollable Details Section */}
          <div className="no-scrollbar max-h-[40vh] overflow-y-auto py-4 space-y-4">
            <h3 className="text-xs font-bold tracking-wider text-muted-foreground uppercase">
              Account Details
            </h3>

            {/* Grid Information */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Email Address & Verification */}
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <FaEnvelope className="h-3.5 w-3.5" /> Email Address
                </span>
                <p className="text-sm font-medium break-all">
                  {data.email || "N/A"}
                </p>
                <div className="pt-1">
                  {data.emailVerified ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                      <FaCircleCheck className="h-3 w-3" /> Verified
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-full">
                      <FaCircleXmark className="h-3 w-3" /> Unverified
                    </span>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <FaPhone className="h-3.5 w-3.5" /> Phone Number
                </span>
                <p className="text-sm font-medium">{data.phone || "N/A"}</p>
              </div>

              {/* Location */}
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <FaLocationDot className="h-3.5 w-3.5" /> Location
                </span>
                <p className="text-sm font-medium">{data.location || "N/A"}</p>
              </div>

              {/* Joined Date */}
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <FaCalendarDays className="h-3.5 w-3.5" /> Joined Date
                </span>
                <p className="text-sm font-medium">{joinedDate}</p>
              </div>
            </div>

            {/* Full Address */}
            {data.address && (
              <div className="space-y-1 pt-3 border-t border-border/60">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <FaLocationDot className="h-3.5 w-3.5" /> Full Address
                </span>
                <p className="text-sm font-medium">{data.address}</p>
              </div>
            )}

            {/* Footer IDs & Socials */}
            <div className="pt-3 border-t border-border/60 flex flex-col sm:flex-row gap-2 items-start sm:items-center justify-between text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <FaIdCard className="h-3.5 w-3.5" /> ID:{" "}
                <code className="bg-muted px-1 py-0.5 rounded text-[11px] font-mono">
                  {data._id}
                </code>
              </span>

              {data.linkedinUrl && (
                <a
                  href={data.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors font-medium"
                >
                  <FaLinkedin className="h-3.5 w-3.5" /> LinkedIn Profile
                </a>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
