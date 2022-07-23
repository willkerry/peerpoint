import type { NextApiRequest, NextApiResponse } from "next";
import checkChallengeExists from "../../../../utils/check-challenge-exists";

// GET /api/c/exists/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  if (req.method === "GET") {
    res.json({ exists: await checkChallengeExists(Number(id)) });
    return;
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
