"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Award } from "lucide-react";

const TopLawyers = ({ topLawyers = [] }) => {
  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-neutral-50 dark:bg-[#090706] text-foreground transition-colors duration-300 border-t border-border/40">
      <div className="max-w-7xl mx-auto">
        {/* সেকশন হেডার */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="text-[#c4a482] font-medium tracking-wider uppercase text-xs mb-2 flex items-center gap-1.5">
            <Award className="w-4 h-4" /> Elite Performance
          </span>
          <h2 className="text-3xl md:text-4xl font-serif tracking-wide text-foreground font-semibold">
            Top Legal Experts
          </h2>
          <p className="text-sm text-muted-foreground mt-2 max-w-md font-sans">
            Our most trusted and frequently hired legal professionals based on
            successful client case histories.
          </p>
          <div className="h-[2px] w-12 bg-[#c4a482] mt-4" />
        </div>

        {/* যদি ডাটা না থাকে তার জন্য সেফটি চেক */}
        {topLawyers.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground text-sm font-sans">
            No top experts available at the moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-5xl mx-auto justify-center items-center">
            {topLawyers.slice(0, 3).map((lawyer, index) => {
              const { _id, name, image, specialty, hire } = lawyer;

              return (
                <div
                  key={_id || index}
                  className="flex flex-col items-center text-center group transform transition-all duration-300 hover:-translate-y-1.5"
                >
                  <Link
                    href={`/lawyers/${_id}`}
                    className="flex flex-col items-center"
                  >
                    {/* রাউন্ডেড অ্যাভাটার / ইমেজ বাউন্ডারি */}
                    <div className="relative w-40 h-40 md:w-44 md:h-44 rounded-full p-1 border-2 border-border group-hover:border-[#c4a482] transition-colors duration-300 bg-background overflow-hidden shadow-md">
                      <div className="relative w-full h-full rounded-full overflow-hidden bg-muted">
                        <Image
                          src={
                            image ||
                            "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400"
                          }
                          alt={name || "Lawyer Profile"}
                          fill
                          className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-w-xs) 100vw, 200px"
                        />
                      </div>

                      {/* র‍্যাঙ্ক বা ব্যাজ প্লেসমেন্ট (১ম, ২য়, ৩য় পজিশন ইন্ডিকেটর) */}
                      <div className="absolute bottom-1 right-3 bg-[#c4a482] text-black font-sans font-bold text-xs w-6 h-6 rounded-full flex items-center justify-center border border-background shadow-sm">
                        #{index + 1}
                      </div>
                    </div>

                    {/* নাম এবং সাব-টেক্সট */}
                    <div className="mt-5 flex flex-col items-center">
                      <h3 className="font-serif text-xl font-medium tracking-wide text-foreground group-hover:text-[#c4a482] transition-colors duration-200 line-clamp-1">
                        {name}
                      </h3>
                      <p className="text-xs text-[#c4a482] font-medium tracking-wider uppercase mt-1">
                        {specialty || "Legal Practitioner"}
                      </p>

                      {hire && (
                        <span className="mt-2 inline-flex items-center text-[11px] font-sans text-muted-foreground bg-neutral-100 dark:bg-neutral-900 px-2.5 py-1 rounded-full border border-border/40">
                          Total Hires:{" "}
                          <strong className="text-foreground ml-1">
                            {hire}
                          </strong>
                        </span>
                      )}
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopLawyers;
