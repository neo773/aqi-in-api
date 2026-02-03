import { AQIClientConfig } from "./aqi-client.config";
import { DEFAULT_BASE_URL, DEFAULT_TOKEN, DEFAULT_USER_AGENT, ENDPOINTS } from "../constants";
import { AQIException } from "../exceptions";
import { buildUrl, getSlugDepth } from "../utils";
import {
  APIResponse,
  Station,
  LocationDetails,
  IPDetails,
  SearchResults,
  HistoryData,
  HistoryDataWithWHO,
  RankingEntry,
  GetNearestLocationParams,
  GetLocationBySlugParams,
  SearchParams,
  GetHistoryParams,
  GetRankingParams,
} from "../types";

export class AQIClient {
  private readonly baseUrl: string;
  private readonly token: string;
  private readonly userAgent: string;

  constructor(config: AQIClientConfig = {}) {
    this.baseUrl = config.baseUrl ?? DEFAULT_BASE_URL;
    this.token = config.token ?? DEFAULT_TOKEN;
    this.userAgent = config.userAgent ?? DEFAULT_USER_AGENT;
  }

  private async request<T>(
    endpoint: string,
    params?: Record<string, string | number | undefined>
  ): Promise<T> {
    const url = buildUrl(this.baseUrl, endpoint, params);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "User-Agent": this.userAgent,
        authorization: `bearer ${this.token}`,
      },
    });

    if (!response.ok) {
      const text = await response.text();
      throw new AQIException(
        `Request failed: ${response.status} ${response.statusText}`,
        response.status,
        text
      );
    }

    const data = (await response.json()) as APIResponse<T>;

    if (data.status === "failed") {
      throw new AQIException(
        data.message || data.error || "Unknown error",
        data.status_code ?? 400
      );
    }

    return data.data;
  }

  async getNearestLocation(params: GetNearestLocationParams): Promise<Station[]> {
    return this.request<Station[]>(ENDPOINTS.NEAREST_LOCATION, {
      lat: params.lat,
      long: params.long,
      type: params.type === "city" ? "2" : "1",
    });
  }

  async getIpDetails(): Promise<IPDetails> {
    return this.request<IPDetails>(ENDPOINTS.IP_DETAILS);
  }

  async getLocationBySlug(params: GetLocationBySlugParams): Promise<LocationDetails[]> {
    return this.request<LocationDetails[]>(ENDPOINTS.LOCATION_BY_SLUG, {
      slug: params.slug,
      type: params.type ?? getSlugDepth(params.slug),
    });
  }

  async search(params: SearchParams): Promise<SearchResults> {
    return this.request<SearchResults>(ENDPOINTS.SEARCH, {
      searchString: params.searchString,
    });
  }

  async getLast12HourHistory(params: GetHistoryParams): Promise<HistoryData> {
    return this.request<HistoryData>(ENDPOINTS.HISTORY_12H, {
      slug: params.slug,
      sensorname: params.sensorname,
      slugType: params.slugType,
    });
  }

  async getLast24HourHistory(params: GetHistoryParams): Promise<HistoryDataWithWHO> {
    return this.request<HistoryDataWithWHO>(ENDPOINTS.HISTORY_24H, {
      slug: params.slug,
      sensorname: params.sensorname,
      slugType: params.slugType,
    });
  }

  async getLast7DaysHistory(params: GetHistoryParams): Promise<HistoryDataWithWHO> {
    return this.request<HistoryDataWithWHO>(ENDPOINTS.HISTORY_7D, {
      slug: params.slug,
      sensorname: params.sensorname,
      slugType: params.slugType,
    });
  }

  async getLast30DaysHistory(params: GetHistoryParams): Promise<HistoryDataWithWHO> {
    return this.request<HistoryDataWithWHO>(ENDPOINTS.HISTORY_30D, {
      slug: params.slug,
      sensorname: params.sensorname,
      slugType: params.slugType,
    });
  }

  async getRankings(params: GetRankingParams): Promise<RankingEntry[]> {
    return this.request<RankingEntry[]>(ENDPOINTS.RANKINGS, {
      sensorname: params.sensorname,
      type: params.type === "country" ? "1" : "2",
      limit: params.limit ?? 10,
    });
  }
}
