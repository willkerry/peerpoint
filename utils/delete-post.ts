import Router from "next/router";

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/c/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

export default deletePost;
