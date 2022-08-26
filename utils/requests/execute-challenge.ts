import { Language } from "../../types/Language";
import { SubmissionResponse } from "../../types/Submission";

/** Send an execute request. */
export async function executeChallenge(
  id: number,
  language: Language["id"],
  userCode: string
): Promise<SubmissionResponse> {
  const res = await fetch(`/api/execute/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, userCode }),
  });
  return res.json();
}

/** Send an execute request without created an `Attempt` record. */
export async function silentlyExecuteChallenge(
  language: number,
  userCode: string
): Promise<SubmissionResponse> {
  const res = await fetch("/api/execute/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ language, userCode }),
  });
  return res.json();
}
