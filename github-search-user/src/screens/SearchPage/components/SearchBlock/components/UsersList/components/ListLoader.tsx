import type { ReactNode } from "react";
import { ActivityIndicator, View } from "react-native";

export function ListLoader(): ReactNode {
  return (
    <View
      testID="search.list.loader"
      style={{
        flexGrow: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
}
