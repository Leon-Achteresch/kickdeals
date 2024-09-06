"use client";

import Link from "next/link";
import UserDropdown from "../user-dropdown/user-dropdown";
import { NavigastionList } from "@/src/Declarations/navigation";
import { useIsMobile } from "@/src/hooks/useIsMobile";

const NavigationBar = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <>
        <nav className="flex justify-between items-center border-b w-full p-4">
          <div className="flex items-center font-semibold">
            <Link href={"/"}>KickDeals</Link>
          </div>
          <UserDropdown />
        </nav>
        <nav className="fixed bottom-0 left-0 right-0 bg-background border-t w-full p-4">
          <div className="flex justify-around items-center">
            {NavigastionList.map((item) => (
              <Link key={item.name} href={item.href} className="py-2 flex flex-col items-center">
                {item.icon && {}}
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
      </>
    );
  } else {
    return (
      <nav className="flex justify-between items-center border-b w-full p-4">
        <div className="flex items-center font-semibold">
          <Link href={"/"}>KickDeals</Link>
        </div>
        <div className="flex items-center space-x-4">
          {NavigastionList.map((item) => (
            <Link key={item.name} href={item.href} className="py-2">
              {item.name}
            </Link>
          ))}
        </div>
        <UserDropdown />
      </nav>
    );
  }
};

export default NavigationBar;