/* eslint-disable no-await-in-loop */

/* eslint-disable camelcase */
import { SubmissionResponse } from "../../types/Submission";
import { decodeBase64 } from "../base64";
import sleep from "../sleep";
import { getApiHeaders, getApiSubmissionsUrl } from "./get-api";
import HTTPError from "./http-error";

/**
 * Change: previously a recursive function, now a loop that polls the API a
 * finite number of times for a result.
 */
const getOutput = async (token: string): Promise<SubmissionResponse> => {
  let output: SubmissionResponse;
  let iterate = 10;

  const url = getApiSubmissionsUrl(token);
  const headers = getApiHeaders();

  while (iterate > 0) {
    await sleep(1000);
    iterate -= 1;
    if (iterate === 0)
      return {
        status: {
          id: 15,
          description:
            "Request timed out before the execution API had finished running.",
        },
      };

    console.log({ iterate });

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
