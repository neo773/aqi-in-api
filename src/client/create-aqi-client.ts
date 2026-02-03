import { AQIClient } from "./aqi-client";
import { AQIClientConfig } from "./aqi-client.config";

export function createAQIClient(config?: AQIClientConfig): AQIClient {
  return new AQIClient(config);
}
