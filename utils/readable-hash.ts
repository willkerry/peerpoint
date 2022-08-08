import { adjectives } from "../lib/adjectives";
import { nouns } from "../lib/nouns";

/** Turn an input string into an alliterative two-word name.  */
export const readableHash = (str: string) => {
  const hash = str.split("").reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  const adjective = adjectives[Math.abs(hash) % adjectives.length];
  const noun = nouns[Math.abs(hash) % nouns.length];
  return `${adjective} ${noun}`;
};

export default readableHash;
