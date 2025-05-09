import Form from "@/components/packages/update_package";
import { getPackage } from "@/lib/action";


export default async function Page(props: {params: Promise<{ id: number }>}){

    const params = await props.params;
    const package_id = params.id;

    const package_ = await getPackage(package_id);

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl text-black py">Editar paquete</h1>   
            </div>
            <div className="w-full border m-2"/>
            <Form package_={package_}/>
        </div>
    )
}