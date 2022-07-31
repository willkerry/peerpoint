import { UseFormReturnType } from "@mantine/form";
import { Dispatch, SetStateAction, SyntheticEvent } from "react";
import { SubmissionResponse } from "../../@types/Submission";
import { CreateFormValues } from "../../pages/create";
import { sendOneOffExecuteRequest } from "../send-execute-request";

export function quickExecute(
  setExecuting: Dispatch<SetStateAction<boolean>>,
  form: UseFormReturnType<CreateFormValues>
): () => Promise<SubmissionResponse> {
  return async () => {
    setExecuting(true);
    let res: SubmissionResponse;
    try {
      res = await sendOneOffExecuteRequest(
        Number(form.values.language),
        form.values.skeleton
      );
    } catch (e) {
      setExecuting(false);
      return;
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
    if (res.status?.id > 4) {
      form.setFieldError(
        "skeleton",
        `${res.status.description ?? "Error"} ${res.message ?? ""}`
      );
      form.setFieldValue("expectedOutput", res.compile_output ?? "");
      res.compile_output &&
        form.setFieldError(
          "expectedOutput",
          "Compiler output is provided for debugging."
        );
      return;
    } else if (!res.stdout) {
      form.setFieldError("skeleton", "Your program didn’t output anything.");
      form.setFieldValue("expectedOutput", res.compile_output ?? "");
      return;
    } else {
      form.setFieldValue("expectedOutput", res.stdout ?? "");
      return;
    }
  };
}

export function submitHandler(
  form: UseFormReturnType<CreateFormValues>,
  setSubmitting: Dispatch<SetStateAction<boolean>>,
  setExecuting: Dispatch<SetStateAction<boolean>>,
  setSuccess: Dispatch<SetStateAction<boolean>>
) {
  return async (values) => {
    setSubmitting(true);
    let res: SubmissionResponse;
    try {
      res = await quickExecute(setExecuting, form)();
      if (res.status.id > 4) {
        throw new Error(
          `Your program failed to run. ${res.status.description}`
        );
      }
      if (res.stdout !== values.expectedOutput) {
        throw new Error(
          "Your expected output doesn’t match the program’s output."
        );
      }
    } catch (e) {
      form.setFieldError("skeleton", e.message);
      setSubmitting(false);
      return;
    }
    try {
      const ex = await fetch(`/api/c`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!ex.ok) {
        throw new Error(
          `The create API threw an error. ${ex.status} ${
            ex.statusText
          } ${await ex.text()}`
        );
      }
      setSubmitting(false);
      setSuccess(true);
      return;
    } catch (error) {
      form.setFieldError("submit", error.message);
      setSubmitting(false);
      return;
    }
  };
}
