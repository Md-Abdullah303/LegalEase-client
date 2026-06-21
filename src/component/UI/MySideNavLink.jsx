"use client";
import { hr } from "motion/react-client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const MySideNavLink = ({ children, href, className }) => {
  const path = usePathname();
  const isActive = path === href;
  return (
    <Link
      href={href}
      className={`${className}
    ${isActive ? `bg-gray-200 border-l-4 border-[#A8823C]` : ``}
    `}
    >
      {children}
    </Link>
  );
};

export default MySideNavLink;
