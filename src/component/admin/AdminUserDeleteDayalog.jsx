"use client";
import { Trash2, Trash2Icon } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { memberDltByMemberId } from "@/lib/actions/admin";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export function AdminMembersDeleteDayalog({ data }) {
  const router = useRouter();
  const handleDeleteUser = async (user) => {
    // console.log("delete", user);
    const res = await memberDltByMemberId(user?._id);
    if (res.deletedCount > 0) {
      toast.success("Lawyer Deleted.");
      router.refresh();
    } else {
      toast.error("Something was wrong!");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon" variant="destructive">
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Delete {data?.role || `this user`}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete the {data?.role || "user"} data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteUser(data)}
            variant="destructive"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
