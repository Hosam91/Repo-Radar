import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { useAppSelector } from "../../../../redux/hooks";
import { selectStarsChartData } from "../../../../redux/trackedRepos/trackedReposSelectors";

export function StarsChart() {
  const data = useAppSelector(selectStarsChartData);

  if (data.length === 0) {
    return null;
  }

  return (
    <ResponsiveContainer width="100%" height={320}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="stars" />
      </BarChart>
    </ResponsiveContainer>
  );
}