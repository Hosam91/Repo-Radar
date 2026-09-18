import { env } from "../../config/env";
import { ApiError, type ApiErrorCode } from "./apiError";

function getErrorCode(status: number): ApiErrorCode {
  switch (status) {
    case 401:
      return "unauthorized";

    case 403:
      return "forbidden";

    case 404:
      return "notFound";

    case 422:
      return "validation";

    case 429:
      return "rateLimit";

    default:
      if (status >= 500) {
        return "server";
      }

      return "unknown";
  }
}

async function get<T>(path: string, signal?: AbortSignal): Promise<T> {
  try {
    const response = await fetch(`${env.githubApiBaseUrl}${path}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      signal,
    });

    if (!response.ok) {
      throw new ApiError(
        `Request failed with status ${response.status}`,
        getErrorCode(response.status),
        response.status,
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === "AbortError") {
      throw error;
    }

    throw new ApiError("Network request failed", "network");
  }
}

export const apiClient = {
  get,
};
