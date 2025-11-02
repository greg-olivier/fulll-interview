import { ApiError, NetworkError, RateLimitError } from "./errors";
import { makeUrl } from "./helpers/makeUrl";

const API_URL = "https://api.github.com";

type Endpoint = `/${string}`;

export interface APIService {
  get<T>(
    queryParams: Record<string, string>,
    options?: RequestInit,
  ): Promise<T>;
}

export class GitHubAPIService implements APIService {
  baseUrl: string;
  endpoint: Endpoint;
  headers: HeadersInit;

  constructor(endpoint: Endpoint) {
    this.baseUrl = API_URL;
    this.endpoint = endpoint;
    this.headers = {
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }

  async get<T>(
    queryParams: Record<string, string>,
    options: RequestInit = {},
  ): Promise<T> {
    const url = makeUrl(this.baseUrl, this.endpoint, queryParams);

    try {
      const res = await fetch(url, {
        ...options,
        method: "GET",
        headers: { ...options.headers, ...this.headers },
      });
      const headers = res.headers;
      if (res.status === 403) {
        const resetAt = parseInt(headers.get("X-RateLimit-Reset") || "0", 10);
        throw new RateLimitError(resetAt);
      }
      if (!res.ok) {
        throw new NetworkError(res.status);
      }
      return res.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("UNKNOWN", (error as Error).message);
    }
  }
}
