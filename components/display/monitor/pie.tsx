import { Center, Stack, Text, useMantineTheme } from "@mantine/core";
import { IconBraces } from "@tabler/icons";
import { AnimatePresence, motion } from "framer-motion";
import { ChartProps } from "../monitor/";

const Pie: React.FC<ChartProps> = ({ loading, data }) => {
  const theme = useMantineTheme();

  const r = 140;
  const circumference = 2 * Math.PI * r;

  const transitionProps = {
    initial: { opacity: 0, y: -r },
    animate: { opacity: 1, y: 0, transition: { delay: 0.4 } },
    exit: { opacity: 0, y: r, transition: { delay: 0.15, duration: 0.25 } },
  };

  return (
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
          {loading ? null : data?.activeStudents >= 1 ? (
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
              <Stack spacing="xs" align="center">
                <IconBraces size={44} stroke={1} />
                <Text color="dimmed">No data available</Text>
              </Stack>
            </motion.div>
          )}
        </AnimatePresence>
      </Center>

      <motion.svg
        width={320}
        height={320}
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          cx={160}
          cy={160}
          r={r}
          stroke={theme.colors.dark[2]}
          strokeOpacity={0.5}
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
    </Center>
  );
};

export default Pie;
