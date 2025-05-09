'use client'

import Form from "@/components/scales/create_scale";
import { getAllPackages, getAvailableAddresses } from "@/lib/action";
import { ResponsePackages } from "@/lib/definition";
import { useEffect, useState } from "react";

export default function Page(){

    const [packages, setPackages] = useState<ResponsePackages[]>([])
    const [available_addresses, setAvailableAddresses] = useState<number[]>([])

    useEffect(() => {
        getAllPackages().then(data => setPackages(data));
        getAvailableAddresses().then(data => setAvailableAddresses(data));
    }, []);

    return (
        <div className="w-full">
            <div className="flex flex-row justify-between">
                <h1 className="text-3xl text-black py">Nueva Balanza</h1>   
            </div>
            <div className="w-full border m-2"/>
            <Form packages={packages} available_addresses={available_addresses}/>
        </div>
    )
}