import { Box, Button, Image, Paper } from "@mantine/core";
import { openModal } from "@mantine/modals";

import { IconDownload, IconQrcode } from "@tabler/icons";

import { URL } from "../../lib/constants";
import { getQrCode } from "../../utils";
import DisplayId, { DisplayIDProps } from "./display-id";

const IdButton: React.FC<DisplayIDProps> = ({ id }: DisplayIDProps) => {
  const qrCode = getQrCode(`${URL}/c/${id}`);
  const title = "QR Code";

  const children = (
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

  return (
    <Button
      data-testid="id-button"
      compact
      variant="default"
      onClick={() =>
        openModal({
          title,
          children,
        })
      }
      leftIcon={<IconQrcode size={14} />}
      styles={(theme) => ({
        root: { paddingLeft: 5 },
        leftIcon: { marginRight: 3, color: theme.colors.orange[7] },
      })}
    >
      <DisplayId id={id} />
    </Button>
  );
};

export default IdButton;
