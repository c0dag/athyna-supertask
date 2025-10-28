import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function JobCardSkeleton() {
  return (
    <Card className="bg-white border border-gray-200">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center gap-4">
          <Skeleton className="w-14 h-14 rounded-full" />
          
          <div className="flex-1 space-y-2">
            <Skeleton className="h-6 w-[200px]" />
            
            <Skeleton className="h-4 w-[180px]" />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
          </div>
          
          <div className="flex flex-wrap items-center gap-1">
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-24 rounded-full" />
            <Skeleton className="h-5 w-22 rounded-full" />
            <Skeleton className="h-5 w-28 rounded-full" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function JobCardSkeletonList({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: count }).map((_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  )
}