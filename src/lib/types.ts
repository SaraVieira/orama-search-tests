export interface Game {
  id: number;
  alternative_names: string[];
  cover: string;
  first_release_date: string;
  genres: string[];
  name: string;
  storyline: string;
  summary: string;
  total_rating: number;
  url: string;
  console: string;
  developer: string;
  publisher: string;
}

export type Console = { name: string; id: string };
export type ConsoleSelected = { [console: string]: boolean };
