import { Fetcher } from "swr";
import { Challenge } from "@prisma/client";

type ChallengeResponse = Challenge & {
  author: { name: string; email: string };
};

const fetchChallenge: Fetcher<ChallengeResponse> = (id: string) => {
  return fetch(`/api/c/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());
};

export default fetchChallenge;
