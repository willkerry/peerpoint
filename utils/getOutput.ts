import { SubmissionResponse } from '../@types/Submission';
import { decodeBase64 } from './base64';
import sleep from './sleep';

/**
 * Naïve recursive function that polls the API until an output is ready. The output
 * may be a timeout, a runtime/compile error, a non-match error, or an
 * 'Accepted' status.
 * @param {string} token - The token of the submission.
 * @returns A promise that resolves to a `SubmissionResponse` object.
 **/
const getOutput: any = async (token: string): Promise<SubmissionResponse> => {
    console.log("[Get Output] (wait 1500ms)");
    await sleep(1500);
    console.log("[Get Output] requesting output");
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_JUDGE0_HOSTNAME}/submissions/${token}?${new URLSearchParams({ base64_encoded: "true" })}`
    );
    const output = await res.json();
    if (output.status.id <= 2) {
        console.log(
            "%c[Execute Code] execution still queued (wait 1000ms)",
            "color: gray"
        );
        return getOutput(token);
    }
    console.log("%c[Get Output] output retrieved", "color: green");
    return {
        ...output,
        stdout: output.stdout && decodeBase64(output.stdout),
        stderr: output.stderr && decodeBase64(output.stderr),
        message: output.message && decodeBase64(output.message),
        compile_output: output.compile_output && decodeBase64(output.compile_output),
    }
};

export default getOutput;