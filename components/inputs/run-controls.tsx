import {
  Affix,
  Paper,
  Group,
  Tooltip,
  ActionIcon,
  Divider,
  Button,
} from "@mantine/core";
import { Challenge } from "@prisma/client";
import {
  IconEdit,
  IconHeartRateMonitor,
  IconHistory,
  IconTrash,
} from "@tabler/icons";
import Link from "next/link";
import { AnchorHTMLAttributes, Dispatch, SetStateAction } from "react";
import { deleteHandler, editHandler } from "../../utils/run/handlers";

type RunControlsProps = {
  privileged: boolean;
  isSubmitting: boolean;
  data: Challenge;
  hasOutput: boolean;
  setShowResult: Dispatch<SetStateAction<boolean>>;
  disabled: boolean;
};

const RunControls: React.FC<RunControlsProps> = ({
  privileged,
  isSubmitting,
  data,
  hasOutput,
  setShowResult,
  disabled,
}: RunControlsProps) => {
  const handleDelete = deleteHandler(data);
  const handleEdit = editHandler(data);

  return (
    <Affix zIndex={1} position={{ bottom: 10, right: 10 }}>
      <Paper withBorder p={7}>
        <Group spacing={8}>
          {privileged && (
            <Group spacing={8}>
              <Tooltip label="Delete challenge">
                <ActionIcon
                  color="red"
                  variant="light"
                  onClick={() => handleDelete()}
                  disabled={isSubmitting}
                >
                  <IconTrash size={16} />
                </ActionIcon>
              </Tooltip>

              <Tooltip label="Edit challenge">
                <ActionIcon
                  variant="light"
                  color="blue"
                  disabled={isSubmitting}
                  onClick={handleEdit}
                >
                  <IconEdit size={16} />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Monitor responses">
                <div>
                  <Link href={`${data?.id}/monitor`}>
                    <ActionIcon<AnchorHTMLAttributes<HTMLAnchorElement>>
                      variant="light"
                      color="green"
                      component="a"
                    >
                      <IconHeartRateMonitor size={16} />
                    </ActionIcon>
                  </Link>
                </div>
              </Tooltip>
              <Divider sx={{ height: "36px" }} orientation="vertical" />
            </Group>
          )}

          <Tooltip label="Review output">
            <ActionIcon
              disabled={!hasOutput}
              variant="default"
              onClick={() => setShowResult(true)}
            >
              <IconHistory size={16} />
            </ActionIcon>
          </Tooltip>

          <Button
            type="submit"
            form="exec"
            loading={isSubmitting}
            {...{ disabled }}
          >
            Run
          </Button>
        </Group>
      </Paper>
    </Affix>
  );
};

export default RunControls;
