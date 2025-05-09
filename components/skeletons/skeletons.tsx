import { TableRowSkeleton } from "./table_row_skeleton";

export function WeightsTableSkeleton() {
    return (
      <div className="mt-6 flow-root">
        <div className="inline-block min-w-full align-middle">
          <div className="rounded-lg bg-gray-50 md:pt-0 border">
            <table className="min-w-full rounded-lg text-gray-900 md:table">
              <thead className="rounded-lg text-left text-sm font-normal text-center bg-gray-100">
                <tr>
                  <th scope="col" className="px-4 py-5 font-medium">
                    Id
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Envase
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Linea
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Fecha y hora
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                    Peso inicial
                  </th>
                  <th scope="col" className="px-3 py-5 font-medium">
                   Peso final
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
                <TableRowSkeleton />
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
  