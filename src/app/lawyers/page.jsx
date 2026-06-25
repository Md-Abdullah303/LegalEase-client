import LawyersContainer from "@/component/browseLawyers/LawyersContainer";
import LawyerFilter from "@/component/UI/filteringForLayer";
import { getLawyerHiringByLawerId } from "@/lib/api/applications";
import { getAllLawyers, getLawyerByLawyerId } from "@/lib/api/lawyers";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const BrowsLawyersPage = async ({ searchParams }) => {
  const searchQuery = await searchParams;
  const user = await getUserSession();

  const { search, salary, popularity } = searchQuery;
  const query = `?search=${search || ""}&salary=${salary || ""}&popularity=${popularity || ""}`;
  // console.log(query);

  const lawyers = await getAllLawyers(query);

  return (
    <div className="max-w-7xl md:w-[90%] mx-auto py-10 px-3 md:px-5">
      <p>Find Your COUNSEL</p>
      <h1 className="text-2xl md:text-4xl font-bold">
        Browse <span>Expert Lawyers</span>
      </h1>

      <LawyerFilter />

      <div className="">
        <LawyersContainer user={user} lawyers={lawyers} />
      </div>
    </div>
  );
};

export default BrowsLawyersPage;
