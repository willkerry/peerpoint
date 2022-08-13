import { Box, Button, Image, Loader } from "@mantine/core";
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
      <Box
        sx={{
          width: 300,
          height: 300,
        }}
      >
        <Image
          src={qrCode}
          height={300}
          width={300}
          alt="QR code for this ID"
          mb={12}
          withPlaceholder
          placeholder={
            <Box sx={{ position: "relative" }}>
              <IconQrcode size={32} style={{ position: "absolute" }} />
              <Loader size="lg" sx={{ position: "absolute" }} />
            </Box>
          }
        />
      </Box>
      <a href={qrCode} download="qr-code.png">
        <Button rightIcon={<IconDownload size={16} />} variant="default">
          Download QR code
        </Button>
      </a>
    </>
  );

  return (
    <Button
      compact
      variant="default"
      onClick={() =>
        openModal({
          title,
          children,
        })
      }
    >
      <DisplayId id={id} />
    </Button>
  );
};

export default IdButton;
