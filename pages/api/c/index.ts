import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";
import { standardLimiter } from "../../../utils/rate-limit";

// POST /api/c
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, expectedOutput, skeleton, language = 1 } = req.body;
  const session = await getSession({ req });

  try {
    await standardLimiter.check(res, 10, "CACHE_TOKEN");
  } catch (e) {
    console.warn(e);
    res.status(429).send("Rate limited");
    return;
  }

  if (session) {
    const result = await prisma.challenge.create({
      data: {
        title: title,
        expectedOutput: expectedOutput,
        skeleton: skeleton,
        language: language,
        published: true,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
