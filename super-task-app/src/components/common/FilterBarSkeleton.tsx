import { Skeleton } from "@/components/ui/skeleton"

export function FilterBarSkeleton() {
  return (
    <div className="mb-6 rounded-3xl border border-white/30 px-6 py-4 shadow-2xl backdrop-blur-sm bg-white/10 w-full">
      {/* Search input skeleton */}
      <div className="mb-3">
        <div className="relative w-full">
          <Skeleton className="h-10 w-full rounded-md" />
        </div>
      </div>
      
      {/* Select and button skeleton */}
      <div className="flex items-center gap-3 w-full">
        <Skeleton className="h-10 w-[180px] rounded-md" />
        <Skeleton className="h-10 w-16 rounded-md" />
      </div>
    </div>
  )
}