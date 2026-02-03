import { LocationType } from "../common/location-type.type";

export interface GetNearestLocationParams {
  lat: number;
  long: number;
  type?: LocationType;
}
