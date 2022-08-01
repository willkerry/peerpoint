import {
  ActionIcon,
  Affix,
  Alert,
  Button,
  Code,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { openConfirmModal, openModal } from "@mantine/modals";
import {
  IconDeviceAnalytics,
  IconEdit,
  IconHeartRateMonitor,
  IconHistory,
  IconTrash,
} from "@tabler/icons";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { AnchorHTMLAttributes, useEffect, useState } from "react";
import useSWR from "swr";
import { SubmissionResponse } from "../../../@types/Submission";
import { Var, IdButton } from "../../../components/display";
import { CodeEditor } from "../../../components/inputs";
import { Layout, Meta } from "../../../components/layout/";
import fetchChallenge from "../../../lib/fetchers/fetch-challenge";
import { deletePost, publishPost, sendExecuteRequest } from "../../../utils";
import { Tooltip } from "@mantine/core";

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id, fetchChallenge);

  const [userCode, setUserCode] = useState(data?.skeleton);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<SubmissionResponse>();
  const [showResult, setShowResult] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    if (showResult) {
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
  }, [output, showResult]);

  if (status === "loading") return <LoadingOverlay visible />;

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === data?.author?.email;

  const handleSubmit = async (event): Promise<void> => {
    event.preventDefault();
    setIsSubmitting(true);
    await setOutput(
      await sendExecuteRequest(data?.id, data?.language, userCode)
    );
    setIsSubmitting(false);
    setShowResult(true);
  };

  const handleDelete = async (): Promise<void> => {
    await openConfirmModal({
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

  const handleEdit = (): void => {
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

  return (
    <Layout>
      <LoadingOverlay visible={isSubmitting} />
      <Meta title={data?.title} />
      <Title order={4} mb={12}>
        <Group position="apart" align="center">
          {data?.title}
          <IdButton id={data?.id} />
        </Group>
      </Title>

      <form onSubmit={handleSubmit} id="codexec">
        <CodeEditor
          label="Code editor"
          language={data?.language}
          editable={!isSubmitting}
          value={data?.skeleton}
          onChange={(value) => setUserCode(value)}
        />
        <Affix zIndex={1} position={{ bottom: 10, right: 10 }}>
          <Paper withBorder p={7}>
            <Group spacing={8}>
              {!data?.published && userHasValidSession && postBelongsToUser && (
                <Button
                  onClick={() => publishPost(data?.id)}
                  disabled={isSubmitting}
                  compact
                >
                  Publish
                </Button>
              )}

              {userHasValidSession && postBelongsToUser && (
                <Group spacing={8}>
                  <Tooltip label="Delete challenge">
                    <ActionIcon
                      color="red"
                      variant="light"
                      onClick={() => handleDelete()}
                      disabled={isSubmitting}
                    >
                      <IconTrash size={16} />
                    </ActionIcon>
                  </Tooltip>

                  <Tooltip label="Edit challenge">
                    <ActionIcon
                      variant="light"
                      color="blue"
                      disabled={isSubmitting}
                      onClick={handleEdit}
                    >
                      <IconEdit size={16} />
                    </ActionIcon>
                  </Tooltip>

                  <Link href={`${data?.id}/monitor`}>
                    <Tooltip label="Monitor responses">
                      <ActionIcon<AnchorHTMLAttributes<HTMLAnchorElement>>
                        variant="light"
                        color="green"
                        component="a"
                      >
                        <IconHeartRateMonitor size={16} />
                      </ActionIcon>
                    </Tooltip>
                  </Link>
                  <Divider sx={{ height: "36px" }} orientation="vertical" />
                </Group>
              )}
              {output && (
                <Tooltip label="Review output">
                  <ActionIcon
                    variant="default"
                    onClick={() => setShowResult(true)}
                  >
                    <IconHistory size={16} />
                  </ActionIcon>
                </Tooltip>
              )}
              <Button type="submit" form="codexec" loading={isSubmitting}>
                Run
              </Button>
            </Group>
          </Paper>
        </Affix>
      </form>
    </Layout>
  );
};

export default Post;
