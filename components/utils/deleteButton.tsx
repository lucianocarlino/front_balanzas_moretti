import { deletePackage, deleteScale } from "@/lib/action";
import { TrashIcon } from "@heroicons/react/24/outline";


export function DeleteButton({ id, type }: { id: string, type: "scales" | "packages" }) {
  
  const handleDelete = async () => {
    if (type === "packages") {
      await deletePackage(Number(id));
    } else if (type === "scales") {
      await deleteScale(Number(id));
    }
    window.location.reload();
  }
  
  return (
      <button
        className="rounded-md p-2 hover:bg-gray-100"
        onClick={handleDelete}
      >
        <TrashIcon className="w-5" />
      </button>
    );
  }