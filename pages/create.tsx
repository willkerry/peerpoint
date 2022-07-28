import { Button, Group, Stack, TextInput, Text, Title } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { useForm } from "@mantine/form";
import Router from "next/router";
import { SyntheticEvent, useState, useEffect } from "react";
import { CodeEditor, LanguageSelect } from "../components/inputs";
import { Layout, Meta } from "../components/layout";
import { sendOneOffExecuteRequest } from "../utils";
import { SubmissionResponse } from "../@types/Submission";
import { Var } from "../components/display/variable";

const Create: React.FC = () => {
  const [executing, setExecuting] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm({
    initialValues: {
      title: "",
      language: undefined,
      skeleton: "",
      expectedOutput: "",
    },
  });

  const run = async () => {
    setExecuting(true);
    const res = await sendOneOffExecuteRequest(
      form.values.language,
      form.values.skeleton
    );
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
    if (res.stdout) {
      form.setFieldValue("expectedOutput", res.stdout);
      return;
    } else {
      form.setFieldError("skeleton", res.message);
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
            <LanguageSelect
              required
              label="Language"
              {...form.getInputProps("language", { type: "input" })}
            />
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
