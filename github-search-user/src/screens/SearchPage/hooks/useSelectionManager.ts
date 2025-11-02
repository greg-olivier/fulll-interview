import { memo, useEffect, useMemo, useState } from "react";
import { User } from "@/types/user";

export function useSelectionManager(initial: string[] = []) {
  const [selectedIds, setSelectedIds] = useState<Set<string | number>>(
    new Set(initial),
  );

  const toggle = (id: string | number) => {
    setSelectedIds((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const selectAll = (users: User[]) => {
    setSelectedIds(new Set(users.map((user) => user.id)));
  };

  const deselectAll = () => setSelectedIds(new Set());

  const isSelected = (id: string | number) => selectedIds.has(id);

  const selectedCount = selectedIds.size;

  const deleteSelected = (items: User[]) => {
    const res = items.filter((i) => !isSelected(i.id));
    setSelectedIds(new Set());
    return res;
  };

  const duplicateSelected = (items: User[]): User[] => {
    const selected = items.filter((i) => isSelected(i.id));
    const copies = selected.map((s) => ({
      ...s,
      id: s.id + Date.now().valueOf(),
    }));
    const res = [...items, ...copies];
    setSelectedIds(new Set());
    return res;
  };

  return {
    toggle,
    selectAll,
    deselectAll,
    isSelected,
    selectedCount,
    deleteSelected,
    duplicateSelected,
  };
}
