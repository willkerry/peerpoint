import { Button, Container, Group, Paper, Text, TypographyStylesProvider, useMantineTheme } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { IconZoomQuestion } from "@tabler/icons";
import { Dispatch, SetStateAction, useState } from "react";

import { Layout, TitleGroup } from "../components/layout";

const studentSrc =
  "https://forms.office.com/Pages/ResponsePage.aspx?id=z8oksN7eQUKhXDyX1VPp83qfg2kEy-pMp66634QBRXVUMjRORVRNSjVERVM5SUdJNlM0WVNBRVVWWC4u&embed=true";

const teacherSrc = "/";

const Intro: React.FC<{ setSrc: Dispatch<SetStateAction<string>> }> = ({
  setSrc,
}) => {
  const theme = useMantineTheme();
  return (
    <Container size="sm" mt="xl">
      <IconZoomQuestion
        size={100}
        stroke={1.5}
        color={theme.colors.orange[7]}
      />
      <TitleGroup
        title="Can you answer a few questions?"
        area="Thank you for participating"
      />
      <TypographyStylesProvider my="xl">
        <p>
          I’m grateful for your help but before you go, would you mind
          reflecting on your experience with Peerpoint in a brief questionnaire?
        </p>
      </TypographyStylesProvider>

      <Text>I used Peerpoint as:</Text>
      <Group my="xl">
        <Button onClick={() => setSrc(studentSrc)}>a student</Button>
        <Button onClick={() => setSrc(teacherSrc)} disabled>
          a teacher
        </Button>
      </Group>
    </Container>
  );
};

const FormIframe: React.FC<{
  src: string;
  setSrc: Dispatch<SetStateAction<string>>;
}> = ({ src, setSrc }) => (
  <Paper>
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
        position: "relative",
      }}
      allowFullScreen
    ></iframe>
    <Button.Group
      sx={{ position: "absolute", top: 0, right: 0, zIndex: 1 }}
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
  </Paper>
);

const Evaluation = () => {
  const [src, setSrc] = useState("");

  return (
    <Layout title="Evaluation">
      {src ? <FormIframe {...{ src, setSrc }} /> : <Intro {...{ setSrc }} />}
    </Layout>
  );
};

export default Evaluation;
