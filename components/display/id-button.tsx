import { Image, Button } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { getQrCode } from "../../utils";
import InfoModal from "./info-modal";
import { URL } from "../../lib/constants";
import { DownloadIcon } from "@primer/octicons-react";
import DisplayId from "./display-id";

const IdButton = ({ id }) => {
  const [opened, handlers] = useDisclosure(false);
  const qrCode = getQrCode(`${URL}/c/${id}`);
  return (
    <InfoModal
      isOpen={opened}
      setClosed={() => handlers.close()}
      setOpen={() => handlers.open()}
      title="Share"
      variant="default"
      button={<DisplayId id={id} />}
    >
      <Image
        src={qrCode}
        alt="QR code for this ID"
        width={300}
        height={300}
        mb={12}
        withPlaceholder
      />
      <a href={qrCode} download="qr-code.png">
        <Button rightIcon={<DownloadIcon />} variant="default">
          Download QR code
        </Button>
      </a>
    </InfoModal>
  );
};

export default IdButton;
