import {
  ActionIcon,
  Box,
  Button,
  CopyButton,
  Group,
  Image,
  Paper,
  Stack,
  TextInput,
} from "@mantine/core";
import { openModal } from "@mantine/modals";

import { Challenge } from "@prisma/client";
import {
  IconClipboardCheck,
  IconCopy,
  IconDownload,
  IconQrcode,
} from "@tabler/icons";
import { URL } from "lib/constants";
import { getQrCode } from "utils";

type Props = {
  id: Challenge["id"];
};

export const getChallengeQrCode = (id: Challenge["id"], size?: number) =>
  getQrCode(`${URL}/c/${id}`, size);

const QRShare: React.FC<Props> = ({ id }) => {
  const qrCode = getChallengeQrCode(id, 480);
  const challengeUrl = `${URL}/c/${id}`;
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: 300,
          display: "flex",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
        withBorder
        mb={12}
      >
        <Image
          data-testid="qr-code"
          src={qrCode}
          height={240}
          width="100%"
          fit="contain"
          alt="QR code for this ID"
          withPlaceholder
          placeholder={
            <Box sx={{ position: "relative" }}>
              <IconQrcode size={32} style={{ position: "absolute" }} />
            </Box>
          }
        />
      </Paper>
      <Stack>
        <a href={qrCode} download="qr-code.png">
          <Button
            data-testid="qr-download-button"
            rightIcon={<IconDownload size={16} />}
            variant="default"
          >
            Download QR code
          </Button>
        </a>
        <CopyButton value={challengeUrl}>
          {({ copied, copy }) => (
            <Group spacing="xs">
              <TextInput
                value={challengeUrl}
                readOnly
                onClick={copy}
                sx={{ minWidth: 240 }}
              />

              <ActionIcon
                color={copied ? "green" : "orange"}
                size="lg"
                variant="filled"
                onClick={copy}
              >
                {copied ? (
                  <IconClipboardCheck size={16} />
                ) : (
                  <IconCopy size={16} />
                )}
              </ActionIcon>
            </Group>
          )}
        </CopyButton>
      </Stack>
    </>
  );
};

export default QRShare;

export const openQRModal = (id: Challenge["id"]) => {
  openModal({
    title: "QR Code",
    children: <QRShare id={id} />,
  });
};
