import { searchMedia } from '@/lib/jikan';
import { MediaCard } from '@/components/anime-card';
import { SearchForm } from '@/components/search-form';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { PaginationComponent } from '@/components/pagination';
import type { JikanAnyMedia } from '@/lib/types';

function SearchResultsSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i}>
          <Skeleton className="aspect-[2/3] w-full rounded-lg" />
          <Skeleton className="h-4 mt-2 w-3/4" />
          <Skeleton className="h-4 mt-1 w-1/2" />
        </div>
      ))}
    </div>
  );
}

async function SearchResults({ query, page, type }: { query: string, page: number, type: 'anime' | 'manga' }) {
  const { data: mediaList, pagination } = await searchMedia(query, { page, type });

  if (mediaList.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">No results found for "{query}".</p>
        <p className="text-sm text-muted-foreground mt-2">Try a different search term.</p>
      </div>
    );
  }

  return (
    <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {mediaList.map((media) => (
                <MediaCard key={media.mal_id} media={media as JikanAnyMedia} />
            ))}
        </div>
        <div className="mt-8 flex justify-center">
            <PaginationComponent 
                currentPage={page} 
                hasNextPage={pagination.has_next_page}
                buildLink={(p) => `/search?q=${encodeURIComponent(query)}&type=${type}&page=${p}`}
            />
        </div>
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page, 10) : 1;
  const type = searchParams?.type === 'manga' ? 'manga' : 'anime';

  if (!query) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Search for an Anime or Manga</h1>
        <div className="max-w-lg mx-auto">
          <SearchForm />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className='mb-6'>
        <SearchForm initialQuery={query} initialType={type} />
      </div>
      <h1 className="text-3xl font-bold mb-6">
        Search Results for <span className="text-primary">"{query}"</span> ({type})
      </h1>
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults query={query} page={page} type={type} />
      </Suspense>
    </div>
  );
}
