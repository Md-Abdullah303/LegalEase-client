import AppSidebar from "@/component/UI/AppSideabar";
import { getUserSession } from "@/lib/core/session";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const user = await getUserSession();
  if (!user) {
    redirect("/unauthorized");
  }
  return (
    <div className="flex flex-col lg:flex-row w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      <AppSidebar />

      <main className="flex-1 w-full pt-10 lg:pt-0">
        <div className="p-4 md:p-6 lg:p-0 ">{children}</div>
      </main>
    </div>
  );
}
