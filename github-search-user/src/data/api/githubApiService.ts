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
  rateLimitReset: number = 0;

  constructor(endpoint: Endpoint) {
    this.baseUrl = API_URL;
    this.endpoint = endpoint;
    this.headers = {
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }

  protected handleRateLimit(response: Response): void {
    if (response.status === 403) {
      const remaining = parseInt(
        response.headers.get("X-RateLimit-Remaining") || "0",
        10,
      );

      if (remaining !== 0) return;

      const resetAt = parseInt(
        response.headers.get("X-RateLimit-Reset") || "0",
        10,
      );
      this.rateLimitReset = resetAt;
      throw new RateLimitError(resetAt);
    }
  }

  protected checkRateLimit(): boolean {
    return this.rateLimitReset > Date.now() / 1000;
  }

  async get<T>(
    queryParams: Record<string, string>,
    options: RequestInit = {},
  ): Promise<T> {
    const url = makeUrl(this.baseUrl, this.endpoint, queryParams);

    if (this.checkRateLimit()) {
      throw new RateLimitError(this.rateLimitReset);
    }

    try {
      const response = await fetch(url, {
        ...options,
        method: "GET",
        headers: { ...options.headers, ...this.headers },
      });
      this.handleRateLimit(response);
      if (!response.ok) {
        throw new NetworkError(response.status);
      }
      return response.json();
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError("UNKNOWN", (error as Error).message);
    }
  }
}
