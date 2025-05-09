import Form from "@/components/scales/update_scale";
import { getAllPackages, getScale } from "@/lib/action";

export default async function Page(props: { params: Promise<{ id: number }> }) {

    const params = await props.params;
    const scale_id = params.id;

    const [scale, packages] = await Promise.all([getScale(scale_id), getAllPackages()]);

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl text-black py">Editar balanza</h1>   
            </div>
            <div className="w-full border m-2"/>
            <Form scale={scale} packages={packages}/>
        </div>
    )
}