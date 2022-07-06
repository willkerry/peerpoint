import React, { useState } from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/layout";
import Router from "next/router";
import { PostProps } from "../../components/post";
import { languages } from "../../@types/Language";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
import { SubmissionResponse } from "../../@types/Submission";
import {
  Button,
  Title,
  TypographyStylesProvider,
  Group,
  Textarea,
  Tabs,
  Stack,
  Text,
  NativeSelect,
  ActionIcon,
  Alert,
  Code,
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
  const [output, setOutput] = useState<SubmissionResponse>();
  const [activeTab, setActiveTab] = useState(1);

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

  const onChange = (active: number, tabKey: string) => {
    setActiveTab(active);
    console.log("tabKey", tabKey);
  };

  async function handleRun(): Promise<void> {
    setIsSubmitting(true);
    const data = await runUserCode(props.id, language, userCode);
    console.log(data);
    setOutput(data);
    setActiveTab(2);
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
        <Group position="apart">
          <Title order={3}>{title}</Title>
        </Group>
        <Tabs active={activeTab} onTabChange={onChange} grow>
          <Tabs.Tab label="Brief" tabKey="brief">
            <Stack>
              <TypographyStylesProvider>
                <ReactMarkdown skipHtml={true}>{props.brief}</ReactMarkdown>
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
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab label="Editor" tabKey="editor">
            <Stack>
              <Group position="right">
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
              <Textarea
                autosize
                label="Code editor"
                value={userCode}
                onChange={(e) => setUserCode(e.target.value)}
                disabled={isSubmitting}
                styles={(theme) => ({
                  input: {
                    backgroundColor: theme.colors.gray[9],
                    color: theme.colors.gray[1],
                    fontFamily: theme.fontFamilyMonospace,
                  },
                })}
              />
              <Group>
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
              </Group>
            </Stack>
          </Tabs.Tab>
          <Tabs.Tab label="Output" tabKey="output">
            <Stack>
              {/* <Text >Status:</Text>
              <Text>{output?.status?.description}</Text> */}
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
            </Stack>
          </Tabs.Tab>
        </Tabs>
      </Stack>
    </Layout>
  );
};

export default Post;
