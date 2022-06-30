import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";
import {
  Card,
  Group,
  Text,
  Badge,
  Button,
  useMantineTheme,
} from "@mantine/core";

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
  const authorName = post.author ? post.author.name : "Unknown author";
  const theme = useMantineTheme();
  return (
    <Card shadow="sm" p="lg">
      <Card.Section
        style={{
          backgroundColor: theme.colors.gray[8],
          height: "100px",
        }}
      ></Card.Section>

      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
      >
        <Text weight={500}>{post.title}</Text>
        <Badge color="pink" variant="light">
          On Sale
        </Badge>
      </Group>

      <Text size="sm" style={{ color: theme.colors.dark[4], lineHeight: 1.5 }}>
        <ReactMarkdown children={post.brief} />
      </Text>

      <Button
        onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        variant="light"
        fullWidth
        mt="lg"
      >
        Edit
      </Button>

      {/* <small>By {authorName}</small> */}
    </Card>
  );
};

export default Post;
