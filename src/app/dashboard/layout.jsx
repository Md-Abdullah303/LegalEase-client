// import AppSidebar from "@/components/ui/app-sidebar";

import AppSidebar from "@/components/app-Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col lg:flex-row w-full bg-neutral-50 dark:bg-neutral-950 min-h-screen">
      {/* রেস্পন্সিভ সাইডবার কম্পোনেন্ট */}
      <AppSidebar />

      {/* মেইন কনটেন্ট এরিয়া */}
      <main className="flex-1 w-full pt-10 lg:pt-0">
        {/* মোবাইলে টগল বাটনের জন্য উপরে একটু pt-16 স্পেস দেওয়া হয়েছে */}
        <div className="p-4 md:p-6 lg:p-0 ">{children}</div>
      </main>
    </div>
  );
}
