import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    gap: 16,
  },
  defaultButton: {
    opacity: 1,
  },
  pressedButton: {
    opacity: 0.5,
  },
});
