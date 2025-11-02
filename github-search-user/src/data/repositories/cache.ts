import { APIService } from "../api/githubApiService";

class Repository {
  service: APIService;
  constructor(service: APIService) {
    this.service = service;
  }
}

export const CACHE_TTL = 30 * 1000; // 30s

export class CachedRepository<T> extends Repository {
  private cache: Map<string, { timestamp: number; data: T }> = new Map();

  protected getFromCache(key: string, query: string): T | null {
    const now = Date.now();
    const cached = this.cache.get(`$${key}:${query}`);
    if (cached && now - cached.timestamp < CACHE_TTL) {
      return cached.data;
    }
    return null;
  }

  protected setCache(key: string, query: string, data: T): void {
    const now = Date.now();
    this.cache.set(`$${key}:${query}`, { timestamp: now, data });
  }
}
