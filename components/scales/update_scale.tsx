"use client";

import { updateScale } from "@/lib/action";
import { ResponsePackages, ResponseScales } from "@/lib/definition";
import { useToast } from "@/components/ui/toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "../utils/button";
import { useEffect, useState } from "react";

export default function Form({
  scale,
  packages,
}: {
  scale: ResponseScales;
  packages: ResponsePackages[];
}) {
  let lengthSelectedPackages = scale.packages.length;
  const maxPackages = 8;
  const [isDisabled, setIsDisabled] = useState(false);
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    setIsDisabled(lengthSelectedPackages > maxPackages);
  }, [lengthSelectedPackages, maxPackages]);

  const managePackages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      lengthSelectedPackages++;
    } else {
      lengthSelectedPackages--;
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await updateScale(scale.scale_id, formData);
    if (!result.success) {
      showToast(result.error || "Error al actualizar la balanza", "error");
      return;
    }
    showToast("Balanza actualizada correctamente", "success");
    router.push("/scales");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-100 p-4 md:p-6">
        <div className="mb-4">
          <label
            className="mb-2 block text-l font-medium text-black"
            htmlFor="scale_id"
          >
            Ingrese un identificador
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="name"
                name="name"
                type="string"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 text-black"
                defaultValue={scale.name}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="packages"
            className="mb-2 block text-l text-black font-medium"
          >
            Seleccione los paquetes
          </label>
          <div className="relative">
            {packages.map((package_) => (
              <div key={package_.package_id} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`package_${package_.package_id}`}
                  name="package_id"
                  value={package_.package_id}
                  className="mr-2"
                  defaultChecked={scale.packages
                    .map((p) => p.package_id)
                    .includes(package_.package_id)}
                  onChange={managePackages}
                />
                <label
                  htmlFor={`package_${package_.package_id}`}
                  className="text-sm text-black"
                >
                  {package_.name}
                </label>
              </div>
            ))}
          </div>
          {isDisabled ? (
            <div className="text-red-700 bg-red-100 p-3 rounded mb-4">
              La cantidad máxima de paquetes por balanza es {maxPackages}
            </div>
          ) : null}
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/scales"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancelar
            </Link>
            <Button type="submit" disabled={isDisabled}>
              Confirmar
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
