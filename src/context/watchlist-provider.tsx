"use client";

import type { WatchlistItem, JikanAnyMedia, JikanAnime, JikanManga } from "@/lib/types";
import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (media: JikanAnyMedia) => void;
  removeFromWatchlist: (mediaId: number) => void;
  isWatchlisted: (mediaId: number) => boolean;
  updateWatchedParts: (mediaId: number, newCount: number) => void;
  getWatchlistItem: (mediaId: number) => WatchlistItem | undefined;
  loading: boolean;
}

const WatchlistContext = createContext<WatchlistContextType | undefined>(undefined);

export function WatchlistProvider({ children }: { children: ReactNode }) {
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedWatchlist = localStorage.getItem("watchlist");
      if (savedWatchlist) {
        setWatchlist(JSON.parse(savedWatchlist));
      }
    } catch (error) {
      console.error("Failed to load watchlist from localStorage", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      try {
        localStorage.setItem("watchlist", JSON.stringify(watchlist));
      } catch (error) {
        console.error("Failed to save watchlist to localStorage", error);
      }
    }
  }, [watchlist, loading]);

  const addToWatchlist = useCallback((media: JikanAnyMedia) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.mal_id === media.mal_id)) {
        return prev;
      }
      
      const newItem: WatchlistItem = {
        mal_id: media.mal_id,
        title: media.title,
        image: media.images.jpg.large_image_url,
        type: 'episodes' in media ? 'anime' : 'manga',
        totalParts: 'episodes' in media ? (media as JikanAnime).episodes : (media as JikanManga).chapters,
        watchedParts: 0,
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFromWatchlist = useCallback((mediaId: number) => {
    setWatchlist((prev) => prev.filter((item) => item.mal_id !== mediaId));
  }, []);
  
  const isWatchlisted = useCallback((mediaId: number) => {
    return watchlist.some((item) => item.mal_id === mediaId);
  }, [watchlist]);

  const updateWatchedParts = useCallback((mediaId: number, newCount: number) => {
    setWatchlist((prev) =>
      prev.map((item) => {
        if (item.mal_id === mediaId) {
          const maxParts = item.totalParts || Infinity;
          return { ...item, watchedParts: Math.max(0, Math.min(maxParts, newCount)) };
        }
        return item;
      })
    );
  }, []);
  
  const getWatchlistItem = useCallback((mediaId: number) => {
    return watchlist.find((item) => item.mal_id === mediaId);
  }, [watchlist]);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isWatchlisted,
        updateWatchedParts,
        getWatchlistItem,
        loading,
      }}
    >
      {children}
    </WatchlistContext.Provider>
  );
}

export function useWatchlist() {
  const context = useContext(WatchlistContext);
  if (context === undefined) {
    throw new Error("useWatchlist must be used within a WatchlistProvider");
  }
  return context;
}
