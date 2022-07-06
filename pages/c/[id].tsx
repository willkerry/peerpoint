import {
  Affix,
  Alert,
  Button,
  Code,
  Drawer,
  Group,
  InputWrapper,
  Loader,
  LoadingOverlay,
  NativeSelect,
  Paper,
  Skeleton,
  Stack,
  Textarea,
  Title,
} from "@mantine/core";
import type { BasicSetupOptions } from "@uiw/react-codemirror";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Router from "next/router";
import React, { useState } from "react";
import { languages } from "../../@types/Language";
import { SubmissionResponse } from "../../@types/Submission";
import Layout from "../../components/layout";
import { PostProps } from "../../components/post";
import prisma from "../../lib/prisma";

const ReactCodeMirror = dynamic(() => import("@uiw/react-codemirror"), {
  ssr: false,
  loading: () => <Skeleton height={30} radius="md" />,
});

const basicSetup: BasicSetupOptions = {
  lineNumbers: true,
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: Number(params?.id) || -1,
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });
  return {
    props: post,
  };
};

async function publishPost(id: number): Promise<void> {
  await fetch(`/api/publish/${id}`, {
    method: "PUT",
  });
  await Router.push("/");
}

async function deletePost(id: number): Promise<void> {
  await fetch(`/api/post/${id}`, {
    method: "DELETE",
  });
  await Router.push("/");
}

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

const Post: React.FC<PostProps> = (props) => {
  const [userCode, setUserCode] = useState(props.skeleton);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [language, setLanguage] = useState(63);
  const [output, setOutput] = useState<SubmissionResponse>();
  const [showOutput, setShowOutput] = useState(false);

  const { data: session, status } = useSession();

  if (status === "loading") return <Loader />;

  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === props.author?.email;
  let title = props.title;
  if (!props.published) {
    title = `${title} (Draft)`;
  }

  async function handleRun(): Promise<void> {
    setIsSubmitting(true);
    const data = await runUserCode(props.id, language, userCode);
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
      <Group position="apart">
        <Title order={3}>{title}</Title>
      </Group>
      <Stack>
        <InputWrapper label="Code editor">
          <ReactCodeMirror
            value={String(userCode)}
            onChange={(value) => setUserCode(value)}
            editable={!isSubmitting}
            basicSetup={basicSetup}
          />
        </InputWrapper>
      </Stack>
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
              <Button
                color="red"
                onClick={() => handleDelete()}
                disabled={isSubmitting}
              >
                Delete
              </Button>
            )}
            <NativeSelect
              value={language}
              onChange={(e) => setLanguage(Number(e.target.value))}
              disabled={isSubmitting}
              data={languages.map((l) => ({
                label: l.name.split(" ")[0],
                value: String(l.id),
              }))}
            />
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
      >
        {output?.status?.id > 3 && (
          <Alert title={output?.status?.description} color="red">
            {output?.message || <Code>{output?.compile_output}</Code> ||
              "No message"}
          </Alert>
        )}
        {output?.status?.id <= 3 && (
          <Alert title={output?.status?.description} color="green">
            {output?.message || "That’s the correct output."}
          </Alert>
        )}
        <Textarea
          autosize
          readOnly
          label="Output"
          value={output?.stdout || output?.stderr}
          error={output?.status?.id > 3}
          disabled={isSubmitting}
          styles={(theme) => ({
            input: {
              backgroundColor: theme.colors.gray[9],
              color: theme.colors.gray[1],
              fontFamily: theme.fontFamilyMonospace,
            },
          })}
        />
      </Drawer>
    </Layout>
  );
};

export default Post;
