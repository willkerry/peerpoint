import {
  Modal,
  Button,
  ActionIcon,
  ButtonProps,
  ActionIconProps,
} from "@mantine/core";
import { MouseEventHandler } from "react";

type Props = {
  isOpen: boolean;
  setClosed: () => void;
  setOpen: MouseEventHandler<HTMLButtonElement>;
  title: string;
  children: React.ReactNode;
  button: React.ReactNode;
  inline?: boolean;
  actionIcon?: boolean;
  variant?: ActionIconProps<"button">["variant"] &
    ButtonProps<"button">["variant"];
};

const InfoModal = ({
  isOpen,
  setClosed,
  setOpen,
  title,
  children,
  button,
  inline = false,
  actionIcon = false,
  variant,
}: Props) => {
  const buttonProps: ButtonProps<"button"> & ActionIconProps<"button"> = {
    variant: variant,
    onClick: setOpen,
    sx: inline && { display: "inline" },
  };

  return (
    <>
      <Modal opened={isOpen} onClose={setClosed} title={title}>
        {children}
      </Modal>
      {actionIcon ? (
        <ActionIcon {...buttonProps}>{button}</ActionIcon>
      ) : (
        <Button compact {...buttonProps}>
          {button}
        </Button>
      )}
    </>
  );
};

export default InfoModal;
