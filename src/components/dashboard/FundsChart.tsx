'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from 'recharts';
import type { MgnregaDataMonth } from '@/lib/types';
import { ChartTooltipContent } from '@/components/ui/chart';

interface FundsChartProps {
  data: MgnregaDataMonth[];
}

export default function FundsChart({ data }: FundsChartProps) {
  const chartData = data
    .filter(d => d.year === 2024)
    .map(item => ({
      month: item.month,
      totalFunds: item.totalFunds,
      fundsUtilised: item.fundsUtilised,
    }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <CardTitle className="font-headline text-2xl">Fund Utilization (2024)</CardTitle>
        </div>
        <CardDescription>
          Comparison of available funds vs. utilized funds each month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(value) => `₹${Number(value) / 10000000}Cr`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                content={<ChartTooltipContent formatter={(value, name) => `${name === "totalFunds" ? "Available" : "Utilised"}: ₹${(Number(value)/100000).toFixed(2)} Lakh`} />}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalFunds"
                name="Total Funds"
                stroke="hsl(var(--muted-foreground))"
                strokeWidth={2}
                dot={false}
                strokeDasharray="5 5"
              />
              <Line
                type="monotone"
                dataKey="fundsUtilised"
                name="Funds Utilised"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
