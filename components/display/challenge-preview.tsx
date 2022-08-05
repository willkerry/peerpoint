import {
  Button,
  Card,
  Code,
  Tooltip,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import React from "react";
import Router from "next/router";
import type { Challenge } from "@prisma/client";
import LanguageIndicator from "./language-indicator";
import AdminControls from "../inputs/admin-controls";
import { deleteHandler, editHandler } from "../../utils/run/handlers";

type ChallengePreviewProps = {
  challenge: Challenge;
  userOwns?: boolean;
};

const ChallengePreview: React.FC<ChallengePreviewProps> = ({
  challenge,
  userOwns,
}) => {
  const theme = useMantineTheme();

  const adminControlProps: React.ComponentProps<typeof AdminControls> = {
    id: challenge.id,
    disabled: userOwns === false,
    handleDelete: deleteHandler(challenge),
    handleEdit: editHandler(challenge),
  };

  const controls = [
    <Button
      key="run"
      onClick={() => Router.push("/c/[id]", `/c/${challenge.id}`)}
      variant="default"
      fullWidth={!userOwns}
    >
      Run
    </Button>,
  ];

  if (userOwns)
    controls.unshift(<AdminControls key="admin" {...adminControlProps} />);

  return (
    <Card shadow="sm" p="lg">
      {/* Code Preview */}
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
            color: theme.colors.dark[2],
            fontSize: theme.fontSizes.xs,
            userSelect: "none",
            overflow: "hidden",
          })}
        >
          {challenge.skeleton}
        </Code>
      </Card.Section>

      {/* Title */}
      <Group
        position="apart"
        style={{ marginBottom: 5, marginTop: theme.spacing.sm }}
        noWrap
      >
        <Tooltip label={challenge.title}>
          <Text weight={500} lineClamp={1}>
            {challenge.title}
          </Text>
        </Tooltip>
        <LanguageIndicator language={challenge.language} compact />
      </Group>

      {/* Actions */}
      <Group mt="lg" position="apart">
        {controls}
      </Group>
    </Card>
  );
};

export default ChallengePreview;
