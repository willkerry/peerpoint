import { CreateFormValues } from "../form-handlers/create-form-handlers";

/** Send an update request (*safely* – auth happens server-side). */
async function createChallenge(values: CreateFormValues): Promise<void> {
  const res = await fetch("/api/c/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
  if (!res.ok)
    throw new Error(
      `The create API threw an error. ${res.status} ${res.statusText}`
    );
}

export default createChallenge;
