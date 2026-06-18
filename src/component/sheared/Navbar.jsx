"use client";

import Image from "next/image";
import React, { useState } from "react";
import logo from "@/assests/logo.png";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../shadcn/ModeToggle";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import MyNavLink from "../UI/MyNavLink";

// import MyNavLink from "./MyNavLink";
// import { navLinks } from "@/data/navLinks"; // ADDED

const Navbar = () => {
  const [open, setOpen] = useState(false);
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

  return (
    <header className="sticky top-0 z-50 border bg-[#1d1d1d] shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          {/* Left Side */}
          <div className="flex items-center gap-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-12 md:w-14">
                <Image
                  src={logo}
                  alt="Legal Ease Logo"
                  width={600}
                  height={400}
                  priority
                />
              </div>

              <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">
                Legal Ease
              </h1>
            </div>

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-6">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <MyNavLink href={link.href}>{link.title}</MyNavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <Input
              placeholder="Search here..."
              className="w-[280px] xl:w-[350px]"
            />

            <ModeToggle />

            <div className="flex items-center gap-2">
              <Button variant="ghost">Log in</Button>

              <Button>Get Started</Button>
            </div>
          </div>

          {/* Mobile Actions */}
          <div className="flex items-center gap-2 lg:hidden">
            <ModeToggle />

            <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
              {open ? <X size={22} /> : <Menu size={22} />}
            </Button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="mt-3 lg:hidden">
          <Input placeholder="Search here..." />
        </div>

        {/* Mobile Menu */}
        {open && (
          <div className="lg:hidden mt-4 border-t pt-4">
            <ul className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <MyNavLink href={link.href} className="block">
                    {link.title}
                  </MyNavLink>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-2">
              <Button variant="outline" className="w-full">
                Log in
              </Button>

              <Button className="w-full">Get Started</Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
