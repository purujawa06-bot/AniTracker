export interface JikanImageSet {
  image_url: string;
  small_image_url: string;
  large_image_url: string;
}

export interface JikanImages {
  jpg: JikanImageSet;
  webp: JikanImageSet;
}

export interface JikanTitle {
  type: string;
  title: string;
}

export interface JikanGenre {
  mal_id: number;
  name: string;
  type: string;
  url: string;
}

export interface JikanMedia {
  mal_id: number;
  url: string;
  images: JikanImages;
  title: string;
  title_english: string;
  title_japanese: string;
  synopsis: string;
  score: number;
  rank: number;
  popularity: number;
  status: string;
  genres: JikanGenre[];
  year: number;
  type: 'anime' | 'manga'; // Media type
}

export interface JikanAnime extends JikanMedia {
  type: 'anime';
  episodes: number;
  duration: string;
  rating: string;
}

export interface JikanManga extends JikanMedia {
  type: 'manga';
  chapters: number | null;
  volumes: number | null;
  publishing: boolean;
}

export type JikanAnyMedia = JikanAnime | JikanManga;


export interface JikanPagination {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
        count: number;
        total: number;
        per_page: number;
    }
}

export interface JikanAPISearchResponse<T> {
  pagination: JikanPagination;
  data: T[];
}

export interface JikanAPIGetByIdResponse<T> {
  data: T;
}

export interface WatchlistItem {
  mal_id: number;
  title: string;
  image: string;
  type: 'anime' | 'manga';
  totalParts: number | null; // episodes for anime, chapters for manga
  watchedParts: number; // watchedEpisodes/readChapters
}

export interface JikanAPIGetGenresResponse {
    data: JikanGenre[];
}
