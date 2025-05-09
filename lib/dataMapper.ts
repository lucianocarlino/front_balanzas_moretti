import {
  RealTimeWeight,
  ResponsePackages,
  ResponseScales,
  ResponseWeights,
  TableWeights,
} from "./definition";

export function realTimeWeights_to_ResponseWeights(
  data: RealTimeWeight[]
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
  scales: ResponseScales[]
): TableWeights[] {
  return weights.map((weight) => {
    return {
      id: weight.id,
      date_time: weight.date_time,
      package_id: weight.package_id,
      package: packages.find(
        (package_) => package_.package_id === weight.package_id
      )!.name,
      initial_weight: weight.initial_weight,
      final_weight: weight.final_weight,
      scale: scales.find((scale) => scale.scale_id === weight.scale_id)!.name,
      scale_id: weight.scale_id,
    };
  });
}
