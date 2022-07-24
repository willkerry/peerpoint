import {
  Badge,
  Button,
  Card,
  Code,
  Group,
  MANTINE_COLORS,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import Router from "next/router";
import { usefulLanguages } from "../../@types/Language";
import type { Challenge } from "@prisma/client";

const ChallengePreview: React.FC<{ post: Challenge }> = ({ post }) => {
  const theme = useMantineTheme();
  const color = MANTINE_COLORS[post.language % 14];
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
        <Badge color={color}>
          {usefulLanguages.find((l) => l.id === post.language)?.name}
        </Badge>
      </Group>
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

export default ChallengePreview;
