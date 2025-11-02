import { useEffect, useState } from "react";
import { useFetchWithCancel } from "@/shared/hooks/useFetchWithCancel";
import { UserRepository } from "@/data/repositories/users/userRepository";
import { User } from "@/types/user";
import useDebouncedValue from "@/shared/hooks/useDebouncedValue";
import { GitHubAPIService } from "@/data/api/githubApiService";

const SEARCH_USERS_ENDPOINT = "/search/users";
const githubApiService = new GitHubAPIService(SEARCH_USERS_ENDPOINT);
const userRepository = new UserRepository(githubApiService);

export function useSearchUsersHook(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const { data, loading, error, execute, setData } = useFetchWithCancel<
    User[] | null
  >();

  const debouncedQuery = useDebouncedValue(query);

  const runSearch = async (q: string) => {
    await execute((signal) => userRepository.searchUsers(q, signal));
  };

  useEffect(() => {
    if (debouncedQuery && debouncedQuery.trim() !== "") {
      runSearch(debouncedQuery);
    }
  }, [debouncedQuery]);

  return {
    query,
    setQuery,
    data,
    loading,
    error,
    setData,
  };
}
