"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Star } from "lucide-react"; // ইমোজির বদলে প্রিমিয়াম আইকন

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const NewLawyersSections = ({ latestLawyer = [] }) => {
  return (
    <section className="py-20 bg-background text-foreground transition-colors duration-300">
      <div className="md:max-w-6xl max-w-4xl mx-auto px-4">
        {/* Heading Section */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-serif tracking-wide text-foreground">
            Featured <span className="text-[#c4a482]">Lawyers</span>
          </h2>
          <p className="mt-4 text-sm md:text-base font-sans text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Connect with experienced legal professionals ready to help you solve
            your legal matters.
          </p>
          <div className="h-[2px] w-12 bg-[#c4a482] mx-auto mt-4" />
        </div>

        {/* Cards Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{
            once: true,
            amount: 0.2,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {latestLawyer?.map((lawyer) => (
            <motion.div
              key={lawyer?._id}
              variants={item}
              whileHover={{
                y: -6,
              }}
              className="
                flex flex-col
                overflow-hidden
                rounded-none
                border border-border/80
                bg-card
                shadow-sm
                transition-all
                duration-300
                hover:shadow-xl
                hover:border-[#c4a482]/60
                group
              "
            >
              {/* Image Section */}
              <div className="relative h-[240px] overflow-hidden bg-muted">
                <Image
                  src={
                    lawyer?.image ||
                    "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168"
                  }
                  alt={lawyer?.name}
                  fill
                  className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-w-7xl) 33vw, 100vw"
                />
              </div>

              {/* Content Body */}
              <div className="p-6 flex flex-col flex-1 justify-between gap-6">
                {/* Name & Specialty */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-serif font-medium text-xl tracking-wide group-hover:text-[#c4a482] transition-colors line-clamp-1">
                      {lawyer?.name}
                    </h3>
                    <p className="text-xs font-sans font-medium text-[#c4a482] uppercase tracking-wider mt-1">
                      {lawyer?.specialty || "General Law"}
                    </p>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 text-[#c4a482] font-sans text-xs font-bold shrink-0">
                    <Star className="w-4 h-4 fill-current" />
                    <span>{lawyer?.rating || "4.8"}</span>
                  </div>
                </div>

                {/* Bottom Pricing & Hires */}
                <div className="flex items-end justify-between pt-4 border-t border-border/60">
                  <div>
                    <p className="font-serif text-2xl font-semibold text-foreground">
                      ${lawyer?.hourlyRate || 290}
                      <span className="text-xs font-sans font-normal text-muted-foreground ml-0.5">
                        /hr
                      </span>
                    </p>
                  </div>

                  <div className="text-xs font-sans text-muted-foreground tracking-wide">
                    {lawyer?.hire || 0} hires
                  </div>
                </div>

                {/* View Profile Button */}
                <Link
                  href={`/lawyers/${lawyer?._id}`}
                  className="
                    w-full
                    text-center
                    bg-neutral-100
                    dark:bg-zinc-900
                    text-foreground
                    group-hover:bg-[#c4a482]
                    group-hover:text-black
                    dark:hover:text-[#c4a482]
                    rounded-none
                    py-3
                    text-xs
                    font-sans
                    font-semibold
                    uppercase
                    tracking-widest
                    transition-all
                    duration-300
                    border border-border/40
                    group-hover:border-[#c4a482]
                  "
                >
                  View Profile &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NewLawyersSections;
