import React from "react";
import { GetServerSideProps } from "next";
import ReactMarkdown from "react-markdown";
import Layout from "../../components/Layout";
import Router from "next/router";
import { PostProps } from "../../components/Post";
import prisma from "../../lib/prisma";
import { useSession } from "next-auth/react";
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

const Post: React.FC<PostProps> = (props) => {
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

  return (
    <Layout>
      <Stack>
        <Title order={2}>{title}</Title>
        <TypographyStylesProvider>
          <ReactMarkdown children={props.content} skipHtml={true} />
        </TypographyStylesProvider>
        <Textarea
          autosize
          disabled
          label="Expected output"
          value="Hello World!"
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
          styles={(theme) => ({
            input: {
              backgroundColor: theme.colors.gray[9],
              color: theme.colors.gray[1],
              fontFamily: theme.fontFamilyMonospace,
            },
          })}
        />
        <Group>
          <Button>Run</Button>
          {!props.published && userHasValidSession && postBelongsToUser && (
            <Button onClick={() => publishPost(props.id)}>Publish</Button>
          )}
          {userHasValidSession && postBelongsToUser && (
            <Button color="red" onClick={() => deletePost(props.id)}>
              Delete
            </Button>
          )}
        </Group>
      </Stack>
    </Layout>
  );
};

export default Post;
