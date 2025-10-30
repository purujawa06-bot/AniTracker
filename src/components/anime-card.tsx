import Link from 'next/link';
import Image from 'next/image';
import type { JikanAnime } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface AnimeCardProps {
  anime: JikanAnime;
}

export function AnimeCard({ anime }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.mal_id}`} className="group block">
      <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-dark-pop-hover hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={anime.images.jpg.large_image_url || anime.images.jpg.image_url}
              alt={anime.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary">
            {anime.title}
          </CardTitle>
          {anime.score && (
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span>{anime.score}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
