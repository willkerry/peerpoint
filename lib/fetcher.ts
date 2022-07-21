import { Fetcher } from "swr";
import { SubmissionRequest } from "../@types/Submission";

/**
 * Pass a URL and a SubmissionRequest object to this function, and it will perform a POST request to the URL.
 */
const fetcher: Fetcher = (url: string, body: SubmissionRequest) => {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }).then((res) => res.json());
};

export default fetcher;
