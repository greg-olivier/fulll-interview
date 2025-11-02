import type { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "./Checkbox.styles";

export interface CheckboxProps {
  checked: boolean;
  checkedType?: "full" | "partial";
  onPress: (checked: boolean) => void;
}

export function Checkbox({
  checked,
  checkedType = "full",
  onPress,
}: CheckboxProps): ReactNode {
  const handleOnPress = (): void => {
    onPress(!checked);
  };

  return (
    <Pressable
      onPress={handleOnPress}
      role="checkbox"
      accessibilityState={{ checked }}
    >
      <View style={styles.checkbox}>
        {checked ? (
          <View style={styles.contentWrapper}>
            {checkedType === "partial" ? (
              <View
                style={styles.partialCheckmark}
                testID="components.checkbox.checkmark.partial"
              />
            ) : (
              <Ionicons name="checkmark" size={16} color="black" />
            )}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}
