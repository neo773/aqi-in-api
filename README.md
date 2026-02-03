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

const stations = await client.getNearestLocation({
  lat: 28.6139,
  long: 77.209,
});

const results = await client.search({ searchString: "delhi" });

const details = await client.getLocationBySlug({
  slug: "india/delhi/new-delhi",
});

const history = await client.getLast24HourHistory({
  slug: "india/delhi/new-delhi/janpath",
  sensorname: "pm25",
  slugType: "locationId",
});

const rankings = await client.getRankings({
  sensorname: "pm25",
  type: "city",
  limit: 10,
});

const ip = await client.getIpDetails();
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
