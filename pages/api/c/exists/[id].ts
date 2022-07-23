import type { NextApiRequest, NextApiResponse } from "next";
import checkChallenge from "../../../../utils/check-challenge";

// GET /api/c/exists/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  if (req.method === "GET") {
    res.json(await checkChallenge(Number(id)));
    return;
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
