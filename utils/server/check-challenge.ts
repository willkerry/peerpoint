import prisma from "../../lib/prisma";

/** Check if a challenge ID exists */
const checkChallenge = async (
  id: number
): Promise<{ exists: boolean; title: string }> => {
  const challenge = await prisma.challenge.findUnique({
    where: { id: id },
  });
  if (!challenge) return;
  return { exists: true, title: challenge.title };
};

export default checkChallenge;
