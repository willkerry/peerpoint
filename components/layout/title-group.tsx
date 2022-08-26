import { Group, Skeleton, Stack, Text, Title, TitleOrder } from "@mantine/core";

import IdButton from "../display/id-button";

type TitleGroupProps = {
  title: string;
  id?: number;
  area: string;
  compact?: boolean;
};

const TitleGroup: React.FC<TitleGroupProps> = ({
  title,
  area,
  id,
  compact,
}: TitleGroupProps) => {
  let titleOrder = 2;
  if (compact) titleOrder += 1;
  if (title?.length > 20) titleOrder += 1;
  if (title?.length > 30) titleOrder += 1;
  return (
    <Stack spacing={2}>
      <Text weight={500} color="dimmed">
        {area}
      </Text>

      <Group noWrap position="apart">
        <Skeleton visible={!title} sx={{ minHeight: 27 }}>
          <Title order={titleOrder as TitleOrder} data-testid="page-title">
            {title}
          </Title>
        </Skeleton>

        <Skeleton
          visible={!id}
          sx={{ minHeight: 27, textAlign: "right" }}
          width={120}
        >
          <IdButton {...{ id }} />
        </Skeleton>
      </Group>
    </Stack>
  );
};

TitleGroup.defaultProps = {
  compact: false,
  id: undefined,
};

export default TitleGroup;
