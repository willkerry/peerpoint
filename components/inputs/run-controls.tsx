import { Dispatch, SetStateAction, Suspense } from "react";

import dynamic from "next/dynamic";

import {
  ActionIcon,
  Button,
  Divider,
  Group,
  Paper,
  Tooltip,
} from "@mantine/core";

import { Challenge } from "@prisma/client";
import { IconHistory } from "@tabler/icons";

import {
  deleteHandler,
  editHandler,
} from "../../utils/form-handlers/run-form-handlers";

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
}: RunControlsProps) => {
  const handleDelete = deleteHandler(data);
  const handleEdit = editHandler(data);

  return (
    <Paper
      withBorder
      p={3}
      sx={{
        position: "fixed",
        bottom: 6,
        right: 6,
        zIndex: 1,
      }}
    >
      <Group spacing={6} ml={4}>
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

        {/* Enable previous output button once there is previous output. */}
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
  );
};

export default RunControls;
