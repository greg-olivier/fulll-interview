import { MessageType } from "../types";

export function getToastColor(type: MessageType): string {
  switch (type) {
    case "error":
      return "rgba(185, 0, 0, 1)";
    case "warning":
      return "rgba(255, 193, 7, 1)";
    case "success":
      return "rgba(25, 135, 84, 1)";
    case "info":
    default:
      return "rgba(0, 123, 255, 1)";
  }
}
