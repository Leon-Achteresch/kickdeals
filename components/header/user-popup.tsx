"use client";

import { Button } from "@/components/ui/button";
import { signOutAction } from "@/app/actions";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  User,
  UserPlus,
  Settings,
  Package,
  LogOut,
  LogIn,
  UserCircle,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

interface UserPopupProps {
  userEmail?: string | null;
}

export default function UserPopup({ userEmail }: UserPopupProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full w-9 h-9 min-w-0 p-0 aspect-square flex items-center justify-center border border-input bg-background/80 backdrop-blur-sm hover:bg-primary/10 transition-all"
          aria-label={userEmail ? "Benutzer-Menü" : "Anmelden"}
        >
          {userEmail ? (
            <UserCircle className="h-5 w-5 text-primary" />
          ) : (
            <User className="h-5 w-5 text-muted-foreground" />
          )}
        </Button>
      </SheetTrigger>
      <SheetContent
        side="bottom"
        className="h-auto max-h-[75vh] rounded-t-xl border-t border-border/60 bg-card/95 backdrop-blur-md"
      >
        <SheetHeader className="pb-2 border-b border-border/20">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent inline-block">
            {userEmail ? "Mein Konto" : "Anmelden"}
          </SheetTitle>
        </SheetHeader>

        <div className="py-6">
          {userEmail ? (
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 bg-background/50 p-3 rounded-lg border border-border/40">
                <div className="bg-primary/10 p-2 rounded-full">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{userEmail}</span>
                  <span className="text-xs text-muted-foreground">
                    Eingeloggt
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <SheetClose asChild>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full justify-start gap-2 bg-background/50 border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  >
                    <Link href="/profile" className="flex items-center">
                      <UserCircle className="h-4 w-4 text-primary" />
                      <span>Mein Profil</span>
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full justify-start gap-2 bg-background/50 border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  >
                    <Link href="/orders" className="flex items-center">
                      <Package className="h-4 w-4 text-primary" />
                      <span>Bestellungen</span>
                    </Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full justify-start gap-2 bg-background/50 border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all"
                  >
                    <Link href="/settings" className="flex items-center">
                      <Settings className="h-4 w-4 text-primary" />
                      <span>Einstellungen</span>
                    </Link>
                  </Button>
                </SheetClose>

                <form action={signOutAction} className="w-full">
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      variant="outline"
                      className="w-full justify-start gap-2 bg-background/50 border-red-500/20 text-red-500 hover:bg-red-500/10 hover:border-red-500/30 transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Abmelden</span>
                    </Button>
                  </SheetClose>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-2">
              <SheetClose asChild>
                <Button
                  asChild
                  className="w-full group relative bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary text-white py-6 rounded-lg flex items-center justify-between px-4 shadow-md transition-all duration-300"
                >
                  <Link
                    href="/sign-in"
                    className="flex w-full items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-white/20 p-2 rounded-full">
                        <LogIn className="h-5 w-5" />
                      </div>
                      <div className="text-left">
                        <span className="font-medium">Anmelden</span>
                        <p className="text-xs text-white/80">
                          Mit deinem Konto einloggen
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group relative bg-background/50 border-border/40 py-6 rounded-lg flex items-center justify-between px-4 hover:bg-primary/5 transition-all"
                >
                  <Link
                    href="/sign-up"
                    className="flex w-full items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <UserPlus className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-left">
                        <span className="font-medium">Registrieren</span>
                        <p className="text-xs text-muted-foreground">
                          Neues Konto erstellen
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </SheetClose>

              <div className="bg-primary/5 rounded-lg p-4 mt-2 border border-primary/10">
                <div className="flex items-center gap-3 mb-2">
                  <ShoppingBag className="h-5 w-5 text-primary" />
                  <span className="font-medium text-sm">Deine Vorteile</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Melde dich an, um deine Favoriten zu speichern und exklusive
                  Angebote zu erhalten.
                </p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
