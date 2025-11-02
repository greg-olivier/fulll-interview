import { NetworkError, RateLimitError } from "@/data/api/errors";
import { getErrorMessage } from "./getErrorMessage";

describe("getErrorMessage", () => {
  it("should return a rate limit exceeded message", () => {
    const error = new RateLimitError(Date.now() / 1000 + 60);
    const message = getErrorMessage(error);
    expect(message).toBe("Rate limit exceeded. Please retry in 60 seconds.");
  });

  it("should return a network error message", () => {
    const error = new NetworkError(404);
    const message = getErrorMessage(error);
    expect(message).toBe(
      "Request failed with status code 404. Try again later",
    );
  });

  it("should return a generic error message", () => {
    const error = new Error("Something went wrong");
    const message = getErrorMessage(error);
    expect(message).toBe(
      "An error occurred, our team has been notified and is working hard to fix it.",
    );
  });
});
