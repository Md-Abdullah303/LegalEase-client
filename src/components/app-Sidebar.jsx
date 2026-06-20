import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  LuLayoutDashboard,
  LuHistory,
  LuUserCheck,
  LuMessageSquare,
  LuUserCog,
  LuDollarSign,
  LuUsers,
} from "react-icons/lu";
import { getUserSession } from "@/lib/core/session";
import { ImProfile } from "react-icons/im";
import { CiGrid42 } from "react-icons/ci";
import MobileSidebar from "@/component/UI/MobileSidebar";
// import MobileSidebar from "./MobileSidebar"; // আপনার MobileSidebar ফাইলটির সঠিক পাথ দিন

export default async function AppSidebar() {
  const user = await getUserSession();

  const lawyerItems = [
    {
      title: "Dashboard Overview",
      href: "/dashboard/lawyer",
      icon: LuLayoutDashboard,
    },
    {
      title: "Hiring History",
      href: "/dashboard/lawyer/hiring-history",
      icon: LuHistory,
    },
    {
      title: "Active Hirings",
      href: "/dashboard/lawyer/active-hirings",
      icon: LuUserCheck,
    },
    {
      title: "Lawyer Profile",
      href: "/dashboard/lawyer/profile",
      icon: ImProfile,
    },
  ];

  const userItems = [
    {
      title: "User Overview",
      href: "/dashboard/user",
      icon: LuLayoutDashboard,
    },
    {
      title: "Hiring History",
      href: "/dashboard/user/hiring-history",
      icon: LuHistory,
    },
    {
      title: "My Comments",
      href: "/dashboard/user/comments",
      icon: LuMessageSquare,
    },
    {
      title: "Update Profile",
      href: "/dashboard/user/update-profile",
      icon: LuUserCog,
    },
  ];

  const adminItems = [
    { title: "Analytics", href: "/dashboard/admin/analytics", icon: CiGrid42 },
    {
      title: "All Transactions",
      href: "/dashboard/admin/all-transactions",
      icon: LuDollarSign,
    },
    {
      title: "Manage Users",
      href: "/dashboard/admin/manage-users",
      icon: LuUsers,
    },
  ];

  const navItemsMap = {
    user: userItems,
    lawyer: lawyerItems,
    admin: adminItems,
  };

  const menuItems = navItemsMap[user?.role || "user"] || [];

  return (
    <>
      {/* =========================================================================
          ১. ট্যাবলেট এবং পিসির জন্য রেগুলার সাইডবার (মোবাইল স্ক্রিনে অটোমেটিক হাইড থাকবে)
         ========================================================================= */}
      <aside className="hidden lg:flex w-64 flex-col justify-between border-r border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#0c0a09] transition-all duration-300 min-h-screen">
        <div className="w-full">
          {/* ইউজার প্রোফাইল এরিয়া */}
          {user && (
            <div className="flex items-center gap-3 p-4 border-b border-neutral-200 dark:border-neutral-800">
              <div className="relative shrink-0">
                <Avatar className="h-10 w-10 border border-neutral-200 dark:border-neutral-700">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    {user.name ? user.name.substring(0, 2).toUpperCase() : "US"}
                  </AvatarFallback>
                </Avatar>
                <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-600 border-2 border-white dark:border-[#0c0a09]" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-sm font-semibold truncate text-neutral-900 dark:text-neutral-100">
                  {user.name}
                </span>
                <span className="text-xs text-muted-foreground capitalize font-medium">
                  {user.role}
                </span>
              </div>
            </div>
          )}

          {/* নেভিগেশন লিংকসমূহ */}
          <div className="p-3">
            <p className="px-3 text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
              Navigation
            </p>
            <nav className="space-y-1">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors group"
                >
                  <item.icon className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-colors" />
                  <span className="text-sm font-medium">{item.title}</span>
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* ফুটার কপিরাইট */}
        <div className="border-t border-neutral-200 dark:border-neutral-800 p-4 text-center bg-white dark:bg-[#0c0a09] mt-12">
          <p className="text-xs text-neutral-400 dark:text-neutral-500">
            &copy; {new Date().getFullYear()} Legal Ease. <br /> All rights
            reserved.
          </p>
        </div>
      </aside>

      {/* =========================================================================
          ২. মোবাইল ডিভাইসের জন্য টগল ড্রয়ার (পিসি এবং ট্যাবলেটে অটোমেটিক হাইড থাকবে)
         ========================================================================= */}
      <MobileSidebar>
        <div className="flex flex-col justify-between h-full w-full">
          <div className="w-full">
            {/* মোবাইল প্রোফাইল এরিয়া */}
            {user && (
              <div className="flex items-center gap-3 p-4 border-b border-neutral-200 dark:border-neutral-800">
                <div className="relative shrink-0">
                  <Avatar className="h-10 w-10 border border-neutral-200 dark:border-neutral-700">
                    <AvatarImage src={user.image} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        ? user.name.substring(0, 2).toUpperCase()
                        : "US"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-600 border-2 border-white dark:border-[#0c0a09]" />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-semibold truncate text-neutral-900 dark:text-neutral-100">
                    {user.name}
                  </span>
                  <span className="text-xs text-muted-foreground capitalize font-medium">
                    {user.role}
                  </span>
                </div>
              </div>
            )}

            {/* মোবাইল নেভিগেশন লিংকসমূহ */}
            <div className="p-3">
              <p className="px-3 text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                Navigation
              </p>
              <nav className="space-y-1">
                {menuItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:text-neutral-950 dark:hover:text-neutral-50 transition-colors group"
                  >
                    <item.icon className="h-4 w-4 shrink-0 text-neutral-500 group-hover:text-neutral-950 dark:group-hover:text-neutral-50 transition-colors" />
                    <span className="text-sm font-medium">{item.title}</span>
                  </Link>
                ))}
              </nav>
            </div>
          </div>

          {/* মোবাইল ফুটার কপিরাইট */}
          <div className="border-t border-neutral-200 dark:border-neutral-800 p-4 text-center bg-white dark:bg-[#0c0a09] mt-12">
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              &copy; {new Date().getFullYear()} Legal Ease. <br /> All rights
              reserved.
            </p>
          </div>
        </div>
      </MobileSidebar>
    </>
  );
}
