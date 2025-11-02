import { NetworkError, RateLimitError } from "@/data/api/errors";

export function getErrorMessage(error: Error): string {
  if (error instanceof RateLimitError) {
    return `Rate limit exceeded. Please retry in ${Math.round(error.resetAt - Date.now() / 1000)} seconds.`;
  } else if (error instanceof NetworkError) {
    return `Request failed with status code ${error.httpCode}. Try again later`;
  }
  return "An error occurred, our team has been notified and is working hard to fix it.";
}
