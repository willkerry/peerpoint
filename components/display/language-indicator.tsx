import { Avatar, Group, Text, Tooltip } from "@mantine/core";
import { languageMap } from "../../@types/Language";

const LanguageIndicator = ({
  language,
  compact,
}: {
  language: number;
  compact?: boolean;
}) => {
  const l = languageMap.get(language);
  const avatar = (
    <Avatar src={l?.image} size="xs" alt={l?.name} color={l?.color}>
      <Text size="sm">{l?.name?.charAt(0)}</Text>
    </Avatar>
  );
  if (compact)
    return (
      <Group spacing="xs">
        <Tooltip label={l?.name}>{avatar}</Tooltip>
      </Group>
    );
  return (
    <Group spacing="xs">
      {avatar}
      {l?.name}
    </Group>
  );
};

export default LanguageIndicator;
