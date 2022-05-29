export interface Game {
  game_id: number;
  city: string;
  year: number;
  athletes?: Athlete[];
}

export interface Athlete {
  athlete_id: number;
  name: string;
  surname: string;
  bio: string;
  date_of_birth: string;
  weight: number;
  height: number;
  photo_id: number;
  results?: AthleteResult[];
}

export interface AthleteResult {
  game_id: number;
  city: string;
  year: number;
  gold: number;
  silver: number;
  bronze: number;
}
