"use client";

import {
  ChartWeight,
  ResponsePackages,
  ResponseScales,
  ResponseWeights,
} from "@/lib/definition";
import WeightLineChart from "./weightLineChart";
import { useMemo, useState } from "react";

interface PackagesStatsProps {
  weights: ResponseWeights[];
  scales: ResponseScales[];
  packages: ResponsePackages[];
}

export default function PackagesStats({
  weights,
  packages,
}: PackagesStatsProps) {
  // 'scales' is part of the props type but not used here; prefix with underscore to avoid lint error
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const _scales = null as unknown as ResponseScales[];
  const [selectedPackage, setSelectedPackage] =
    useState<ResponsePackages | null>(packages.length > 0 ? packages[0] : null);
  const [cantWeights, setcantWeights] = useState<number>(
    weights.length > 0 ? weights.length : 10,
  );

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    const found = packages.find((pkg) => pkg.package_id === value) ?? null;
    setSelectedPackage(found);
  };

  const handlecantWeightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcantWeights(Number(value));
  };

  // Filtrar pesos según la balanza seleccionada
  const filteredWeights = useMemo<ChartWeight[]>(() => {
    if (!selectedPackage) return [];

    const result = weights
      .filter((w) => w.package_id === selectedPackage.package_id)
      .slice(0, cantWeights);

    // Limitar cantidad de registros
    return result.map((w) => {
      const pkg = packages.find((p) => p.package_id === w.package_id);
      return {
        id: w.id,
        initial_weight: w.initial_weight,
        final_weight: w.final_weight,
        maximum_weight: pkg?.maximum_weight ?? 0,
        minimum_weight: pkg?.minimum_weight ?? 0,
        date_time: w.date_time,
      };
    });
  }, [weights, selectedPackage, cantWeights, packages]);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      {/* Encabezado con selector de balanzas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-xl text-gray-800">Paquetes</h2>
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <label
              htmlFor="cant-weights-selector"
              className="text-sm font-medium text-gray-600"
            >
              Cantidad de Pesos:
            </label>
            <input
              type="number"
              id="cant-scales-selector"
              value={cantWeights}
              onChange={handlecantWeightsChange}
              min={1}
              max={500}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700 w-20"
            />
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="package-selector"
              className="text-sm font-medium text-gray-600"
            >
              Paquete:
            </label>
            <select
              id="package-selector"
              value={selectedPackage?.package_id ?? ""}
              onChange={handlePackageChange}
              disabled={packages.length === 0}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
              {packages.length === 0 ? (
                <option value="">No hay paquetes</option>
              ) : (
                packages.map((pkg) => (
                  <option key={pkg.package_id} value={pkg.package_id}>
                    {pkg.name}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>
      </div>

      <WeightLineChart weights={filteredWeights} />
    </div>
  );
}
