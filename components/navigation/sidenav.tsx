import Link from "next/link";
import Logo from "../utils/logo";
import NavLinks from "./nav-links";

export default function SideNav(){
    return (
        <div className="flex h-full flex-col px-3 py-4 my-1 rounded-md bg-gray-100 md:px-2">
          <Link
            className=" flex h-20 items-end justify-start p-4 md:h-30"
            href="/"
          >
            <div className="w-32 text-white items-center justify-center md:w-60">
              <Logo />
            </div>
          </Link>
          <div className="flex grow flex-row justify-up space-x-2 md:flex-col md:space-x-0 md:space-y-2">
            <NavLinks />
          </div>
        </div>
      );
}