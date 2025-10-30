export interface JikanAnime {
  mal_id: number;
  url: string;
  images: {
    jpg: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
    webp: {
      image_url: string;
      small_image_url: string;
      large_image_url: string;
    };
  };
  title: string;
  title_english: string;
  title_japanese: string;
  synopsis: string;
  episodes: number;
  score: number;
  rank: number;
  popularity: number;
  status: string;
  rating: string;
  duration: string;
  genres: { mal_id: number; name: string }[];
  year: number;
}

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

export interface JikanAPISearchResponse {
  pagination: JikanPagination;
  data: JikanAnime[];
}

export interface JikanAPIGetByIdResponse {
  data: JikanAnime;
}

export interface WatchlistItem {
  mal_id: number;
  title: string;
  image: string;
  episodes: number;
  watchedEpisodes: number;
}

export interface JikanGenre {
    mal_id: number;
    name: string;
    url: string;
    count: number;
}

export interface JikanAPIGetGenresResponse {
    data: JikanGenre[];
}
