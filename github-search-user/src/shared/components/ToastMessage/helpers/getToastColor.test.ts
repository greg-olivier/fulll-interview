import { MessageType } from "../types";
import { getToastColor } from "./getToastColor";

describe("getToastColor", () => {
  it.each([
    ["error", "rgba(185, 0, 0, 1)"],
    ["warning", "rgba(255, 193, 7, 1)"],
    ["success", "rgba(25, 135, 84, 1)"],
    ["info", "rgba(0, 123, 255, 1)"],
  ])("should return correct color for '%s' type", (type, expectedColor) => {
    expect(getToastColor(type as MessageType)).toBe(expectedColor);
  });
});
