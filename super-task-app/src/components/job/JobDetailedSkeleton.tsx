import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from '@/components/ui/skeleton'
import { Header } from '@/components/common/Header'

export function JobDetailedSkeleton() {
  return (
    <div className="min-h-screen" style={{ background: 'radial-gradient(circle at left top, rgba(37, 150, 190, 0.1), transparent 40%), radial-gradient(circle at bottom right, rgba(212, 23, 199, 0.1), transparent 40%), rgb(249, 249, 249)' }}>
      <Header />
      <div className="max-w-4xl mx-auto px-4 pb-2">
        <Skeleton className="h-10 w-32 mb-6" />
        
        <Card className="bg-white border border-gray-200 shadow-sm">
          <CardHeader className="border-b border-gray-200">
            <div className="space-y-6">
              <div className="flex gap-4">
                <Skeleton className="h-16 w-16 rounded-full" />
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-8 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-full" />
              </div>
            </div>
          </CardHeader>

          <CardContent className="pt-6">
            <div className="space-y-8">
              <div>
                <Skeleton className="h-7 w-48 mb-4" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>

              <div>
                <Skeleton className="h-7 w-40 mb-4" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-3/4" />
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardHeader className="pb-3">
                    <Skeleton className="h-6 w-40" />
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </CardContent>
                </Card>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <Skeleton className="h-11 w-32" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}