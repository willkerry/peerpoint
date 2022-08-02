import Router from "next/router";

async function deletePost(id: number): Promise<void> {
  if (isNaN(id)) throw new Error("Invalid post ID.");
  await fetch(`/api/c/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

export default deletePost;
