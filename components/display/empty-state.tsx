import {
  Center,
  Stack,
  Title,
  Text,
  Space,
  StackProps,
  useMantineTheme,
  Container,
} from "@mantine/core";
import { IconTrafficCone } from "@tabler/icons";
import { FindChallenge } from "../inputs";

const EmptyState: React.FC = (
  props: StackProps & React.RefAttributes<HTMLDivElement>
) => {
  const theme = useMantineTheme();
  return (
    <Stack my={64} spacing="sm" {...props}>
      <Center>
        <IconTrafficCone
          size={56}
          stroke={1.5}
          color={theme.colors.orange[5]}
        />
      </Center>
      <Center>
        <Title order={1} color="">
          Challenge not found.
        </Title>
      </Center>
      <Center>
        <Text color="dimmed">Try another one.</Text>
      </Center>
      <Space h="xl" />
      <Container size="xs">
        <FindChallenge />
      </Container>
    </Stack>
  );
};

export default EmptyState;
