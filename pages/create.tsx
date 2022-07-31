import { Button, Grid, Group, Text, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import { openConfirmModal } from "@mantine/modals";
import Router from "next/router";
import { useEffect, useState } from "react";
import { Var } from "../components/display";
import { CodeEditor, LanguageSelect } from "../components/inputs";
import { Layout, Meta } from "../components/layout";
import {
  quickExecuteAndPopulate,
  submitHandler,
} from "../utils/create/form-handlers";

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

  const runAndPopulate = quickExecuteAndPopulate(setExecuting, form);
  const submitData = submitHandler(
    form,
    setSubmitting,
    setExecuting,
    setSuccess
  );

  useEffect(() => {
    const successModalProps = {
      title: "Challenge created",
      children: (
        <Text size="sm">
          Your challenge <Var>{form.values.title}</Var> has been created.
        </Text>
      ),
      labels: { confirm: "Create more", cancel: "Exit" },
      onCancel: () => {
        setSuccess(false);
        Router.push("/");
      },
      onConfirm: () => {
        form.reset();
        setSuccess(false);
      },
    };
    if (success) openConfirmModal(successModalProps);
  }, [success, form]);

  const cancelModal = () => {
    const props = {
      title: "Are you sure you want to cancel?",
      labels: { confirm: "Yes", cancel: "Return" },
      onConfirm: () => {
        Router.push("/");
      },
      confirmProps: { color: "red" },
    };
    return openConfirmModal(props);
  };

  return (
    <Layout>
      <Meta title="Create new challenge" />
      <Title order={1}>New challenge</Title>
      <form onSubmit={form.onSubmit((values) => submitData(values))}>
        <Grid>
          <Grid.Col sm={8}>
            <TextInput
              autoFocus
              required
              label="Title"
              type="text"
              {...form.getInputProps("title")}
            />
          </Grid.Col>
          <Grid.Col sm={4}>
            <LanguageSelect form={form} />
          </Grid.Col>
          <Grid.Col sm={6}>
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
              fullWidth
              variant="default"
              mt={12}
            >
              {executing
                ? "Running program"
                : "Run and populate Expected output"}
            </Button>
          </Grid.Col>
          <Grid.Col sm={6}>
            <CodeEditor
              label="Expected output"
              description="
                The stdout of student submissions is (fuzzily) checked against
                this value, and matches are considered successful."
              required
              {...form.getInputProps("expectedOutput")}
            />
          </Grid.Col>
          <Grid.Col sm={12}>
            <Text color="red" size="xs">
              {form.errors.submit}
            </Text>
          </Grid.Col>
          <Grid.Col sm={12}>
            <Group>
              <Button loading={submitting} disabled={executing} type="submit">
                Create
              </Button>
              <Button variant="subtle" onClick={cancelModal}>
                Cancel
              </Button>
            </Group>
          </Grid.Col>
        </Grid>
      </form>
    </Layout>
  );
};

export default Create;
