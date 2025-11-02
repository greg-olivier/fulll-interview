import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  checkbox: {
    height: 20,
    width: 20,
    backgroundColor: "#ffffffff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
  },
  contentWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  partialCheckmark: {
    height: 1,
    width: "100%",
    backgroundColor: "black",
    alignSelf: "center",
  },
});
