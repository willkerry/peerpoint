import { Modal, ActionIcon } from "@mantine/core";

type Props = {
  isOpen: boolean;
  setClosed: () => void;
  setOpen: () => void;
  title: string;
  children: React.ReactNode;
  icon: React.ReactNode;
};

const InfoModal = ({
  isOpen,
  setClosed,
  setOpen,
  title,
  children,
  icon,
}: Props) => (
  <>
    <Modal opened={isOpen} onClose={setClosed} title={title}>
      {children}
    </Modal>

    <ActionIcon onClick={setOpen}>{icon}</ActionIcon>
  </>
);

export default InfoModal;
