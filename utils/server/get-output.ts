/* eslint-disable camelcase */
import { SubmissionResponse } from "../../@types/Submission";
import { decodeBase64 } from "../base64";
import sleep from "../sleep";
import HTTPError from "./http-error";

/**
 * Change: previously a recursive function, now a loop that polls the API a
 * finite number of times for a result.
 */
const getOutput = async (token: string): Promise<SubmissionResponse> => {
  let output: SubmissionResponse;
  await sleep(3000);
  console.log("Polling for output...");

  let iterate = 5;

  while (iterate > 0) {
    iterate--;
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_JUDGE0_HOSTNAME
      }/submissions/${token}?${new URLSearchParams({
        base64_encoded: "true",
      })}`
    );
    if (!res.ok) {
      throw new HTTPError(`Submission ${res.statusText}`, res.status);
    }
    output = await res.json();
    console.log("Status:", output?.status?.id, output?.status?.description);
    if (output.status.id > 2) break;
  }
  if (iterate === 0) throw new HTTPError("getOutput polling timed out.", 408);

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
