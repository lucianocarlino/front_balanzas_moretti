import { DownloadWeights } from "@/components/data/download";
import { getAllPackages, getAllScales, getWeights } from "@/lib/action";
import FilterTable from "@/components/data/FilterTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const packagesResult = await getAllPackages();
  const scalesResult = await getAllScales();

  if (!packagesResult.success || !scalesResult.success) {
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

  const oldWeights = weightsResult.data!;
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
