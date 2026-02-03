export const ENDPOINTS = {
  NEAREST_LOCATION: "/aqi/v2/getNearestLocation",
  IP_DETAILS: "/service/get/ip/details",
  LOCATION_BY_SLUG: "/aqi/v2/getLocationDetailsBySlug",
  SEARCH: "/aqi/searchLocationCityStateCountry",
  HISTORY_12H: "/aqi/getLast12HourHistory",
  HISTORY_24H: "/aqi/v3/getLast24HourHistory",
  HISTORY_7D: "/aqi/getLast7DaysHistory",
  HISTORY_30D: "/aqi/getLast30DaysHistory",
  RANKINGS: "/aqi/getAirQualityRanklistCountryAndCity",
} as const;
