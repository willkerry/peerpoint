import { Fetcher } from "swr";
import { MonitorResponse } from "../../pages/api/c/monitor/[id]";

const fetchMonitoring: Fetcher<MonitorResponse> = ({
  id,
  period,
}: {
  id: number;
  period: number;
}) => {
  if (!Number(id) || !Number(period)) return;

  return fetch(
    `/api/c/monitor/${Number(id)}?${new URLSearchParams({
      period: String(period),
    })}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  ).then((res) => res.json());
};

export default fetchMonitoring;
