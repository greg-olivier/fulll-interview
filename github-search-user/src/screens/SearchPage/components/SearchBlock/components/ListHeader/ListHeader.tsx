import { View, Text, Switch } from "react-native";
import type { EditToolbarProps } from "./components/EditToolbar/EditToolbar";
import { EditToolbar } from "./components/EditToolbar/EditToolbar";
import { EditSwitch } from "./components/EditSwitch/EditSwitch";
import type { EditSwitchProps } from "./components/EditSwitch/EditSwitch";
import { styles } from "./ListHeader.styles";

export interface ListHeaderProps extends EditToolbarProps, EditSwitchProps {}

export function ListHeader({
  isEditMode,
  canSwitchEditMode = false,
  onToggleEditMode,
  selectedCount,
  hasPartialSelection,
  onSelectAll,
  onDeselectAll,
  onDuplicate,
  onDelete,
}: ListHeaderProps) {
  return (
    <View style={styles.container}>
      <EditSwitch
        isEditMode={isEditMode}
        canSwitchEditMode={canSwitchEditMode}
        onToggleEditMode={onToggleEditMode}
      />

      {isEditMode ? (
        <EditToolbar
          selectedCount={selectedCount}
          hasPartialSelection={hasPartialSelection}
          onSelectAll={onSelectAll}
          onDeselectAll={onDeselectAll}
          onDuplicate={onDuplicate}
          onDelete={onDelete}
        />
      ) : null}
    </View>
  );
}
