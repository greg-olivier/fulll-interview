import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  toast: {
    padding: 16,
    paddingBottom: 20,
    backgroundColor: "#000",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 4,
  },
  text: { color: "white" },
  closeButton: {
    padding: 12,
    backgroundColor: "#dc35468e",
    borderRadius: 25,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});
