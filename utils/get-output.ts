/* eslint-disable camelcase */
import { SubmissionResponse } from "../@types/Submission";
import { decodeBase64 } from "./base64";
import sleep from "./sleep";
import HTTPError from "./http-error";

/**
 * Naïve recursive function that polls the API until an output is ready. The output
 * may be a timeout, a runtime/compile error, a non-match error, or an
 * 'Accepted' status.
 */
const getOutput: any = async (token: string): Promise<SubmissionResponse> => {
  let output: SubmissionResponse;
  await sleep(2000);

  try {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_JUDGE0_HOSTNAME
      }/submissions/${token}?${new URLSearchParams({ base64_encoded: "true" })}`
    );
    if (!res.ok)
      throw new HTTPError(`Submission ${res.statusText}`, res.status);
    output = await res.json();
  } catch (e) {
    throw new HTTPError(e, 500);
  }

  if (output.status.id <= 2) return getOutput(token);

  return {
    ...output,
    stdout: output.stdout && decodeBase64(output.stdout),
    stderr: output.stderr && decodeBase64(output.stderr),
    message: output.message && decodeBase64(output.message),
    compile_output:
      output.compile_output && decodeBase64(output.compile_output),
  };
};

export default getOutput;
