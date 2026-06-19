import LawyersContainer from "@/component/browseLawyers/LawyersContainer";
import { getAllLawyers } from "@/lib/api/lawyers";
import React from "react";

const BrowsLawyersPage = async () => {
  const lawyers = await getAllLawyers();
  //   console.log(lawyers);
  return (
    <div className="max-w-7xl md:w-[90%] mx-auto py-10">
      <p>Find Your COUNSEL</p>
      <h1 className="text-2xl md:text-4xl font-bold">
        Browse <span>Expert Lawyers</span>
      </h1>
      <div className="">
        <LawyersContainer lawyers={lawyers} />
      </div>
    </div>
  );
};

export default BrowsLawyersPage;
