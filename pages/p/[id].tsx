import React, { useState } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { SubmissionResponse } from "../../@types/Submission";
import {
  Button,
  Title,
  TypographyStylesProvider,
  Group,
  Textarea,
  Stack,
} from "@mantine/core";

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
  // const [stdout, setStdout] = useState("");
  const [output, setOutput] = useState<SubmissionResponse>();

  const { data: session, status } = useSession();
  if (status === "loading") {
    return <div>Authenticating ...</div>;
  }
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
      <Stack>
        <Title order={2}>{title}</Title>
        <TypographyStylesProvider>
          <ReactMarkdown children={props.brief} skipHtml={true} />
        </TypographyStylesProvider>
        <Textarea
          autosize
          disabled
          label="Expected output"
          value={props.expectedOutput}
          styles={(theme) => ({
            input: {
              "&:disabled": {
                backgroundColor: theme.colors.gray[9],
                color: theme.colors.gray[1],
                fontFamily: theme.fontFamilyMonospace,
              },
            },
          })}
        />

        <Textarea
          autosize
          label="Code editor"
          value={userCode}
          onChange={(e) => setUserCode(e.target.value)}
          styles={(theme) => ({
            input: {
              backgroundColor: theme.colors.gray[9],
              color: theme.colors.gray[1],
              fontFamily: theme.fontFamilyMonospace,
            },
          })}
        />
        <Group>
          <Button loading={isSubmitting} onClick={() => handleRun()}>
            Run
          </Button>
          {!props.published && userHasValidSession && postBelongsToUser && (
            <Button onClick={() => publishPost(props.id)}>Publish</Button>
          )}
          {userHasValidSession && postBelongsToUser && (
            <Button color="red" onClick={() => handleDelete()}>
              Delete
            </Button>
          )}
        </Group>
        <Textarea
          autosize
          label="Output"
          value={output?.stdout || output?.stderr}
          error={output?.status?.id > 3}
          styles={(theme) => ({
            input: {
              backgroundColor: theme.colors.gray[9],
              color: theme.colors.gray[1],
              fontFamily: theme.fontFamilyMonospace,
            },
          })}
        />
      </Stack>
    </Layout>
  );
};

export default Post;
