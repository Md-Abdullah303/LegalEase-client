"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Pencil } from "lucide-react";
import toast from "react-hot-toast";
import { updateCommentByUserAndByLawyerId } from "@/lib/actions/comments";
import { useRouter } from "next/navigation";

export function CommentEditModal({ userId, lawyerId, currentComment }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  // console.log(user, lawyer, currentComment);

  const onSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    // // ডাটা কনসোলে দেখার জন্য
    console.log("Form Data:", userId, lawyerId, data);

    // আপনার একশন কলটি এখানে আন-কমেন্ট করুন
    const res = await updateCommentByUserAndByLawyerId(userId, lawyerId, data);
    if (res) {
      toast.success("Comment updated successfully!");
      router.refresh();
    } else {
      toast.error("Try again! Sir");
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-all"
        >
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md border-none shadow-2xl rounded-2xl">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Edit Comment
            </DialogTitle>
            <DialogDescription className="text-gray-500">
              Modify your thoughts and save the changes.
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="comment"
                className="text-sm font-medium text-gray-700"
              >
                Your Comment
              </Label>
              <Input
                id="comment"
                name="comment" // নাম সঠিক রাখুন
                defaultValue={currentComment || ""}
                placeholder="Type your new comment here..."
                className="h-12 px-4 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
              />
            </div>
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="rounded-xl px-6"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="rounded-xl px-6 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
