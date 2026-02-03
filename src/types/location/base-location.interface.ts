import { SearchType } from "../common/search-type.type";

export interface BaseLocation {
  uid?: string;
  location: string;
  locationId: string;
  slug: string;
  latitude: number;
  longitude: number;
  flag: string;
  searchType: SearchType;
}
