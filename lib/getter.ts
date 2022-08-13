import { Fetcher } from "swr";

import { SubmissionRequest } from "../types/Submission";

/**
 * Pass a URL and a SubmissionRequest object to this function, and it will perform a GET request to the URL.
 */
const getter: Fetcher = (url: string, body: SubmissionRequest) =>
  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());

export default getter;
