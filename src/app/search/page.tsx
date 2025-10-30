import { searchAnime } from '@/lib/jikan';
import { AnimeCard } from '@/components/anime-card';
import { SearchForm } from '@/components/search-form';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

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

async function SearchResults({ query }: { query: string }) {
  const animeList = await searchAnime(query);

  if (animeList.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-lg text-muted-foreground">No results found for "{query}".</p>
        <p className="text-sm text-muted-foreground mt-2">Try a different search term.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {animeList.map((anime) => (
        <AnimeCard key={anime.mal_id} anime={anime} />
      ))}
    </div>
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const query = typeof searchParams?.q === 'string' ? searchParams.q : '';

  if (!query) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Search for an Anime</h1>
        <div className="max-w-lg mx-auto">
          <SearchForm />
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">
        Search Results for <span className="text-primary">"{query}"</span>
      </h1>
      <Suspense fallback={<SearchResultsSkeleton />}>
        <SearchResults query={query} />
      </Suspense>
    </div>
  );
}
