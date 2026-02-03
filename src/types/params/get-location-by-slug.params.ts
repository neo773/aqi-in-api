import { SlugType } from "../common/slug-type.type";

export interface GetLocationBySlugParams {
  slug: string;
  type?: SlugType;
}
