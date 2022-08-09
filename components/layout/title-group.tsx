import { Box, Group, Skeleton, Text, Title } from "@mantine/core";

import { IdButton } from "../display";

type TitleGroupProps = {
  title: string;
  id?: string;
  area: string;
};

const TitleGroup: React.FC<TitleGroupProps> = ({ title, area, id }) => (
  <Box>
    <Text weight={500} color="dimmed">
      {area}
    </Text>
    <Group position="apart" mb={12} noWrap>
      <Skeleton visible={!title} sx={{ minHeight: 35 }}>
        {/* If title is 20+ chars and there's an ID, reduce to order 3.  */}
        <Title order={title?.length >= 20 && id ? 3 : 2}>{title}</Title>
      </Skeleton>

      {id ? <IdButton {...{ id }} /> : null}
    </Group>
  </Box>
);

export default TitleGroup;
