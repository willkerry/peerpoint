import {
  Affix,
  Alert,
  Button,
  Code,
  Drawer,
  Group,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Stack,
  Title,
} from "@mantine/core";
import type { BasicSetupOptions } from "@uiw/react-codemirror";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import { AnchorHTMLAttributes, useState } from "react";
import useSWR from "swr";
import { SubmissionResponse } from "../../../@types/Submission";
import { CodeEditor } from "../../../components/inputs";
import { Layout, Meta } from "../../../components/layout/";
import { deletePost, publishPost, sendExecuteRequest } from "../../../utils";
import fetchChallenge from "../../../lib/fetchers/fetch-challenge";
import IdButton from "../../../components/display/id-button";

const basicSetup: BasicSetupOptions = { lineNumbers: false };

const Post: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data } = useSWR(id, fetchChallenge);

  const [userCode, setUserCode] = useState(data?.skeleton);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<SubmissionResponse>();
  const [showOutput, setShowOutput] = useState(false);

  const { data: session, status } = useSession();

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
    setShowOutput(true);
  };

  const handleDelete = async (): Promise<void> => {
    if (confirm("Are you sure you want to delete this item?")) {
      await deletePost(data?.id);
      await Router.push("/");
    }
    return;
  };

  return (
    <Layout>
      <LoadingOverlay visible={isSubmitting} />
      <Meta title={data?.title} />
      <Title order={4} mb={12}>
        <Group position="apart" align="center">
          {data?.title} <IdButton id={data?.id} />
        </Group>
      </Title>

      <form onSubmit={handleSubmit} id="codexec">
        <CodeEditor
          label="Code editor"
          language={data?.language}
          editable={!isSubmitting}
          basicSetup={basicSetup}
          value={data?.skeleton}
          onChange={(value) => setUserCode(value)}
        />

        <Affix>
          <Paper>
            <Group p="md">
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
                <>
                  <Button
                    color="red"
                    variant="outline"
                    onClick={() => handleDelete()}
                    disabled={isSubmitting}
                    compact
                  >
                    Delete
                  </Button>
                  <Button variant="outline" disabled={isSubmitting} compact>
                    Edit
                  </Button>
                </>
              )}
              <Link href={`${data?.id}/monitor`}>
                <Button<AnchorHTMLAttributes<HTMLAnchorElement>>
                  variant="default"
                  component="a"
                  compact
                >
                  Monitor
                </Button>
              </Link>
              <Button type="submit" form="codexec" loading={isSubmitting}>
                Run
              </Button>
            </Group>
          </Paper>
        </Affix>
      </form>
      <Drawer
        position="bottom"
        opened={showOutput}
        onClose={() => setShowOutput(false)}
        title="Output"
        padding="md"
        size="xl"
      >
        <Stack>
          {output?.status?.id > 3 && (
            <Alert title={output?.status?.description} color="red">
              {(output?.message && output.message) || (
                  <Code>{output?.compile_output}</Code>
                ) ||
                "Successfully compiled though."}
            </Alert>
          )}
          {output?.status?.id <= 3 && (
            <Alert title={output?.status?.description} color="green">
              <ScrollArea>
                {output?.message || "That’s the correct output."}
              </ScrollArea>
            </Alert>
          )}
          <Code block>
            <ScrollArea>{output?.stdout || output?.stderr}</ScrollArea>
          </Code>
        </Stack>
      </Drawer>
    </Layout>
  );
};

export default Post;
