import { openConfirmModal, openModal } from "@mantine/modals";
import Router from "next/router";
import { deletePost } from "../../utils";
import { Challenge } from "@prisma/client";
import { Var } from "../../components/display";
import { Alert, Code, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { SubmissionResponse } from "../../@types/Submission";
import { IconAlertCircle, IconTrophy } from "@tabler/icons";

export function deleteHandler(data: Challenge) {
  return async (): Promise<void> => {
    openConfirmModal({
      title: "Delete challenge",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to delete <Var>{data?.title}</Var>?
        </Text>
      ),
      labels: {
        confirm: "Delete challenge",
        cancel: "No, don’t delete",
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        deletePost(data?.id);
        Router.push("/");
      },
    });
  };
}

export function editHandler(data: Challenge) {
  return (): void => {
    openModal({
      title: (
        <>
          Edit <Var>{data?.title}</Var>
        </>
      ),
      children: <Alert>Editing is not implemented yet.</Alert>,
      centered: true,
    });
  };
}

export function resultModal(setShowResult, output: SubmissionResponse) {
  setShowResult(false);
  const wasError = output?.status?.id > 4;
  const wasWrong = output?.status?.id === 4;
  const wasCorrect = output?.status?.id === 3;
  openModal({
    title: <Title order={4}>Output</Title>,
    children: (
      <Stack>
        {wasError ? (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title="Your program could not be executed"
            color="red"
          >
            {output?.status?.description ?? output?.message}
          </Alert>
        ) : wasCorrect ? (
          <Alert
            icon={<IconTrophy size={16} />}
            title="Success"
            variant="filled"
            color="green"
          >
            <ScrollArea>
              {output?.message || "That’s the correct output."}
            </ScrollArea>
          </Alert>
        ) : wasWrong ? (
          <Alert title="Incorrect output" color="yellow">
            <ScrollArea>
              {output?.message ||
                "Your program ran successfully but did not produce the expected output."}
            </ScrollArea>
          </Alert>
        ) : null}

        <Stack spacing={0}>
          <Title order={6}>
            {output?.stdout
              ? "Standard output"
              : output?.stderr
              ? "Standard error"
              : output?.compile_output
              ? "Compiler output"
              : ""}
          </Title>
          <Text size="sm" color="dimmed">
            {output?.stdout ? (
              <>
                Your program’s <Code>stdout</Code>.
              </>
            ) : output?.stderr ? (
              <>
                Your program’s <Code>stderr</Code>.
              </>
            ) : output?.compile_output ? (
              "The compiler’s output."
            ) : (
              ""
            )}
          </Text>
          <Code
            mt={12}
            block
            sx={(theme) => ({
              background: theme.colors.dark[8],
              color: !wasError ? theme.colors.gray[4] : theme.colors.red[3],
              fontSize: theme.fontSizes.sm,
            })}
          >
            <ScrollArea sx={{ maxHeight: 150 }}>
              {output?.stdout ?? output?.stderr ?? output?.compile_output}
            </ScrollArea>
          </Code>
        </Stack>
      </Stack>
    ),
  });
}
