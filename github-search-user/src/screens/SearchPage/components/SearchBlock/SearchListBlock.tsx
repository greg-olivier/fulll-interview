import { View, Linking } from "react-native";
import { UsersList } from "./components/UsersList/UsersList";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useSelectionManager } from "../../hooks/useSelectionManager";
import { ListHeader } from "./components/ListHeader/ListHeader";
import { User } from "@/types/user";
import { openURL } from "@/shared/services/linking";

export interface SearchBlockProps {
  loading: boolean;
  users: User[] | null;
  updateData: (users: User[]) => void;
}

export function SearchListBlock({
  loading,
  users,
  updateData,
}: SearchBlockProps): ReactNode {
  const [editMode, setEditMode] = useState(false);
  const {
    selectedCount,
    isSelected,
    toggle,
    deleteSelected,
    deselectAll,
    duplicateSelected,
    selectAll,
  } = useSelectionManager();

  // When loading new data, clear selection
  useEffect(() => {
    if (!loading || !selectedCount) return;
    deselectAll();
  }, [loading, selectedCount]);

  const usersList = useMemo(() => users || [], [users]);

  // Handlers for list header actions
  const handleOnSelectAll = () => selectAll(usersList);
  const handleOnDeselectAll = () => deselectAll();
  const handleOnDuplicate = useCallback(() => {
    const res = duplicateSelected(usersList);
    updateData(res);
  }, [usersList]);

  const handleOnDelete = () => {
    const res = deleteSelected(usersList);
    updateData(res);
  };

  const handleOnUserProfilePress = (url: string) => {
    openURL(url);
  };

  const hasPartialSelectionInList =
    selectedCount > 0 && selectedCount < (usersList.length ?? 0);

  const canSwitchToEditMode = usersList.length > 0;

  const shouldDisplayList = Boolean(users || loading);

  return (
    <View style={{ flex: 1 }}>
      <ListHeader
        onSelectAll={handleOnSelectAll}
        onDeselectAll={handleOnDeselectAll}
        selectedCount={selectedCount}
        isEditMode={editMode}
        onToggleEditMode={setEditMode}
        canSwitchEditMode={canSwitchToEditMode}
        hasPartialSelection={hasPartialSelectionInList}
        onDuplicate={handleOnDuplicate}
        onDelete={handleOnDelete}
      />
      {shouldDisplayList ? (
        <UsersList
          isSelected={isSelected}
          onSelect={toggle}
          users={usersList}
          isEditMode={editMode}
          loading={loading}
          onUserProfilePress={handleOnUserProfilePress}
        />
      ) : null}
    </View>
  );
}
