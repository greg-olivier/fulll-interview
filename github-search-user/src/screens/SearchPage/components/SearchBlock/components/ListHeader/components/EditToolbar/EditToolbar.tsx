import type { ReactNode } from "react";
import { EditActions } from "./components/EditActions/EditActions";
import type { EditActionsProps } from "./components/EditActions/EditActions";
import { SelectAll } from "./components/SelectAll/SelectAll";
import type { SelectAllProps } from "./components/SelectAll/SelectAll";
import { View } from "react-native";
import { styles } from "./EditToolbar.styles";

export interface EditToolbarProps extends SelectAllProps, EditActionsProps {}

export function EditToolbar({
  selectedCount,
  hasPartialSelection,
  onSelectAll,
  onDeselectAll,
  onDuplicate,
  onDelete,
}: EditToolbarProps): ReactNode {
  return (
    <View style={styles.container} testID="search.list.header.editToolbar">
      <SelectAll
        selectedCount={selectedCount}
        hasPartialSelection={hasPartialSelection}
        onSelectAll={onSelectAll}
        onDeselectAll={onDeselectAll}
      />
      <EditActions onDuplicate={onDuplicate} onDelete={onDelete} />
    </View>
  );
}
