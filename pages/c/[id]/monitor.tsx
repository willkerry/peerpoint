import {
  RingProgress,
  Title,
  Text,
  Group,
  Stack,
  NativeSelect,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import IdButton from "../../../components/display/id-button";
import { Layout, Meta } from "../../../components/layout";
import fetchMonitoring from "../../../lib/fetchers/fetch-monitoring";
import { TextInput } from "@mantine/core";
import DisplayId from "../../../components/display/display-id";
import { Var } from "../../../components/display/variable";
import { BugIcon } from "@primer/octicons-react";

const Monitor = () => {
  const router = useRouter();
  const { id } = router.query;
  const [period, setPeriod] = useState({ value: "15", label: "15 minutes" });
  const { data } = useSWR({ id, period: period.value }, fetchMonitoring);

  const periods = [
    { label: "1 minute", value: "1" },
    { label: "15 minutes", value: "15" },
    { label: "1 hour", value: "60" },
    { label: "7 days", value: "10080" },
  ];

  const label = (
    <Text
      weight={250}
      color="dimmed"
      align="center"
      sx={{
        fontVariantNumeric: "diagonal-fractions",
        fontSize: "4em",
      }}
    >
      {data?.successfulStudents}/{data?.activeStudents}
    </Text>
  );

  const empty = (
    <Stack align="center">
      <BugIcon size={24} />
      <Text color="dimmed">No data available</Text>
    </Stack>
  );

  return (
    <Layout>
      <Meta title="Monitor" />
      <Group position="apart" mb={12}>
        <Title order={3}>Monitoring</Title>
        <IdButton id={id} />
      </Group>
      <Stack>
        <TextInput label="Challenge title" value={data?.title} disabled />
        <NativeSelect
          label="Period"
          description="Include historical data from this period"
          data={periods}
          value={period.value}
          onChange={(event) =>
            setPeriod({
              value: event.target.value,
              label: event.target.selectedOptions[0].text,
            })
          }
        />
        <Stack align="center">
          <RingProgress
            size={320}
            sections={[
              {
                value: data?.successRate ? data.successRate : 0,
                color: "green",
              },
            ]}
            roundCaps
            thickness={20}
            label={data?.successRate ? label : empty}
          />
          <Text>
            <Var>{data?.activeStudents?.toLocaleString()}</Var>{" "}
            {data?.activeStudents > 1 ? "students have" : "student has"}{" "}
            attemped challenge <DisplayId id={id} /> in the last{" "}
            <Var>{period.label}</Var>, of whom{" "}
            <Var>{data?.successfulStudents?.toLocaleString()}</Var>{" "}
            {data?.successfulStudents > 1 ? "have" : "has"} submitted a correct
            solution.
          </Text>
        </Stack>
      </Stack>
    </Layout>
  );
};
export default Monitor;
