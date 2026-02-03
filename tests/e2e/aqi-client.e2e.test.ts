import { describe, expect, test, beforeAll } from "bun:test";
import { AQIClient } from "../../src/client/aqi-client";

describe("AQIClient E2E", () => {
  let client: AQIClient;

  beforeAll(() => {
    client = new AQIClient();
  });

  test("getIpDetails returns valid response", async () => {
    const result = await client.getIpDetails();

    expect(result).toHaveProperty("city");
    expect(result).toHaveProperty("country");
    expect(result).toHaveProperty("lat");
    expect(result).toHaveProperty("lon");
  });

  test("getNearestLocation returns stations", async () => {
    const result = await client.getNearestLocation({
      lat: 28.6139,
      long: 77.209,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("location");
    expect(result[0]).toHaveProperty("iaqi");
  });

  test("search returns categorized results", async () => {
    const result = await client.search({ searchString: "delhi" });

    expect(result).toHaveProperty("countries");
    expect(result).toHaveProperty("states");
    expect(result).toHaveProperty("cities");
    expect(result).toHaveProperty("stations");
    expect(Array.isArray(result.cities)).toBe(true);
  });

  test("getLocationBySlug returns location details", async () => {
    const result = await client.getLocationBySlug({
      slug: "india/delhi/new-delhi",
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThan(0);
    expect(result[0]).toHaveProperty("iaqi");
    expect(result[0]).toHaveProperty("location");
  });

  test("getLast24HourHistory returns history data", async () => {
    const result = await client.getLast24HourHistory({
      slug: "india/delhi/new-delhi/janpath",
      sensorname: "pm25",
      slugType: "locationId",
    });

    expect(result).toHaveProperty("minValue");
    expect(result).toHaveProperty("maxValue");
    expect(result).toHaveProperty("avgValue");
    expect(result).toHaveProperty("averageArray");
    expect(result).toHaveProperty("timeArray");
    expect(Array.isArray(result.averageArray)).toBe(true);
  });

  test("getRankings returns ranked entries", async () => {
    const result = await client.getRankings({
      sensorname: "pm25",
      type: "city",
      limit: 5,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBe(5);
    expect(result[0]).toHaveProperty("rank");
    expect(result[0]).toHaveProperty("location");
    expect(result[0]?.rank).toBe(1);
  });
});
