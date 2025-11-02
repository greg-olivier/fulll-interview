import { renderHook, waitFor } from "@testing-library/react-native";
import { act } from "react";
import { useSearchUsersHook } from "./useSearchUsers";
import { UserRepository } from "@/data/repositories/users/userRepository";
import { users } from "@/data/repositories/users/mocks/users.mock";

jest.mock("@/data/repositories/users/userRepository");

const MockedUserRepository = UserRepository as jest.MockedClass<
  typeof UserRepository
>;

describe("useSearchUsersHook", () => {
  const mockSearchUsers = jest.fn();
  let mockRepository: any;

  beforeEach(() => {
    jest.clearAllMocks();

    // Create mock repository instance
    mockRepository = {
      searchUsers: mockSearchUsers,
      cache: new Map(),
      getFromCache: jest.fn(),
      setCache: jest.fn(),
      service: {},
    };

    // Mock UserRepository constructor to return our mock
    MockedUserRepository.mockImplementation(() => mockRepository);
  });

  describe("initialization", () => {
    it("should initialize with default values", () => {
      const { result } = renderHook(() => useSearchUsersHook());

      expect(result.current.query).toBe("");
      expect(result.current.data).toBeNull();
    });

    it("should initialize with provided initial query", () => {
      const initialQuery = "test query";
      const { result } = renderHook(() => useSearchUsersHook(initialQuery));

      expect(result.current.query).toBe(initialQuery);
    });
  });

  describe("query management", () => {
    it("should update query when setQuery is called", () => {
      const { result } = renderHook(() => useSearchUsersHook());

      act(() => {
        result.current.setQuery("new query");
      });

      expect(result.current.query).toBe("new query");
    });
  });

  describe("data management", () => {
    it("should allow manual data setting with setData", () => {
      const { result } = renderHook(() => useSearchUsersHook());

      act(() => {
        result.current.setData(users);
      });

      expect(result.current.data).toEqual(users);
    });

    it("should allow clearing data with setData", () => {
      const { result } = renderHook(() => useSearchUsersHook());

      act(() => {
        result.current.setData(users);
      });

      expect(result.current.data).toEqual(users);

      act(() => {
        result.current.setData(null);
      });

      expect(result.current.data).toBeNull();
    });
  });

  describe("integration behavior", () => {
    it("should load when query changes", async () => {
      jest.useFakeTimers();
      mockSearchUsers.mockResolvedValue(users);

      const { result } = renderHook(() => useSearchUsersHook());

      act(() => {
        result.current.setQuery("react");
      });

      expect(result.current.loading).toBeFalsy();

      act(() => {
        jest.advanceTimersByTime(300);
      });

      expect(result.current.loading).toBeTruthy();

      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it("should handle debounced search functionality", async () => {
      jest.useFakeTimers();
      const { result } = renderHook(() => useSearchUsersHook());

      // Rapid query changes
      act(() => {
        result.current.setQuery("r");
      });

      act(() => {
        jest.advanceTimersByTime(100);
      });

      expect(result.current.loading).toBeFalsy();

      act(() => {
        result.current.setQuery("react");
      });

      // Fast-forward past debounce time
      act(() => {
        jest.advanceTimersByTime(300);
      });

      // Now it should have been called only once with the final value
      expect(result.current.loading).toBeTruthy();

      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });
  });
});
