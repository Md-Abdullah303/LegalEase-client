"use client"; // <--- এই লাইনটি যুক্ত করা হয়েছে এররটি ফিক্স করার জন্য

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import footerLogo from "@/assests/logo.png";
// React Icons Import
import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaGithub,
} from "react-icons/fa6";
import { FiArrowRight } from "react-icons/fi";

const Footer = () => {
  const companyLinks = [
    { name: "About", href: "#" },
    { name: "Contact", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Careers", href: "#" },
  ];

  const practiceAreas = [
    { name: "Corporate", href: "#" },
    { name: "Criminal", href: "#" },
    { name: "Family", href: "#" },
    { name: "Immigration", href: "#" },
    { name: "IP", href: "#" },
    { name: "Employment", href: "#" },
  ];

  // Social Icons Array using React Icons
  const socialIcons = [FaXTwitter, FaLinkedinIn, FaInstagram, FaGithub];

  return (
    <footer className="bg-[#1d1d1d] text-[#a3a3a3] pt-16 pb-8 px-6 md:px-12 lg:px-24 font-sans border-t border-neutral-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-neutral-800">
        {/* Brand Section */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="flex items-center gap-3 text-white">
            <Image
              src={footerLogo}
              alt="LegalEase Logo"
              width={60}
              height={60}
              className="object-contain"
            />
            <span className="text-2xl font-serif tracking-wide text-white italic">
              LegalEase
            </span>
          </div>
          <p className="text-sm leading-relaxed max-w-sm text-neutral-400">
            Connecting people with expert legal counsel. Trusted by thousands of
            clients across the country.
          </p>

          {/* Social Icons with Smooth Spring Animation */}
          <div className="flex items-center gap-5 pt-2">
            {socialIcons.map((Icon, idx) => (
              <motion.a
                key={idx}
                href="#"
                whileHover={{ scale: 1.15, color: "#b4833b" }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="text-neutral-500 transition-colors duration-200"
              >
                <Icon size={20} />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Company Links */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            Company
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            {companyLinks.map((link, idx) => (
              <li key={idx}>
                <motion.a
                  href={link.href}
                  whileHover={{ x: 4, color: "#ffffff" }}
                  transition={{ type: "tween", duration: 0.15 }}
                  className="hover:text-white transition-colors duration-200 inline-block"
                >
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Practice Areas Links */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            Practice Areas
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            {practiceAreas.map((link, idx) => (
              <li key={idx}>
                <motion.a
                  href={link.href}
                  whileHover={{ x: 4, color: "#ffffff" }}
                  transition={{ type: "tween", duration: 0.15 }}
                  className="hover:text-white transition-colors duration-200 inline-block"
                >
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal Insights / Newsletter Subscription */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h4 className="text-xs font-semibold tracking-widest text-neutral-500 uppercase">
            Legal Insights
          </h4>
          <p className="text-sm leading-relaxed text-neutral-400">
            Occasional updates on legal developments, platform news, and expert
            perspectives.
          </p>
          <div className="flex flex-col gap-3 mt-2 w-full max-w-md">
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-[#151515] border border-neutral-800 rounded px-4 py-3 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#b4833b] transition-colors duration-200"
            />
            <motion.button
              whileHover={{ scale: 1.01, backgroundColor: "#c5944a" }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-[#a17232] text-white font-medium py-3 px-4 rounded flex items-center justify-center gap-2 text-sm transition-colors duration-200"
            >
              Subscribe <FiArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-600">
        <p>
          &copy; {new Date().getFullYear()} LegalEase, Inc. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <a
            href="#"
            className="hover:text-neutral-400 transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-neutral-400 transition-colors duration-200"
          >
            Terms
          </a>
          <a
            href="#"
            className="hover:text-neutral-400 transition-colors duration-200"
          >
            Cookies
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
