import Router from "next/router";

import {
  Button,
  Card,
  Code,
  Group,
  Image,
  Text,
  Tooltip,
  UnstyledButton,
  useMantineTheme,
} from "@mantine/core";
import { useHover } from "@mantine/hooks";

import type { Challenge } from "@prisma/client";

import {
  deleteHandler,
  editHandler,
} from "../../utils/form-handlers/run-form-handlers";
import AdminControls from "../inputs/admin-controls";
import LanguageIndicator from "./language-indicator";
import { getChallengeQrCode, openQRModal } from "./qr-share";

type ChallengePreviewProps = {
  challenge: Challenge;
  userOwns?: boolean;
};

const ChallengePreview: React.FC<ChallengePreviewProps> = ({
  challenge,
  userOwns,
}: ChallengePreviewProps) => {
  const theme = useMantineTheme();

  const { hovered, ref } = useHover();

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
    <Card shadow="sm" p="lg" withBorder>
      {/* Code Preview */}
      <Card.Section ref={ref} sx={{ height: "100px", overflow: "hidden" }}>
        {userOwns && hovered && (
          <UnstyledButton
            sx={{
              width: "100%",
              height: 100,
              backgroundColor: "#000",
            }}
            title="Download QR Code"
            onClick={() => openQRModal(challenge.id)}
          >
            <Image
              height={80}
              width="100%"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                filter: "invert(100%)",
              }}
              alt="QR code"
              src={getChallengeQrCode(challenge.id)}
              withPlaceholder
              placeholder="Loading..."
            />
          </UnstyledButton>
        )}
        <Code
          block
          color="dark"
          sx={{
            color: theme.colors.dark[2],
            fontSize: theme.fontSizes.xs,
            userSelect: "none",
            overflow: "hidden",
            height: "100%",
            borderRadius: 0,
            opacity: userOwns && hovered ? 0 : 1,
          }}
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
      <Group mt="lg" position="apart" spacing={4} noWrap>
        {controls}
      </Group>
    </Card>
  );
};

ChallengePreview.defaultProps = {
  userOwns: false,
};

export default ChallengePreview;
