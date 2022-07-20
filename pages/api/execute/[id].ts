import type { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { executeCode } from "../../../utils/execute-code";
import rateLimit from "../../../utils/rate-limit";
import HTTPError from "../../../utils/http-error";

/*
 * TODO assign non-auth users a session cookie
 * TODO record Attempt objects to DB
 */

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

const fetchAndExecute = async (id: number, code: string, language: number) => {
  const challenge = await prisma.challenge.findUnique({ where: { id: id } });
  if (!challenge) throw new Error("Invalid challenge ID.");
  const output = await executeCode(language, code, challenge.expectedOutput);
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
      req.body.language
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
