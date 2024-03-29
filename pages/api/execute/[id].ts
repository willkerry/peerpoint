import type { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";
import { SubmissionResponse } from "../../../types/Submission";
import {
  HTTPError,
  executeCode,
  postAttempt,
  rateLimit,
} from "../../../utils/server";

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

async function fetchAndExecute(
  id: number,
  code: string,
  language: number,
  cookie: string
): Promise<SubmissionResponse> {
  const challenge = await prisma.challenge.findUnique({ where: { id } });
  if (!challenge) return {};

  let output: SubmissionResponse;

  try {
    output = await executeCode(language, code, challenge.expectedOutput);
  } catch (e) {
    throw new HTTPError(e, e.status || 500);
  }

  postAttempt({
    challengeId: id,
    cookie,
    success: output?.status?.id === 3,
    output: output?.stdout,
  });

  return output;
}

// POST /api/execute/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<SubmissionResponse>
) {
  if (req.method !== "POST") {
    res.status(405).json({
      status: {
        id: 405,
        description: "Method not allowed",
      },
    });
    return;
  }

  try {
    await limiter.check(res, 10, "CACHE_TOKEN");
  } catch (e) {
    console.warn(e);
    res.status(429).send({
      status: {
        id: 429,
        description: "Rate limited.",
      },
    });
    return;
  }

  try {
    await fetchAndExecute(
      Number(req.query.id),
      req.body.userCode,
      req.body.language,
      String(req.headers["pp-client-cookie"])
    ).then((result) => {
      res.status(200).json(result);
    });
  } catch (e) {
    res.status(e.status ?? 500).json({
      status: {
        id: e.status ?? 500,
        description: e.message,
      },
    });
  }
}
