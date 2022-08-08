/* eslint-disable camelcase */
import { SubmissionRequest, SubmissionResponse } from "../../types/Submission";
import { encodeBase64 } from "../base64";
import { getApiHeaders, getApiSubmissionsUrl } from "./get-api";
import getOutput from "./get-output";
import HTTPError from "./http-error";

/**
 * Sends a submission request to the code execution API, then polls the API for the result.
 *
 * **Uses the platform's timeout, so is liable to run indefinitely when something goes wrong in a dev environment.**
 */
export const executeCode = async (
  language: number,
  code: string,
  expectedOutput?: string
): Promise<SubmissionResponse> => {
  if (!language) throw new HTTPError("Missing language number.", 400);
  if (!code) throw new HTTPError("Missing code.", 400);

  console.log("Sending submission request...");

  const url = getApiSubmissionsUrl();
  const headers = getApiHeaders();

  const submissionRequest: SubmissionRequest = {
    language_id: language,
    source_code: encodeBase64(code),
    expected_output: expectedOutput ? encodeBase64(expectedOutput) : null,
  };
  const body: BodyInit = JSON.stringify(submissionRequest);
  const res = await fetch(url, { method: "POST", headers, body });

  console.log("Submission request sent.");

  if (!res.ok)
    throw new HTTPError(`Code execution API: ${res.statusText}`, res.status);

  const { token } = await res.json();

  console.log(`Submission token: ${token}`);

  const output = await getOutput(token);
  return output;
};
