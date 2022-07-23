import prisma from "../lib/prisma";

const checkChallengeExists = async (id: number) => {
  const exists = await prisma.challenge.count({ where: { id } });
  return exists > 0;
};

export default checkChallengeExists;
