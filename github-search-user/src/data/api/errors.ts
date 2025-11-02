type ApiErrorType = "NETWORK" | "RATE_LIMIT" | "UNKNOWN";

export class ApiError extends Error {
  constructor(type: ApiErrorType, message: string) {
    super(`API Error : ${message}`);
    this.type = type;
  }

  readonly type: ApiErrorType;
}

export class NetworkError extends ApiError {
  httpCode: number;
  constructor(httpCode: number) {
    super("NETWORK", `Network error with status code ${httpCode}`);
    this.httpCode = httpCode;
  }
}

export class RateLimitError extends ApiError {
  constructor(resetAt: number) {
    super("RATE_LIMIT", `Rate limit exceeded. Try again later.`);
    this.resetAt = resetAt;
  }

  readonly resetAt: number;
}
