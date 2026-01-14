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

// Tipo para el tooltip
interface CustomTooltipProps {
  active?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any[];
  label?: string;
}

// Tooltip personalizado
const CustomTooltip = ({ active, payload }: CustomTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  // Definir el orden que querés
  const order = [
    "initial_weight",
    "final_weight",
    "maximum_weight",
    "minimum_weight",
  ];

  // Nombres personalizados
  const names: Record<string, string> = {
    final_weight: "Peso final",
    initial_weight: "Peso inicial",
    maximum_weight: "Peso máximo",
    minimum_weight: "Peso mínimo",
  };

  // Ordenar el payload según el orden definido
  const sorted = [...payload].sort((a, b) => {
    const indexA = order.indexOf(a.dataKey as string);
    const indexB = order.indexOf(b.dataKey as string);
    return indexA - indexB;
  });

  // Obtener la fecha del punto actual
  const dateTime = payload[0]?.payload?.date_time ?? "";

  return (
    <div className="bg-white border border-gray-200 rounded-md shadow-md p-3">
      <p className="text-gray-800 mb-2">{formatDate(dateTime)}</p>
      {sorted.map((entry, index) => (
        <p key={index} style={{ color: entry.color }} className="text-sm">
          {names[entry.dataKey as string] || entry.name}: {entry.value}g
        </p>
      ))}
    </div>
  );
};

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
            <Tooltip content={<CustomTooltip />} />
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
