import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { NextLink } from "@mantine/next";

import { Challenge } from "@prisma/client";
import {
  IconEdit,
  IconHeartRateMonitor,
  IconQrcode,
  IconTrash,
} from "@tabler/icons";

import { openQRModal } from "components/display/qr-share";

type AdminControlsProps = {
  handleDelete: () => void;
  handleEdit: () => void;
  id: Challenge["id"];
  disabled?: boolean;
};

const AdminControls: React.FC<AdminControlsProps> = ({
  id,
  disabled,
  handleDelete,
  handleEdit,
}: AdminControlsProps) => (
  <Group spacing={4}>
    <Tooltip label="Delete...">
      <ActionIcon
        color="red"
        variant="light"
        onClick={handleDelete}
        {...{ disabled }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>

    <Tooltip label="Edit...">
      <ActionIcon
        variant="light"
        color="blue"
        onClick={handleEdit}
        {...{ disabled }}
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
    <Tooltip label="Monitor">
      <div>
        <ActionIcon
          component={NextLink}
          href={`../c/${id}/monitor`}
          variant="light"
          color="green"
        >
          <IconHeartRateMonitor size={16} />
        </ActionIcon>
      </div>
    </Tooltip>
    <Tooltip label="Share">
      <div>
        <ActionIcon
          onClick={() => openQRModal(id)}
          variant="light"
          color="gray"
        >
          <IconQrcode size={16} />
        </ActionIcon>
      </div>
    </Tooltip>
  </Group>
);

AdminControls.defaultProps = {
  disabled: false,
};

export default AdminControls;
