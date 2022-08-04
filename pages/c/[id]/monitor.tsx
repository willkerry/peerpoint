import {
  Group,
  NativeSelect,
  Skeleton,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconChartBar, IconChartDonut } from "@tabler/icons";
import { useRouter } from "next/router";
import prettyMilliseconds from "pretty-ms";
import { useState } from "react";
import useSWR from "swr";
import { DisplayId, IdButton, Var } from "../../../components/display";
import { Bar, Pie } from "../../../components/display/monitor";
import { Layout } from "../../../components/layout";
import fetchMonitoring from "../../../lib/fetchers/fetch-monitoring";

const Monitor = () => {
  const router = useRouter();
  const { id } = router.query;

  const [period, setPeriod] = useState(15);

  const { data: bouncey } = useSWR({ id, period }, fetchMonitoring);

  const loading = !bouncey;
  const [data] = useDebouncedValue(bouncey, 500);

  const periods = [
    { label: "60 seconds", value: "1" },
    { label: "15 minutes", value: "15" },
    { label: "60 minutes", value: "60" },
    { label: "7 days", value: "10080" },
  ];

  return (
    <Layout loading={loading} title="Monitor">
      <Group position="apart" mb={12}>
        <Title order={3}>Monitoring</Title>
        <IdButton id={String(id)} />
      </Group>
      <Stack>
        <TextInput label="Challenge title" value={data?.title} disabled />
        <NativeSelect
          label="Period"
          description="Include historical data from this period"
          data={periods}
          value={period}
          onChange={(event) => setPeriod(Number(event.target.value))}
        />

        <Tabs variant="pills" defaultValue="pie">
          <Tabs.List grow>
            <Tabs.Tab value="bar" icon={<IconChartBar size={14} />}>
              Bar chart
            </Tabs.Tab>
            <Tabs.Tab value="pie" icon={<IconChartDonut size={14} />}>
              Doughnut chart
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="bar" pt="md">
            <Bar {...{ loading, data }} />
          </Tabs.Panel>
          <Tabs.Panel value="pie" pt="md">
            <Pie {...{ loading, data }} />
          </Tabs.Panel>
        </Tabs>

        <Skeleton visible={loading}>
          <Text>
            <Var>{data?.activeStudents?.toLocaleString()}</Var>{" "}
            {data?.activeStudents !== 1 ? "students have" : "student has"}{" "}
            attemped challenge <DisplayId id={Number(id)} /> in the last{" "}
            <Var>{prettyMilliseconds(period * 60000)}</Var>.{" "}
            {data?.activeStudents > 1 ? (
              <>
                Of those,{" "}
                <Var>{data?.successfulStudents?.toLocaleString()}</Var> have
                submitted correct solutions.
              </>
            ) : (
              data?.successfulStudents > 0 &&
              "That student has submitted a correct solution."
            )}
          </Text>
        </Skeleton>
      </Stack>
    </Layout>
  );
};
export default Monitor;
