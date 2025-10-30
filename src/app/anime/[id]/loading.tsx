import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { Star, Tv, Users, BarChart } from 'lucide-react';

function StatSkeleton() {
    return (
      <div className="flex flex-col items-center justify-center p-4 text-center bg-card rounded-lg border">
        <Skeleton className="w-8 h-8 rounded-full mb-2" />
        <Skeleton className="h-4 w-12 mb-1" />
        <Skeleton className="h-6 w-16" />
      </div>
    );
  }

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <Card className="overflow-hidden sticky top-20">
            <Skeleton className="w-full aspect-[350/500]" />
            <div className="p-4">
              <Skeleton className="h-12 w-full" />
            </div>
          </Card>
        </div>

        <div className="w-full md:w-2/3">
          <Skeleton className="h-10 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          
          <div className="flex flex-wrap gap-2 mb-6">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
            <Skeleton className="h-6 w-16 rounded-full" />
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
            <StatSkeleton />
          </div>

          <Card>
            <div className="p-6">
              <Skeleton className="h-8 w-1/3 mb-4" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </Card>

        </div>
      </div>
    </div>
  );
}