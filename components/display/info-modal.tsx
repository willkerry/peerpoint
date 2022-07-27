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
  variant?: ActionIconProps["variant"] & ButtonProps["variant"];
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
  const buttonProps: ButtonProps & ActionIconProps = {
    variant: variant,
    sx: inline && { display: "inline" },
  };

  return (
    <>
      <Modal opened={isOpen} onClose={setClosed} title={title}>
        {children}
      </Modal>
      {actionIcon ? (
        <ActionIcon onClick={setOpen} {...buttonProps}>
          {button}
        </ActionIcon>
      ) : (
        <Button onClick={setOpen} compact {...buttonProps}>
          {button}
        </Button>
      )}
    </>
  );
};

export default InfoModal;
