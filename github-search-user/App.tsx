import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { SearchPage } from "@/screens/SearchPage/SearchPage";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider>
      <SearchPage />
    </SafeAreaProvider>
  );
}
