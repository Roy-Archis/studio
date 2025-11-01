'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import type { MgnregaDataMonth } from '@/lib/types';
import SimplifiedExplanation from './SimplifiedExplanation';
import { Building, Seedling } from 'lucide-react';

interface WorksChartProps {
  data: MgnregaDataMonth[];
}

const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))'];

export default function WorksChart({ data }: WorksChartProps) {
  const totalAgriculture = data.reduce((sum, item) => sum + item.worksCompleted.agriculture, 0);
  const totalInfrastructure = data.reduce((sum, item) => sum + item.worksCompleted.infrastructure, 0);

  const chartData = [
    { name: 'Agricultural Works', value: totalAgriculture, icon: Seedling },
    { name: 'Infrastructure Works', value: totalInfrastructure, icon: Building },
  ];

  const totalWorks = totalAgriculture + totalInfrastructure;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
            <CardTitle className="font-headline text-2xl">Types of Works Completed</CardTitle>
            <SimplifiedExplanation term="MGNREGA Works and Assets" />
        </div>
        <CardDescription>
          Breakdown of durable assets created across different categories (all time).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full flex flex-col md:flex-row items-center justify-center gap-8">
          <div className="w-full md:w-1/2 h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length) {
                      const { name, value } = payload[0];
                      return (
                        <div className="bg-background/80 p-2 border rounded-lg shadow-lg">
                          <p>{`${name}: ${Number(value).toLocaleString()}`}</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  innerRadius={80}
                  outerRadius={120}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 flex flex-col gap-4 text-center md:text-left">
             <div className="text-4xl font-bold">{totalWorks.toLocaleString()}</div>
             <p className="text-muted-foreground">Total Works Completed</p>
             <div className="flex flex-col gap-4 mt-4">
                {chartData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center gap-4 justify-center md:justify-start">
                        <div className="h-4 w-4 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                        <div className="flex items-center gap-2">
                           <entry.icon className="w-5 h-5 text-muted-foreground" />
                           <span className="font-medium">{entry.name}:</span>
                           <span className="font-bold">{entry.value.toLocaleString()}</span>
                           <span className="text-sm text-muted-foreground">({((entry.value / totalWorks) * 100).toFixed(1)}%)</span>
                        </div>
                    </div>
                ))}
             </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
