import { openConfirmModal, openModal } from "@mantine/modals";
import Router from "next/router";
import { deletePost } from "../../utils";
import { Challenge } from "@prisma/client";
import { Var } from "../../components/display";
import { Alert, Code, ScrollArea, Stack, Text } from "@mantine/core";
import { SubmissionResponse } from "../../@types/Submission";

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
  openModal({
    title: output?.status?.description,
    children: (
      <Stack>
        {output?.status?.id > 3 && (
          <Alert title={`Error status ${output?.status?.id}`} color="red">
            {output?.status?.description ?? output?.message}
          </Alert>
        )}
        {output?.status?.id <= 3 && (
          <Alert color="green">
            <ScrollArea>
              {output?.message || "That’s the correct output."}
            </ScrollArea>
          </Alert>
        )}
        <Code block>
          <ScrollArea>
            {output?.stdout ?? output?.stderr ?? output?.compile_output}
          </ScrollArea>
        </Code>
      </Stack>
    ),
  });
}
