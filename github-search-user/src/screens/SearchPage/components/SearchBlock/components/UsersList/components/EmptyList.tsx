import type { ReactNode } from "react";
import { View, Text } from "react-native";

export function EmptyList(): ReactNode {
  return (
    <View
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>No users found.</Text>
    </View>
  );
}
