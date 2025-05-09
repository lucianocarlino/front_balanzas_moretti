'use client'

import Form from "@/components/packages/create_package";


export default function Page(){

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl text-black py">Nuevo paquete</h1>   
            </div>
            <div className="w-full border m-2"/>
            <Form />
        </div>
    )
}