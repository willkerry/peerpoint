/* eslint-disable camelcase */
import { SubmissionResponse } from "../../types/Submission";
import { decodeBase64 } from "../base64";
import sleep from "../sleep";
import HTTPError from "./http-error";
import { getApiHeaders, getApiSubmissionsUrl } from "./get-api";

/**
 * Change: previously a recursive function, now a loop that polls the API a
 * finite number of times for a result.
 */
const getOutput = async (token: string): Promise<SubmissionResponse> => {
  await sleep(3000);

  let output: SubmissionResponse;
  let iterate = 5;
  if (iterate === 0) throw new HTTPError("getOutput polling timed out.", 408);

  const url = getApiSubmissionsUrl(token);
  const headers = getApiHeaders();

  while (iterate > 0) {
    iterate--;

    const res = await fetch(url, headers);
    if (!res.ok)
      throw new HTTPError(`Submission ${res.statusText}`, res.status);

    output = await res.json();
    if (output.status.id > 2) break;
  }
  return {
    ...output,
    stdout: decodeBase64(output.stdout),
    stderr: decodeBase64(output.stderr),
    message: decodeBase64(output.message),
    compile_output: decodeBase64(output.compile_output),
  };
};

export default getOutput;
