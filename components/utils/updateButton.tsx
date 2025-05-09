import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export function UpdateButton({ id, type }: { id: string, type: "scales" | "packages" }) {
    return (
      <Link
        href={`/${type}/update/${id}`}
        className="rounded-md p-2 hover:bg-gray-100"
      >
        <PencilIcon className="w-5" />
      </Link>
    );
  }