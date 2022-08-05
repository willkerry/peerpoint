import { Group, Tooltip, ActionIcon } from "@mantine/core";
import { IconTrash, IconEdit, IconHeartRateMonitor } from "@tabler/icons";
import { NextLink } from "@mantine/next";
import { Challenge } from "@prisma/client";

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
}) => {
  return (
    <Group spacing={8}>
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
};

export default AdminControls;
