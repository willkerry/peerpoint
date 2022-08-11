import { Dispatch, SetStateAction, useEffect } from "react";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { Button, Grid, Group, Text, TextInput } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { closeAllModals, openConfirmModal } from "@mantine/modals";

import { LanguageSelect } from ".";
import {
  CreateFormValues,
  quickExecuteAndPopulate,
} from "../../utils/form-handlers/create-form-handlers";
import { Var } from "../display";

const CodeEditor = dynamic(() => import("../inputs/code-editor"), {
  ssr: false,
});

type ChallengeFormComponentProps = {
  form: UseFormReturnType<CreateFormValues>;
  onSubmit: (values: CreateFormValues) => Promise<void>;
  isEditForm?: boolean;
  isModal?: boolean;
  executing: boolean;
  setExecuting: Dispatch<SetStateAction<boolean>>;
  submitting: boolean;
  setSubmitting: Dispatch<SetStateAction<boolean>>;
  success: boolean;
  setSuccess: Dispatch<SetStateAction<boolean>>;
};

const ChallengeForm: React.FC<ChallengeFormComponentProps> = (props) => {
  const router = useRouter();
  const { form, success, setSuccess, isEditForm, isModal } = props;
  const runAndPopulate = quickExecuteAndPopulate(props.setExecuting, form);

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
      router.back();
    },
    onConfirm: () => {
      form.reset();
      setSuccess(false);
    },
  };

  const editSuccessModalProps = {
    title: "Challenge updated",
    children: (
      <Text size="sm">
        Your challenge <Var>{form.values.title}</Var> has been updated.
      </Text>
    ),
    labels: { confirm: "Done", cancel: "Edit again" },
    onConfirm: () => {
      setSuccess(false);
      closeAllModals();
    },
    onCancel: () => {
      setSuccess(false);
    },
  };

  useEffect(() => {
    if (success && !isEditForm) openConfirmModal(successModalProps);
    if (success && isEditForm) openConfirmModal(editSuccessModalProps);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [success, setSuccess]);

  const cancelModal = () => {
    const props = {
      title: "Are you sure you want to cancel?",
      labels: { confirm: "Yes", cancel: "Return" },
      onConfirm: () => {
        router.back();
      },
      confirmProps: { color: "red" },
    };
    return openConfirmModal(props);
  };
  return (
    <form onSubmit={props.form.onSubmit((values) => props.onSubmit(values))}>
      <Grid>
        <Grid.Col sm={isModal ? 12 : 8}>
          <TextInput
            autoFocus
            required
            label="Title"
            type="text"
            {...props.form.getInputProps("title")}
          />
        </Grid.Col>
        <Grid.Col sm={isModal ? 12 : 4}>
          <LanguageSelect form={props.form} />
        </Grid.Col>
        <Grid.Col sm={isModal ? 12 : 6}>
          <CodeEditor
            label="Skeleton"
            language={props.form.values.language}
            descriptionProps={{ sx: { minHeight: "2.5em" } }}
            description="
              This is what appears in students’ code editors. Include
              instructions (commented out), and any necessary boilerplate or
              variables."
            required
            {...props.form.getInputProps("skeleton")}
          />
          <Button
            disabled={!props.form.values.skeleton}
            onClick={runAndPopulate}
            loading={props.executing}
            type="button"
            fullWidth
            variant="default"
            mt={12}
          >
            {props.executing
              ? "Running program"
              : "Run and populate Expected output"}
          </Button>
        </Grid.Col>
        <Grid.Col sm={isModal ? 12 : 6}>
          <CodeEditor
            label="Expected output"
            descriptionProps={{ sx: { minHeight: "2.5em" } }}
            description="
              The stdout of student submissions is (fuzzily) checked against
              this value, and matches are considered successful."
            required
            {...props.form.getInputProps("expectedOutput")}
          />
        </Grid.Col>
        <Grid.Col sm={12}>
          <Text color="red" size="xs">
            {props.form.errors.submit}
          </Text>
        </Grid.Col>
        <Grid.Col sm={12}>
          <Group>
            <Button
              loading={props.submitting}
              disabled={props.executing}
              type="submit"
            >
              {isEditForm ? "Update" : "Create"}
            </Button>
            <Button variant="subtle" onClick={cancelModal}>
              Cancel
            </Button>
          </Group>
        </Grid.Col>
      </Grid>
    </form>
  );
};

export default ChallengeForm;
