"use client";

import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import type { ChartDataPoint } from "@/types/dashboard.types";

type ProductivityChartProps = {
  data: ChartDataPoint[];
  className?: string;
};

export function ProductivityChart({ data, className }: ProductivityChartProps) {
  const maxValue = useMemo(() => Math.max(...data.map((d) => d.value)), [data]);

  return (
    <div className={className}>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="productivityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(37, 133, 244)" stopOpacity={0.3} />
              <stop offset="95%" stopColor="rgb(37, 133, 244)" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255, 255, 255, 0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            stroke="rgb(148, 163, 184)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dy={10}
          />

          <YAxis
            stroke="rgb(148, 163, 184)"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            dx={-10}
            domain={[0, maxValue + 10]}
          />

          <Tooltip
            contentStyle={{
              backgroundColor: "rgb(20, 27, 36)",
              border: "1px solid rgb(27, 34, 51)",
              borderRadius: "12px",
              padding: "12px 16px",
              boxShadow: "0 10px 40px rgba(0, 0, 0, 0.3)",
            }}
            labelStyle={{
              color: "rgb(241, 245, 249)",
              fontWeight: 600,
              fontSize: "13px",
              marginBottom: "4px",
            }}
            itemStyle={{
              color: "rgb(37, 133, 244)",
              fontSize: "14px",
              fontWeight: 500,
            }}
            cursor={{ stroke: "rgb(37, 133, 244)", strokeWidth: 1, strokeDasharray: "5 5" }}
            formatter={(value: number) => [`${value} casos`, "Processados"]}
            labelFormatter={(label) => `Dia ${label}`}
          />

          <Area
            type="monotone"
            dataKey="value"
            stroke="rgb(37, 133, 244)"
            strokeWidth={2}
            fill="url(#productivityGradient)"
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
