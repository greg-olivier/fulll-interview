import { Linking } from "react-native";

export function openURL(url: string): Promise<void> {
  return Linking.openURL(url);
}
