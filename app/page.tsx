import { DownloadWeights } from "@/components/data/download";
import { getAllPackages, getAllScales, getWeights } from "@/lib/action";
import FilterTable from "@/components/data/FilterTable";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const packages = await getAllPackages();
  const scales = await getAllScales();
  const oldWeights = await getWeights(
    1000,
    "",
    "",
    packages.map((package_) => package_.package_id),
    scales.map((scale) => scale.scale_id)
  );

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
