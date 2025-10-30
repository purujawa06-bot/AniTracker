import { getTopMedia } from '@/lib/jikan';
import { SearchForm } from '@/components/search-form';
import { MediaCard } from '@/components/anime-card';
import { Skeleton } from '@/components/ui/skeleton';
import { Suspense } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { JikanAnyMedia } from '@/lib/types';

async function TopMediaList({ type, filter }: { type: 'anime' | 'manga', filter: string }) {
  const mediaList = await getTopMedia(type, filter);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {mediaList.map((media: JikanAnyMedia) => (
        <MediaCard key={media.mal_id} media={media} />
      ))}
    </div>
  );
}

function TopMediaSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 mt-2 w-3/4" />
          <Skeleton className="h-4 mt-1 w-1/2" />
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <>
      <section className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline text-primary">
                Discover Your Next Favorite
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                AniTracker helps you find and keep track of anime and manga you love.
              </p>
            </div>
            <div className="w-full max-w-lg">
              <SearchForm />
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
           <Tabs defaultValue="anime" className="w-full">
            <TabsList className="grid w-full grid-cols-2 max-w-sm mx-auto">
              <TabsTrigger value="anime">Top Airing Anime</TabsTrigger>
              <TabsTrigger value="manga">Top Publishing Manga</TabsTrigger>
            </TabsList>
            <TabsContent value="anime" className="mt-6">
              <Suspense fallback={<TopMediaSkeleton />}>
                <TopMediaList type="anime" filter="airing" />
              </Suspense>
            </TabsContent>
            <TabsContent value="manga" className="mt-6">
               <Suspense fallback={<TopMediaSkeleton />}>
                <TopMediaList type="manga" filter="publishing" />
              </Suspense>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </>
  );
}
