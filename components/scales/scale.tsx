import { ScaleIcon } from "@heroicons/react/24/outline";
import { DeleteButton } from "../utils/deleteButton";
import { UpdateButton } from "../utils/updateButton";
import { ResponsePackages } from "@/lib/definition";

export function Scale({
  scale_id,
  name,
  slave_address,
  status,
  packages,
}: {
  scale_id: number;
  name: string;
  slave_address: number;
  status: boolean;
  packages: ResponsePackages[];
}) {
  return (
    <div className="inline-flex flex-col m-auto my-3 border rounded-md mx-3 border-zinc-700 bg-gray-50 snap-start min-w-[14rem] max-w-[90%]">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <div className="flex items-center space-x-2 min-w-0">
          <ScaleIcon className="w-5 flex-shrink-0" />
          <h2 className="text-xl font-medium py-1 truncate">{name}</h2>
        </div>
        <div className="flex items-center space-x-2 flex-shrink-0">
          <UpdateButton id={`${scale_id}`} type="scales" />
          <DeleteButton id={`${scale_id}`} type="scales" />
        </div>
      </div>

      <div className="flex flex-col px-4 py-3 divide-y divide-zinc-200">
        <div className="flex items-center justify-between py-3">
          <p className="text-l font-medium">Estado:</p>
          <div className="flex items-center space-x-2">
            <span
              className={`${
                status ? "text-green-600" : "text-red-600"
              } px-2 py-1 text-l capitalize`}
            >
              {status ? "Online" : "Offline"}
            </span>
            <span
              className={`w-2 h-2 rounded-full ${
                status ? "bg-green-500" : "bg-red-500"
              } flex-shrink-0`}
              aria-hidden="true"
            />
          </div>
        </div>

        <div className="flex items-center justify-between py-3">
          <p className="text-l font-medium">Direccion modbus:</p>
          <p className="px-2 py-1 text-l">{slave_address}</p>
        </div>

        <div className="flex flex-col py-3">
          <p className="text-l font-medium mb-1">Paquetes:</p>
          <div className="flex flex-col space-y-1">
            {packages?.length ? (
              packages.map((package_) => (
                <div
                  key={package_.package_id}
                  className="flex items-center truncate rounded-xl px-2 py-1 text-l"
                >
                  <span className="w-2 h-2 bg-black rounded-full mr-2 flex-shrink-0" />
                  <span className="truncate">{package_.name}</span>
                </div>
              ))
            ) : (
              <span className="text-sm text-zinc-500">—</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
