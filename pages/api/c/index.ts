import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth/next";

import prisma from "../../../lib/prisma";
import { languageMap } from "../../../types/Language";
import { standardLimiter } from "../../../utils/server";
import { authOptions } from "../auth/[...nextauth]";

// POST /api/c (create a new challenge)
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
    const session = await unstable_getServerSession(req, res, authOptions);
    const { title, expectedOutput, skeleton, language } = req.body;
    const langInt = Number(language);

    if (!title || !expectedOutput || !skeleton || !language) {
      res.status(400).send("Missing required fields");
      return;
    }
    if (languageMap.get(langInt) === undefined || isNaN(langInt)) {
      res.status(400).send("Invalid language");
      return;
    }
    try {
      if (session) {
        const result = await prisma.challenge.create({
          data: {
            title: title,
            expectedOutput: expectedOutput,
            skeleton: skeleton,
            language: Number(language),
            published: true,
            author: { connect: { email: session?.user?.email } },
          },
        });
        res.status(200).send(result);
      } else {
        res.status(401).send("Unauthorized");
      }
    } catch (e) {
      console.error(e);
      res.status(500).send(e);
    }
  }
  // GET /api/c (return 10 latest challenge objects)
  else if (req.method === "GET") {
    const { own } = req.query;
    if (own) {
      // If `own` is set, check that the user is logged in
      const session = await unstable_getServerSession(req, res, authOptions);

      // If not logged in, return 401 unauthorized
      if (!session) {
        res.status(401).send("Unauthorized");
        return;
      }
      /*
       * Otherwise, return the 30 most recent challenges created by the user
       * TODO: pagination
       */
      const result = await prisma.challenge.findMany({
        orderBy: { createdAt: "desc" },
        where: { author: { email: session.user.email } },
        take: 30,
      });
      res.status(200).send(result);
    }

    // If `own` is not set, return the 10 most recent public challenges
    else {
      const feed = await prisma.challenge.findMany({
        where: { published: true },
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      });
      res.json(feed);
    }
  }
}
