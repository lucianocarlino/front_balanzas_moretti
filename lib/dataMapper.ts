import {
  RealTimeWeight,
  ResponsePackages,
  ResponseScales,
  ResponseWeights,
  TableWeights,
} from "./definition";

export function realTimeWeights_to_ResponseWeights(
  data: RealTimeWeight[],
): ResponseWeights[] {
  return data.map((weight) => {
    return {
      id: weight.id,
      date_time: weight.date_time,
      package_id: weight.package_id,
      initial_weight: weight.initial_weight,
      final_weight: weight.final_weight,
      scale_id: weight.scale_id,
    };
  });
}

export function tableWeights(
  weights: ResponseWeights[],
  packages: ResponsePackages[],
  scales: ResponseScales[],
): TableWeights[] {
  // Si no hay weights, devolver array vacío (no error)
  if (!weights || weights.length === 0) {
    return [];
  }

  // Si faltan packages o scales, loguear warning pero continuar
  if (!packages || packages.length === 0 || !scales || scales.length === 0) {
    console.warn("tableWeights: packages o scales vacíos pero hay weights — devolviendo nombres por defecto");
    return weights.map((w) => ({
      id: w.id,
      date_time: w.date_time,
      package_id: w.package_id,
      package: "(Paquete no encontrado)",
      initial_weight: w.initial_weight,
      final_weight: w.final_weight,
      scale: "(Balanza no encontrada)",
      scale_id: w.scale_id,
    }));
  }

  return weights.map((weight) => {
    // Normalizar IDs a Number para evitar mismatch ("1" vs 1)
    const weightPackageId = Number(weight.package_id);
    const weightScaleId = Number(weight.scale_id);

    const foundPackage = packages.find(
      (package_) => Number(package_.package_id) === weightPackageId,
    );
    const foundScale = scales.find(
      (scale) => Number(scale.scale_id) === weightScaleId,
    );

    let packageName: string = "(Paquete no encontrado)";
    let scaleName: string = "(Balanza no encontrada)";

    if (foundPackage) {
      packageName = foundPackage.active
        ? foundPackage.name
        : `${foundPackage.name} (eliminado)`;
    }

    if (foundScale) {
      scaleName = foundScale.active
        ? foundScale.name
        : `${foundScale.name} (eliminada)`;
    }

    return {
      id: weight.id,
      date_time: weight.date_time,
      package_id: weight.package_id,
      package: packageName,
      initial_weight: weight.initial_weight,
      final_weight: weight.final_weight,
      scale: scaleName,
      scale_id: weight.scale_id,
    };
  });
}

export function formatDate(dateTime: string) {
  const d = new Date(dateTime);
  if (Number.isNaN(d.getTime())) return dateTime;

  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const mo = String(d.getMonth() + 1).padStart(2, "0");
  const yyyy = d.getFullYear();

  return `${hh}:${mm} ${dd}/${mo}/${yyyy}`;
}
