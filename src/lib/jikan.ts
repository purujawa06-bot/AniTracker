import type { JikanAPISearchResponse, JikanAPIGetByIdResponse, JikanAPIGetGenresResponse, JikanAnime, JikanManga, JikanAnyMedia, JikanGenre } from '@/lib/types';

const JIKAN_API_URL = 'https://api.jikan.moe/v4';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

async function fetchWithRateLimit<T>(url: string): Promise<T> {
  await sleep(2000); // Wait for 2 seconds to avoid rate limiting
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Jikan API request failed: ${response.status} ${response.statusText} for ${url}`);
  }
  return response.json() as Promise<T>;
}


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
    const data = await fetchWithRateLimit<JikanAPISearchResponse<JikanAnyMedia>>(`${JIKAN_API_URL}/${mediaType}?${params.toString()}`);
    // Manually add type to each item
    data.data = data.data.map(item => ({ ...item, type: mediaType }));
    return data;
  } catch (error) {
    console.error(`Jikan API search error for ${mediaType}:`, error);
    return { data: [], pagination: { has_next_page: false, current_page: 1, last_visible_page: 1, items: { count:0, total: 0, per_page: 0} } };
  }
}

export async function getMediaById(id: number | string, type: MediaType): Promise<JikanAnyMedia | null> {
  try {
    const data = await fetchWithRateLimit<JikanAPIGetByIdResponse<JikanAnyMedia>>(`${JIKAN_API_URL}/${type}/${id}/full`);
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
    const data = await fetchWithRateLimit<JikanAPISearchResponse<JikanAnyMedia>>(`${JIKAN_API_URL}/top/${type}?${params.toString()}`);
    return data.data.map(item => ({ ...item, type }));
  } catch (error) {
    console.error(`Jikan API get top ${type} error:`, error);
    return [];
  }
}

export async function getSeasonNow(limit: number = 12): Promise<JikanAnyMedia[]> {
  try {
    const params = new URLSearchParams({ limit: limit.toString() });
    const data = await fetchWithRateLimit<JikanAPISearchResponse<JikanAnyMedia>>(`${JIKAN_API_URL}/seasons/now?${params.toString()}`);
    return data.data.map(item => ({ ...item, type: 'anime' }));
  } catch (error) {
    console.error(`Jikan API get season now error:`, error);
    return [];
  }
}


export async function getGenres(type: MediaType): Promise<JikanGenre[]> {
  try {
    const data = await fetchWithRateLimit<JikanAPIGetGenresResponse>(`${JIKAN_API_URL}/genres/${type}`);
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
