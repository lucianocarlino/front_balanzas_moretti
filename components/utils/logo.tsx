import Image from "next/image"

export default function Logo (){
    return (
        <div>
            <Image src="/cyc.png" alt="logo" width={450} height={450} className="pb-4"/>
        </div>
    )
}