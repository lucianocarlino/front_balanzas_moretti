"use server";

import { server } from "@/api/server";
import {
  ResponsePackages,
  ResponseScales,
  ResponseWeights,
} from "./definition";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createScale(form: FormData) {
  const name = form.get("name");
  const packages = form.getAll("package_id");
  const address = form.get("address");
  await server.post("/scales", {
    name,
    packages: packages.map(Number),
    address,
  });
  revalidatePath("/packages");
  redirect("/packages ");
}

export async function updateScale(scale_id: number, form: FormData) {
  const name = form.get("name");
  const packages = form.getAll("package_id");
  await server.put(`/scales/update/${scale_id}`, {
    name,
    packages: packages.map(Number),
  });
  revalidatePath("/scales");
  redirect("/scales");
}

export async function deleteScale(scale_id: number) {
  const response = await server.delete(`/scales/${scale_id}`);
  revalidatePath("/scales");
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}

export async function deletePackage(package_id: number) {
  const response = await server.delete(`/packages/${package_id}`);
  revalidatePath("/packages");
  if (response.status === 200) {
    return true;
  } else {
    return false;
  }
}

export const getAllScales = async (): Promise<ResponseScales[]> => {
  const { data } = await server.get<ResponseScales[]>("/scales");
  return data;
};

export const getAllPackages = async (): Promise<ResponsePackages[]> => {
  const { data } = await server.get<ResponsePackages[]>("/packages");
  return data;
};

export const getAvailableAddresses = async (): Promise<number[]> => {
  const { data } = await server.get<number[]>("/scales_availables");
  return data;
};

export const getScale = async (scale_id: number): Promise<ResponseScales> => {
  const { data } = await server.get<ResponseScales>(`/scales/${scale_id}`);
  return data;
};

export const getPackage = async (
  package_id: number
): Promise<ResponsePackages> => {
  const { data } = await server.get<ResponsePackages>(
    `/packages/${package_id}`
  );
  return data;
};

export async function getWeights(
  limit: number,
  init: string,
  end: string,
  package_id: number[],
  scale_id: number[]
): Promise<ResponseWeights[]> {
  const { data } = await server.get<ResponseWeights[]>("/weights", {
    params: {
      limit: limit,
      init: init,
      end: end,
      package_id: package_id,
      scale_id: scale_id,
    },
  });
  return data;
}

export async function getRealTimeWeights() {
  console.log("entro");
  const { data } = await server.get<ResponseWeights[]>("/sse", {});
  console.log("salio");
  return data;
}

export async function createPackage(form: FormData) {
  const name = form.get("name");
  const expected_weight = form.get("expected_weight");
  const minimum_weight = form.get("minimum_weight");
  const maximum_weight = form.get("maximum_weight");
  await server.post("/packages", {
    name,
    expected_weight,
    minimum_weight,
    maximum_weight,
  });
  revalidatePath("/scales");
  redirect("/scales");
}

export async function updatePackage(package_id: number, form: FormData) {
  const name = form.get("name");
  const expected_weight = form.get("expected_weight");
  const minimum_weight = form.get("minimum_weight");
  const maximum_weight = form.get("maximum_weight");
  console.log(
    name,
    expected_weight,
    minimum_weight,
    maximum_weight,
    package_id
  );
  await server.put(`/packages/update/${package_id}`, {
    name,
    expected_weight,
    minimum_weight,
    maximum_weight,
  });
  revalidatePath("/packages");
  redirect("/packages");
}
