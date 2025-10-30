import type { JikanAPISearchResponse, JikanAPIGetByIdResponse, JikanAPIGetGenresResponse } from '@/lib/types';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

interface SearchOptions {
  page?: number;
  limit?: number;
  genre?: string;
}

export async function searchAnime(query: string, options: SearchOptions = {}) {
  const params = new URLSearchParams();
  if (query) {
    params.set('q', query);
  }
  params.set('sfw', 'true');
  if (options.page) {
    params.set('page', options.page.toString());
  }
  if (options.limit) {
    params.set('limit', options.limit.toString());
  }
  if (options.genre) {
    params.set('genres', options.genre);
  }

  try {
    const response = await fetch(`${JIKAN_API_URL}/anime?${params.toString()}`);
    if (!response.ok) {
      throw new Error('Failed to fetch search results');
    }
    const data: JikanAPISearchResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Jikan API search error:', error);
    return { data: [], pagination: { has_next_page: false, current_page: 1 } };
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

export async function getAnimeGenres() {
  try {
    const response = await fetch(`${JIKAN_API_URL}/genres/anime`);
    if (!response.ok) {
      throw new Error('Failed to fetch genres');
    }
    const data: JikanAPIGetGenresResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error('Jikan API get genres error:', error);
    return [];
  }
}
