import type { NextApiRequest, NextApiResponse } from "next";

import { checkChallenge, rateLimit } from "../../../../utils/server";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

// GET /api/c/exists/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id;

  try {
    await limiter.check(res, 20, "CACHE_TOKEN");
  } catch (e) {
    console.warn(e);
    res.status(429).send("Rate limited");
    return;
  }

  if (req.method === "GET") {
    res.json(await checkChallenge(Number(id)));
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
