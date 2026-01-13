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
