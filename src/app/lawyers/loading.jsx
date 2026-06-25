import { Skeleton } from "@/components/ui/skeleton";

// একটা card এর skeleton — actual card এর মতোই layout
function LawyerCardSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10  dark:bg-zinc-900">
      {/* image area */}
      <Skeleton className="h-48 w-full rounded-none" />

      <div className="p-4 space-y-3">
        {/* specialty */}
        <Skeleton className="h-3 w-1/3" />
        {/* name */}
        <Skeleton className="h-5 w-2/3" />

        {/* hourly rate + hires row */}
        <div className="pt-2 flex items-end justify-between">
          <div className="space-y-1.5">
            <Skeleton className="h-3 w-16" />
            <Skeleton className="h-6 w-20" />
          </div>
          <Skeleton className="h-3 w-12" />
        </div>
      </div>
    </div>
  );
}

export default function LawyersBrowseLoading() {
  return (
    <div className="max-w-7xl md:w-[90%] mx-auto py-10 px-3 md:px-5">
      {/* Page title area */}
      <div className="space-y-2 mb-6">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-9 w-64" />
      </div>

      {/* Filter bar — search + 2 dropdowns */}
      <div className="flex items-center gap-3 mb-10">
        <Skeleton className="h-11 flex-1 rounded-lg" />
        <Skeleton className="h-11 w-24 rounded-lg" />
        <Skeleton className="h-11 w-36 rounded-lg" />
        <Skeleton className="h-11 w-44 rounded-lg" />
      </div>

      {/* Cards grid — 4 columns like the real page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <LawyerCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
