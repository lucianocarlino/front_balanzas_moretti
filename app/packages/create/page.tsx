"use client";

import Form from "@/components/packages/create_package";
import RestorePackageForm from "@/components/packages/restore_package";
import { getAllPackages } from "@/lib/action";
import { ResponsePackages } from "@/lib/definition";
import { useEffect, useState } from "react";

export default function Page() {
  const [deletedPackages, setDeletedPackages] = useState<ResponsePackages[]>(
    [],
  );

  useEffect(() => {
    getAllPackages().then((result) => {
      if (result.success) {
        setDeletedPackages(result.data!.filter((pkg) => !pkg.active));
      }
    });
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl text-black py">Nuevo paquete</h1>
      </div>
      <div className="w-full border m-2" />
      <Form />
      <RestorePackageForm deletedPackages={deletedPackages} />
    </div>
  );
}
