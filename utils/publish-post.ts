import Router from "next/router";

/** Send a publish request (*safely* – auth happens server-side). */
async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

export default publishPost;
