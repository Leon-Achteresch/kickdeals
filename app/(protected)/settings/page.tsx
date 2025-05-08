"use client";

import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTheme } from "next-themes";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import {
  User,
  Mail,
  Lock,
  Bell,
  Moon,
  Sun,
  Laptop,
  ShieldCheck,
  Trash2,
  Save,
  ChevronRight,
  KeyRound,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function SettingsPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [notifications, setNotifications] = useState({
    email: true,
    offers: true,
    newProducts: false,
  });

  const supabase = createClient();

  useEffect(() => {
    async function loadUserProfile() {
      try {
        setLoading(true);
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          setEmail(user.email || "");
          // Benutzernamen aus E-Mail extrahieren
          const usernameFromEmail = user.email?.split("@")[0] || "";
          setUsername(usernameFromEmail);
        }
      } catch (error) {
        console.error("Fehler beim Laden des Profils:", error);
      } finally {
        setLoading(false);
      }
    }

    loadUserProfile();
  }, [supabase]);

  const saveProfile = async () => {
    try {
      toast.success("Einstellungen wurden gespeichert");
    } catch (error) {
      toast.error("Fehler beim Speichern der Einstellungen");
      console.error(error);
    }
  };

  const goToResetPassword = () => {
    router.push("/reset-password");
  };

  const getInitials = (email: string) => {
    const username = email.split("@")[0];
    return username.substring(0, 2).toUpperCase();
  };

  return (
    <div className="w-full max-w-4xl mx-auto pb-16">
      <div className="mb-8 px-4 sm:px-0">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent inline-block">
          Einstellungen
        </h1>
        <p className="text-muted-foreground mt-1">
          Verwalte dein Konto und deine Präferenzen
        </p>
      </div>

      {/* Profil-Karte für Mobile - immer sichtbar */}
      <div className="block lg:hidden mb-8 px-4">
        <Card className="border-none shadow-lg bg-gradient-to-br from-primary/5 to-indigo-500/5">
          <CardContent className="pt-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16 border-2 border-primary">
                <AvatarFallback className="bg-primary/10 text-primary font-medium">
                  {getInitials(email)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">{username}</h2>
                <p className="text-sm text-muted-foreground">{email}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <div className="px-4 sm:px-0">
          <TabsList className="grid grid-cols-3 w-full h-auto p-1 mb-8 rounded-lg bg-muted/50">
            <TabsTrigger value="profile" className="flex gap-2 py-2.5">
              <User size={16} />
              <span className="hidden sm:inline">Profil</span>
            </TabsTrigger>
            <TabsTrigger value="appearance" className="flex gap-2 py-2.5">
              <Sun size={16} />
              <span className="hidden sm:inline">Aussehen</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex gap-2 py-2.5">
              <Bell size={16} />
              <span className="hidden sm:inline">Benachrichtigungen</span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="profile" className="space-y-6 px-4 sm:px-0 mt-0">
          {/* Desktop Profil-Header - nur auf großen Bildschirmen */}
          <Card className="hidden lg:block border-none shadow-lg bg-gradient-to-br from-primary/5 to-indigo-500/5">
            <CardContent className="pt-6 pb-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-20 w-20 border-2 border-primary">
                  <AvatarFallback className="bg-primary/10 text-primary font-medium text-xl">
                    {getInitials(email)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-semibold">{username}</h2>
                  <p className="text-muted-foreground">{email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle>Profil</CardTitle>
              <CardDescription>
                Verwalte deine persönlichen Daten
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">E-Mail</Label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <Mail size={18} />
                  </div>
                  <Input
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    disabled
                  />
                </div>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="w-full justify-between hover:bg-primary/5 hover:border-primary/50 transition-all group"
                  onClick={goToResetPassword}
                >
                  <div className="flex items-center gap-3">
                    <KeyRound size={18} className="text-primary" />
                    <span>Passwort zurücksetzen</span>
                  </div>
                  <ChevronRight
                    size={16}
                    className="text-muted-foreground group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
              <Button
                variant="outline"
                className="gap-2 w-full sm:w-auto order-2 sm:order-1 hover:bg-red-500/5 hover:text-red-500 hover:border-red-200"
              >
                <Trash2 size={16} className="text-red-500" />
                <span>Konto löschen</span>
              </Button>
              <Button
                variant="default"
                className="bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary gap-2 w-full sm:w-auto order-1 sm:order-2"
                onClick={saveProfile}
              >
                <Save size={16} />
                <span>Speichern</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6 px-4 sm:px-0 mt-0">
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle>Aussehen</CardTitle>
              <CardDescription>
                Passe das Erscheinungsbild der Anwendung an
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-base font-medium">Farbschema</Label>
                <div className="grid grid-cols-3 gap-3 mt-3">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className={`flex flex-col items-center gap-2 h-auto py-4 ${
                      theme === "light"
                        ? "bg-gradient-to-r from-primary to-indigo-500 text-white"
                        : ""
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun size={18} />
                    <span>Hell</span>
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className={`flex flex-col items-center gap-2 h-auto py-4 ${
                      theme === "dark"
                        ? "bg-gradient-to-r from-primary to-indigo-500 text-white"
                        : ""
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon size={18} />
                    <span>Dunkel</span>
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className={`flex flex-col items-center gap-2 h-auto py-4 ${
                      theme === "system"
                        ? "bg-gradient-to-r from-primary to-indigo-500 text-white"
                        : ""
                    }`}
                    onClick={() => setTheme("system")}
                  >
                    <Laptop size={18} />
                    <span>System</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent
          value="notifications"
          className="space-y-6 px-4 sm:px-0 mt-0"
        >
          <Card className="border shadow-md">
            <CardHeader>
              <CardTitle>Benachrichtigungen</CardTitle>
              <CardDescription>
                Konfiguriere, wie und wann du benachrichtigt werden möchtest
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div className="flex items-center justify-between bg-background/80 border border-input/40 rounded-lg p-4 hover:bg-background transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Mail size={16} className="text-primary" />
                      <Label className="font-medium">
                        E-Mail-Benachrichtigungen
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Erhalte wichtige Updates per E-Mail
                    </p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onCheckedChange={(checked: boolean) =>
                      setNotifications({ ...notifications, email: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between bg-background/80 border border-input/40 rounded-lg p-4 hover:bg-background transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <ShieldCheck size={16} className="text-primary" />
                      <Label className="font-medium">
                        Angebote und Rabatte
                      </Label>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Erhalte Benachrichtigungen zu neuen Angeboten
                    </p>
                  </div>
                  <Switch
                    checked={notifications.offers}
                    onCheckedChange={(checked: boolean) =>
                      setNotifications({ ...notifications, offers: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between bg-background/80 border border-input/40 rounded-lg p-4 hover:bg-background transition-colors">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Bell size={16} className="text-primary" />
                      <Label className="font-medium">Neue Produkte</Label>
                    </div>
                    <p className="text-sm text-muted-foreground max-w-xs">
                      Benachrichtigungen über neue Produkte
                    </p>
                  </div>
                  <Switch
                    checked={notifications.newProducts}
                    onCheckedChange={(checked: boolean) =>
                      setNotifications({
                        ...notifications,
                        newProducts: checked,
                      })
                    }
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary gap-2"
                onClick={saveProfile}
              >
                <Save size={16} />
                <span>Einstellungen speichern</span>
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
