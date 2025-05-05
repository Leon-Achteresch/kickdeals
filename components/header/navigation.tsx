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
                  <Link href="/browse" passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Stöbern
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/offers" passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Angebote
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
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
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link href="/new" passHref>
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      Neuheiten
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative hidden w-full max-w-sm md:flex">
              <Input
                type="search"
                placeholder="Suche..."
                className="w-full rounded-full"
              />
            </div>

            {/* Einstellungen */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>

            {/* Desktop-Authentifizierung */}
            <div className="hidden md:flex">
              {user ? (
                <div className="flex items-center gap-4">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/favorites">Favoriten</Link>
                  </Button>
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-sm">
                      Hey, {user.email?.split("@")[0]}!
                    </span>
                    <form action={signOutAction}>
                      <Button type="submit" size="sm" variant="outline">
                        Abmelden
                      </Button>
                    </form>
                  </div>
                </div>
              ) : (
                <div className="flex gap-2">
                  <Button asChild size="sm" variant="outline">
                    <Link href="/sign-in">Anmelden</Link>
                  </Button>
                  <Button asChild size="sm" variant="default">
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
