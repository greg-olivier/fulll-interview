import { View, Text, Switch } from "react-native";
import type { ReactNode } from "react";
import { styles } from "./EditSwitch.styles";

export interface EditSwitchProps {
  isEditMode: boolean;
  canSwitchEditMode: boolean;
  onToggleEditMode: (value: boolean) => void;
}

export function EditSwitch({
  isEditMode,
  canSwitchEditMode,
  onToggleEditMode,
}: EditSwitchProps): ReactNode {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Edit Mode</Text>
      <Switch
        role="switch"
        accessibilityState={{
          checked: isEditMode,
          disabled: !canSwitchEditMode,
        }}
        value={isEditMode}
        disabled={!canSwitchEditMode}
        onValueChange={onToggleEditMode}
        trackColor={{ true: "#6491c8ff", false: "#9cb6d6ff" }}
      />
    </View>
  );
}
