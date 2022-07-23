import prisma from "../lib/prisma";

const checkChallenge = async (
  id: number
): Promise<{ exists: boolean; title: string }> => {
  const challenge = await prisma.challenge.findUnique({
    where: { id: id },
  });
  if (!challenge) return;
  return { exists: true, title: challenge.title };
};
/*
 * const exists = await prisma.challenge.count({ where: { id } });
 * return { exists: exists > 0, title: "Challenge" };
 */

export default checkChallenge;
