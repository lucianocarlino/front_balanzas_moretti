import type { TableWeights } from "@/lib/definition";
import { formatDate } from "@/lib/dataMapper";

export default function WeightsTable({ weights }: { weights: TableWeights[] }) {
  return (
    <div className="mt-2 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 md:pt-0 border-2">
          <div className="max-h-[500px] overflow-auto">
            <table className="min-w-full rounded-lg text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal text-center bg-gray-100 sticky top-0 z-10">
                <tr>
                  <th
                    scope="col"
                    className="px-4 py-5 font-medium border-r-2 border-b-2"
                  >
                    Id
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 font-medium border-r-2 border-b-2"
                  >
                    Envase
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 font-medium border-r-2 border-b-2"
                  >
                    Balanza
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 font-medium border-r-2 border-b-2"
                  >
                    Hora y fecha
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-5 font-medium border-r-2 border-b-2"
                  >
                    Peso inicial
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium border-b-2">
                    Peso final
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                {weights?.map((weight) => (
                  <tr
                    key={weight.id}
                    className="w-full border-b py-3 text-sm last-of-type:border-none 
                        [&:first-child>td:first-child]:rounded-tl-lg 
                        [&:first-child>td:last-child]:rounded-tr-lg 
                        [&:last-child>td:first-child]:rounded-bl-lg 
                        [&:last-child>td:last-child]:rounded-br-lg text-center"
                  >
                    <td className="whitespace-nowrap py-3 px-3">{weight.id}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {weight.package}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {weight.scale}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {formatDate(weight.date_time)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 text-center">
                      {weight.initial_weight}
                    </td>
                    <td className="whitespace-nowrap py-3 px-3 text-center">
                      {weight.final_weight}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
