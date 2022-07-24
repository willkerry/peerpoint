import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";
import { standardLimiter } from "../../../utils/rate-limit";

// POST /api/c
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await standardLimiter.check(res, 10, "CACHE_TOKEN");
  } catch (e) {
    console.warn(e);
    res.status(429).send("Rate limited");
    return;
  }

  if (req.method === "POST") {
    const { title, expectedOutput, skeleton, language = 1 } = req.body;
    const session = await getSession({ req });

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
  } else if (req.method === "GET") {
    const feed = await prisma.challenge.findMany({
      where: {
        published: true,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 10,
    });
    res.json(feed);
  }
}
