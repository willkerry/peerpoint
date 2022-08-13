import {
  Center,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import { IconTrafficCone } from "@tabler/icons";

import { FindChallenge } from "../inputs";

type EmptyStateProps = {
  title?: string;
  description?: string;
};

const EmptyState: React.FC<EmptyStateProps> = ({
  title,
  description,
}: EmptyStateProps) => {
  const theme = useMantineTheme();
  return (
    <Stack
      my={64}
      spacing="sm"
      sx={{ maxWidth: theme.breakpoints.xs }}
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
          {title}
        </Title>
      </Center>
      <Center>
        <Text color="dimmed">{description}</Text>
      </Center>
      <Space h="xl" />
      <FindChallenge />
    </Stack>
  );
};

EmptyState.defaultProps = {
  title: "No challenges found",
  description: "Have a look for another one.",
};

export default EmptyState;
