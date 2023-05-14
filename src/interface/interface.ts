export interface DataProps {
  page: number;
  results: ResultsProps[];
}

interface ResultsProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface CategoriaProps {
  id: number;
  name: string;
}

export interface FilmeProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection? : ColectionProps[];
  budget: number;
  genres:  Generos[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: ProductionCompanies[];
  release_date: string;
  revenue: number;
  runtime: number;
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface ColectionProps {
  backdrop_path: string;
  id: number;
  name: string;
  poster_path: string;
}

interface Generos {
  id: number;
  name: string;
}

interface ProductionCompanies {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

interface ProductionCountries {
  iso_3166_1: string;
  name: string;
}