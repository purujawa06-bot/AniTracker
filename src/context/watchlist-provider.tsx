"use client";

import type { WatchlistItem, JikanAnime } from "@/lib/types";
import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";

interface WatchlistContextType {
  watchlist: WatchlistItem[];
  addToWatchlist: (anime: JikanAnime) => void;
  removeFromWatchlist: (animeId: number) => void;
  isWatchlisted: (animeId: number) => boolean;
  updateWatchedEpisodes: (animeId: number, newCount: number) => void;
  getWatchlistItem: (animeId: number) => WatchlistItem | undefined;
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

  const addToWatchlist = useCallback((anime: JikanAnime) => {
    setWatchlist((prev) => {
      if (prev.some((item) => item.mal_id === anime.mal_id)) {
        return prev;
      }
      const newItem: WatchlistItem = {
        mal_id: anime.mal_id,
        title: anime.title,
        image: anime.images.jpg.large_image_url,
        episodes: anime.episodes || 0,
        watchedEpisodes: 0,
      };
      return [...prev, newItem];
    });
  }, []);

  const removeFromWatchlist = useCallback((animeId: number) => {
    setWatchlist((prev) => prev.filter((item) => item.mal_id !== animeId));
  }, []);
  
  const isWatchlisted = useCallback((animeId: number) => {
    return watchlist.some((item) => item.mal_id === animeId);
  }, [watchlist]);

  const updateWatchedEpisodes = useCallback((animeId: number, newCount: number) => {
    setWatchlist((prev) =>
      prev.map((item) =>
        item.mal_id === animeId
          ? { ...item, watchedEpisodes: Math.max(0, Math.min(item.episodes || Infinity, newCount)) }
          : item
      )
    );
  }, []);
  
  const getWatchlistItem = useCallback((animeId: number) => {
    return watchlist.find((item) => item.mal_id === animeId);
  }, [watchlist]);

  return (
    <WatchlistContext.Provider
      value={{
        watchlist,
        addToWatchlist,
        removeFromWatchlist,
        isWatchlisted,
        updateWatchedEpisodes,
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
