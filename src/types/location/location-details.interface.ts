import { SearchType } from "../common/search-type.type";
import { IAQI } from "../aqi/iaqi.interface";
import { Weather } from "../weather/weather.interface";

export interface LocationDetails {
  uid: string;
  station?: string;
  location: string;
  city?: string;
  state?: string;
  country: string;
  time_zone: string;
  latitude: number;
  longitude: number;
  location_slug?: string;
  city_slug?: string;
  state_slug?: string;
  country_slug: string;
  background_image: string;
  flag: string;
  city_lat?: number;
  city_lon?: number;
  state_lat?: number;
  state_lon?: number;
  country_lat: number;
  country_lon: number;
  isOnline: boolean;
  isRankedCity: boolean;
  iaqi: IAQI;
  weather?: Weather;
  updated_at: string;
  updatedAt?: string;
  locationId: string;
  searchType: SearchType;
  slug: string;
}
