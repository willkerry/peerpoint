import { Box, Text, Group, Title, Skeleton } from "@mantine/core";
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
    <Group position="apart" mb={12}>
      <Skeleton visible={!title} width="75%" height={35}>
        <Title order={2}>{title}</Title>
      </Skeleton>

      {id ? <IdButton {...{ id }} /> : null}
    </Group>
  </Box>
);

export default TitleGroup;
