"use client";

import { Package } from "@/components/packages/package";
import { CreateButton } from "@/components/utils/createButton";
import { getAllPackages } from "@/lib/action";
import { ResponsePackages } from "@/lib/definition";
import { useEffect, useState } from "react";

export default function Page() {
  const [packages, setPackages] = useState<ResponsePackages[]>([]);

  useEffect(() => {
    getAllPackages().then((data) => setPackages(data));
  }, []);

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl text-black py">Paquetes</h1>
        <div className="flex items-center justify-between gap-2">
          <CreateButton
            nombre="Paquete"
            path="/packages/create"
            disabled={false}
          />
        </div>
      </div>
      <div className="w-full border m-2" />
      <div className="flex flex-wrap bg-white text-black w-full overflow-y-auto max-h-svh scroll-pb-1.5">
        {packages?.map((package_) => (
          <Package
            key={package_.package_id}
            package_id={package_.package_id}
            name={package_.name}
            minimum_weight={package_.minimum_weight}
            maximum_weight={package_.maximum_weight}
            expected_weight={package_.expected_weight}
          />
        ))}
      </div>
    </div>
  );
}
