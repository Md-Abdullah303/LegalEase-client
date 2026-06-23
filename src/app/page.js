import HeroSection from "@/component/homepage/HeroSection";
import NewLawyersSections from "@/component/homepage/NewLawyersSections";
// import NewLawyersSections from "@/component/homepage/NewLawyersSections";
import { getLatestLawyers } from "@/lib/api/homepage";
import Image from "next/image";

export default async function Home() {
  const latestLawyer = await getLatestLawyers();

  return (
    <div>
      <HeroSection />
      <NewLawyersSections latestLawyer={latestLawyer} />
    </div>
  );
}
