import {
  Button,
  Card,
  Code,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import Router from "next/router";
import type { Challenge } from "@prisma/client";
import LanguageIndicator from "./language-indicator";

const ChallengePreview: React.FC<{ post: Challenge }> = ({ post }) => {
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
        <LanguageIndicator language={post.language} compact />
      </Group>
      <Button
        onClick={() => Router.push("/c/[id]", `/c/${post.id}`)}
        variant="default"
        fullWidth
        mt="lg"
      >
        Run
      </Button>
    </Card>
  );
};

export default ChallengePreview;
