import { NativeSelect, Skeleton, Stack, Tabs, Text } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { IconChartBar, IconChartDonut } from "@tabler/icons";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import prettyMilliseconds from "pretty-ms";
import { useState } from "react";
import useSWR from "swr";

import { DisplayId, Var } from "../../../components/display";
import { SubmissionFeed } from "../../../components/display/monitor";
import { Layout, TitleGroup } from "../../../components/layout";
import fetchMonitoring from "../../../lib/fetchers/fetch-monitoring";

const Pie = dynamic(
  () => import("../../../components/display/monitor/charts/pie"),
  { suspense: true }
);

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
      <TitleGroup title={data?.title} id={String(id)} area="Monitoring" />

      <Stack>
        <NativeSelect
          label="Period"
          description="Include historical data from this period"
          data={periods}
          value={period}
          onChange={(event) => setPeriod(Number(event.target.value))}
        />

        <SubmissionFeed attempts={data?.attempts} />

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
            {/* <Bar {...{ loading, data }} /> */}
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
