"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const MyNavLink = ({ href, children, className = "" }) => {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`
        relative font-medium transition-all duration-200
        hover:text-primary py-2 px-3 rounded-lg
        ${isActive ? "dark:bg-[#161616] bg-[#d6d6d6]" : "text-muted-foreground"}
        ${className}
      `}
    >
      {children}

      {/* ADDED: Active Underline */}
      <span
        className={` transition-all duration-300
          
        `}
      />
    </Link>
  );
};

export default MyNavLink;
