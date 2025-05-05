"use client";

import Link from "next/link";
import {
  HomeIcon,
  SearchIcon,
  Heart,
  Menu,
  ShoppingBag,
  SunMoon,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";

export default function MobileTabBar() {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 z-50 w-full h-16 bg-background border-t border-border">
      <div className="grid h-full grid-cols-5 mx-auto">
        <Link
          href="/"
          className={`inline-flex flex-col items-center justify-center px-5 ${
            isActive("/") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <HomeIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Home</span>
        </Link>
        <Link
          href="/search"
          className={`inline-flex flex-col items-center justify-center px-5 ${
            pathname.startsWith("/search")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <SearchIcon className="w-6 h-6" />
          <span className="text-xs mt-1">Suche</span>
        </Link>
        <Link
          href="/offers"
          className={`inline-flex flex-col items-center justify-center px-5 ${
            pathname.startsWith("/offers")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <ShoppingBag className="w-6 h-6" />
          <span className="text-xs mt-1">Angebote</span>
        </Link>
        <Link
          href="/favorites"
          className={`inline-flex flex-col items-center justify-center px-5 ${
            pathname.startsWith("/favorites")
              ? "text-primary"
              : "text-muted-foreground"
          }`}
        >
          <Heart className="w-6 h-6" />
          <span className="text-xs mt-1">Favoriten</span>
        </Link>
        <button
          onClick={toggleTheme}
          className="inline-flex flex-col items-center justify-center px-5 text-muted-foreground"
        >
          <SunMoon className="w-6 h-6" />
          <span className="text-xs mt-1">Theme</span>
        </button>
      </div>
    </nav>
  );
}
