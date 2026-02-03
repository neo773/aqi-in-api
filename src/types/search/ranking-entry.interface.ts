export interface RankingEntry {
  location: string;
  locationId: string;
  city?: string;
  state?: string;
  country?: string;
  flag: string;
  slug: string;
  latitude: number;
  longitude: number;
  updated_at: string;
  pm25?: number;
  pm10?: number;
  aqi?: number;
  rank: number;
}
