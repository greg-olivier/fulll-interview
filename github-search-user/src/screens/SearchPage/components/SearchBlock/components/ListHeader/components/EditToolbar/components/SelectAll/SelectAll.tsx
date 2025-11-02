import React from "react";
import { View, Text } from "react-native";
import { Checkbox } from "@/shared/components/Checkbox/Checkbox";
import { styles } from "./SelectAll.styles";

export interface SelectAllProps {
  onSelectAll: () => void;
  onDeselectAll: () => void;
  selectedCount: number;
  hasPartialSelection?: boolean;
}

export function SelectAll({
  onSelectAll,
  onDeselectAll,
  selectedCount,
  hasPartialSelection,
}: SelectAllProps) {
  const handleOnChange = (checked: boolean) => {
    if (checked || hasPartialSelection) {
      onSelectAll();
      return;
    }
    onDeselectAll();
  };
  return (
    <View style={styles.container}>
      <Checkbox
        checked={selectedCount > 0}
        checkedType={hasPartialSelection ? "partial" : "full"}
        onPress={handleOnChange}
      />

      <Text>{selectedCount} elements selected</Text>
    </View>
  );
}
