const USE_ALT_API = process.env.RAPIDAPI_JUDGE0 === "true";

/**
 * Get a Judge0 submission API URL using environment variables.
 *
 * @param token Provide a submission token to get the output of a previous submission.
 *
 * *Use this function so that the provider can be changed with environment variables.*
 */
export const getApiSubmissionsUrl = (token?: string) => {
  const url = USE_ALT_API
    ? process.env.RAPIDAPI_JUDGE0_URL
    : process.env.NEXT_PUBLIC_JUDGE0_HOSTNAME;
  const queryUrl = new URL("submissions", url);
  if (token) queryUrl.pathname += `/${token}`;
  queryUrl.searchParams.set("base64_encoded", "true");

  return queryUrl;
};

/** Get Judge0 request headers using environment variables. */
export const getApiHeaders = () => {
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (USE_ALT_API) {
    headers["X-RapidAPI-Key"] = process.env.RAPIDAPI_JUDGE0_KEY;
    headers["X-RapidAPI-Host"] = process.env.RAPIDAPI_JUDGE0_HOST;
  }
  return headers;
};
