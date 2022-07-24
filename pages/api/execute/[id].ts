import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  executeCode,
  HTTPError,
  postAttempt,
  rateLimit,
} from "../../../utils/server";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const fetchAndExecute = async (
  id: number,
  code: string,
  language: number,
  cookie: string
) => {
  const challenge = await prisma.challenge.findUnique({ where: { id: id } });
  if (!challenge) return;
  const output = await executeCode(language, code, challenge.expectedOutput);
  postAttempt({
    challengeId: id,
    cookie,
    success: output?.status?.id === 3,
    output: output?.stdout,
  });
  return output;
};

// POST /api/execute/:id
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
    await fetchAndExecute(
      Number(req.query.id),
      req.body.userCode,
      req.body.language,
      req.cookies["next-auth.csrf-token"]
    ).then((result) => {
      res.status(200).json(result);
    });
  } catch (e) {
    if (e instanceof HTTPError) {
      res.status(e.status).json({ error: e.message });
      return;
    }
    res.status(500).json({ error: e.message });
    return;
  }
}
