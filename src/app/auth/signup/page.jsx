"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import footerLogo from "@/assests/logo.png";
import backgourndImd from "@/assests/lawyer-kana-img.avif";
import { FaGoogle, FaEye, FaEyeSlash } from "react-icons/fa6";
import Link from "next/link";

// Shadcn UI Components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";

const SignUp = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("user");

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  const redirectTo = callback ? callback : "/";

  const validateForm = () => {
    let valid = true;
    let newErrors = { name: "", email: "", password: "", confirmPassword: "" };

    if (!name.trim()) {
      newErrors.name = "Full name is required";
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Please enter a valid email address";
      valid = false;
    }

    // নতুন পাসওয়ার্ড রেজেক্স (১টি বড় হাতের, ১টি ছোট হাতের, ১টি সংখ্যা এবং ন্যূনতম ৮ ক্যারেক্টার)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password) {
      newErrors.password = "Password is required";
      valid = false;
    } else if (!passwordRegex.test(password)) {
      newErrors.password =
        "Must be 8+ characters with uppercase, lowercase, and a number";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
      role,
    });

    // console.log("data, error :", data, error);
    if (data) {
      toast.success("Successfully Register.");
      router.push(redirectTo);
      router.refresh(redirectTo);
    } else if (error) {
      toast.error("Something was wrong!");
    }
  };

  // ফর্মের জন্য স্লাইড ইন অ্যানিমেশন ভেরিয়েন্ট
  const slideInVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const handleGoogleLogin = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-row-reverse font-sans transition-colors duration-300">
      {/* ডান পাশ: ইমেজ এবং ব্র্যান্ডিং সেকশন */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-zinc-950 items-center justify-center p-12 overflow-hidden border-l border-border">
        <div className="absolute inset-0 z-0 opacity-25 dark:opacity-20">
          <Image
            src={backgourndImd}
            alt="Justice Statue"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-zinc-950/90" />
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-10 w-full max-w-lg flex flex-col gap-12"
        >
          <div className="flex items-center gap-3">
            <Image
              src={footerLogo}
              alt="LegalEase Logo"
              width={38}
              height={38}
              className="object-contain inverted dark:invert-0"
            />
            <span className="text-xl font-serif tracking-wide text-zinc-100 italic">
              LegalEase
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-6xl font-serif font-medium tracking-wide leading-tight text-zinc-100">
              Justice starts with <br />
              <span className="text-[#a17232] italic">the right counsel.</span>
            </h1>
            <p className="text-sm text-zinc-400 max-w-md leading-relaxed">
              Connect with verified attorneys who understand your situation and
              fight for your rights.
            </p>
          </div>
        </motion.div>
      </div>

      {/* বাম পাশ: ফর্ম সেকশন */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-6 md:px-16 lg:px-24 py-12">
        <div className="w-full max-w-md flex flex-col gap-6">
          {/* ট্যাব অ্যানিমেশন (Register Active) */}
          <motion.div
            variants={slideInVariants}
            initial="hidden"
            animate="visible"
            className="flex border-b border-border self-end mb-2"
          >
            <Link
              href={
                callback ? `/auth/signin?callback=${callback}` : `/auth/signin`
              }
            >
              <button
                type="button"
                className="px-6 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </button>
            </Link>
            <Link
              href={
                callback ? `/auth/signup?callback=${callback}` : `/auth/signup`
              }
            >
              <button
                type="button"
                className="px-6 py-2 border-b-2 border-[#a17232] text-sm font-medium text-foreground"
              >
                Register
              </button>
            </Link>
          </motion.div>

          {/* হেডার টেক্সট অ্যানিমেশন */}
          <motion.div
            variants={slideInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-1"
          >
            <h2 className="text-2xl font-serif tracking-wide text-foreground">
              Create account
            </h2>
            <p className="text-xs text-muted-foreground">
              Join LegalEase to access expert legal counsel
            </p>
          </motion.div>

          {/* ফর্ম সেকশন */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <FieldGroup className="space-y-4">
              {/* ফুল নেম ফিল্ড */}
              <motion.div
                variants={slideInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
              >
                <Field>
                  <FieldLabel
                    htmlFor="fullName"
                    className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Full Name
                  </FieldLabel>
                  <Input
                    id="fullName"
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (errors.name) setErrors({ ...errors, name: "" });
                    }}
                    placeholder="Jane Smith"
                    className={
                      errors.name
                        ? "border-destructive focus-visible:ring-destructive"
                        : "focus-visible:ring-[#a17232]"
                    }
                  />
                  {errors.name && (
                    <span className="text-destructive text-xs mt-1 block">
                      {errors.name}
                    </span>
                  )}
                </Field>
              </motion.div>

              {/* ইমেইল ফিল্ড */}
              <motion.div
                variants={slideInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
              >
                <Field>
                  <FieldLabel
                    htmlFor="email"
                    className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Email
                  </FieldLabel>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (errors.email) setErrors({ ...errors, email: "" });
                    }}
                    placeholder="your@email.com"
                    className={
                      errors.email
                        ? "border-destructive focus-visible:ring-destructive"
                        : "focus-visible:ring-[#a17232]"
                    }
                  />
                  {errors.email && (
                    <span className="text-destructive text-xs mt-1 block">
                      {errors.email}
                    </span>
                  )}
                </Field>
              </motion.div>

              {/* পাসওয়ার্ড ফিল্ড */}
              <motion.div
                variants={slideInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.25 }}
              >
                <Field>
                  <FieldLabel
                    htmlFor="password"
                    className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Password
                  </FieldLabel>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (errors.password)
                          setErrors({ ...errors, password: "" });
                      }}
                      placeholder="Min. 8 characters"
                      className={`pr-10 ${errors.password ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#a17232]"}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? (
                        <FaEyeSlash size={16} />
                      ) : (
                        <FaEye size={16} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <span className="text-destructive text-xs mt-1 block leading-tight">
                      {errors.password}
                    </span>
                  )}
                </Field>
              </motion.div>

              {/* কনফার্ম পাসওয়ার্ড ফিল্ড */}
              <motion.div
                variants={slideInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.3 }}
              >
                <Field>
                  <FieldLabel
                    htmlFor="confirmPassword"
                    className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold"
                  >
                    Confirm Password
                  </FieldLabel>
                  <Input
                    id="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (errors.confirmPassword)
                        setErrors({ ...errors, confirmPassword: "" });
                    }}
                    placeholder="Repeat password"
                    className={
                      errors.confirmPassword
                        ? "border-destructive focus-visible:ring-destructive"
                        : "focus-visible:ring-[#a17232]"
                    }
                  />
                  {errors.confirmPassword && (
                    <span className="text-destructive text-xs mt-1 block">
                      {errors.confirmPassword}
                    </span>
                  )}
                </Field>
              </motion.div>

              {/* রেডিও বাটন সেকশন */}
              <motion.div
                variants={slideInVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.35 }}
                className="flex flex-col gap-2 pt-1"
              >
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">
                  Register As
                </span>
                <div className="flex gap-6 items-center bg-card border border-border rounded-md px-4 py-2.5">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground select-none">
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={role === "user"}
                      onChange={(e) => setRole(e.target.value)}
                      className="accent-[#a17232] w-4 h-4 cursor-pointer"
                    />
                    Regular User
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-foreground select-none">
                    <input
                      type="radio"
                      name="role"
                      value="lawyer"
                      checked={role === "lawyer"}
                      onChange={(e) => setRole(e.target.value)}
                      className="accent-[#a17232] w-4 h-4 cursor-pointer"
                    />
                    Professional Lawyer
                  </label>
                </div>
              </motion.div>
            </FieldGroup>

            {/* সাবমিট বাটন */}
            <motion.div
              variants={slideInVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="pt-2"
            >
              <Button
                type="submit"
                className="w-full bg-[#a17232] text-white hover:bg-[#c5944a] font-medium py-6 rounded text-sm transition-colors duration-200"
              >
                Continue
              </Button>
            </motion.div>
          </form>

          {/* ডিভাইডার */}
          <motion.div
            variants={slideInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.45 }}
            className="relative flex py-1 items-center"
          >
            <div className="flex-grow border-t border-border"></div>
            <span className="flex-shrink mx-4 text-xs text-muted-foreground">
              or
            </span>
            <div className="flex-grow border-t border-border"></div>
          </motion.div>

          {/* গুগল রেজিস্টার বাটন */}
          <motion.div
            variants={slideInVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
          >
            <Button
              onClick={handleGoogleLogin}
              type="button"
              variant="outline"
              className="w-full border-border bg-card text-foreground hover:bg-accent font-medium py-6 rounded flex items-center justify-center gap-2.5 text-sm transition-colors duration-200"
            >
              <FaGoogle className="text-red-500" size={16} /> Continue with
              Google
            </Button>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
