/** Encode a string to base64 */
export const encodeBase64 = (str: string) => {
  if (!str) return "";
  return Buffer.from(str).toString("base64");
};

/** Decode a base64 string */
export const decodeBase64 = (str: string) => {
  if (!str) return "";
  return Buffer.from(str, "base64").toString("ascii");
};
