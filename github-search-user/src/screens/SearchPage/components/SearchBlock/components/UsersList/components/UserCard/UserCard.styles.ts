import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  card: {
    width: "100%",
    padding: 16,
    backgroundColor: "#c0cdddff",
    borderRadius: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    minHeight: 240,
  },
  infoContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    marginTop: 8,
    gap: 4,
  },
  login: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
  },
  id: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#254881ff",
    borderRadius: 4,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#fff",
  },
  checkboxContainer: {
    position: "absolute",
    top: 8,
    left: 8,
  },
});
