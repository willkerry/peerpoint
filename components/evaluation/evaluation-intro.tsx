import type { Dispatch, SetStateAction } from "react";

import {
  Button,
  Container,
  Group,
  Text,
  Tooltip,
  TypographyStylesProvider,
  useMantineTheme,
} from "@mantine/core";

import { IconZoomQuestion } from "@tabler/icons";

import { studentSrc, teacherSrc } from "../../pages/evaluation";
import { TitleGroup } from "../layout";

type Props = {
  setSrc: Dispatch<SetStateAction<string>>;
};

const EvaluationIntro: React.FC<Props> = ({ setSrc }: Props) => {
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
        <Tooltip label="Coming soon: I’m still writing it.">
          <div>
            <Button onClick={() => setSrc(teacherSrc)} disabled>
              a teacher
            </Button>
          </div>
        </Tooltip>
      </Group>
    </Container>
  );
};

export default EvaluationIntro;
