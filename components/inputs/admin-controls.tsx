import { ActionIcon, Group, Tooltip } from "@mantine/core";
import { NextLink } from "@mantine/next";

import { Challenge } from "@prisma/client";
import { IconEdit, IconHeartRateMonitor, IconTrash } from "@tabler/icons";

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
  <Group spacing={6}>
    <Tooltip label="Delete challenge">
      <ActionIcon
        color="red"
        variant="light"
        onClick={handleDelete}
        {...{ disabled }}
      >
        <IconTrash size={16} />
      </ActionIcon>
    </Tooltip>

    <Tooltip label="Edit challenge">
      <ActionIcon
        variant="light"
        color="blue"
        onClick={handleEdit}
        {...{ disabled }}
      >
        <IconEdit size={16} />
      </ActionIcon>
    </Tooltip>
    <Tooltip label="Monitor responses">
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
  </Group>
);

AdminControls.defaultProps = {
  disabled: false,
};

export default AdminControls;
