import { useMantineTheme } from "@mantine/core";
import {
  Chart,
  ChartData,
  ChartOptions,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
} from "chart.js";
import { Bar as BarChart } from "react-chartjs-2";
import { ChartProps } from "../index";

Chart.register(CategoryScale, LinearScale, PointElement, BarElement);

const Bar: React.FC<ChartProps> = ({ data }) => {
  const theme = useMantineTheme();
  Chart.defaults.font = {
    family: theme.fontFamily,
    size: theme.fontSizes.xs,
    weight: "500",
  };
  Chart.defaults.color = theme.colors.dark[4];

  const chartData: ChartData<"bar", number[], string> = {
    labels: ["Wrong answer", "Active students", "Right answer"],
    datasets: [
      {
        data: [
          data?.activeStudents - data?.successfulStudents,
          data?.activeStudents,
          data?.successfulStudents,
        ],
        backgroundColor: [
          theme.colors.red[6],
          theme.colors.blue[1],
          theme.colors.green[5],
        ],
        barThickness: 35,
      },
    ],
  };
  const options: ChartOptions<"bar"> = {
    indexAxis: "y",
    plugins: { legend: { display: false } },
    elements: {
      point: {
        radius: 0,
      },
      bar: {
        borderRadius: 4,
      },
    },
    scales: {
      xAxes: {
        display: true,
      },
      yAxes: {
        display: true,
        alignToPixels: true,
      },
    },
  };

  return (
    <BarChart data={chartData} options={options} height={50} width={100} />
  );
};
export default Bar;
