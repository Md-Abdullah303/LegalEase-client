"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assests/logo.png";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../shadcn/ModeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut, User } from "lucide-react";
import MyNavLink from "../UI/MyNavLink";
import Link from "next/link";
import { authClient } from "@/lib/auth-client"; // আপনার auth client ইম্পোর্ট করুন
import { useRouter } from "next/navigation";

const Navbar = ({ userData }) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // মেনু বন্ধ করার ফাংশন
  const closeMenu = () => setOpen(false);

  // লগআউট হ্যান্ডলার ফাংশন
  const handleLogout = async () => {
    try {
      await authClient.signOut();
      closeMenu();
      router.refresh(); // পেজ রিফ্রেশ করে স্টেট আপডেট করার জন্য
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const navLinks = [
    {
      id: 1,
      title: "Home",
      href: "/",
    },
    {
      id: 2,
      title: "Browse Lawyers",
      href: "/lawyers",
    },
  ];

  // ইউজার লগইন থাকলে ড্যাশবোর্ড লিঙ্ক পুশ হবে
  if (userData) {
    navLinks.push({
      id: 3,
      title: "Dashboard",
      href: "/dashboard",
    });
  }

  return (
    <header className="sticky top-0 z-50 border-b base-primary-B-color base-primary-color shadow-sm backdrop-blur-md bg-opacity-90">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-4">
          {/* Left Side */}
          <div className="flex items-center gap-6 xl:gap-10">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              onClick={closeMenu}
            >
              <div className="w-10 h-10 md:w-12 md:h-12 relative flex items-center justify-center">
                <Image
                  src={logo}
                  alt="Legal Ease Logo"
                  width={48}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight whitespace-nowrap transition-colors">
                Legal Ease
              </h1>
            </Link>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <MyNavLink href={link.href}>{link.title}</MyNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side Desktop */}
          <div className="hidden lg:flex items-center gap-4 flex-1 justify-end max-w-xl">
            <div className="w-full max-w-xs xl:max-w-sm">
              <Input
                placeholder="Search here..."
                className="w-full shadow bg-[#d3d3d3] dark:bg-[#1d1d1d]"
              />
            </div>

            <ModeToggle />

            {/* ডেমনস্ট্রেশন: ইউজার লগইন থাকলে এবং না থাকলে কী দেখাবে */}
            <div className="flex items-center gap-4 shrink-0">
              {userData ? (
                // ইউজার লগইন থাকলে (Desktop)
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-sm font-medium border px-3 py-1.5 rounded-md bg-accent/50">
                    <User size={16} className="text-[#a17232]" />
                    <span>{userData?.name || "User"}</span>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-1.5"
                  >
                    <LogOut size={15} />
                    Logout
                  </Button>
                </div>
              ) : (
                // ইউজার লগইন না থাকলে (Desktop)
                <div className="flex items-center gap-2">
                  <Link href={"/auth/signin"}>
                    <Button variant="ghost">Log in</Button>
                  </Link>
                  <Link href={"/auth/signup"}>
                    <Button className="bg-[#a17232] text-white hover:bg-[#c5944a]">
                      Get Started
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              aria-label="Toggle Menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>

        {/* Mobile Search & Menu Area */}
        <div className="lg:hidden">
          {/* Mobile Search */}
          <div className="mt-3">
            <Input
              placeholder="Search here..."
              className="w-full shadow bg-[#d3d3d3] dark:bg-[#1d1d1d]"
            />
          </div>

          {/* Mobile Menu Links */}
          {open && (
            <div className="mt-4 border-t pt-4 animate-in fade-in slide-in-from-top-5 duration-200">
              <ul className="flex flex-col gap-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <MyNavLink
                      href={link.href}
                      className="block py-2 px-3 rounded-md hover:bg-accent transition-colors"
                      onClick={closeMenu}
                    >
                      {link.title}
                    </MyNavLink>
                  </li>
                ))}
              </ul>

              {/* Mobile Auth/User Section */}
              <div className="mt-5 border-t pt-4">
                {userData ? (
                  // ইউজার লগইন থাকলে (Mobile)
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-accent/50 text-sm font-medium">
                      <User size={18} className="text-[#a17232]" />
                      <span>{userData?.name || "User"}</span>
                    </div>
                    <Button
                      variant="destructive"
                      className="w-full flex items-center justify-center gap-2"
                      onClick={handleLogout}
                    >
                      <LogOut size={16} />
                      Logout
                    </Button>
                  </div>
                ) : (
                  // ইউজার লগইন না থাকলে (Mobile)
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Link
                      href={"/auth/signin"}
                      className="w-full"
                      onClick={closeMenu}
                    >
                      <Button variant="outline" className="w-full">
                        Log in
                      </Button>
                    </Link>

                    <Link
                      href={"/auth/signup"}
                      className="w-full"
                      onClick={closeMenu}
                    >
                      <Button className="w-full bg-[#a17232] text-white hover:bg-[#c5944a]">
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
