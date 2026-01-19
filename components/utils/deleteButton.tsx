"use client";

import { deletePackage, deleteScale } from "@/lib/action";
import { useToast } from "@/components/ui/toast";
import { TrashIcon } from "@heroicons/react/24/outline";

export function DeleteButton({
  id,
  type,
}: {
  id: string;
  type: "scales" | "packages";
}) {
  const { showToast } = useToast();

  const handleDelete = async () => {
    if (type === "packages") {
      const result = await deletePackage(Number(id));
      if (!result.success) {
        showToast(result.error || "Error al eliminar el paquete", "error");
        return;
      }
      showToast("Paquete eliminado correctamente", "success");
    } else if (type === "scales") {
      const result = await deleteScale(Number(id));
      if (!result.success) {
        showToast(result.error || "Error al eliminar la balanza", "error");
        return;
      }
      showToast("Balanza eliminada correctamente", "success");
    }
    window.location.reload();
  };

  return (
    <button className="rounded-md p-2 hover:bg-gray-100" onClick={handleDelete}>
      <TrashIcon className="w-5" />
    </button>
  );
}
