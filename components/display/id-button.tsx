import { Button } from "@mantine/core";

import { IconQrcode } from "@tabler/icons";

import DisplayId, { DisplayIDProps } from "./display-id";
import { openQRModal } from "./qr-share";

const IdButton: React.FC<DisplayIDProps> = ({ id }: DisplayIDProps) => (
  <Button
    data-testid="id-button"
    compact
    variant="default"
    onClick={() => openQRModal(Number(id))}
    leftIcon={<IconQrcode size={14} />}
    styles={(theme) => ({
      root: { paddingLeft: 5 },
      leftIcon: { marginRight: 3, color: theme.colors.orange[7] },
    })}
  >
    <DisplayId id={id} />
  </Button>
);

export default IdButton;
