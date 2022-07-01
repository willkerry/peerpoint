import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import prisma from "../../../lib/prisma";
import { executeCode } from "../../../utils/executeCode";

// TODO assign non-auth users a session cookie
// TODO record Attempt objects to DB

// POST /api/execute/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { expectedOutput } = await prisma.post.findUnique({
    where: {
      id: Number(req.query.id),
    },
  });


  const session = await getSession({ req })

  if (session) {
    console.log("User is logged in")
  } else {
    console.log("User is not logged in")
  }

  const { language, userCode } = req.body;
  const output = await executeCode(language, userCode, expectedOutput);
  await res.json(output);
}
