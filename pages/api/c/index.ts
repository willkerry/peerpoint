import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import { getSession } from "next-auth/react";

// POST /api/c
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, brief, expectedOutput, skeleton, language = 1 } = req.body;

  const session = await getSession({ req });
  if (session) {
    const result = await prisma.challenge.create({
      data: {
        title: title,
        brief: brief,
        expectedOutput: expectedOutput,
        skeleton: skeleton,
        language: language,
        author: { connect: { email: session?.user?.email } },
      },
    });
    res.json(result);
  } else {
    res.status(401).send({ message: "Unauthorized" });
  }
}
