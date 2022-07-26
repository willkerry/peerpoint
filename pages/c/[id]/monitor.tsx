import {
  Title,
  Text,
  Group,
  Center,
  Stack,
  NativeSelect,
  useMantineTheme,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import IdButton from "../../../components/display/id-button";
import { Layout, Meta } from "../../../components/layout";
import fetchMonitoring from "../../../lib/fetchers/fetch-monitoring";
import DisplayId from "../../../components/display/display-id";
import { Var } from "../../../components/display/variable";
import { BugIcon } from "@primer/octicons-react";
import { AnimatePresence, motion } from "framer-motion";

const Monitor = () => {
  const router = useRouter();
  const { id } = router.query;
  const [period, setPeriod] = useState({ value: "15", label: "15 minutes" });
  const { data } = useSWR({ id, period: period.value }, fetchMonitoring);
  const theme = useMantineTheme();

  const periods = [
    { label: "1 minute", value: "1" },
    { label: "15 minutes", value: "15" },
    { label: "1 hour", value: "60" },
    { label: "7 days", value: "10080" },
  ];

  const r = 140;
  const circumference = 2 * Math.PI * r;

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
          <Center
            sx={{
              position: "relative",
              borderRadius: 9999,
              overflow: "hidden",
            }}
          >
            <AnimatePresence>
              {data?.successRate ? (
                <motion.div
                  key="fraction"
                  initial={{ opacity: 0, y: -r }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: r }}
                  style={{ position: "absolute" }}
                >
                  {label}
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: -r }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: r }}
                  style={{ position: "absolute" }}
                >
                  {empty}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.svg
              width={320}
              height={320}
              style={{ transform: "rotate(-90deg)" }}
            >
              <circle
                cx={160}
                cy={160}
                r={r}
                stroke={theme.colors.gray[3]}
                strokeWidth={20}
                fill="transparent"
              />

              <motion.circle
                cx={160}
                cy={160}
                r={r}
                stroke={theme.colors.orange[5]}
                fill="transparent"
                strokeWidth={20}
                strokeLinecap="round"
                strokeDashoffset={circumference}
                initial={{
                  strokeDasharray: `${0}, ${circumference}`,
                }}
                animate={{
                  strokeDasharray: `${
                    (Math.max(data?.successRate, 7) * circumference) / 100
                  }, ${
                    circumference -
                    (Math.max(data?.successRate, 7) * circumference) / 100
                  }`,
                }}
                transition={{ type: "spring", stiffness: 40, delay: 0.5 }}
              />
            </motion.svg>
          </Center>
          <Text>
            <Var>{data?.activeStudents?.toLocaleString()}</Var>{" "}
            {data?.activeStudents !== 1 ? "students have" : "student has"}{" "}
            attemped challenge{" "}
            <Var>
              <DisplayId id={id} />
            </Var>{" "}
            in the last <Var>{period.label}</Var>, of whom{" "}
            <Var>{data?.successfulStudents?.toLocaleString()}</Var>{" "}
            {data?.successfulStudents !== 1 ? "have" : "has"} submitted a
            correct solution.
          </Text>
        </Stack>
      </Stack>
    </Layout>
  );
};
export default Monitor;
