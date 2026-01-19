import Form from "@/components/packages/update_package";
import { getPackage } from "@/lib/action";

export default async function Page(props: { params: Promise<{ id: number }> }) {
  const params = await props.params;
  const package_id = params.id;

  const packageResult = await getPackage(package_id);

  if (!packageResult.success) {
    return (
      <div className="w-full bg-white p-4">
        <h1 className="text-2xl text-red-500">Error</h1>
        <p className="text-gray-600">{packageResult.error}</p>
      </div>
    );
  }

  const package_ = packageResult.data!;

  return (
    <div className="w-full">
      <div className="flex flex-row justify-between">
        <h1 className="text-3xl text-black py">Editar paquete</h1>
      </div>
      <div className="w-full border m-2" />
      <Form package_={package_} />
    </div>
  );
}
