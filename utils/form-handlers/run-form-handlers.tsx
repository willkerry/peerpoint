import Router from "next/router";

import { Alert, Code, ScrollArea, Stack, Text, Title } from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";

import { Challenge } from "@prisma/client";
import { IconAlertCircle, IconTrophy } from "@tabler/icons";

import { deleteChallenge } from "..";
import Edit from "../../components/display/edit";
import { Var } from "../../components/display/variable";
import { errorMessages } from "../../lib/error-messages";
import { SubmissionResponse } from "../../types/Submission";

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
        deleteChallenge(data?.id);
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
      children: <Edit challenge={data} />,
      centered: true,
    });
  };
}

export function resultModal(setShowResult, output: SubmissionResponse) {
  setShowResult(false);
  const wasError = output?.status?.id > 4;
  const wasWrong = output?.status?.id === 4;
  const wasCorrect = output?.status?.id === 3;

  let title: string;
  let description: JSX.Element;
  if (output?.stderr) {
    title = "Standard error";
    description = (
      <>
        Your program’s <Code>stderr</Code>.
      </>
    );
  } else if (output?.compile_output) {
    title = "Compiler output";
    description = <>The compiler’s output</>;
  } else title = "Standard output";

  openModal({
    title: <Title order={4}>Output</Title>,

    children: (
      <Stack>
        {wasError && (
          <Alert
            icon={<IconAlertCircle size={16} />}
            title={errorMessages.get(output?.status?.id)}
            color="red"
          >
            {output?.message}
            {"\n"}
            {output?.status?.description}
          </Alert>
        )}
        {wasCorrect && (
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
        )}
        {wasWrong && (
          <Alert title="Incorrect output" color="yellow">
            <ScrollArea>
              {output?.message ||
                "Your program ran successfully but did not produce the expected output."}
            </ScrollArea>
          </Alert>
        )}

        <Stack spacing={0}>
          <Title order={6}>{title}</Title>
          <Text size="sm" color="dimmed">
            {description}
          </Text>
          <Code
            mt={12}
            block
            sx={(theme) => ({
              background: theme.colors.dark[8],
              color: !wasError ? theme.colors.gray[4] : theme.colors.red[3],
              fontSize: theme.fontSizes.sm,
            })}
            data-testid="output"
          >
            <ScrollArea sx={{ maxHeight: 150 }}>
              {output?.stdout || output?.stderr || output?.compile_output}
            </ScrollArea>
          </Code>
        </Stack>
      </Stack>
    ),
  });
}
