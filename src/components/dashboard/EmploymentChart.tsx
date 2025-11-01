'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import type { MgnregaDataMonth } from '@/lib/types';
import { ChartTooltipContent } from '@/components/ui/chart';

interface EmploymentChartProps {
  data: MgnregaDataMonth[];
}

export default function EmploymentChart({ data }: EmploymentChartProps) {
  const chartData = data
    .filter(d => d.year === 2024)
    .map(item => ({
      month: item.month,
      personDaysGenerated: item.personDaysGenerated,
    }));

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <CardTitle className="font-headline text-2xl">Employment Generation (2024)</CardTitle>
        </div>
        <CardDescription>
          Total person-days of work provided each month.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" tickLine={false} axisLine={false} />
              <YAxis
                tickFormatter={(value) => `${Number(value) / 1000}k`}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--muted))' }}
                content={<ChartTooltipContent formatter={(value) => value.toLocaleString()} />}
              />
              <Bar
                dataKey="personDaysGenerated"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
