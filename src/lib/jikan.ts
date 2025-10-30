import type { JikanAPISearchResponse, JikanAPIGetByIdResponse, JikanAPIGetGenresResponse, JikanAnime, JikanManga, JikanAnyMedia, JikanGenre } from '@/lib/types';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

type MediaType = 'anime' | 'manga';

interface SearchOptions {
  page?: number;
  limit?: number;
  genre?: string;
  type?: MediaType;
  sfw?: boolean;
  orderBy?: string;
  sort?: 'asc' | 'desc';
}

export async function searchMedia(query: string, options: SearchOptions = {}) {
  const mediaType = options.type || 'anime';
  const params = new URLSearchParams();
  
  if (query) {
    params.set('q', query);
  }
  
  if (options.sfw !== false) {
    params.set('sfw', 'true');
  }

  if (options.page) {
    params.set('page', options.page.toString());
  }
  if (options.limit) {
    params.set('limit', options.limit.toString());
  }
  if (options.genre) {
    params.set('genres', options.genre);
  }
  
  params.set('orderby', options.orderBy || 'start_date');
  params.set('sort', options.sort || 'desc');


  try {
    const response = await fetch(`${JIKAN_API_URL}/${mediaType}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch search results for ${mediaType}`);
    }
    const data: JikanAPISearchResponse<JikanAnyMedia> = await response.json();
    // Manually add type to each item
    data.data = data.data.map(item => ({ ...item, type: mediaType }));
    return data;
  } catch (error) {
    console.error(`Jikan API search error for ${mediaType}:`, error);
    return { data: [], pagination: { has_next_page: false, current_page: 1 } };
  }
}

export async function getMediaById(id: number | string, type: MediaType): Promise<JikanAnyMedia | null> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/${type}/${id}/full`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} with id ${id}`);
    }
    const data: JikanAPIGetByIdResponse<JikanAnyMedia> = await response.json();
    return { ...data.data, type };
  } catch (error) {
    console.error(`Jikan API get by id error for ${type} id ${id}:`, error);
    return null;
  }
}

export async function getTopMedia(type: MediaType, filter: string, limit: number = 12): Promise<JikanAnyMedia[]> {
   try {
    const params = new URLSearchParams({ limit: limit.toString() });
    if (filter) {
        params.set('filter', filter);
    }
    const response = await fetch(`${JIKAN_API_URL}/top/${type}?${params.toString()}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch top ${type}`);
    }
    const data: JikanAPISearchResponse<JikanAnyMedia> = await response.json();
    return data.data.map(item => ({ ...item, type }));
  } catch (error) {
    console.error(`Jikan API get top ${type} error:`, error);
    return [];
  }
}


export async function getGenres(type: MediaType): Promise<JikanGenre[]> {
  try {
    const response = await fetch(`${JIKAN_API_URL}/genres/${type}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${type} genres`);
    }
    const data: JikanAPIGetGenresResponse = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Jikan API get ${type} genres error:`, error);
    return [];
  }
}

// Legacy functions for compatibility, you can slowly phase them out
export const searchAnime = (query: string, options: Omit<SearchOptions, 'type'> = {}) => searchMedia(query, {...options, type: 'anime'});
export const getAnimeById = (id: number | string) => getMediaById(id, 'anime') as Promise<JikanAnime | null>;
export const getTopAnime = () => getTopMedia('anime', 'airing', 12) as Promise<JikanAnime[]>;
export const getAnimeGenres = () => getGenres('anime');