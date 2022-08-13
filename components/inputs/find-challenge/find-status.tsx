import { Box, DefaultMantineColor, Group, ThemeIcon } from "@mantine/core";

import { IconCheck, IconLoader, IconX } from "@tabler/icons";
import { motion } from "framer-motion";

import { Var } from "../../display/variable";

type CFStatus = "idle" | "loading" | "error" | "success";

type CFStatusIndicatorProps = {
  status: CFStatus;
  title?: string;
};

const FindStatus: React.FC<CFStatusIndicatorProps> = ({
  status,
  title,
}: CFStatusIndicatorProps) => {
  let color: DefaultMantineColor;
  let Icon: React.ReactNode;
  let message: React.ReactNode;
  switch (status) {
    case "loading":
      color = "orange";
      Icon = (
        <motion.div
          style={{ display: "flex" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.5,
            ease: "linear",
            loop: Infinity,
          }}
        >
          <IconLoader stroke={3} size={14} />
        </motion.div>
      );
      message = "Checking...";
      break;
    case "success":
      color = "green";
      Icon = <IconCheck stroke={3} size={14} />;
      message = (
        <>
          Found <Var ml={5}>{title}</Var>
        </>
      );
      break;
    case "error":
      color = "red";
      Icon = <IconX stroke={3} size={14} />;
      message = <>Challenge not found</>;
      break;
    default:
      color = "";
      Icon = null;
      message = "";
  }
  return (
    <Group spacing={1}>
      {Icon && (
        <ThemeIcon {...{ color }} variant="light" size="sm">
          {Icon}
        </ThemeIcon>
      )}
      <Box ml="xs">{message}</Box>
    </Group>
  );
};

FindStatus.defaultProps = {
  title: "",
};

export default FindStatus;
