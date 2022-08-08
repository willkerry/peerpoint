import Bar from "./charts/bar";
import Pie from "./charts/pie";
import { MonitorResponse } from "../../../pages/api/c/monitor/[id]";
import PlaceholderAvatar from "./placeholder-avatar";
import SubmissionFeed from "./submission-feed/submission-feed";

export { Bar, Pie, PlaceholderAvatar, SubmissionFeed };

export type ChartProps = { loading: boolean; data: MonitorResponse };
