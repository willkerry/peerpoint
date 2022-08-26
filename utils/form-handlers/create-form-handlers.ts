import { Dispatch, SetStateAction, SyntheticEvent } from "react";

import { UseFormReturnType } from "@mantine/form";

import { SubmissionResponse } from "../../types/Submission";
import {
  createChallenge,
  silentlyExecuteChallenge,
  updateChallenge,
} from "../requests";

export interface CreateFormValues {
  title: string;
  language: number;
  skeleton: string;
  instructions?: string;
  expectedOutput: string;
}

export function quickExecute(
  setExecuting: Dispatch<SetStateAction<boolean>>,
  form: UseFormReturnType<CreateFormValues>
): () => Promise<SubmissionResponse> {
  return async () => {
    setExecuting(true);
    let res: SubmissionResponse;
    try {
      res = await silentlyExecuteChallenge(
        Number(form.values.language),
        form.values.skeleton
      );
    } catch (e) {
      setExecuting(false);
    }
    setExecuting(false);
    return res;
  };
}

export function quickExecuteAndPopulate(
  setExecuting: Dispatch<SetStateAction<boolean>>,
  form: UseFormReturnType<CreateFormValues>
) {
  return async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!form.values.language) {
      form.setFieldError("language", "Select a language.");
      return;
    }
    if (!form.values.skeleton) {
      form.setFieldError("skeleton", "Enter something to execute.");
      return;
    }

    const res = await quickExecute(setExecuting, form)();

    const displayError = res.stderr || res.compile_output;

    if (res.status?.id > 4) {
      form.setFieldError(
        "skeleton",
        `${res.status.description ?? "Error"} ${res.message ?? ""}`
      );
      form.setFieldValue("expectedOutput", displayError ?? "");
    } else if (!res.stdout) {
      form.setFieldError("skeleton", "Your program didn’t output anything.");
      form.setFieldValue("expectedOutput", displayError ?? "");
    } else {
      form.setFieldValue("expectedOutput", res.stdout ?? "");
    }
  };
}

/**
 * Submit handler for the create form – fires the appropriate errors on the
 * provided form object. Pass a challenge ID as the `updateChallengeId` argument
 * to update an existing challenge (leave it as `undefined` to create a new one).
 */
export function submitHandler(
  form: UseFormReturnType<CreateFormValues>,
  setSubmitting: Dispatch<SetStateAction<boolean>>,
  setExecuting: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<boolean>>,
  updateChallengeId?: number
) {
  return async (values) => {
    setSubmitting(true);
    try {
      if (updateChallengeId) updateChallenge(updateChallengeId, values);
      else createChallenge(values);
      setSubmitting(false);
      setSuccess(true);
      return;
    } catch (error) {
      form.setFieldError("submit", error.message);
      setSubmitting(false);
    }
  };
}
