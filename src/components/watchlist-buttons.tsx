"use client";

import { useWatchlist } from "@/context/watchlist-provider";
import type { JikanAnyMedia } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Plus, Minus, Check, Trash2, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";


export function WatchlistButtons({ media }: { media: JikanAnyMedia }) {
  const { 
    isWatchlisted,
    addToWatchlist, 
    removeFromWatchlist, 
    updateWatchedParts, 
    getWatchlistItem,
    loading
  } = useWatchlist();
  
  const { toast } = useToast();

  if (loading) {
    return <div className="h-10 w-full bg-muted rounded-lg animate-pulse"></div>;
  }
  
  const onList = isWatchlisted(media.mal_id);
  const watchlistItem = getWatchlistItem(media.mal_id);

  const handleAdd = () => {
    addToWatchlist(media);
    toast({ title: `Added to Watchlist!`, description: `"${media.title}" has been added.` });
  };

  const handleRemove = () => {
    removeFromWatchlist(media.mal_id);
    toast({ title: `Removed from Watchlist`, description: `"${media.title}" has been removed.`, variant: 'destructive' });
  };
  
  const handlePartChange = (change: number) => {
    if (watchlistItem) {
      const newCount = watchlistItem.watchedParts + change;
      updateWatchedParts(media.mal_id, newCount);
    }
  };

  if (onList && watchlistItem) {
    const progress = watchlistItem.totalParts && watchlistItem.totalParts > 0 
      ? (watchlistItem.watchedParts / watchlistItem.totalParts) * 100 
      : 0;
    
    const partLabel = watchlistItem.type === 'anime' ? 'Episodes' : 'Chapters';
    
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
            <span className="text-2xl font-bold">{watchlistItem.watchedParts}</span>
            <span className="text-muted-foreground"> / {watchlistItem.totalParts || '??'} {partLabel}</span>
          </div>
          <Progress value={progress} />
          <div className="flex justify-between items-center gap-2">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handlePartChange(-1)}
              disabled={watchlistItem.watchedParts === 0}
            >
              <Minus className="h-4 w-4" />
            </Button>
            {watchlistItem.totalParts && (
              <Button 
                className="flex-grow"
                variant="outline"
                onClick={() => watchlistItem.totalParts && updateWatchedParts(media.mal_id, watchlistItem.totalParts)}
                disabled={watchlistItem.watchedParts === watchlistItem.totalParts}
              >
                <Check className="h-4 w-4 mr-2"/>
                Complete
              </Button>
            )}
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => handlePartChange(1)}
              disabled={watchlistItem.totalParts ? watchlistItem.watchedParts === watchlistItem.totalParts : false}
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
