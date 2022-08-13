import { MonitorResponse } from "../../../pages/api/c/monitor/[id]";
import Area from "./charts/area";
import Pie from "./charts/pie";
import PlaceholderAvatar from "./placeholder-avatar";
import SubmissionFeed from "./submission-feed/submission-feed";

export { Area, Pie, PlaceholderAvatar, SubmissionFeed };

export type ChartProps = { loading: boolean; data: MonitorResponse };
