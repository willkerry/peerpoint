import {
  Center,
  Stack,
  Title,
  Text,
  Space,
  useMantineTheme,
} from "@mantine/core";
import { IconTrafficCone } from "@tabler/icons";
import { FindChallenge } from "../inputs";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

const defaultProps: EmptyStateProps = {
  title: "No challenges found",
  description: "Have a look for another one.",
};

const EmptyState: React.FC<EmptyStateProps> = (
  props: EmptyStateProps = defaultProps
) => {
  const theme = useMantineTheme();
  return (
    <Stack
      my={64}
      spacing="sm"
      sx={(theme) => ({ maxWidth: theme.breakpoints.xs })}
      mx="auto"
    >
      <Center>
        <IconTrafficCone
          size={56}
          stroke={1.5}
          color={theme.colors.orange[5]}
        />
      </Center>
      <Center>
        <Title order={1} color="">
          {props.title}
        </Title>
      </Center>
      <Center>
        <Text color="dimmed">{props.description}</Text>
      </Center>
      <Space h="xl" />
      <FindChallenge />
    </Stack>
  );
};

export default EmptyState;
