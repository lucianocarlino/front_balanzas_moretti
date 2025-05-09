import React from "react";

export default function Layout({ children } : {children: React.ReactNode}){
    return (
        <div className="flex-1 flex-col md:flex-row md:overflow-hidden bg-white place-items-start w-full">
            {children}
        </div>
    )
}