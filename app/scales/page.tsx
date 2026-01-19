"use client";

import { Scale } from "@/components/scales/scale";
import { CreateButton } from "@/components/utils/createButton";
import { getAllScales } from "@/lib/action";
import { ResponseScales } from "@/lib/definition";
import { useEffect, useState } from "react";

export default function Page() {
  const [scales, setScales] = useState<ResponseScales[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAllScales().then((result) => {
      if (result.success) {
        setScales(result.data!);
      } else {
        setError(result.error || "Error al cargar las balanzas");
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
        <h1 className="text-3xl text-black py">Balanzas</h1>
        <div className="flex items-center justify-between gap-2">
          <CreateButton
            nombre="Balanza"
            path="/scales/create"
            disabled={true}
          />
        </div>
      </div>
      <div className="w-full border m-2" />
      <div className="flex flex-wrap bg-white text-black w-full overflow-y-auto max-h-svh scroll-pb-1.5">
        {scales?.map((scale) => (
          <Scale
            key={scale.scale_id}
            scale_id={scale.scale_id}
            name={scale.name}
            slave_address={scale.slave_address}
            status={scale.online}
            packages={scale.packages}
          />
        ))}
      </div>
    </div>
  );
}
