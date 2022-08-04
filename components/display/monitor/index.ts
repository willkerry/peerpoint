import Bar from "./bar";
import Pie from "./pie";
import { MonitorResponse } from "../../../pages/api/c/monitor/[id]";

export { Bar, Pie };

export type ChartProps = { loading: boolean; data: MonitorResponse };
