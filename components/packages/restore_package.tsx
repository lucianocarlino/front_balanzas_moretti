"use client";

import { restorePackage } from "@/lib/action";
import { ResponsePackages } from "@/lib/definition";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "../utils/button";
import { useState } from "react";

export default function RestorePackageForm({
  deletedPackages,
}: {
  deletedPackages: ResponsePackages[];
}) {
  const { showToast } = useToast();
  const router = useRouter();
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(
    null,
  );

  const handleRestore = async () => {
    if (!selectedPackageId) {
      showToast("Seleccione un paquete para restaurar", "error");
      return;
    }
    const result = await restorePackage(selectedPackageId);
    if (!result.success) {
      showToast(result.error || "Error al restaurar el paquete", "error");
      return;
    }
    showToast("Paquete restaurado correctamente", "success");
    router.refresh();
  };

  if (deletedPackages.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md bg-gray-100 p-4 md:p-6 mt-6">
      <h2 className="mb-4 text-lg font-medium text-black">
        Recuperar paquete eliminado
      </h2>
      <div className="mb-4">
        <label
          htmlFor="deleted_package"
          className="mb-2 block text-l text-black font-medium"
        >
          Seleccione un paquete
        </label>
        <select
          id="deleted_package"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 text-black bg-white"
          value={selectedPackageId ?? ""}
          onChange={(e) => setSelectedPackageId(Number(e.target.value) || null)}
        >
          <option value="">-- Seleccionar --</option>
          {deletedPackages.map((pkg) => (
            <option key={pkg.package_id} value={pkg.package_id}>
              {pkg.name} (Peso esperado: {pkg.expected_weight}g)
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          type="button"
          onClick={handleRestore}
          disabled={!selectedPackageId}
        >
          Restaurar paquete
        </Button>
      </div>
    </div>
  );
}
