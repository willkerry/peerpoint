import { Button, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { Dispatch, SetStateAction } from "react";

const FormFrame: React.FC<{
  src: string;
  setSrc: Dispatch<SetStateAction<string>>;
}> = ({ src, setSrc }) => (
  <>
    <iframe
      width="100%"
      height="100ch"
      src={src}
      frameBorder={0}
      marginWidth={0}
      marginHeight={0}
      style={{
        border: "none",
        maxWidth: "100%",
        maxHeight: "100vh",
        minHeight: "calc(100vh - 100px)",
        position: "fixed",
        top: 50,
        left: 0,
      }}
      allowFullScreen
    ></iframe>
    <Button.Group
      sx={{
        position: "fixed",
        top: 50,
        right: 5,
        zIndex: 1,
      }}
      m="xs"
    >
      <Button
        onClick={() =>
          openConfirmModal({
            title: "Are you sure you want to close the form?",
            children: (
              <Text size="sm">
                Depending on your browser’s privacy settings, your progress may
                not be saved.
              </Text>
            ),
            labels: {
              confirm: "Close form",
              cancel: "Cancel",
            },
            confirmProps: { color: "red" },
            onConfirm: () => {
              setSrc("");
            },
          })
        }
        variant="default"
        compact
      >
        Close
      </Button>

      <Button
        variant="default"
        compact
        onClick={() =>
          openConfirmModal({
            title: "Open in Microsoft Forms?",
            children: (
              <Text size="sm">
                You will be redirected to Microsoft Forms. Depending on your
                browser’s privacy settings, your progress may not be saved.
              </Text>
            ),
            labels: {
              confirm: "Continue to Microsoft Forms",
              cancel: "Cancel",
            },
            onConfirm: () => {
              window.location.href = src;
            },
            confirmProps: { color: "indigo" },
          })
        }
      >
        Fullscreen
      </Button>
    </Button.Group>
  </>
);

export default FormFrame;
