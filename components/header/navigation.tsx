import Link from "next/link";
import { Button } from "../ui/button";
import { createClient } from "@/utils/supabase/server";
import { signOutAction } from "@/app/actions";
import Logo from "./logo";
import MobileTabBar from "./mobile-tab-bar";
import UserPopup from "./user-popup";
import { ThemeToggle } from "../ui/theme-toggle";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Input } from "@/components/ui/input";
import { UserCircle, Settings, Heart, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default async function Navigation() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <>
      <header className="w-full border-b border-b-foreground/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-2 sm:px-4">
          <div className="flex items-center gap-2 sm:gap-6">
            <Link href="/" className="transition-opacity hover:opacity-80">
              <Logo />
            </Link>
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/browse">Stöbern</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/offers">Angebote</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {/* <NavigationMenuItem>
                  <NavigationMenuTrigger>Marken</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {[
                        "Nike",
                        "Adidas",
                        "Puma",
                        "New Balance",
                        "Under Armor",
                        "Mizuno",
                      ].map((brand) => (
                        <li key={brand} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <Link
                              href={`/brands/${brand.toLowerCase()}`}
                              className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {brand}
                              </div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                Die besten Angebote für {brand} Schuhe.
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem> */}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/news">Neuheiten</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            {/* Einstellungen */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>

            {/* Desktop-Authentifizierung */}
            <div className="hidden md:flex">
              {user ? (
                <div className="flex items-center gap-4">
                  <Button asChild size="sm" variant="outline" className="gap-1">
                    <Link href="/favorites">
                      <Heart className="h-4 w-4 text-primary" />
                      <span>Favoriten</span>
                    </Link>
                  </Button>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 px-3 bg-background/80 border border-border hover:bg-background/90"
                      >
                        <div className="flex items-center gap-2">
                          <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                            <UserCircle className="h-5 w-5 text-primary" />
                          </div>
                          <span>{user.email?.split("@")[0]}</span>
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56 p-2">
                      <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
                        {user.email}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="gap-2 cursor-pointer"
                      >
                        <Link href="/profile">
                          <UserCircle className="h-4 w-4 text-primary" />
                          <span>Mein Profil</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="gap-2 cursor-pointer"
                      >
                        <Link href="/settings">
                          <Settings className="h-4 w-4 text-primary" />
                          <span>Einstellungen</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        asChild
                        className="gap-2 cursor-pointer text-red-500 focus:text-red-500"
                      >
                        <form action={signOutAction} className="w-full">
                          <button
                            type="submit"
                            className="flex w-full items-center gap-2"
                          >
                            <LogOut className="h-4 w-4" />
                            <span>Abmelden</span>
                          </button>
                        </form>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/sign-in">Anmelden</Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="default"
                    className="bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary border-none"
                  >
                    <Link href="/sign-up">Registrieren</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Mobile-Authentifizierung - optimiert für kleine Displays */}
            <div className="md:hidden">
              <UserPopup userEmail={user?.email} />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Tab Bar - nur auf mobilen Geräten sichtbar */}
      <MobileTabBar />
    </>
  );
}
