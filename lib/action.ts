"use server";

import { server } from "@/api/server";
import {
  ResponsePackages,
  ResponseScales,
  ResponseWeights,
} from "./definition";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

// Tipo para respuestas de acciones
export type ActionResult<T = null> = {
  success: boolean;
  data?: T;
  error?: string;
};

// Helper para manejar errores - solo devuelve mensaje genérico
function getErrorMessage(_error: unknown, defaultMessage: string): string {
  return defaultMessage;
}

export async function createScale(form: FormData): Promise<ActionResult> {
  try {
    const name = form.get("name");
    const packages = form.getAll("package_id");
    const address = form.get("address");
    await server.post("/scales", {
      name,
      packages: packages.map(Number),
      address,
    });
    revalidatePath("/scales");
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al crear balanza"),
    };
  }
  redirect("/scales");
}

export async function updateScale(
  scale_id: number,
  form: FormData,
): Promise<ActionResult> {
  try {
    const name = form.get("name");
    const packages = form.getAll("package_id");
    await server.put(`/scales/update/${scale_id}`, {
      name,
      packages: packages.map(Number),
    });
    revalidatePath("/scales");
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al actualizar balanza"),
    };
  }
  redirect("/scales");
}

export async function deleteScale(scale_id: number): Promise<ActionResult> {
  try {
    const response = await server.delete(`/scales/${scale_id}`);
    revalidatePath("/scales");
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Error al eliminar balanza" };
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al eliminar balanza"),
    };
  }
  redirect("/scales");
}

export async function deletePackage(package_id: number): Promise<ActionResult> {
  try {
    const response = await server.delete(`/packages/${package_id}`);
    revalidatePath("/packages");
    if (response.status === 200) {
      return { success: true };
    } else {
      return { success: false, error: "Error al eliminar paquete" };
    }
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al eliminar paquete"),
    };
  }
  redirect("/packages");
}

export const getAllScales = async (): Promise<
  ActionResult<ResponseScales[]>
> => {
  try {
    const { data } = await server.get<ResponseScales[]>("/scales");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al obtener balanzas"),
    };
  }
};

export const getAllPackages = async (): Promise<
  ActionResult<ResponsePackages[]>
> => {
  try {
    const { data } = await server.get<ResponsePackages[]>("/packages");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al obtener paquetes"),
    };
  }
};

export const getAvailableAddresses = async (): Promise<
  ActionResult<number[]>
> => {
  try {
    const { data } = await server.get<number[]>("/scales_availables");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al obtener direcciones disponibles"),
    };
  }
};

export const getScale = async (
  scale_id: number,
): Promise<ActionResult<ResponseScales>> => {
  try {
    const { data } = await server.get<ResponseScales>(`/scales/${scale_id}`);
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al obtener balanza"),
    };
  }
};

export const getPackage = async (
  package_id: number,
): Promise<ActionResult<ResponsePackages>> => {
  try {
    const { data } = await server.get<ResponsePackages>(
      `/packages/${package_id}`,
    );
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al obtener paquete"),
    };
  }
};

export async function getWeights(
  limit: number,
  init: string,
  end: string,
  package_id: number[],
  scale_id: number[],
): Promise<ActionResult<ResponseWeights[]>> {
  try {
    const { data } = await server.get<ResponseWeights[]>("/weights", {
      params: {
        limit: limit,
        init: init,
        end: end,
        package_id: package_id,
        scale_id: scale_id,
      },
    });
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al obtener pesos"),
    };
  }
}

export async function getRealTimeWeights(): Promise<
  ActionResult<ResponseWeights[]>
> {
  try {
    console.log("entro");
    const { data } = await server.get<ResponseWeights[]>("/sse", {});
    console.log("salio");
    return { success: true, data };
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al obtener pesos en tiempo real"),
    };
  }
}

export async function createPackage(form: FormData): Promise<ActionResult> {
  try {
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
    revalidatePath("/packages");
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al crear paquete"),
    };
  }
  redirect("/packages");
}

export async function updatePackage(
  package_id: number,
  form: FormData,
): Promise<ActionResult> {
  try {
    const name = form.get("name");
    const expected_weight = form.get("expected_weight");
    const minimum_weight = form.get("minimum_weight");
    const maximum_weight = form.get("maximum_weight");
    console.log(
      name,
      expected_weight,
      minimum_weight,
      maximum_weight,
      package_id,
    );
    await server.put(`/packages/update/${package_id}`, {
      name,
      expected_weight,
      minimum_weight,
      maximum_weight,
    });
    revalidatePath("/packages");
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al actualizar paquete"),
    };
  }
  redirect("/packages");
}

export async function restoreScale(scale_id: number): Promise<ActionResult> {
  try {
    await server.put(`/scales/restore/${scale_id}`);
    revalidatePath("/scales");
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al restaurar balanza"),
    };
  }
  redirect("/scales");
}

export async function restorePackage(
  package_id: number,
): Promise<ActionResult> {
  try {
    await server.put(`/packages/restore/${package_id}`);
    revalidatePath("/packages");
  } catch (error) {
    return {
      success: false,
      error: getErrorMessage(error, "Error al restaurar paquete"),
    };
  }
  redirect("/packages");
}
