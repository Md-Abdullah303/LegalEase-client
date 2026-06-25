import { Skeleton } from "@/components/ui/skeleton";

export default function LawyerDetailsPageLoading() {
  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-black transition-colors">
      <div className="max-w-6xl mx-auto py-10 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Profile card — image + name + stats */}
            <div className="rounded-xl border border-white/10 bg-zinc-900 dark:bg-zinc-900 p-5">
              <div className="flex gap-5">
                {/* photo */}
                <Skeleton className="h-44 w-36 rounded-lg flex-shrink-0" />

                <div className="flex-1 space-y-4 pt-1">
                  {/* "Lawyer" label */}
                  <Skeleton className="h-4 w-16" />

                  {/* stats grid — Experience, Location, Rate, Hires */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3 mt-4">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              </div>
            </div>

            {/* About card */}
            <div className="rounded-xl border border-white/10 bg-zinc-900 dark:bg-zinc-900 p-5 space-y-4">
              {/* "About" heading */}
              <Skeleton className="h-5 w-20" />
              {/* bio lines */}
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-3/4" />
              {/* contact */}
              <Skeleton className="h-4 w-40 mt-2" />
            </div>

            {/* Discussion Matrix card */}
            <div className="rounded-xl border border-white/10 bg-zinc-900 dark:bg-zinc-900 p-5 space-y-4">
              {/* heading */}
              <Skeleton className="h-5 w-48" />
              {/* empty state placeholder */}
              <Skeleton className="h-4 w-72 mx-auto mt-6" />
              <div className="pb-4" />
            </div>
          </div>

          {/* Right column — Hire form */}
          <div className="lg:col-span-1">
            <div className="rounded-xl border border-white/10 bg-zinc-900 dark:bg-zinc-900 p-5 space-y-5">
              {/* "Hire this Lawyer" heading */}
              <Skeleton className="h-6 w-40" />
              {/* subtitle */}
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />

              {/* Full Name field */}
              <div className="space-y-2 pt-1">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-10 w-full rounded-lg" />
              </div>

              {/* Case Description field */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-40" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>

              {/* Submit button */}
              <Skeleton className="h-11 w-full rounded-lg" />

              {/* disclaimer text */}
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-5/6" />
              <Skeleton className="h-3 w-2/3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
