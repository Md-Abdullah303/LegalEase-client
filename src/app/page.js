import HeroSection from "@/component/homepage/HeroSection";
import LegalCategories from "@/component/homepage/LegalCategories";
import NewLawyersSections from "@/component/homepage/NewLawyersSections";
import TopLawyers from "@/component/homepage/TopLawyers";
// import NewLawyersSections from "@/component/homepage/NewLawyersSections";
import { getLatestLawyers, getTopLawyers } from "@/lib/api/homepage";
import Image from "next/image";

export default async function Home() {
  const latestLawyer = await getLatestLawyers();
  const topLawyers = await getTopLawyers();

  return (
    <div>
      <HeroSection />
      <NewLawyersSections latestLawyer={latestLawyer} />
      <TopLawyers topLawyers={topLawyers} />
      <LegalCategories />
    </div>
  );
}
