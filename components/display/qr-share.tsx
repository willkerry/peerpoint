import { Box, Button, Image, Paper } from "@mantine/core";
import { openModal } from "@mantine/modals";

import { Challenge } from "@prisma/client";
import { IconDownload, IconQrcode } from "@tabler/icons";
import { URL } from "lib/constants";
import { getQrCode } from "utils";

type Props = {
  id: Challenge["id"];
};

export const getChallengeQrCode = (id: Challenge["id"]) =>
  getQrCode(`${URL}/c/${id}`);

const QRShare: React.FC<Props> = ({ id }) => {
  const qrCode = getChallengeQrCode(id);
  return (
    <>
      <Paper
        sx={{
          width: "100%",
          height: 320,
          display: "flex",
          alignItems: "center",
        }}
        withBorder
        mb={12}
      >
        <Image
          data-testid="qr-code"
          src={qrCode}
          height={300}
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
      <a href={qrCode} download="qr-code.png">
        <Button
          data-testid="qr-download-button"
          rightIcon={<IconDownload size={16} />}
          variant="default"
        >
          Download QR code
        </Button>
      </a>
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
