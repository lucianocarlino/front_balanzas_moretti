import { DownloadWeights } from "@/components/data/download";
import { getAllPackages, getAllScales, getWeights } from "@/lib/action";
import FilterTable from "@/components/data/FilterTable";
import { ResponseWeights } from "@/lib/definition";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const packagesResult = await getAllPackages();
  const scalesResult = await getAllScales();

  console.log("[Page] packagesResult:", packagesResult);
  console.log("[Page] scalesResult:", scalesResult);

  if (!packagesResult.success || !scalesResult.success) {
    console.error("[Page] Error en getAllPackages o getAllScales");
    return (
      <div className="w-full bg-white p-4">
        <h1 className="text-2xl text-red-500">Error</h1>
        <p className="text-gray-600">
          {packagesResult.error || scalesResult.error}
        </p>
      </div>
    );
  }

  const packages = packagesResult.data!;
  const scales = scalesResult.data!;
  // If there are no packages or no scales, avoid calling getWeights and
  // treat weights as an empty list. Backend returns 200 + [] when there
  // are no packages/scales, so this prevents unnecessary error UI.
  let oldWeights: ResponseWeights[] = [];
  if (packages.length > 0 && scales.length > 0) {
    const weightsResult = await getWeights(
      1000,
      "",
      "",
      packages.map((package_) => package_.package_id),
      scales.map((scale) => scale.scale_id),
    );

    if (!weightsResult.success) {
      return (
        <div className="w-full bg-white p-4">
          <h1 className="text-2xl text-red-500">Error</h1>
          <p className="text-gray-600">{weightsResult.error}</p>
        </div>
      );
    }

    oldWeights = weightsResult.data!;
  }
  const resolvedSearchParams = await searchParams;
  const currentPage = Number(resolvedSearchParams.page) || 1;
  const totalPages = Math.ceil(oldWeights.length / 15);

  return (
    <div className="w-full bg-white">
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-2xl text-black py-2">Pesos</h1>
        <DownloadWeights />
      </div>
      <div className="w-full border m-2" />
      <FilterTable
        oldWeights={oldWeights}
        currentPage={currentPage}
        scales={scales}
        packages={packages}
        totalPages={totalPages}
      />
    </div>
  );
}
