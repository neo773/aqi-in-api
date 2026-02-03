import { BaseLocation } from "./base-location.interface";

export interface State extends BaseLocation {
  state: string;
  country: string;
}
