import { makeUrl } from "./makeUrl";

describe("makeUrl", () => {
  const baseUrl = "https://api.example.com";
  const endpoint = "/test-endpoint";

  it("should construct URL without query parameters", () => {
    const url = makeUrl(baseUrl, endpoint);
    expect(url).toBe("https://api.example.com/test-endpoint");
  });

  it("should construct URL with query parameters", () => {
    const queryParams = { param1: "value1", param2: "value2" };
    const url = makeUrl(baseUrl, endpoint, queryParams);
    expect(url).toBe(
      "https://api.example.com/test-endpoint?param1=value1&param2=value2",
    );
  });

  it("should handle empty query parameters", () => {
    const url = makeUrl(baseUrl, endpoint, {});
    expect(url).toBe("https://api.example.com/test-endpoint");
  });

  it("should handle undefined query parameters", () => {
    const url = makeUrl(baseUrl, endpoint);
    expect(url).toBe("https://api.example.com/test-endpoint");
  });
});
