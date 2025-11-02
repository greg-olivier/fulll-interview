import { renderHook } from "@testing-library/react-native";
import { act } from "react";
import { useSelectionManager } from "./useSelectionManager";
import { User } from "@/types/user";
import { users } from "@/data/repositories/users/mocks/users.mock";

describe("useSelectionManager", () => {
  describe("initialization", () => {
    it("should initialize with empty selection by default", () => {
      const { result } = renderHook(() => useSelectionManager());

      expect(result.current.selectedCount).toBe(0);
      expect(result.current.isSelected(1)).toBe(false);
      expect(result.current.isSelected(2)).toBe(false);
    });

    it("should initialize with provided initial selection", () => {
      const { result } = renderHook(() => useSelectionManager(["1", "2"]));

      expect(result.current.selectedCount).toBe(2);
      expect(result.current.isSelected("1")).toBe(true);
      expect(result.current.isSelected("2")).toBe(true);
      expect(result.current.isSelected("3")).toBe(false);
    });
  });

  describe("toggle", () => {
    it("should select an item when toggled if not selected", () => {
      const { result } = renderHook(() => useSelectionManager());

      act(() => {
        result.current.toggle(1);
      });

      expect(result.current.selectedCount).toBe(1);
      expect(result.current.isSelected(1)).toBe(true);
    });

    it("should deselect an item when toggled if already selected", () => {
      const { result } = renderHook(() => useSelectionManager());

      act(() => {
        result.current.toggle(1);
      });

      expect(result.current.isSelected(1)).toBe(true);

      act(() => {
        result.current.toggle(1);
      });

      expect(result.current.selectedCount).toBe(0);
      expect(result.current.isSelected(1)).toBe(false);
    });

    it("should handle both string and number IDs", () => {
      const { result } = renderHook(() => useSelectionManager());

      act(() => {
        result.current.toggle(1);
        result.current.toggle("2");
      });

      expect(result.current.selectedCount).toBe(2);
      expect(result.current.isSelected(1)).toBe(true);
      expect(result.current.isSelected("2")).toBe(true);
    });
  });

  describe("selectAll", () => {
    it("should select all users from the provided list", () => {
      const { result } = renderHook(() => useSelectionManager());

      act(() => {
        result.current.selectAll(users);
      });

      expect(result.current.selectedCount).toBe(3);
      users.forEach((user) => {
        expect(result.current.isSelected(user.id)).toBe(true);
      });
    });

    it("should replace existing selection when selecting all", () => {
      const { result } = renderHook(() => useSelectionManager());

      // First select one item
      act(() => {
        result.current.toggle(999);
      });

      expect(result.current.selectedCount).toBe(1);
      expect(result.current.isSelected(999)).toBe(true);

      // Then select all from mock users
      act(() => {
        result.current.selectAll(users);
      });

      expect(result.current.selectedCount).toBe(3);
      expect(result.current.isSelected(999)).toBe(false);
      users.forEach((user) => {
        expect(result.current.isSelected(user.id)).toBe(true);
      });
    });

    it("should handle empty users list", () => {
      const { result } = renderHook(() => useSelectionManager());

      act(() => {
        result.current.toggle(1);
      });

      expect(result.current.selectedCount).toBe(1);

      act(() => {
        result.current.selectAll([]);
      });

      expect(result.current.selectedCount).toBe(0);
    });
  });

  describe("deselectAll", () => {
    it("should deselect all items", () => {
      const { result } = renderHook(() => useSelectionManager());

      // First select some items
      act(() => {
        result.current.selectAll(users);
      });

      expect(result.current.selectedCount).toBe(3);

      // Then deselect all
      act(() => {
        result.current.deselectAll();
      });

      expect(result.current.selectedCount).toBe(0);
      users.forEach((user) => {
        expect(result.current.isSelected(user.id)).toBe(false);
      });
    });

    it("should work when no items are selected", () => {
      const { result } = renderHook(() => useSelectionManager());

      act(() => {
        result.current.deselectAll();
      });

      expect(result.current.selectedCount).toBe(0);
    });
  });

  describe("deleteSelected", () => {
    it("should remove selected items and clear selection", () => {
      const { result } = renderHook(() => useSelectionManager());

      // Select first and third users
      act(() => {
        result.current.toggle(users[0].id);
        result.current.toggle(users[2].id);
      });

      expect(result.current.selectedCount).toBe(2);

      let remainingItems: User[] = [];
      act(() => {
        remainingItems = result.current.deleteSelected(users);
      });

      expect(remainingItems).toHaveLength(1);
      expect(remainingItems[0]).toEqual(users[1]);
      expect(result.current.selectedCount).toBe(0);
    });

    it("should return all items when none are selected", () => {
      const { result } = renderHook(() => useSelectionManager());

      let remainingItems: User[] = [];
      act(() => {
        remainingItems = result.current.deleteSelected(users);
      });

      expect(remainingItems).toHaveLength(3);
      expect(remainingItems).toEqual(users);
      expect(result.current.selectedCount).toBe(0);
    });

    it("should return empty array when all items are selected", () => {
      const { result } = renderHook(() => useSelectionManager());

      act(() => {
        result.current.selectAll(users);
      });

      let remainingItems: User[] = [];
      act(() => {
        remainingItems = result.current.deleteSelected(users);
      });

      expect(remainingItems).toHaveLength(0);
      expect(result.current.selectedCount).toBe(0);
    });
  });

  describe("duplicateSelected", () => {
    it("should duplicate selected items with new IDs and clear selection", () => {
      const { result } = renderHook(() => useSelectionManager());

      // Mock Date.now() to have predictable IDs
      const mockTime = 1234567890;
      jest.useFakeTimers({ now: mockTime });

      // Select first and third users
      act(() => {
        result.current.toggle(users[0].id);
        result.current.toggle(users[2].id);
      });

      expect(result.current.selectedCount).toBe(2);

      let resultItems: User[] = [];
      act(() => {
        resultItems = result.current.duplicateSelected(users);
      });

      // Should have original 3 + 2 duplicates = 5 items
      expect(resultItems).toHaveLength(5);

      // First 3 should be original items
      expect(resultItems.slice(0, 3)).toEqual(users);

      // Last 2 should be duplicates with modified IDs
      const duplicates = resultItems.slice(3);
      expect(duplicates[0]).toEqual({
        ...users[0],
        id: users[0].id + mockTime,
      });
      expect(duplicates[1]).toEqual({
        ...users[2],
        id: users[2].id + mockTime,
      });

      // Selection should be cleared
      expect(result.current.selectedCount).toBe(0);

      jest.runOnlyPendingTimers();
      jest.useRealTimers();
    });

    it("should return original items when none are selected", () => {
      const { result } = renderHook(() => useSelectionManager());

      let resultItems: User[] = [];
      act(() => {
        resultItems = result.current.duplicateSelected(users);
      });

      expect(resultItems).toHaveLength(3);
      expect(resultItems).toEqual(users);
      expect(result.current.selectedCount).toBe(0);
    });

    it("should handle empty items list", () => {
      const { result } = renderHook(() => useSelectionManager());

      act(() => {
        result.current.toggle(1);
      });

      let resultItems: User[] = [];
      act(() => {
        resultItems = result.current.duplicateSelected([]);
      });

      expect(resultItems).toHaveLength(0);
      expect(result.current.selectedCount).toBe(0);
    });
  });
});
