import type { JikanAPISearchResponse, JikanAPIGetByIdResponse } from '@/lib/types';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

export async function searchAnime(query: string) {
  try {
    const response = await fetch(`${JIKAN_API_URL}/anime?q=${encodeURIComponent(query)}&sfw`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data: JikanAPISearchResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Jikan API search error:', error);
    return [];
  }
}

export async function getAnimeById(id: number | string) {
  try {
    const response = await fetch(`${JIKAN_API_URL}/anime/${id}/full`);
    if (!response.ok) {
      throw new Error(`Failed to fetch anime with id ${id}`);
    }
    const data: JikanAPIGetByIdResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Jikan API get by id error for id ${id}:`, error);
    return null;
  }
}

export async function getTopAnime() {
  try {
    const response = await fetch(`${JIKAN_API_URL}/top/anime?filter=airing&limit=12`);
    if (!response.ok) {
      throw new Error('Failed to fetch top anime');
    }
    const data: JikanAPISearchResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Jikan API get top anime error:', error);
    return [];
  }
}
