"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function getUserProfile() {
      setLoading(true);

      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.error("Fehler beim Laden des Benutzerprofils:", error);
        return;
      }

      if (user) {
        // Benutzer-Metadaten aus der Datenbank laden (wenn vorhanden)
        const { data: profileData } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        // Kombiniere Auth-Daten mit Profildaten
        setUser({ ...user, profile: profileData || {} });
      }

      setLoading(false);
    }

    getUserProfile();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Lade Profildaten...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profilkarte */}
        <div className="w-full md:w-1/3">
          <Card>
            <CardHeader className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage
                  src={user?.user_metadata?.avatar_url || ""}
                  alt={user?.email}
                />
                <AvatarFallback>
                  {user?.email?.substring(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <CardTitle>{user?.user_metadata?.name || user?.email}</CardTitle>
              <CardDescription>{user?.email}</CardDescription>
              <Badge className="mt-2">
                Mitglied seit {new Date(user?.created_at).toLocaleDateString()}
              </Badge>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-2">
                Standort: {user?.profile?.location || "Nicht angegeben"}
              </p>
              <p>Schuhgröße: {user?.profile?.shoe_size || "Nicht angegeben"}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs mit Profildaten */}
        <div className="w-full md:w-2/3">
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="personal">Persönliche Daten</TabsTrigger>
              <TabsTrigger value="favorites">Favoriten</TabsTrigger>
              <TabsTrigger value="orders">Bestellungen</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <Card>
                <CardHeader>
                  <CardTitle>Persönliche Daten</CardTitle>
                  <CardDescription>
                    Hier kannst du deine persönlichen Informationen einsehen.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium">Name</h3>
                      <p>{user?.user_metadata?.name || "Nicht angegeben"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">E-Mail</h3>
                      <p>{user?.email}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Telefon</h3>
                      <p>{user?.profile?.phone || "Nicht angegeben"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Adresse</h3>
                      <p>{user?.profile?.address || "Nicht angegeben"}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className="text-sm text-muted-foreground">
                    Letzte Aktualisierung:{" "}
                    {user?.updated_at
                      ? new Date(user.updated_at).toLocaleDateString()
                      : "Unbekannt"}
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>Favoriten</CardTitle>
                  <CardDescription>
                    Hier findest du deine gespeicherten Schuhe.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.profile?.favorites?.length ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Hier würden Favoriten angezeigt werden */}
                      <p>Favoriten werden hier angezeigt</p>
                    </div>
                  ) : (
                    <p>Du hast noch keine Favoriten gespeichert.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader>
                  <CardTitle>Bestellungen</CardTitle>
                  <CardDescription>
                    Hier findest du deine letzten Bestellungen.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {user?.profile?.orders?.length ? (
                    <div className="space-y-4">
                      {/* Hier würden Bestellungen angezeigt werden */}
                      <p>Bestellungen werden hier angezeigt</p>
                    </div>
                  ) : (
                    <p>Du hast noch keine Bestellungen aufgegeben.</p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
