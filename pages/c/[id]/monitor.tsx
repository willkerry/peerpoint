import {
  RingProgress,
  SegmentedControl,
  Title,
  Text,
  Skeleton,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import { Layout, Meta } from "../../../components/layout";
import fetchMonitoring from "../../../lib/fetchers/fetch-monitoring";

const Monitor = () => {
  const router = useRouter();
  const { id } = router.query;
  const [period, setPeriod] = useState(60);

  const { data } = useSWR({ id, period }, fetchMonitoring);

  return (
    <Layout>
      <Meta title="Monitor" />
      <Title>Monitoring</Title>
      <SegmentedControl
        data={[
          { label: "1 minute", value: "1" },
          { label: "15 minutes", value: "15" },
          { label: "1 week", value: "10080" },
        ]}
        value={String(period)}
        onChange={(value) => setPeriod(Number(value))}
      />

      <dl>
        <dt>Challenge</dt>
        <dd>
          {data?.title} (ID {id})
        </dd>

        <dt>Successful students</dt>
        <dd>
          {data?.activeStudents ? (
            <RingProgress
              size={240}
              sections={[
                {
                  value: data ? data.successRate : 0,
                  color: "green",
                },
              ]}
              label={
                <Skeleton visible={!data}>
                  <Text
                    size="xl"
                    weight={500}
                    align="center"
                    sx={{ fontVariantNumeric: "diagonal-fractions" }}
                  >
                    {data?.successfulStudents}/{data?.activeStudents}
                  </Text>
                </Skeleton>
              }
            />
          ) : (
            "No data"
          )}
        </dd>
      </dl>
    </Layout>
  );
};
export default Monitor;
