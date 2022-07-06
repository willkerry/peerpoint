/* eslint-disable camelcase */
import { SubmissionResponse } from "../@types/Submission";
import { encodeBase64 } from "./base64";
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

	let token: string;

	try {
		const res = await fetch(
			`${
				process.env.NEXT_PUBLIC_JUDGE0_HOSTNAME
			}submissions?${new URLSearchParams({ base64_encoded: "true" })}`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					language_id: language,
					source_code: encodeBase64(code),
					expected_output: expectedOutput ? encodeBase64(expectedOutput) : null,
				}),
			}
		);
		if (!res.ok)
			throw new HTTPError(`Code execution API: ${res.statusText}`, res.status);
		({ token } = await res.json());
	} catch (e) {
		throw new HTTPError(e, 500);
	}

	const output = await getOutput(token);
	return output;
};
