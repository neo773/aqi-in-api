import { createAQIClient } from "../src";

const client = createAQIClient();

async function main() {
  const searchResults = await client.search({ searchString: "Mumbai" });
  console.log(`Found ${searchResults.cities.length} cities, ${searchResults.stations.length} stations`);

  if (searchResults.cities[0]) {
    const city = searchResults.cities[0];
    console.log(`Top result: ${city.city}, ${city.state}`);
    console.log(`AQI: ${city.iaqi?.aqi ?? "N/A"}`);
  }

  const nearestStations = await client.getNearestLocation({
    lat: 28.6139,
    long: 77.209,
  });

  for (const station of nearestStations.slice(0, 3)) {
    console.log(`${station.location} (${station.distance?.toFixed(2)} km)`);
    console.log(`PM2.5: ${station.iaqi.pm25} | AQI: ${station.iaqi.aqi}`);
  }

  const [cityDetails] = await client.getLocationBySlug({
    slug: "india/delhi/new-delhi",
  });
  console.log(`City: ${cityDetails.location}`);
  console.log(`AQI-IN: ${cityDetails.iaqi["AQI-IN"]}`);

  const history = await client.getLast24HourHistory({
    slug: "india/delhi/new-delhi/janpath",
    sensorname: "pm25",
    slugType: "locationId",
  });
  console.log(`Min: ${history.minValue} | Max: ${history.maxValue} | Avg: ${history.avgValue}`);

  const rankings = await client.getRankings({
    sensorname: "pm25",
    type: "city",
    limit: 5,
  });
  for (const entry of rankings) {
    console.log(`#${entry.rank} ${entry.location}, ${entry.country} - PM2.5: ${entry.pm25}`);
  }

  const ipDetails = await client.getIpDetails();
  console.log(`Your location: ${ipDetails.city}, ${ipDetails.regionName}, ${ipDetails.country}`);
}

main().catch(console.error);
