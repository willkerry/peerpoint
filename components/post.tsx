import {
  Badge,
  Button,
  Card,
  Code,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import ReactMarkdown from "react-markdown";
import Router from "next/router";

export type PostProps = {
  id: number;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  brief: string;
  expectedOutput: string;
  skeleton: string;
  published: boolean;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  // const authorName = post.author ? post.author.name : "Unknown author";
  const theme = useMantineTheme();
  return (
    <Card shadow="sm" p="lg">
      <Card.Section
        style={{
          backgroundColor: theme.colors.dark[8],
          height: "100px",
          overflow: "hidden",
        }}
      >
        <Code
          block
          color="dark"
          sx={(theme) => ({
            backgroundColor: theme.colors.dark[8],
            color: theme.colors.dark[0],
            userSelect: "none",
          })}
        >
          {post.skeleton}
        </Code>
      </Card.Section>
      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text weight={500}>{post.title}</Text>
        {!post.published && <Badge color="pink"></Badge>}
      </Group>

      <Text size="sm" style={{ color: theme.colors.dark[4], lineHeight: 1.5 }}>
        <ReactMarkdown>{post.brief}</ReactMarkdown>
      </Text>

      <Button
        onClick={() => Router.push("/c/[id]", `/c/${post.id}`)}
        variant="light"
        fullWidth
        mt="lg"
      >
        Run
      </Button>
    </Card>
  );
};

export default Post;
