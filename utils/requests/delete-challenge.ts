import Router from "next/router";

/** Send a delete request (*safely* – auth happens server-side). */
async function deleteChallenge(id: number): Promise<void> {
  if (Number.isNaN(id)) throw new Error("Invalid post ID.");
  await fetch(`/api/c/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

export default deleteChallenge;
