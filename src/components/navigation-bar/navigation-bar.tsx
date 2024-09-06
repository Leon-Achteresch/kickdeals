"use client";

import Link from "next/link";
import UserDropdown from "../user-dropdown/user-dropdown";
import { useIsMobile } from "@/src/hooks/useIsMobile";
import { NavigationList } from "@/src/Declarations/navigation";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const NavigationBar = () => {
  const isMobile = useIsMobile();
  const pathname = usePathname();

  if (isMobile) {
    return (
      <>
        <nav className="fixed top-0 left-0 w-full right-0 bg-white shadow-md z-50">
          <div className="flex justify-between items-center p-4">
            <Link href={"/"} className="text-xl font-bold text-green-600">
              KICKDEALS
            </Link>
            <UserDropdown />
          </div>
        </nav>
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t w-full p-2 h-20 z-50">
          <div className="flex justify-around items-center h-full">
            {NavigationList.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={clsx(
                  "flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200",
                  { "text-green-600": pathname === item.href }
                )}
              >
                <item.icon className="text-xl" />
                <span className="text-xs">{item.name}</span>
              </Link>
            ))}
          </div>
        </nav>
        <div className="h-16"></div>
        <div className="h-16"></div>
      </>
    );
  } else {
    return (
      <nav className="bg-white shadow-md w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href={"/"} className="text-xl font-bold text-green-600">
                KICKDEALS
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {NavigationList.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={clsx(
                      "flex flex-col items-center text-gray-600 hover:text-blue-600 transition-colors duration-200",
                      { " bg-green-600 p-2 rounded-xl text-white": pathname === item.href }
                    )}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
            <UserDropdown />
          </div>
        </div>
      </nav>
    );
  }
};

export default NavigationBar;
