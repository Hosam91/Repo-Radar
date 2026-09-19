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
import {
  ChartContainer,
  ChartDescription,
  ChartTitle,
  ChartWrapper,
} from "./StarsChart.styles";
import { formatNumber } from "../../../../shared/utils/formatNumber";

export function StarsChart() {
  const data = useAppSelector(selectStarsChartData);

  if (data.length === 0) {
    return null;
  }

  return (
    <ChartContainer>
      <ChartTitle variant="h6">Stars comparison</ChartTitle>

      <ChartDescription variant="body2" color="text.secondary">
        Stars per tracked repository
      </ChartDescription>

      <ChartWrapper>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              bottom: 12,
              left: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />

            <XAxis dataKey="name" tickMargin={8} minTickGap={20} />

            <YAxis tickFormatter={formatNumber} />

            <Tooltip />

            <Bar dataKey="stars" name="Stars" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartWrapper>
    </ChartContainer>
  );
}
