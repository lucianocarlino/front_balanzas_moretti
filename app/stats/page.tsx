import { getAllPackages, getAllScales, getWeights } from "@/lib/action";
import ScalesStats from "@/components/stats/scalesStats";
import PackagesStats from "@/components/stats/packagesStats";

export default async function Page() {
  const packages = await getAllPackages();
  const scales = await getAllScales();
  const oldWeights = await getWeights(
    1000,
    "",
    "",
    packages.map((package_) => package_.package_id),
    scales.map((scale) => scale.scale_id)
  );

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
