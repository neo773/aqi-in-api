import { BaseLocation } from "./base-location.interface";
import { IAQI } from "../aqi/iaqi.interface";
import { Weather } from "../weather/weather.interface";

export interface Station extends BaseLocation {
  station: string;
  city: string;
  state: string;
  country: string;
  location_slug: string;
  city_slug: string;
  state_slug: string;
  country_slug: string;
  time_zone: string;
  coordinates: [number, number];
  background_image: string;
  city_lat: number;
  city_lon: number;
  state_lat: number;
  state_lon: number;
  country_lat: number;
  country_lon: number;
  isOnline: boolean;
  isRankedCity: boolean;
  iaqi: IAQI;
  weather?: Weather;
  updated_at: string;
  updatedAt?: string;
  createdAt?: string;
  distance?: number;
  source?: string;
}
