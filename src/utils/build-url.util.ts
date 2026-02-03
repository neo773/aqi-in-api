export function buildUrl(
  baseUrl: string,
  endpoint: string,
  params?: Record<string, string | number | undefined>
): URL {
  const url = new URL(baseUrl + endpoint);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    });
  }

  url.searchParams.set("source", "web");

  return url;
}
