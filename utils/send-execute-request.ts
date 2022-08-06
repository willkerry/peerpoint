import { Language } from "../@types/Language";
import { SubmissionResponse } from "../@types/Submission";

/** Send an execute request. */
export async function sendExecuteRequest(
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

export async function sendOneOffExecuteRequest(
  language: number,
  userCode: string
): Promise<SubmissionResponse> {
  try {
    const res = await fetch("/api/execute/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language, userCode }),
    });
    return res.json();
  } catch (e) {
    console.error(e);
    return;
  }
}
