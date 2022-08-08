import { Avatar, CSSObject, Group, Text, Tooltip } from "@mantine/core";
import { languageMap } from "../../types/Language";

type LanguageIndicatorProps = {
  language: number;
  compact?: boolean;
  sx?: CSSObject;
};

const LanguageIndicator: React.FC<LanguageIndicatorProps> = ({
  language,
  compact,
  sx,
}: LanguageIndicatorProps) => {
  const l = languageMap.get(language);
  if (!l) return null;
  const avatar = (
    <Avatar src={l?.image} size="xs" alt={l?.name} color={l?.color}>
      <Text size="sm">{l?.name?.charAt(0)}</Text>
    </Avatar>
  );
  if (compact)
    return (
      <Group spacing="xs" sx={sx}>
        <Tooltip label={l?.name} position="left">
          {avatar}
        </Tooltip>
      </Group>
    );
  return (
    <Group spacing="xs" sx={sx}>
      {avatar}
      {l?.name}
    </Group>
  );
};

export default LanguageIndicator;
