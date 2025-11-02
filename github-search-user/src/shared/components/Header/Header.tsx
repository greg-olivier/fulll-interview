import { View, Text } from "react-native";
import type { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./Header.styles";

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps): ReactNode {
  return (
    <SafeAreaView style={[styles.container]} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}
