import { getAllPackages, getAllScales, getWeights } from "@/lib/action";
import ScalesStats from "@/components/stats/scalesStats";
import PackagesStats from "@/components/stats/packagesStats";

export default async function Page() {
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

  return (
    <div className="w-full bg-white min-h-screen">
      <div className="w-full flex flex-row justify-between mb-4">
        <h1 className="text-2xl text-black">Estadísticas</h1>
      </div>
      <div className="w-full border m-2" />
      <div className="flex flex-col gap-6">
        <ScalesStats weights={oldWeights} scales={scales} packages={packages} />
      </div>
      <div className="flex flex-col gap-6 mt-6">
        <PackagesStats
          weights={oldWeights}
          scales={scales}
          packages={packages}
        />
      </div>
    </div>
  );
}
