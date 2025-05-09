import Link from "next/link";
import { PlusCircleIcon } from "@heroicons/react/24/outline";

export function CreateButton({
  nombre,
  path,
  disabled = false,
}: {
  nombre: string;
  path: string;
  disabled: boolean;
}) {
  if (!disabled) {
    return (
      <Link
        href={path}
        className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
      >
        <span className="hidden md:block">Agregar {nombre}</span>{" "}
        <PlusCircleIcon className="h-5 md:ml-4" />
      </Link>
    );
  } else {
    return (
      <Link
        href={path.replace("/create", "")}
        className="flex h-10 items-center rounded-lg bg-blue-300 px-4 text-sm font-medium text-white cursor-not-allowed"
      >
        <span className="hidden md:block">Agregar {nombre}</span>{" "}
        <PlusCircleIcon className="h-5 md:ml-4" />
      </Link>
    );
  }
}
