import { Paper, Skeleton, Text, Image, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getQrCode } from "../../utils";
import InfoModal from "./info-modal";
import { URL } from "../../lib/constants";
import { DownloadIcon } from "@primer/octicons-react";

const DisplayId = ({ id }) => {
  const [opened, handlers] = useDisclosure(false);
  const qrCode = getQrCode(`${URL}/c/${id}`);
  return (
    <InfoModal
      isOpen={opened}
      setClosed={() => handlers.close()}
      setOpen={() => handlers.open()}
      title="Share this ID"
      icon={
        <Paper withBorder px={4}>
          <Skeleton visible={!id}>
            {/* <Text sx={{ display: "inline" }} weight={500} color="dimmed">
              ID{" "}
            </Text> */}
            <Text
              sx={{
                display: "inline",
                fontVariant: "tabular-nums slashed-zero",
              }}
              weight={600}
            >
              {String(id).padStart(5, "0")}
            </Text>
          </Skeleton>
        </Paper>
      }
    >
      <Image src={qrCode} alt="QR code for this ID" mb={12} />
      <a href={qrCode} download="qr-code.png">
        <Button rightIcon={<DownloadIcon />} variant="default">
          Download QR code
        </Button>
      </a>
    </InfoModal>
  );
};

export default DisplayId;
