import {
  DefaultMantineColor,
  Loader,
  Group,
  Box,
  ThemeIcon,
} from "@mantine/core";
import { Var } from "../../display";
import { CFStatus } from "./find-challenge";
import { IconCheck, IconX } from "@tabler/icons";

type CFStatusIndicatorProps = {
  status: CFStatus;
  title?: string;
};

const FindStatus: React.FC<CFStatusIndicatorProps> = ({ status, title }) => {
  let color: DefaultMantineColor;
  let Icon: React.ReactNode;
  let message: React.ReactNode;
  switch (status) {
    case "loading":
      color = "#ffffff00";
      Icon = <Loader size={16} />;
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
      message = <></>;
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

export default FindStatus;
