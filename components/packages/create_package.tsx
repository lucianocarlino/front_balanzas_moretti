"use client";

import Link from "next/link";
import { Button } from "../utils/button";
import { createPackage } from "@/lib/action";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";

export default function Form() {
  const { showToast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createPackage(formData);
    if (!result.success) {
      showToast(result.error || "Error al crear el paquete", "error");
      return;
    }
    showToast("Paquete creado correctamente", "success");
    router.push("/packages");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-100 p-4 md:p-6">
        <div className="mb-4">
          <label
            className="mb-2 block text-l font-medium text-black"
            htmlFor="scale_id"
          >
            Ingrese un nombre
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 text-black"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-l font-medium text-black"
            htmlFor="scale_id"
          >
            Ingrese el <b>peso esperado</b>
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="expected_weight"
                name="expected_weight"
                type="number"
                step="0.01"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 text-black"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-l font-medium text-black"
            htmlFor="scale_id"
          >
            Ingrese el <b>peso minimo</b> aceptado
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="minimum_weight"
                name="minimum_weight"
                type="number"
                step="0.01"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 text-black"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            className="mb-2 block text-l font-medium text-black"
            htmlFor="scale_id"
          >
            Ingrese el <b>peso maximo</b> aceptado
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="maximum_weight"
                name="maximum_weight"
                type="number"
                step="0.01"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 text-black"
              />
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <Link
            href="/packages"
            className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            Cancelar
          </Link>
          <Button type="submit">Crear paquete</Button>
        </div>
      </div>
    </form>
  );
}
