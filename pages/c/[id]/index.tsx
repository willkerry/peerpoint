import {
  Affix,
  Alert,
  Button,
  Code,
  Group,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Stack,
  Title,
  Text,
} from "@mantine/core";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { AnchorHTMLAttributes, useState, useEffect } from "react";
import useSWR from "swr";
import { SubmissionResponse } from "../../../@types/Submission";
import { CodeEditor } from "../../../components/inputs";
import { Layout, Meta } from "../../../components/layout/";
import { deletePost, publishPost, sendExecuteRequest } from "../../../utils";
import fetchChallenge from "../../../lib/fetchers/fetch-challenge";
import IdButton from "../../../components/display/id-button";
import { openModal, openConfirmModal } from "@mantine/modals";
import { Var } from "../../../components/display";

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
        <Affix zIndex={1} position={{ bottom: 15, right: 15 }}>
          <Paper withBorder p="md">
            <Group>
              {!data?.published && userHasValidSession && postBelongsToUser && (
                <Button
                  onClick={() => publishPost(data?.id)}
                  disabled={isSubmitting}
                  compact
                >
                  Publish
                </Button>
              )}
              <Button.Group>
                {userHasValidSession && postBelongsToUser && (
                  <>
                    <Button
                      color="red"
                      onClick={() => handleDelete()}
                      disabled={isSubmitting}
                      compact
                    >
                      Delete
                    </Button>
                    <Link href={`${data?.id}/monitor`}>
                      <Button<AnchorHTMLAttributes<HTMLAnchorElement>>
                        variant="default"
                        component="a"
                        compact
                      >
                        Monitor
                      </Button>
                    </Link>
                    <Button
                      variant="default"
                      disabled={isSubmitting}
                      onClick={handleEdit}
                      compact
                    >
                      Edit
                    </Button>
                  </>
                )}
              </Button.Group>
              {output && (
                <Button variant="default" onClick={() => setShowResult(true)}>
                  Result
                </Button>
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
