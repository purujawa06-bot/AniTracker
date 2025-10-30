import { getAnimeGenres, searchAnime } from '@/lib/jikan';
import { AnimeCard } from '@/components/anime-card';
import { Suspense } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { PaginationComponent } from '@/components/pagination';

async function GenreList() {
  const genres = await getAnimeGenres();
  return (
    <div className="flex flex-wrap gap-2">
      {genres.map(genre => (
        <Link href={`/browse?genre=${genre.mal_id}`} key={genre.mal_id}>
          <Badge variant="secondary" className="hover:bg-primary/20 transition-colors cursor-pointer">{genre.name}</Badge>
        </Link>
      ))}
    </div>
  );
}

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

async function AnimeGrid({ genreId, page }: { genreId: string; page: number }) {
  const { data: animeList, pagination } = await searchAnime('', { genre: genreId, page, limit: 24 });
  const genres = await getAnimeGenres();
  const genre = genres.find(g => g.mal_id.toString() === genreId);

  return (
    <div>
        <h1 className="text-3xl font-bold mb-6">
            Browsing Genre: <span className="text-primary">{genre?.name}</span>
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {animeList.map((anime) => (
                <AnimeCard key={anime.mal_id} anime={anime} />
            ))}
        </div>
        <div className="mt-8 flex justify-center">
            <PaginationComponent 
                currentPage={page} 
                hasNextPage={pagination.has_next_page}
                buildLink={(p) => `/browse?genre=${genreId}&page=${p}`}
            />
        </div>
    </div>
  );
}

export default function BrowsePage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const genreId = typeof searchParams?.genre === 'string' ? searchParams.genre : '';
  const page = typeof searchParams?.page === 'string' ? parseInt(searchParams.page) : 1;

  return (
    <div className="container py-8">
      {genreId ? (
        <Suspense fallback={<SearchResultsSkeleton />}>
            <AnimeGrid genreId={genreId} page={page} />
        </Suspense>
      ) : (
        <>
            <h1 className="text-3xl font-bold mb-6">Browse by Genre</h1>
            <GenreList />
        </>
      )}
    </div>
  );
}
