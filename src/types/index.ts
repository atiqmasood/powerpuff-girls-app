export interface TVShow {
  id: number;
  url: string;
  name: string;
  image: {
    medium: string;
    original: string;
  };
  summary: string;
}
export interface Episode {
  id: number;
  name: string;
  season: number;
  number: number;
  airdate: string;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
}
export interface EpisodeDetail {
  id: number;
  name: string;
  season: number;
  number: number;
  type: string;
  airdate: string;
  image: {
    medium: string;
    original: string;
  } | null;
  summary: string;
}
