export function makeUrl(
  baseUrl: string,
  endpoint: string,
  queryParams?: Record<string, string>,
): string {
  const queryString = new URLSearchParams(queryParams).toString();
  const params = queryString ? `?${queryString}` : "";
  const url = `${baseUrl}${endpoint}${params}`;
  return url;
}
