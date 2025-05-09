export function TableRowSkeleton() {
    return (
      <tr className="w-full border-b py-3 text-sm last-of-type:border-none 
                      [&:first-child>td:first-child]:rounded-tl-lg 
                      [&:first-child>td:last-child]:rounded-tr-lg 
                      [&:last-child>td:first-child]:rounded-bl-lg 
                      [&:last-child>td:last-child]:rounded-br-lg text-center">
        {/* Id */}
        <td className="whitespace-nowrap py-3 px-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Container */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Line */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Date */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Peso inicial */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
        {/* Peso final */}
        <td className="whitespace-nowrap px-3 py-3">
          <div className="h-6 w-16 rounded bg-gray-100"></div>
        </td>
      </tr>
    );
  }