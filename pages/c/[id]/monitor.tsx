import {
  Title,
  Text,
  Group,
  Center,
  Stack,
  Skeleton,
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
import { motion, AnimatePresence } from "framer-motion";
import { useDebouncedValue } from "@mantine/hooks";
import prettyMilliseconds from "pretty-ms";
import { Box } from "@mantine/core";

const Monitor = () => {
  const theme = useMantineTheme();
  const router = useRouter();
  const { id } = router.query;

  const [period, setPeriod] = useState(15);

  const { data: bouncey } = useSWR({ id, period }, fetchMonitoring);

  const [loading] = useDebouncedValue(!bouncey, 500);
  const [data] = useDebouncedValue(bouncey, 500);

  const periods = [
    { label: "60 seconds", value: "1" },
    { label: "15 minutes", value: "15" },
    { label: "60 minutes", value: "60" },
    { label: "7 days", value: "10080" },
  ];

  const r = 140;
  const circumference = 2 * Math.PI * r;

  const transitionProps = {
    initial: { opacity: 0, y: -r },
    animate: { opacity: 1, y: 0, transition: { delay: 0.4 } },
    exit: { opacity: 0, y: r, transition: { delay: 0.15, duration: 0.25 } },
  };

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
          value={period}
          onChange={(event) => setPeriod(Number(event.target.value))}
        />

        <Stack align="center">
          <Center sx={{ position: "relative" }}>
            <Center
              style={{
                position: "absolute",
                width: r * 2,
                height: r * 2,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <AnimatePresence>
                {data?.activeStudents >= 1 ? (
                  <motion.div
                    key={data?.successRate}
                    {...transitionProps}
                    style={{ position: "absolute" }}
                  >
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
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    {...transitionProps}
                    style={{ position: "absolute" }}
                  >
                    <Stack align="center">
                      <BugIcon size={24} />
                      <Text color="dimmed">No data available</Text>
                    </Stack>
                  </motion.div>
                )}
              </AnimatePresence>
            </Center>
            <Skeleton visible={loading} circle>
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
                      ((data?.successfulStudents > 1 ? data?.successRate : 2) *
                        circumference) /
                      100
                    }, ${
                      circumference -
                      ((data?.successfulStudents > 1 ? data?.successRate : 2) *
                        circumference) /
                        100
                    }`,
                    stroke:
                      data?.successRate < 50
                        ? theme.colors.orange[5]
                        : theme.colors.green[5],
                    strokeWidth: data?.successRate ? 20 : 12,
                    opacity: data?.activeStudents >= 1 ? 1 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 40, delay: 0.5 }}
                />
              </motion.svg>
            </Skeleton>
          </Center>

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
      </Stack>
    </Layout>
  );
};
export default Monitor;
