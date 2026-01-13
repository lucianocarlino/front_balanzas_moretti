export type Package = {
  package_id: number;
  name: string;
  minimum_weight: number;
  expected_weight: number;
  maximum_weight: number;
};

export type PackageField = {
  name: string;
  package_id: number;
  minimum_weight: number;
  expected_weight: number;
  maximum_weight: number;
};

export type ScaleField = {
  scale_id: number;
  name: string;
  packages: PackageField[];
};

export const packages = [
  {
    package_id: 1,
    name: "125",
    expected_weight: 100.5,
    minimum_weight: 95.6,
    maximum_weight: 101.0,
  },
  {
    package_id: 2,
    name: "90",
    expected_weight: 150.0,
    minimum_weight: 148.6,
    maximum_weight: 150.6,
  },
];

export interface ResponseScales {
  name: string;
  scale_id: number;
  slave_address: number;
  packages: ResponsePackages[];
  online: boolean;
  mapped: boolean;
}

export interface ResponseWeights {
  id: number;
  date_time: string;
  package_id: number;
  initial_weight: number;
  final_weight: number;
  scale_id: number;
}

export interface ResponsePackages {
  package_id: number;
  name: string;
  expected_weight: number;
  minimum_weight: number;
  maximum_weight: number;
}

export interface TableWeights {
  package: string;
  package_id: number;
  scale: string;
  scale_id: number;
  date_time: string;
  initial_weight: number;
  final_weight: number;
  id: number;
}

export interface RealTimeWeight {
  id: number;
  date_time: string;
  initial_weight: number;
  final_weight: number;
  scale: string;
  scale_id: number;
  package: string;
  package_id: number;
}

export interface ChartWeight {
  date_time: string;
  id: number;
  initial_weight: number;
  final_weight: number;
  maximum_weight: number;
  minimum_weight: number;
}
