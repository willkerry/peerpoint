import { MouseEventHandler } from "react";

import {
  ActionIcon,
  ActionIconProps,
  Button,
  ButtonProps,
  Modal,
} from "@mantine/core";

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

const InfoModal: React.FC<Props> = ({
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
    variant,
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

InfoModal.defaultProps = {
  inline: false,
  actionIcon: false,
  variant: undefined,
};

export default InfoModal;
