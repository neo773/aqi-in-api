import { BaseLocation } from "./base-location.interface";
import { IAQI } from "../aqi/iaqi.interface";
import { WeatherSimple } from "../weather/weather-simple.interface";

export interface City extends BaseLocation {
  city: string;
  state: string;
  country: string;
  weather?: WeatherSimple;
  iaqi?: Pick<IAQI, "AQI-IN" | "aqi">;
}
