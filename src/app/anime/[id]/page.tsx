import { getAnimeById } from '@/lib/jikan';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Star, Tv, Users, BarChart } from 'lucide-react';
import { WatchlistButtons } from '@/components/watchlist-buttons';
import type { JikanAnime } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';

interface AnimeDetailPageProps {
  params: { id: string };
}

function Stat({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number | null | undefined }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex flex-col items-center justify-center p-4 text-center bg-card rounded-lg border">
      <Icon className="w-8 h-8 text-primary mb-2" />
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-xl font-bold">{value}</span>
    </div>
  )
}

export default async function AnimeDetailPage({ params }: AnimeDetailPageProps) {
  const anime = await getAnimeById(params.id);

  if (!anime) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <Card className="overflow-hidden sticky top-20">
            <Image
              src={anime.images.jpg.large_image_url}
              alt={anime.title}
              width={350}
              height={500}
              className="w-full h-auto object-cover"
            />
          <div className="p-4">
             <WatchlistButtons anime={anime as JikanAnime} />
          </div>
          </Card>
        </div>

        <div className="md:col-span-2">
          <h1 className="text-4xl font-bold font-headline mb-2">{anime.title}</h1>
          <p className="text-lg text-muted-foreground mb-4">{anime.title_english}</p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {anime.genres.map(genre => (
              <Badge key={genre.mal_id} variant="secondary">{genre.name}</Badge>
            ))}
             {anime.year && <Badge variant="outline">{anime.year}</Badge>}
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <Stat icon={Star} label="Score" value={anime.score ? `${anime.score}` : 'N/A'} />
            <Stat icon={BarChart} label="Rank" value={anime.rank ? `#${anime.rank}` : 'N/A'} />
            <Stat icon={Users} label="Popularity" value={anime.popularity ? `#${anime.popularity}` : 'N/A'} />
            <Stat icon={Tv} label="Episodes" value={anime.episodes || 'N/A'} />
          </div>

          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-4">Synopsis</h2>
              <p className="text-foreground/80 leading-relaxed whitespace-pre-wrap">
                {anime.synopsis || 'No synopsis available.'}
              </p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  );
}
