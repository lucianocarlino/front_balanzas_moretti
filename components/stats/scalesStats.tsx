"use client";

import {
  ChartWeight,
  ResponsePackages,
  ResponseScales,
  ResponseWeights,
} from "@/lib/definition";
import WeightLineChart from "./weightLineChart";
import { useMemo, useState } from "react";

interface ScalesStatsProps {
  weights: ResponseWeights[];
  scales: ResponseScales[];
  packages: ResponsePackages[];
}

export default function ScalesStats({
  weights,
  scales,
  packages,
}: ScalesStatsProps) {
  const [selectedScale, setSelectedScale] = useState<ResponseScales>(scales[0]);
  const [cantWeights, setcantWeights] = useState<number>(scales.length);
  const [selectedPackage, setSelectedPackage] = useState<
    ResponsePackages | string
  >("all");

  const handleScaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    setSelectedScale(scales.find((scale) => scale.scale_id === value)!);
    setSelectedPackage("all"); // Resetear paquete al cambiar balanza
  };

  const handlecantWeightsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setcantWeights(Number(value));
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    if (value === "all") {
      setSelectedPackage("all");
    } else {
      // Buscar en los paquetes de la balanza seleccionada
      setSelectedPackage(
        selectedScale.packages.find((pkg) => pkg.package_id === Number(value))!
      );
    }
  };

  // Filtrar pesos según la balanza seleccionada
  const filteredWeights = useMemo<ChartWeight[]>(() => {
    const result = weights
      .filter((w) => w.scale_id === selectedScale.scale_id)
      .filter((w) =>
        selectedPackage === "all"
          ? true
          : w.package_id === (selectedPackage as ResponsePackages).package_id
      )
      .slice(0, cantWeights);

    // Limitar cantidad de registros
    return result.map((w) => ({
      id: w.id,
      initial_weight: w.initial_weight,
      final_weight: w.final_weight,
      maximum_weight: packages.find((p) => p.package_id === w.package_id)!
        .maximum_weight,
      minimum_weight: packages.find((p) => p.package_id === w.package_id)!
        .minimum_weight,
      date_time: w.date_time,
    }));
  }, [weights, selectedScale, cantWeights, packages, selectedPackage]);

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4">
      {/* Encabezado con selector de balanzas */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4 pb-4 border-b border-gray-200">
        <h2 className="text-xl text-gray-800">Balanzas</h2>
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
              htmlFor="scale-selector"
              className="text-sm font-medium text-gray-600"
            >
              Balanza:
            </label>
            <select
              id="scale-selector"
              value={selectedScale.scale_id}
              onChange={handleScaleChange}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
              {scales.map((scale) => (
                <option key={scale.scale_id} value={scale.scale_id}>
                  {scale.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <label
              htmlFor="package-selector"
              className="text-sm font-medium text-gray-600"
            >
              Paquetes:
            </label>
            <select
              id="package-selector"
              value={
                selectedPackage === "all"
                  ? "all"
                  : (selectedPackage as ResponsePackages).package_id
              }
              onChange={handlePackageChange}
              className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-700"
            >
              <option value="all">Todos los paquetes</option>
              {selectedScale.packages.map((pkg) => (
                <option key={pkg.package_id} value={pkg.package_id}>
                  {pkg.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Gráfico */}
      <WeightLineChart weights={filteredWeights} />
    </div>
  );
}
