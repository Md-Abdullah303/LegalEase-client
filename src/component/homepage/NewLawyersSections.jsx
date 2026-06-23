"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

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
    <section className="py-20">
      <div className="md:max-w-6xl max-w-4xl mx-auto px-4">
        {/* Heading */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold">
            Featured <span className="text-[#c4a482]">Lawyers</span>
          </h2>

          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Connect with experienced legal professionals ready to help you solve
            your legal matters.
          </p>
        </div>

        {/* Cards */}
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
                scale: 1.04,
              }}
              className="
                overflow-hidden
                rounded-2xl
                border
                bg-background
                shadow-sm
                transition-all
                duration-300
                hover:shadow-xl
              "
            >
              {/* Image */}
              <div className="relative h-[320px] overflow-hidden">
                <Image
                  src={
                    lawyer?.image ||
                    "https://plus.unsplash.com/premium_photo-1677252438411-9a930d7a5168"
                  }
                  alt={lawyer?.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-xl">{lawyer?.name}</h3>

                    <p className="text-sm text-[#c4a482] mt-1">
                      {lawyer?.specialty || "General Law"}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-[#c4a482] font-medium">
                    ⭐ {lawyer?.rating || "4.8"}
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-8 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      ${lawyer?.hourlyRate || 290}
                      <span className="text-sm text-muted-foreground">/hr</span>
                    </p>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    {lawyer?.hire || 0} hires
                  </div>
                </div>

                <Link
                  href={`/lawyers/${lawyer?._id}`}
                  className="
                    mt-6
                    flex
                    justify-center
                    rounded-xl
                    bg-[#c4a482]
                    px-4
                    py-3
                    font-medium
                    text-black
                    transition-all
                    hover:opacity-90
                  "
                >
                  View Profile
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
