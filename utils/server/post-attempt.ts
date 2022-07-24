import prisma from "../lib/prisma";

type PostAttemptRequest = {
  challengeId: number;
  cookie: string;
  success: boolean;
  output: string;
};

const postAttempt = async (attempt: PostAttemptRequest): Promise<void> => {
  await prisma.attempt.create({ data: { ...attempt } });
};

export default postAttempt;
