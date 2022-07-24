import { Attempt } from "@prisma/client";

const countStudents = (attempts: Attempt[]) => {
  const successfulStudents = new Set<string>();
  const activeStudents = new Set<string>();
  for (const att of attempts) {
    att.success && successfulStudents.add(att.cookie);
    activeStudents.add(att.cookie);
  }
  return {
    successfulStudents: successfulStudents.size,
    activeStudents: activeStudents.size,
  };
};

export default countStudents;
