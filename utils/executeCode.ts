import getOutput from "./getOutput";
import { SubmissionResponse } from '../@types/Submission';
import { encodeBase64, decodeBase64 } from "./base64";

/**
 * @param {number} language - The ID of the language.
 * @param {string} code - The code to be executed.
 * @returns {Promise<SubmissionResponse>} A promise that resolves to the output of the code.
 **/
export const executeCode = async (language: number, code: string, expectedOutput?: string):
    Promise<SubmissionResponse> => {
    if (!language || !code) return;
    console.log("[Execute Code] sending request");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_JUDGE0_HOSTNAME}submissions?${new URLSearchParams({ base64_encoded: "true" })}`,
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
    const { token } = await res.json();
    console.log("[Execute Code] requesting output");

    return await getOutput(token);
}