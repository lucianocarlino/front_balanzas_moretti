"use client";

import Form from "@/components/scales/create_scale";
import { getAllPackages, getAvailableAddresses } from "@/lib/action";
import { ResponsePackages } from "@/lib/definition";
import { useEffect, useState } from "react";

export default function Page() {
  const [packages, setPackages] = useState<ResponsePackages[]>([]);
  const [available_addresses, setAvailableAddresses] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPackages().then((result) => {
      if (result.success) {
        setPackages(result.data!);
      } else {
        setError(result.error || "Error al cargar los paquetes");
      }
    });
    getAvailableAddresses().then((result) => {
      if (result.success) {
        setAvailableAddresses(result.data!);
      } else {
        setError(result.error || "Error al cargar las direcciones disponibles");
      }
    });
  }, []);

  if (error) {
    return (
      <div className="w-full bg-white p-4">
        <h1 className="text-2xl text-red-500">Error</h1>
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl text-black py">Nueva Balanza</h1>
      </div>
      <div className="w-full border m-2" />
      <Form packages={packages} available_addresses={available_addresses} />
    </div>
  );
}
