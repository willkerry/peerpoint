import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import prisma from "../../../lib/prisma";
import { standardLimiter } from "../../../utils/server";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const postId = req.query.id;
  const session = await getSession({ req });

  try {
    await standardLimiter.check(res, 10, "CACHE_TOKEN");
  } catch (e) {
    console.warn(e);
    res.status(429).send("Rate limited");
    return;
  }
  // DELETE /api/c/:id
  if (req.method === "DELETE") {
    if (session) {
      const post = await prisma.challenge.delete({
        where: { id: Number(postId) },
      });
      res.json(post);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  }
  // GET /api/c/:id
  else if (req.method === "GET") {
    const challenge = await prisma.challenge.findUnique({
      where: { id: Number(postId) || -1 },
      include: { author: { select: { name: true, email: true } } },
    });
    if (!challenge) {
      res.status(404).json({ message: "Challenge not found" });
      return;
    }
    res.status(200).json(challenge);
  }
  // PATCH /api/c/:id
  else if (req.method === "PATCH") {
    if (session) {
      const { title, expectedOutput, skeleton, language } = req.body;
      const result = await prisma.challenge.update({
        where: { id: Number(postId) },
        data: {
          title: title,
          expectedOutput: expectedOutput,
          skeleton: skeleton,
          language: language,
        },
      });
      res.json(result);
    } else {
      res.status(401).send({ message: "Unauthorized" });
    }
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
