import type { NextApiRequest, NextApiResponse } from "next";
import { executeCode, HTTPError, rateLimit } from "../../../utils/server";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

// POST /api/execute/
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    await limiter.check(res, 10, "CACHE_TOKEN");
  } catch (e) {
    console.warn(e);
    res.status(429).send("Rate limited");
    return;
  }

  try {
    await executeCode(req.body.language, req.body.userCode, "").then(
      (result) => {
        res.status(200).json(result);
      }
    );
  } catch (e) {
    if (e instanceof HTTPError) {
      res.status(e.status).json({ error: e.message });
      return;
    }
    res.status(500).json({ error: e.message });
    return;
  }
}
