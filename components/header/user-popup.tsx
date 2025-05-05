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
          className="rounded-full w-8 h-8 min-w-0 p-0 aspect-square flex items-center justify-center border border-input"
          aria-label={userEmail ? "Benutzer-Menü" : "Anmelden"}
        >
          {userEmail ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M18 21a8 8 0 0 0-16 0" />
              <circle cx="10" cy="8" r="5" />
              <path d="M22 20c0-3.37-2-6.5-4-8a5 5 0 0 0-.45-8.3" />
            </svg>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-auto max-h-[75vh]">
        <SheetHeader>
          <SheetTitle>{userEmail ? "Mein Konto" : "Anmelden"}</SheetTitle>
        </SheetHeader>

        <div className="py-4">
          {userEmail ? (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span className="font-medium">{userEmail}</span>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-2">
                <SheetClose asChild>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/profile">Mein Profil</Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/orders">Bestellungen</Link>
                  </Button>
                </SheetClose>

                <SheetClose asChild>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/settings">Einstellungen</Link>
                  </Button>
                </SheetClose>

                <form action={signOutAction} className="w-full">
                  <SheetClose asChild>
                    <Button
                      type="submit"
                      variant="destructive"
                      className="w-full"
                    >
                      Abmelden
                    </Button>
                  </SheetClose>
                </form>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-3 py-4">
              <SheetClose asChild>
                <Button asChild variant="default" className="w-full">
                  <Link href="/sign-in">Anmelden</Link>
                </Button>
              </SheetClose>

              <SheetClose asChild>
                <Button asChild variant="outline" className="w-full">
                  <Link href="/sign-up">Registrieren</Link>
                </Button>
              </SheetClose>

              <div className="text-center text-sm text-muted-foreground mt-4">
                <p>
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
