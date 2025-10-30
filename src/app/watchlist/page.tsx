"use client";

import { useWatchlist } from "@/context/watchlist-provider";
import Link from "next/link";
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Trash2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

export default function WatchlistPage() {
  const { watchlist, removeFromWatchlist, loading } = useWatchlist();

  if (loading) {
    return (
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="aspect-video rounded-t-lg" />
              <CardHeader><Skeleton className="h-6 w-3/4" /></CardHeader>
              <CardContent className="space-y-2">
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-2 w-full" />
              </CardContent>
              <CardFooter><Skeleton className="h-9 w-full" /></CardFooter>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (watchlist.length === 0) {
    return (
      <div className="container py-24 text-center">
        <h2 className="text-2xl font-bold">Your Watchlist is Empty</h2>
        <p className="text-muted-foreground mt-2 mb-6">
          Start by searching for anime or manga and adding it to your list.
        </p>
        <Link href="/">
          <Button>Find Something to Watch/Read</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {watchlist.map((item) => {
          const partLabel = item.type === 'anime' ? 'episodes' : 'chapters';
          const progress = item.totalParts && item.totalParts > 0 ? (item.watchedParts / item.totalParts) * 100 : 0;
          const href = `/${item.type}/${item.mal_id}`;

          return (
            <Card key={item.mal_id} className="flex flex-col">
               <Link href={href} className="group block">
                  <div className="aspect-video relative overflow-hidden rounded-t-lg">
                      <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                  </div>
              </Link>
              <CardHeader>
                <CardTitle className="line-clamp-2 h-12">
                  <Link href={href} className="hover:text-primary transition-colors">
                      {item.title}
                  </Link>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <div className="text-sm text-muted-foreground mb-2">
                  {item.watchedParts} / {item.totalParts || '??'} {partLabel}
                </div>
                <Progress value={progress} />
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" className="w-full" onClick={() => removeFromWatchlist(item.mal_id)}>
                  <Trash2 className="w-4 h-4 mr-2" /> Remove
                </Button>
              </CardFooter>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
