import type { NextApiRequest, NextApiResponse } from "next";
import rateLimit from "../../../../utils/rate-limit";
import prisma from "../../../../lib/prisma";
import countStudents from "../../../../utils/monitoring/count-students";

export type MonitorResponse = {
  title?: string;
  activeStudents?: number;
  successRate?: number;
  successfulStudents?: number;
  message?: string;
};

const limiter = rateLimit({
  interval: 60 * 1000,
  uniqueTokenPerInterval: 500,
});

// GET /api/c/monitor/:id
export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<MonitorResponse>
) {
  try {
    await limiter.check(res, 20, "CACHE_TOKEN");
  } catch (e) {
    console.warn(e);
    res.status(429).send({ message: "Rate limited" });
    return;
  }

  const { id, period = 60 } = req.query;

  // Reject if ID is not a number
  if (isNaN(Number(id))) {
    res.status(400).send({ message: "Invalid ID" });
    return;
  }

  const queryPeriod = Number(period) * 60 * 1000;

  // Get all attempts for this challenge in last queryPeriod
  if (req.method === "GET") {
    const attempts = await prisma.attempt.findMany({
      where: {
        challengeId: Number(id),
        createdAt: {
          gte: new Date(Date.now() - queryPeriod),
        },
      },
    });
    const challenge = await prisma.challenge.findUnique({
      where: { id: Number(id) },
    });

    const cs = countStudents(attempts);

    res.status(200).json({
      title: challenge?.title,
      activeStudents: cs.activeStudents,
      successRate: (cs.successfulStudents / cs.activeStudents) * 100,
      successfulStudents: cs.successfulStudents,
    });

    return;
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
