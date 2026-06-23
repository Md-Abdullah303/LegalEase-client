"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assests/logo.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { LuMenu, LuX, LuLogOut, LuUser, LuSearch } from "react-icons/lu";
import MyNavLink from "../UI/MyNavLink";
import { ModeToggle } from "../shadcn/ModeToggle";

const Navbar = ({ userData }) => {
  const [open, setOpen] = useState(false);
  // ১. সার্চের ভ্যালু ট্র্যাকিংয়ের জন্য স্টেট ডিক্লেয়ারেশন
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();

  const closeMenu = () => setOpen(false);

  // ২. সার্চ সাবমিট হ্যান্ডলার ফাংশন
  const handleSearchSubmit = (e) => {
    e.preventDefault(); // পেজ রিফ্রেশ হওয়া বন্ধ করবে
    if (!searchQuery.trim()) return; // ফাঁকা সার্চ ইগনোর করবে

    // লয়ার ব্রাউজ পেজে কুয়েরি প্যারামিটারসহ রিডাইরেক্ট করবে
    router.push(`/lawyers?search=${encodeURIComponent(searchQuery.trim())}`);

    // সার্চ হয়ে গেলে মোবাইল মেনু খোলা থাকলে তা বন্ধ করে দেবে
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      closeMenu();
      router.push("/");
      router.refresh("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    { id: 1, title: "Home", href: "/" },
    { id: 2, title: "Browse Lawyers", href: "/lawyers" },
  ];

  const dashboardLink = {
    user: "/dashboard/user",
    lawyer: "/dashboard/lawyer",
    admin: "/dashboard/admin",
  };

  if (userData) {
    navLinks.push({
      id: 3,
      title: "Dashboard",
      href: dashboardLink[userData?.role],
    });
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-[#0c0a09]/80 backdrop-blur-md transition-all duration-300 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8 xl:gap-12">
            <Link
              href="/"
              className="flex items-center gap-2.5 group"
              onClick={closeMenu}
            >
              <div className="w-9 h-9 md:w-11 md:h-11 relative flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
                <Image
                  src={logo}
                  alt="Legal Ease Logo"
                  width={44}
                  height={44}
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-xl base-primary1-font md:text-2xl font-bold tracking-tight whitespace-nowrap bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-50 dark:to-neutral-300 bg-clip-text text-transparent">
                Legal Ease
              </h1>
            </Link>

            <ul className="hidden lg:flex items-center gap-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <MyNavLink href={link.href}>{link.title}</MyNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ডেস্কটপ সার্চ বক্স */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end max-w-xl">
            {/* ৩. ইনপুট ফিল্ডকে form ট্যাগ দিয়ে র‍্যাপ করা হয়েছে */}
            <form
              onSubmit={handleSearchSubmit}
              className="relative w-full max-w-xs xl:max-w-sm"
            >
              <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search here..."
                className="w-full pl-9 pr-4 h-9 shadow-sm bg-neutral-100 dark:bg-neutral-900 border-none focus-visible:ring-1 focus-visible:ring-[#a17232]"
              />
            </form>

            <ModeToggle />

            <div className="flex items-center gap-3 shrink-0">
              {userData ? (
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 text-sm font-medium border border-neutral-200 dark:border-neutral-800 px-3 py-1.5 rounded-full bg-neutral-50 dark:bg-neutral-900">
                    <LuUser size={15} className="text-[#a17232]" />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {userData?.name || "User"}
                    </span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5 h-9 rounded-md"
                  >
                    <LuLogOut size={14} />
                    <span>Logout</span>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link href={"/auth/signin"}>
                    <Button variant="ghost" size="sm" className="h-9">
                      Log in
                    </Button>
                  </Link>
                  <Link href={"/auth/signup"}>
                    <Button
                      size="sm"
                      className="bg-[#a17232] text-white hover:bg-[#865d26] h-9 shadow-sm"
                    >
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? <LuX size={20} /> : <LuMenu size={20} />}
            </Button>
          </div>
        </div>

        {/* মোবাইল রেসপন্সিভ সার্চ বক্স ও মেনু */}
        <div className="lg:hidden">
          {/* ৩. মোবাইল ইনপুট ফিল্ডকেও form ট্যাগ দিয়ে র‍্যাপ করা হয়েছে */}
          <form onSubmit={handleSearchSubmit} className="mt-3 relative">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search here..."
              className="w-full pl-9 bg-neutral-100 dark:bg-neutral-900 border-none h-9"
            />
          </form>

          {open && (
            <div className="mt-4 border-t border-neutral-200 dark:border-neutral-800 pt-4 animate-in fade-in slide-in-from-top-4 duration-200">
              <ul className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <MyNavLink
                      href={link.href}
                      className="block py-2 px-3 rounded-md hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors"
                      onClick={closeMenu}
                    >
                      {link.title}
                    </MyNavLink>
                  </li>
                ))}
              </ul>

              <div className="mt-4 border-t border-neutral-200 dark:border-neutral-800 pt-4">
                {userData ? (
                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-neutral-100 dark:bg-neutral-900 text-sm font-medium">
                      <LuUser size={16} className="text-[#a17232]" />
                      <span>{userData?.name || "User"}</span>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full flex items-center justify-center gap-2 h-9"
                      onClick={handleLogout}
                    >
                      <LuLogOut size={15} />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      href={"/auth/signin"}
                      className="w-full"
                      onClick={closeMenu}
                    >
                      <Button variant="outline" className="w-full h-9">
                        Log in
                      </Button>
                    </Link>
                    <Link
                      href={"/auth/signup"}
                      className="w-full"
                      onClick={closeMenu}
                    >
                      <Button className="w-full bg-[#a17232] text-white hover:bg-[#865d26] h-9">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
