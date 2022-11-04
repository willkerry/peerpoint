import { Challenge } from "@prisma/client";
import { Fetcher } from "swr";

type ChallengeResponse = Challenge & {
  author: { name: string; email: string };
};

const fetchChallenge: Fetcher<ChallengeResponse> = async (id: string) => {
  const res = await fetch(`/api/c/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Not found");

  return res.json();
};

export default fetchChallenge;
