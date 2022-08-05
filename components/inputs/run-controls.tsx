import {
  Affix,
  Paper,
  Group,
  Tooltip,
  ActionIcon,
  Button,
  Divider,
} from "@mantine/core";
import { Challenge } from "@prisma/client";
import { IconHistory } from "@tabler/icons";
import { Dispatch, SetStateAction, Suspense } from "react";
import { deleteHandler, editHandler } from "../../utils/run/handlers";
import dynamic from "next/dynamic";
const AdminControls = dynamic(() => import("./admin-controls"), {
  ssr: false,
  suspense: true,
});

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
}) => {
  const handleDelete = deleteHandler(data);
  const handleEdit = editHandler(data);

  return (
    <Affix zIndex={1} position={{ bottom: 10, right: 10 }}>
      <Paper withBorder p={7}>
        <Group spacing={8}>
          {/* Show admin controls if user owns this challenge. */}
          <Suspense fallback={null}>
            {privileged && (
              <>
                <AdminControls
                  id={data.id}
                  disabled={isSubmitting}
                  {...{ handleDelete, handleEdit }}
                />
                <Divider sx={{ height: "36px" }} orientation="vertical" />
              </>
            )}
          </Suspense>

          {/* Enable previous output button once there is previous output.*/}
          <Tooltip label="Review output">
            <ActionIcon
              disabled={!hasOutput}
              variant="default"
              onClick={() => setShowResult(true)}
            >
              <IconHistory size={16} />
            </ActionIcon>
          </Tooltip>

          {/* Send execution request. */}
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
