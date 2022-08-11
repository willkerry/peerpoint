import { Grid, Skeleton, Text, Title, TitleOrder } from "@mantine/core";

import { IdButton } from "../display";

type TitleGroupProps = {
  title: string;
  id?: string;
  area: string;
  compact?: boolean;
};

const TitleGroup: React.FC<TitleGroupProps> = ({
  title,
  area,
  id,
  compact,
}) => {
  let titleOrder = 2;
  if (compact) titleOrder++;
  if (title?.length > 20) titleOrder++;
  if (title?.length > 30) titleOrder++;
  return (
    <Grid gutter={0} justify="space-between">
      <Grid.Col span={12}>
        <Text weight={500} color="dimmed">
          {area}
        </Text>
      </Grid.Col>
      <Grid.Col span={9}>
        <Skeleton visible={!title} sx={{ minHeight: 20 }}>
          <Title order={titleOrder as TitleOrder}>{title}</Title>
        </Skeleton>
      </Grid.Col>
      <Grid.Col span={3} sx={{ textAlign: "right" }}>
        {id ? <IdButton {...{ id }} /> : null}
      </Grid.Col>
    </Grid>
  );
};

export default TitleGroup;
