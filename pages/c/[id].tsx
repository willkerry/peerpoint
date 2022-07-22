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
import { Challenge } from "@prisma/client";
import type { BasicSetupOptions } from "@uiw/react-codemirror";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { useState } from "react";
import { SubmissionResponse } from "../../@types/Submission";
import CodeEditor from "../../components/inputs/code-editor";
import Layout from "../../components/layout/layout";
import Meta from "../../components/meta";
import prisma from "../../lib/prisma";
import { deletePost, publishPost } from "../../utils";

const basicSetup: BasicSetupOptions = { lineNumbers: false };

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id: Number(params?.id) || -1 },
    include: { author: { select: { name: true, email: true } } },
  });
  return { props: JSON.parse(JSON.stringify(challenge)) };
};

async function runUserCode(
  id: number,
  language: number,
  userCode: string
): Promise<SubmissionResponse> {
  const res = await fetch(`/api/execute/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      language,
      userCode,
    }),
  });
  return res.json();
}

const Post: React.FC<
  Challenge & { author: { name: string; email: string } }
> = (props) => {
  const [userCode, setUserCode] = useState(props.skeleton);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [output, setOutput] = useState<SubmissionResponse>();
  const [showOutput, setShowOutput] = useState(false);

  const { data: session, status } = useSession();

  if (status === "loading") return <LoadingOverlay visible />;

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  async function handleRun(): Promise<void> {
    setIsSubmitting(true);
    const data = await runUserCode(props.id, props.language, userCode);
    console.log(props.language);
    console.log(data);
    setOutput(data);
    setIsSubmitting(false);
    setShowOutput(true);
  }
  async function handleDelete(): Promise<void> {
    if (confirm("Are you sure you want to delete this item?")) {
      await deletePost(props.id);
      await Router.push("/");
    }
    return;
  }
  return (
    <Layout>
      <LoadingOverlay visible={isSubmitting} />
      <Meta title={title} />
      <Title order={3} mb={12}>
        {title}
      </Title>
      <CodeEditor
        label="Code editor"
        value={String(userCode)}
        language={props.language}
        onChange={(value) => setUserCode(value)}
        editable={!isSubmitting}
        basicSetup={basicSetup}
      />
      <Affix>
        <Paper>
          <Group p="md">
            {!props.published && userHasValidSession && postBelongsToUser && (
              <Button
                onClick={() => publishPost(props.id)}
                disabled={isSubmitting}
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
                >
                  Delete
                </Button>
                <Button
                  onClick={() => handleDelete()}
                  variant="outline"
                  disabled={isSubmitting}
                >
                  Edit
                </Button>
              </>
            )}
            <Button loading={isSubmitting} onClick={() => handleRun()}>
              Run
            </Button>
          </Group>
        </Paper>
      </Affix>

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
