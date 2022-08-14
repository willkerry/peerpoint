import { useEffect } from "react";
import type { Dispatch, SetStateAction } from "react";

import { useRouter } from "next/router";

import { Button, Grid, Group, Text, TextInput } from "@mantine/core";
import type { UseFormReturnType } from "@mantine/form";
import { closeAllModals, openConfirmModal } from "@mantine/modals";

import { quickExecuteAndPopulate } from "../../utils/form-handlers/create-form-handlers";
import type { CreateFormValues } from "../../utils/form-handlers/create-form-handlers";
import { Var } from "../display/variable";
import CodeEditor from "./code-editor";
import LanguageSelect from "./language-select";

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

const ChallengeForm: React.FC<ChallengeFormComponentProps> = (
  props: ChallengeFormComponentProps
) => {
  const router = useRouter();
  const {
    form,
    onSubmit,
    success,
    setSuccess,
    executing,
    setExecuting,
    submitting,
    isEditForm,
    isModal,
  } = props;
  const runAndPopulate = quickExecuteAndPopulate(setExecuting, form);

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
    const cancelModalProps = {
      title: "Are you sure you want to cancel?",
      labels: { confirm: "Yes", cancel: "Return" },
      onConfirm: () => {
        router.back();
      },
      confirmProps: { color: "red" },
    };
    return openConfirmModal(cancelModalProps);
  };
  return (
    <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
      <Grid>
        <Grid.Col sm={isModal ? 12 : 8}>
          <TextInput
            autoFocus
            required
            label="Title"
            type="text"
            {...form.getInputProps("title")}
          />
        </Grid.Col>
        <Grid.Col sm={isModal ? 12 : 4}>
          <LanguageSelect {...{ form }} />
        </Grid.Col>
        <Grid.Col sm={isModal ? 12 : 6}>
          <CodeEditor
            label="Skeleton"
            language={form.values.language}
            descriptionProps={{ sx: { minHeight: "2.5em" } }}
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
            data-testid="run-populate-button"
          >
            {executing ? "Running program" : "Run and populate Expected output"}
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

ChallengeForm.defaultProps = {
  isEditForm: false,
  isModal: false,
};

export default ChallengeForm;
