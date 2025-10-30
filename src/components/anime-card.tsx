import Link from 'next/link';
import Image from 'next/image';
import type { JikanAnyMedia } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface MediaCardProps {
  media: JikanAnyMedia;
}

export function MediaCard({ media }: MediaCardProps) {
  const mediaType = 'episodes' in media ? 'anime' : 'manga';
  const href = `/${mediaType}/${media.mal_id}`;

  return (
    <Link href={href} className="group block">
      <Card className="h-full overflow-hidden hover:shadow-dark-pop-hover hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="aspect-[2/3] relative">
            <Image
              src={media.images.jpg.large_image_url || media.images.jpg.image_url}
              alt={media.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-base font-semibold leading-tight line-clamp-2 group-hover:text-primary">
            {media.title}
          </CardTitle>
          {media.score && (
            <div className="mt-2 flex items-center text-sm text-muted-foreground">
              <Star className="w-4 h-4 mr-1 text-yellow-500 fill-yellow-500" />
              <span>{media.score}</span>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
