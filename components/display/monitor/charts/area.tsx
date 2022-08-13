import { ComponentType, useMemo, useState } from "react";
import { AxisOptions, ChartOptions } from "react-charts";

import dynamic from "next/dynamic";

import { Box, useMantineColorScheme, useMantineTheme } from "@mantine/core";

import { Attempt } from "@prisma/client";

import { ChartProps } from "./chart-props";

type AttemptChunk = {
  centroid: Date;
  count: number;
};
type Series = {
  label: string;
  data: AttemptChunk[];
};

const Chart: ComponentType<{ options: ChartOptions<unknown> }> = dynamic(
  () => import("react-charts").then((mod) => mod.Chart),
  { ssr: false }
);

const placeholder: Attempt[] = [
  {
    challengeId: 1,
    cookie: "",
    createdAt: new Date(),
    id: 1,
    success: false,
    output: "",
  },
  {
    challengeId: 2,
    cookie: "",
    createdAt: new Date(),
    id: 1,
    success: true,
    output: "",
  },
];

const Area: React.FC<ChartProps> = ({ data: propData }: ChartProps) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [attempts, setAttempts] = useState<Attempt[]>(placeholder);
  const [period, setPeriod] = useState<number>(1 * 24 * 60 * 60 * 1000);

  const [xmin, setXmin] = useState<Date>();
  const [xmax, setXmax] = useState<Date>();
  const [ymin, setYmin] = useState<number>(0);
  const [ymax, setYmax] = useState<number>(0);

  // Set period when data is loaded
  useMemo(() => {
    if (propData?.period) {
      setPeriod(propData?.period);
    }
  }, [propData?.period]);

  // Use a default value if no attempts are found
  useMemo(() => {
    if (!propData) setAttempts(placeholder);
    if (propData?.attempts.length > 1) setAttempts(propData?.attempts);
    else setAttempts(placeholder);
  }, [propData]);

  // Break the data into 10 minute chunks
  const data = useMemo<Series[]>(() => {
    const successChunks: AttemptChunk[] = [];
    const failureChunks: AttemptChunk[] = [];
    let chunkSize = 0;

    // If period is <= 1 minute, split into 10 second chunks
    if (period <= 60000) chunkSize = 10 * 1000;
    //  if period is <= 15 minutes, split into 1 minute chunks
    else if (period <= 900000) chunkSize = 1 * 60 * 1000;
    // If period is <= 1 hour, split into 2 minute chunks
    else if (period <= 3600000) chunkSize = 2 * 60 * 1000;
    // If period is <= 1 day, split into 1 hour chunks
    else if (period <= 86400000) chunkSize = 1 * 60 * 60 * 1000;
    // If period is <= 7 days, split into 4 hour chunks
    else if (period <= 604800000) chunkSize = 4 * 60 * 60 * 1000;
    // If period is > 7 days, split into 10 chunk
    else chunkSize = period / 10;

    const chunkCount = Math.floor(period / chunkSize);

    // Create the chunks
    for (let i = 0; i < chunkCount; i += 1) {
      const start = new Date(new Date().getTime() - period + i * chunkSize);
      const centroid = new Date(start.getTime() + chunkSize / 2);
      successChunks.push({ centroid, count: 0 });
      failureChunks.push({ centroid, count: 0 });
    }

    // Set the x-axis min and max
    setXmin(successChunks[0].centroid);
    setXmax(successChunks[successChunks.length - 1].centroid);

    // Add the attempts to the chunks
    attempts.forEach((attempt) => {
      const index =
        (Math.floor(new Date(attempt.createdAt).getTime() / chunkSize) %
          chunkCount) -
        1;
      if (!Number.isNaN(index) && index >= 0) {
        if (attempt.success) successChunks[index].count += 1;
        else failureChunks[index].count += 1;
      }
    });

    // Set the y-axis min and max
    setYmin(Math.min(...successChunks.map((chunk) => chunk.count)));
    setYmax(Math.max(...successChunks.map((chunk) => chunk.count)));

    return [
      { label: "Successes", data: successChunks },
      { label: "Failures", data: failureChunks },
    ];
  }, [attempts, period]);

  const primaryAxis = useMemo(
    (): AxisOptions<AttemptChunk> => ({
      getValue: (d) => d.centroid,
      scaleType: "localTime",
      showGrid: false,
      formatters: {
        scale: (value) =>
          new Date(value).toLocaleString("en-GB", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
      },
      min: xmin,
      max: xmax,
    }),
    [xmin, xmax]
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<AttemptChunk>[] => [
      {
        getValue: (d) => d.count,
        elementType: "area",
        scaleType: "linear",
        stacked: true,
        showGrid: false,
        min: ymin,
        max: ymax,
        formatters: {
          scale: (value) => {
            const int = Math.floor(value);
            return int === value ? String(int) : "";
          },
        },
      },
    ],
    [ymax, ymin]
  );

  return (
    <>
      <Box sx={{ height: 400, position: "relative" }}>
        <Chart
          options={{
            data,
            primaryAxis,
            secondaryAxes,
            dark: colorScheme === "dark",
            defaultColors: [theme.colors.green[6], theme.colors.red[6]],
            interactionMode: "closest",
          }}
        />
      </Box>
      {colorScheme}
    </>
  );
};
export default Area;
