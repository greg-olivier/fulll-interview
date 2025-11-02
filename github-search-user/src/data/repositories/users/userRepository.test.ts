import { CACHE_TTL } from "../cache";
import { githubUsers } from "./mocks/githubUsers.mock";
import { users } from "./mocks/users.mock";
import { UserRepository } from "./userRepository";
import { NetworkError, RateLimitError } from "../../api/errors";
import { GithubAPIServiceMock } from "../../api/mocks/githubApiService.mock";

describe("UserRepository", () => {
  const githubApiService = new GithubAPIServiceMock();

  describe("searchUsers", () => {
    githubApiService.get = jest.fn().mockResolvedValue({
      total_count: githubUsers.length,
      incomplete_results: false,
      items: githubUsers,
    });
    it("should return list of users from API", async () => {
      const repository = new UserRepository(githubApiService);

      const usersResponse = await repository.searchUsers("test");

      expect(usersResponse).toHaveLength(githubUsers.length);
      expect(usersResponse).toEqual(users);
      expect(githubApiService.get).toHaveBeenCalledTimes(1);
      expect(githubApiService.get).toHaveBeenCalledWith(
        { q: "test" },
        undefined,
      );
    });

    it("should not return users when query is empty", async () => {
      const repository = new UserRepository(githubApiService);

      const users = await repository.searchUsers("");

      expect(users).toBeNull();
      expect(githubApiService.get).not.toHaveBeenCalled();
    });

    describe("caching behavior", () => {
      it("should return cached users within TTL", async () => {
        const repository = new UserRepository(githubApiService);

        await repository.searchUsers("test");
        await repository.searchUsers("test");

        expect(githubApiService.get).toHaveBeenCalledTimes(1);
      });

      it("should get new users after cache expiration", async () => {
        jest.useFakeTimers();
        const repository = new UserRepository(githubApiService);

        await repository.searchUsers("test");
        jest.advanceTimersByTime(CACHE_TTL);
        await repository.searchUsers("test");

        expect(githubApiService.get).toHaveBeenCalledTimes(2);
        jest.runOnlyPendingTimers();
        jest.useRealTimers();
      });
    });

    describe("error handling", () => {
      it("should handle unknown error", async () => {
        githubApiService.get = jest
          .fn()
          .mockRejectedValue(new Error("Unknown Error"));
        const repository = new UserRepository(githubApiService);

        await expect(repository.searchUsers("test")).rejects.toThrow(
          "Unknown Error",
        );
      });

      it("should handle rate Limit error", async () => {
        githubApiService.get = jest
          .fn()
          .mockRejectedValue(new RateLimitError(1000 * 60));
        const repository = new UserRepository(githubApiService);

        await expect(repository.searchUsers("test")).rejects.toThrow(
          "Rate limit exceeded. Try again later.",
        );
      });

      it("should handle network error", async () => {
        githubApiService.get = jest
          .fn()
          .mockRejectedValue(new NetworkError(500));
        const repository = new UserRepository(githubApiService);

        await expect(repository.searchUsers("test")).rejects.toThrow(
          "Network error with status code 500",
        );
      });
    });
  });
});
