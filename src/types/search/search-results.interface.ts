import { Country } from "../location/country.interface";
import { State } from "../location/state.interface";
import { City } from "../location/city.interface";
import { Station } from "../location/station.interface";

export interface SearchResults {
  countries: Country[];
  states: State[];
  cities: City[];
  stations: Station[];
}
