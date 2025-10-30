"use client";

import { useWatchlist } from "@/context/watchlist-provider";
import type { JikanAnime } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Check, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";


export function WatchlistButtons({ anime }: { anime: JikanAnime }) {
  const { 
    isWatchlisted,
    addToWatchlist, 
    removeFromWatchlist, 
    updateWatchedEpisodes, 
    getWatchlistItem,
    loading
  } = useWatchlist();
  
  const { toast } = useToast();

  if (loading) {
    return <div className="h-10 w-full bg-muted rounded-lg animate-pulse"></div>;
  }
  
  const onList = isWatchlisted(anime.mal_id);
  const watchlistItem = getWatchlistItem(anime.mal_id);

  const handleAdd = () => {
    addToWatchlist(anime);
    toast({ title: "Added to Watchlist!", description: `"${anime.title}" has been added.` });
  };

  const handleRemove = () => {
    removeFromWatchlist(anime.mal_id);
    toast({ title: "Removed from Watchlist", description: `"${anime.title}" has been removed.`, variant: 'destructive' });
  };
  
  const handleEpisodeChange = (change: number) => {
    if (watchlistItem) {
      const newCount = watchlistItem.watchedEpisodes + change;
      updateWatchedEpisodes(anime.mal_id, newCount);
    }
  };

  if (onList && watchlistItem) {
    const progress = watchlistItem.episodes > 0 ? (watchlistItem.watchedEpisodes / watchlistItem.episodes) * 100 : 0;
    
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center justify-between">
            <span>Progress</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={handleRemove}>
              <Trash2 className="h-4 w-4" />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <span className="text-2xl font-bold">{watchlistItem.watchedEpisodes}</span>
            <span className="text-muted-foreground"> / {watchlistItem.episodes || '??'} Episodes</span>
          </div>
          <Progress value={progress} />
          <div className="flex justify-between items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleEpisodeChange(-1)}
              disabled={watchlistItem.watchedEpisodes === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <Button 
              className="flex-grow"
              variant="outline"
              onClick={() => updateWatchedEpisodes(anime.mal_id, watchlistItem.episodes)}
              disabled={watchlistItem.watchedEpisodes === watchlistItem.episodes}
            >
              <Check className="h-4 w-4 mr-2"/>
              Complete
            </Button>
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handleEpisodeChange(1)}
              disabled={watchlistItem.watchedEpisodes === watchlistItem.episodes}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button size="lg" className="w-full" onClick={handleAdd}>
      <Plus className="mr-2 h-5 w-5" /> Add to Watchlist
    </Button>
  );
}
