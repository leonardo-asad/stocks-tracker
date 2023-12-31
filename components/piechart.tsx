"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import type { Holdings } from "@/types/types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function PieChartHoldings({ holdings }: { holdings: Holdings }) {
  const data = holdings.map((holding) => {
    return {
      name: holding.ticker,
      value: holding._sum.quantity,
    };
  });

  return (
    <ResponsiveContainer width="100%" height={350}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          label={true}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
}
