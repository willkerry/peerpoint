import { CreateFormValues } from "../form-handlers/create-form-handlers";

/** Send an update request (*safely* – auth happens server-side). */
async function updateChallenge(
  id: number,
  values: CreateFormValues
): Promise<void> {
  if (isNaN(id)) throw new Error("Invalid post ID.");
  await fetch(`/api/c/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  });
}

export default updateChallenge;
