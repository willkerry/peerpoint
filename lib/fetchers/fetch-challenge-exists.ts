import { Fetcher } from "swr";

type ChallengeExistsResponse = {
  exists: boolean;
  title: string;
};

const fetchChallengeExists: Fetcher<ChallengeExistsResponse> = async ({
  id,
}: {
  id: number;
}) => {
  if (isNaN(id) || !id) return;
  const res = await fetch(`/api/c/exists/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) throw new Error("Not found");
  return res.json();
};

export default fetchChallengeExists;
