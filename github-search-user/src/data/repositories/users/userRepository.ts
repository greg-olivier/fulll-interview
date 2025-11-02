import type { User } from "@/types/user";
import { CachedRepository } from "../cache";
import { mapGithubUsersToUsers } from "./utils/userMapper";

export type GithubUser = {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
};

export type GithubSearchResponse = {
  total_count: number;
  incomplete_results: boolean;
  items: GithubUser[];
};

export interface UserRepositoryInterface {
  searchUsers(query: string, signal?: AbortSignal): Promise<User[] | null>;
}

export class UserRepository
  extends CachedRepository<User[]>
  implements UserRepositoryInterface
{
  async searchUsers(
    query: string,
    signal?: AbortSignal,
  ): Promise<User[] | null> {
    if (!query) return null;

    const cacheKey = "search";
    const cachedResponse = this.getFromCache(cacheKey, query);

    if (cachedResponse) {
      return cachedResponse;
    }

    const options = signal ? { signal } : undefined;

    const response = await this.service.get<GithubSearchResponse>(
      { q: encodeURIComponent(query) },
      options,
    );
    const users = mapGithubUsersToUsers(response.items);

    this.setCache(cacheKey, query, users);

    return users;
  }
}
