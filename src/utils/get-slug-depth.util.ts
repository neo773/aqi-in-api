import { SlugType } from "../types/common/slug-type.type";

export function getSlugDepth(slug: string): SlugType {
  return slug.split("/").length as SlugType;
}
