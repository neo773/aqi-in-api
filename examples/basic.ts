import { createAQIClient } from "../src";

const client = createAQIClient();

async function main() {

  const ipDetails = await client.getIpDetails();
  console.log(ipDetails);

  const nearestLocation = await client.getNearestLocation({
    lat: ipDetails.lat,
    long: ipDetails.lon,
  });

  console.log(nearestLocation);

  const station = nearestLocation[0].location_slug;

  const locationDetails = await client.getLocationBySlug({
    slug: station,
  });

  console.log(locationDetails);

  const history = await client.getLast24HourHistory({
    slug: station,
    sensorname: "pm25",
    slugType: "locationId",
  });

  console.log(history);

  const history30Days = await client.getLast30DaysHistory({
    slug: station,
    sensorname: "pm25",
    slugType: "locationId",
  });

  console.log(history30Days);
}

main().catch(console.error);
