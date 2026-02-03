# aqi-in-sdk

Fully typed TypeScript SDK for the AQI.in Air Quality API.

## Installation

```bash
bun add aqi-in-sdk
```

## Usage

```typescript
import { createAQIClient } from "aqi-in-sdk";

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
```

## API

### `createAQIClient(config?)`

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `token` | `string` | No | JWT authentication token (default provided) |
| `baseUrl` | `string` | No | API base URL (default: `https://apiserver.aqi.in`) |
| `userAgent` | `string` | No | Custom user agent |

### Methods

| Method | Description |
|--------|-------------|
| `getNearestLocation(params)` | Get nearest monitoring stations by coordinates |
| `getIpDetails()` | Get location from IP address |
| `getLocationBySlug(params)` | Get location details by slug |
| `search(params)` | Search locations by name |
| `getLast12HourHistory(params)` | Get 12-hour sensor history |
| `getLast24HourHistory(params)` | Get 24-hour sensor history with WHO guidelines |
| `getLast7DaysHistory(params)` | Get 7-day sensor history |
| `getLast30DaysHistory(params)` | Get 30-day sensor history |
| `getRankings(params)` | Get city or country pollution rankings |

### Types

```typescript
import type {
  Station,
  City,
  State,
  Country,
  LocationDetails,
  IPDetails,
  SearchResults,
  RankingEntry,
  HistoryData,
  HistoryDataWithWHO,
  IAQI,
  Weather,
  SensorName,
  SearchType,
  SlugType,
  RankType,
} from "aqi-in-sdk";
```

## Development

```bash
bun install
bun run build
bun test
bun test:unit
bun test:e2e
```

## License

MIT
