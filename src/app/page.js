import { Suspense } from "react";
import HeroSection from "@/component/homepage/HeroSection";
import LegalCategories from "@/component/homepage/LegalCategories";
import NewLawyersSections from "@/component/homepage/NewLawyersSections";
import TopLawyers from "@/component/homepage/TopLawyers";
import { getLatestLawyers, getTopLawyers } from "@/lib/api/homepage";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton UI
function LawyersSkeleton() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 py-8">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col gap-3 p-4 rounded-xl border border-border"
        >
          <Skeleton className="h-40 w-full rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-8 w-full rounded-md" />
        </div>
      ))}
    </div>
  );
}

// Error UI
function ErrorSection({ message }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center px-4">
      <p className="text-5xl mb-4">⚠️</p>
      <h2 className="text-xl font-semibold text-foreground mb-2">
        Something went wrong
      </h2>
      <p className="text-muted-foreground text-sm max-w-sm">{message}</p>
    </div>
  );
}

// Data fetch আলাদা async component এ নিয়ে গেলাম
// কারণ Suspense শুধু async component এর জন্য কাজ করে
async function LawyerSections() {
  const [latestResult, topResult] = await Promise.allSettled([
    getLatestLawyers(),
    getTopLawyers(),
  ]);

  const latestLawyer =
    latestResult.status === "fulfilled" ? latestResult.value : null;
  const topLawyers = topResult.status === "fulfilled" ? topResult.value : null;

  return (
    <>
      {latestLawyer ? (
        <NewLawyersSections latestLawyer={latestLawyer} />
      ) : (
        <ErrorSection message="Could not load latest lawyers. Please check your connection." />
      )}

      {topLawyers ? (
        <TopLawyers topLawyers={topLawyers} />
      ) : (
        <ErrorSection message="Could not load top lawyers. Please check your connection." />
      )}
    </>
  );
}

// Main page — এখন অনেক clean
export default function Home() {
  return (
    <div>
      <HeroSection />

      {/*
        Suspense মানে:
        - LawyerSections data load করার সময় fallback দেখাবে (Skeleton)
        - loading.js এর spinner এর বদলে এখানে skeleton দেখাবে
        - data আসলে automatically replace হয়ে যাবে
      */}
      <Suspense fallback={<LawyersSkeleton />}>
        <LawyerSections />
      </Suspense>

      <LegalCategories />
    </div>
  );
}
