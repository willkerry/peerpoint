import {
  Button,
  Group,
  Stack,
  TextInput,
  Text,
  Title,
  Alert,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useForm } from "@mantine/form";
import Router from "next/router";
import { SyntheticEvent, useState, useEffect } from "react";
import { CodeEditor } from "../components/inputs";
import { Layout, Meta } from "../components/layout";
import { sendOneOffExecuteRequest } from "../utils";
import { SubmissionResponse } from "../@types/Submission";
import { Var } from "../components/display/variable";
import LanguageSelect from "../components/inputs/language-select";
import { AlertIcon } from "@primer/octicons-react";

export interface CreateFormValues {
  title: string;
  language: string;
  skeleton: string;
  expectedOutput: string;
}

const Create: React.FC = () => {
  const [executing, setExecuting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<CreateFormValues>({
    initialValues: {
      title: "",
      language: "",
      skeleton: "",
      expectedOutput: "",
    },
  });

  const run = async () => {
    setExecuting(true);
    let res: SubmissionResponse;
    try {
      res = await sendOneOffExecuteRequest(
        Number(form.values.language),
        form.values.skeleton
      );
    } catch (e) {
      console.error(e);
      setExecuting(false);
      return;
    }
    setExecuting(false);
    return res;
  };

  const submitData = async (values) => {
    setSubmitting(true);
    let res: SubmissionResponse;
    try {
      res = await run();
      if (res.status.id > 4) {
        throw new Error(
          `Your program failed to run. ${res.status.description}`
        );
      }
    } catch (e) {
      form.setFieldError("skeleton", e.message);
      setSubmitting(false);
      return;
    }
    try {
      if (res.stdout !== values.expectedOutput) {
        throw new Error(
          "Your expected output doesn’t match the program’s output."
        );
      }
    } catch (e) {
      form.setFieldError("expectedOutput", e.message);
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
        console.error("Error", await ex);
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

  const runAndPopulate = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!form.values.language) {
      form.setFieldError("language", "Select a language.");
      return;
    }
    if (!form.values.skeleton) {
      form.setFieldError("skeleton", "Enter something to execute.");
      return;
    }
    const res = await run();
    if (res.status.id > 4) {
      form.setFieldError("skeleton", res.status.description);
      form.setFieldValue("expectedOutput", res.compile_output);
      return;
    } else if (!res.stdout) {
      form.setFieldError("skeleton", "Your program didn’t output anything.");
      form.setFieldValue("expectedOutput", res.compile_output);
      return;
    } else {
      form.setFieldValue("expectedOutput", res.stdout);
      return;
    }
  };

  useEffect(() => {
    if (success) {
      openConfirmModal({
        title: "Challenge created",
        children: (
          <Text size="sm">
            Your challenge <Var>{form.values.title}</Var> has been created.
          </Text>
        ),
        labels: {
          confirm: "Create more",
          cancel: "Exit",
        },
        onCancel: () => {
          setSuccess(false);
          Router.push("/");
        },
        onConfirm: () => {
          form.reset();
          setSuccess(false);
        },
      });
    }
  }, [success, form]);

  return (
    <Layout>
      <Meta title="Create new challenge" />
      <div>
        <form onSubmit={form.onSubmit((values) => submitData(values))}>
          <Stack>
            <Title order={1}>New challenge</Title>
            <TextInput
              autoFocus
              required
              label="Title"
              type="text"
              {...form.getInputProps("title")}
            />
            <LanguageSelect form={form} />
            {form.values.language == "62" && (
              <Alert icon={<AlertIcon />} color="orange">
                Beware: Peerpoint runs Java impracticably slowly, due to a known
                bottleneck in some third party code running on under-resourced
                hardware.
              </Alert>
            )}

            <CodeEditor
              label="Skeleton"
              language={form.values.language}
              description="
                This is what appears in students’ code editors. Include
                instructions (commented out), and any necessary boilerplate or
                variables."
              required
              {...form.getInputProps("skeleton")}
            />
            <Button
              disabled={!form.values.skeleton}
              onClick={runAndPopulate}
              loading={executing}
              type="button"
              variant="light"
            >
              {submitting && executing
                ? "Checking program output"
                : "Run and populate Expected output"}
            </Button>
            <CodeEditor
              label="Expected output"
              description="
                The stdout of student submissions is (fuzzily) checked against
                this value, and matches are considered successful."
              required
              {...form.getInputProps("expectedOutput")}
            />
            <Group>
              <Button loading={submitting} disabled={executing} type="submit">
                Create
              </Button>
              <Button variant="subtle" onClick={() => Router.push("/")}>
                Cancel
              </Button>
            </Group>
            <Text color="red" size="xs">
              {form.errors.submit}
            </Text>
          </Stack>
        </form>
      </div>
    </Layout>
  );
};

export default Create;
