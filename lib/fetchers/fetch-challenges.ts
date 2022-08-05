import { Fetcher } from "swr";
import { Challenge } from "@prisma/client";

/*
 * Pass `own` argument to fetch only challenges created by the user.
 * Otherwise, fetch the 10 most recent public challenges.
 */
const fetchChallenges: Fetcher<Challenge[]> = async (
  key: string,
  own = false
) => {
  const urlObj = new URL("/api/c", window.location.href);
  if (own) urlObj.searchParams.append("own", "true");
  const res = await fetch(urlObj, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  return await res.json();
};

export default fetchChallenges;
