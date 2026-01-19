"use client";

import { restoreScale } from "@/lib/action";
import { ResponseScales } from "@/lib/definition";
import { useToast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { Button } from "../utils/button";
import { useState } from "react";

export default function RestoreScaleForm({
  deletedScales,
}: {
  deletedScales: ResponseScales[];
}) {
  const { showToast } = useToast();
  const router = useRouter();
  const [selectedScaleId, setSelectedScaleId] = useState<number | null>(null);

  const handleRestore = async () => {
    if (!selectedScaleId) {
      showToast("Seleccione una balanza para restaurar", "error");
      return;
    }
    const result = await restoreScale(selectedScaleId);
    if (!result.success) {
      showToast(result.error || "Error al restaurar la balanza", "error");
      return;
    }
    showToast("Balanza restaurada correctamente", "success");
    router.refresh();
  };

  if (deletedScales.length === 0) {
    return null;
  }

  return (
    <div className="rounded-md bg-gray-100 p-4 md:p-6 mt-6">
      <h2 className="mb-4 text-lg font-medium text-black">
        Recuperar balanza eliminada
      </h2>
      <div className="mb-4">
        <label
          htmlFor="deleted_scale"
          className="mb-2 block text-l text-black font-medium"
        >
          Seleccione una balanza
        </label>
        <select
          id="deleted_scale"
          className="peer block w-full rounded-md border border-gray-200 py-2 pl-5 text-sm outline-2 text-black bg-white"
          value={selectedScaleId ?? ""}
          onChange={(e) => setSelectedScaleId(Number(e.target.value) || null)}
        >
          <option value="">-- Seleccionar --</option>
          {deletedScales.map((scale) => (
            <option key={scale.scale_id} value={scale.scale_id}>
              {scale.name} (Dirección: {scale.slave_address})
            </option>
          ))}
        </select>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button
          type="button"
          onClick={handleRestore}
          disabled={!selectedScaleId}
        >
          Restaurar balanza
        </Button>
      </div>
    </div>
  );
}
