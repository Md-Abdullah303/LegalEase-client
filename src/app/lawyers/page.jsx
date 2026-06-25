import LawyersContainer from "@/component/browseLawyers/LawyersContainer";
import LawyerFilter from "@/component/UI/filteringForLayer";
import { getAllLawyers } from "@/lib/api/lawyers";
import { getUserSession } from "@/lib/core/session";
import React from "react";

const BrowsLawyersPage = async ({ searchParams }) => {
  const searchQuery = await searchParams;
  const user = await getUserSession();

  const { search, salary, popularity, page } = searchQuery;

  // page টাও query তে যোগ করলাম
  const query = `?search=${search || ""}&salary=${salary || ""}&popularity=${popularity || ""}&page=${page || 1}&limit=12`;

  const response = await getAllLawyers(query);
  // response এখন { data, total, page, totalPages }

  return (
    <div className="max-w-7xl md:w-[90%] mx-auto py-10 px-3 md:px-5">
      <p>Find Your COUNSEL</p>
      <h1 className="text-2xl md:text-4xl font-bold">
        Browse <span>Expert Lawyers</span>
      </h1>
      <LawyerFilter />
      <LawyersContainer
        user={user}
        lawyers={response?.data || []}
        totalPages={response?.totalPages || 1}
        currentPage={Number(page) || 1}
      />
    </div>
  );
};

export default BrowsLawyersPage;
