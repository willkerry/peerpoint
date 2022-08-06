import { Attempt } from "@prisma/client";

/**
 * Dedupe an array of attempts to return number of unique active student and count
 * successful attempts.
 *
 * TODO: attempts per student, max/min/median attempt time
 *
 * TODO: **do this in SQL**, not on Node.js
 *
 * @param attempts Array of attempts to dedupe
 * @returns Object with keys `activeStudents` and `successfulAttempts`
 */
const countStudents = (attempts: Attempt[]) => {
  const countSuccess = new Set<string>();
  const countAll = new Set<string>();
  for (const att of attempts) {
    att.success && countSuccess.add(att.cookie);
    countAll.add(att.cookie);
  }
  return {
    successfulStudents: countSuccess.size,
    activeStudents: countAll.size,
  };
};

export default countStudents;
