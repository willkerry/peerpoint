import { Fetcher } from "swr";
import { Challenge } from "@prisma/client";

const fetchChallenges: Fetcher<Challenge[]> = () => {
  return fetch("/api/c", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export default fetchChallenges;
