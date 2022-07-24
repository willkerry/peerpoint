import { Modal, ActionIcon } from "@mantine/core";

type Props = {
  isOpen: boolean;
  setClosed: () => void;
  setOpen: () => void;
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
  inline?: boolean;
};

const InfoModal = ({
  isOpen,
  setClosed,
  setOpen,
  title,
  children,
  icon,
  inline = false,
}: Props) => (
  <>
    <Modal opened={isOpen} onClose={setClosed} title={title}>
      {children}
    </Modal>

    <ActionIcon onClick={setOpen} sx={inline && { display: "inline" }}>
      {icon}
    </ActionIcon>
  </>
);

export default InfoModal;
