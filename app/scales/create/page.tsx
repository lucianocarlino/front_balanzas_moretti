"use client";

import Form from "@/components/scales/create_scale";
import RestoreScaleForm from "@/components/scales/restore_scale";
import {
  getAllPackages,
  getAvailableAddresses,
  getAllScales,
} from "@/lib/action";
import { ResponsePackages, ResponseScales } from "@/lib/definition";
import { useEffect, useState } from "react";

export default function Page() {
  const [packages, setPackages] = useState<ResponsePackages[]>([]);
  const [available_addresses, setAvailableAddresses] = useState<number[]>([]);
  const [deletedScales, setDeletedScales] = useState<ResponseScales[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllPackages().then((result) => {
      if (result.success) {
        setPackages(result.data!.filter((pkg) => pkg.active));
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
    getAllScales().then((result) => {
      if (result.success) {
        setDeletedScales(result.data!.filter((scale) => !scale.active));
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
      <RestoreScaleForm deletedScales={deletedScales} />
    </div>
  );
}
