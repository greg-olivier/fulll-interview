import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { View, Pressable } from "react-native";
import { styles } from "./EditActions.styles";

export interface EditActionsProps {
  onDuplicate: () => void;
  onDelete: () => void;
}

export function EditActions({ onDuplicate, onDelete }: EditActionsProps) {
  const handleOnDucplicate = () => {
    onDuplicate();
  };

  const handleOnDelete = () => {
    onDelete();
  };

  return (
    <View style={styles.container}>
      <Pressable
        testID="search.list.header.editToolbar.actions.duplicate"
        onPress={handleOnDucplicate}
        hitSlop={16}
        role="button"
        style={({ pressed }) => [
          styles.defaultButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Ionicons name="copy-outline" size={24} color="black" />
      </Pressable>
      <Pressable
        testID="search.list.header.editToolbar.actions.delete"
        onPress={handleOnDelete}
        hitSlop={16}
        role="button"
        style={({ pressed }) => [
          styles.defaultButton,
          pressed && styles.pressedButton,
        ]}
      >
        <Ionicons name="trash-outline" size={24} color="black" />
      </Pressable>
    </View>
  );
}
