"use client";

import React from "react";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { RechartsDevtools } from "@recharts/devtools";
import { ChartWeight } from "@/lib/definition";
import { formatDate } from "@/lib/dataMapper";

// #region Sample data (array of arrays of ChartWeight) — all inner arrays length = 3
const data: ChartWeight[] = [
  {
    id: 0,
    initial_weight: 2550,
    final_weight: 2400,
    maximum_weight: 2600,
    minimum_weight: 2400,
  },
  {
    id: 0,
    initial_weight: 3520,
    final_weight: 3410,
    maximum_weight: 3200,
    minimum_weight: 3400,
  },
  {
    id: 0,
    initial_weight: 4540,
    final_weight: 4630,
    maximum_weight: 4600,
    minimum_weight: 5000,
  },
  {
    id: 1,
    initial_weight: 2500,
    final_weight: 2470,
    maximum_weight: 2600,
    minimum_weight: 2400,
  },
  {
    id: 1,
    initial_weight: 3480,
    final_weight: 3360,
    maximum_weight: 3200,
    minimum_weight: 3400,
  },
  {
    id: 1,
    initial_weight: 4480,
    final_weight: 4760,
    maximum_weight: 4600,
    minimum_weight: 5000,
  },
  {
    id: 2,
    initial_weight: 2500,
    final_weight: 2490,
    maximum_weight: 2600,
    minimum_weight: 2400,
  },
  {
    id: 2,
    initial_weight: 3500,
    final_weight: 3290,
    maximum_weight: 3200,
    minimum_weight: 3400,
  },
  {
    id: 2,
    initial_weight: 4500,
    final_weight: 4890,
    maximum_weight: 4600,
    minimum_weight: 5000,
  },
  {
    id: 3,
    initial_weight: 2908,
    final_weight: 2500,
    maximum_weight: 2600,
    minimum_weight: 2400,
  },
  {
    id: 3,
    initial_weight: 3880,
    final_weight: 3395,
    maximum_weight: 3200,
    minimum_weight: 3400,
  },
  {
    id: 3,
    initial_weight: 4880,
    final_weight: 4995,
    maximum_weight: 4600,
    minimum_weight: 5000,
  },
  {
    id: 4,
    initial_weight: 2908,
    final_weight: 2590,
    maximum_weight: 2600,
    minimum_weight: 2400,
  },
  {
    id: 4,
    initial_weight: 3908,
    final_weight: 3390,
    maximum_weight: 3200,
    minimum_weight: 3400,
  },
  {
    id: 4,
    initial_weight: 4908,
    final_weight: 4790,
    maximum_weight: 4600,
    minimum_weight: 5000,
  },
  {
    id: 5,
    initial_weight: 2500,
    final_weight: 2420,
    maximum_weight: 2600,
    minimum_weight: 2400,
  },
  {
    id: 5,
    initial_weight: 3500,
    final_weight: 3250,
    maximum_weight: 3200,
    minimum_weight: 3400,
  },
  {
    id: 5,
    initial_weight: 4500,
    final_weight: 4720,
    maximum_weight: 4600,
    minimum_weight: 5000,
  },
  {
    id: 6,
    initial_weight: 2800,
    final_weight: 2560,
    maximum_weight: 2600,
    minimum_weight: 2400,
  },
  {
    id: 6,
    initial_weight: 3800,
    final_weight: 3360,
    maximum_weight: 3200,
    minimum_weight: 3400,
  },
  {
    id: 6,
    initial_weight: 4800,
    final_weight: 4860,
    maximum_weight: 4600,
    minimum_weight: 5000,
  },
];
// #endregion

export default function WeightLineChart({
  weights,
}: {
  weights: ChartWeight[];
}) {
  return (
    <div className="w-full">
      <div className="w-full bg-white rounded-md shadow-sm p-3">
        <ResponsiveContainer width="100%" height={420}>
          <LineChart
            data={weights}
            margin={{ top: 20, right: 24, left: 8, bottom: 64 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="date_time"
              interval={0}
              tick={{ fontSize: 12 }}
              height={60}
              tickFormatter={(value) => formatDate(value)}
              angle={-45}
              textAnchor="end"
            />
            <YAxis />
            <Tooltip />
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ color: "#000", paddingTop: 30 }}
            />
            <Line
              type="monotone"
              dataKey="initial_weight"
              stroke="#ff7300"
              dot={{ r: 1 }}
              strokeWidth={1}
              name="Peso inicial"
            />
            <Line
              type="monotone"
              dataKey="final_weight"
              stroke="#e17055"
              dot={{
                r: 2,
                strokeWidth: 1,
                fill: "#e17055",
              }}
              strokeWidth={2}
              name="Peso final"
            />
            <Line
              type="monotone"
              dataKey="maximum_weight"
              stroke="#000"
              strokeDasharray="5 5"
              strokeWidth={1}
              dot={false}
              name="Peso maximo"
            />
            <Line
              type="monotone"
              dataKey="minimum_weight"
              stroke="#000"
              strokeDasharray="5 5"
              strokeWidth={1}
              dot={false}
              name="Peso minimo"
            />
          </LineChart>
        </ResponsiveContainer>

        {process.env.NODE_ENV === "development" && <RechartsDevtools />}
      </div>
    </div>
  );
}
