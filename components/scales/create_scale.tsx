"use client";

import { createScale } from "@/lib/action";
import { ResponsePackages } from "@/lib/definition";
import Link from "next/link";
import { Button } from "../utils/button";
import { useEffect, useState } from "react";

export default function Form({
  packages,
  available_addresses,
}: {
  packages: ResponsePackages[];
  available_addresses: number[];
}) {
  const [lengthSelectedPackages, setLengthSelectedPackages] = useState(0);
  const maxPackages = 8;
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    setIsDisabled(lengthSelectedPackages > maxPackages);
  }, [lengthSelectedPackages, maxPackages]);

  const managePackages = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setLengthSelectedPackages(lengthSelectedPackages + 1);
    } else {
      setLengthSelectedPackages(lengthSelectedPackages - 1);
    }
    console.log(lengthSelectedPackages);
  };

  return (
    <form action={createScale.bind(null)}>
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
                name="name"
                type="string"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 placeholder:text-gray-500 text-black"
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="packages"
            className="mb-2 block text-l text-black font-medium"
          >
            Seleccione los paquetes (maximo {maxPackages})
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
        </div>
        <div className="mb-4">
          <label
            htmlFor="addresses"
            className="mb-2 block text-l text-black font-medium"
          >
            Seleccione una direccion
          </label>
          <div className="relative">
            {available_addresses.map((address) => (
              <div key={address} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={`${address}`}
                  name="address"
                  value={address}
                  className="mr-2"
                />
                <label htmlFor={`${address}`} className="text-sm text-black">
                  {address}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <div className="mt-6 flex justify-end gap-4">
            <Link
              href="/scales"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancelar
            </Link>
            <Button type="submit" disabled={isDisabled}>
              Agregar balanza
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
