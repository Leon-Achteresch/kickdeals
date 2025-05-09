import { resetPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, RefreshCw } from "lucide-react";

export default async function ResetPassword(props: {
  searchParams: Promise<Message>;
}) {
  const searchParams = await props.searchParams;
  return (
    <div className="w-full max-w-md mx-auto px-4 sm:px-0">
      <div className="bg-card p-6 sm:p-8 rounded-xl shadow-lg border border-border/40">
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
            Passwort zurücksetzen
          </h1>
          <p className="text-sm text-muted-foreground">
            Bitte gib dein neues Passwort ein.
          </p>
        </div>

        <form className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Neues Passwort
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock size={18} />
              </div>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Neues Passwort"
                required
                className="pl-10 bg-background/50 border-input/50 focus:border-primary transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium">
              Passwort bestätigen
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                <Lock size={18} />
              </div>
              <Input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Passwort bestätigen"
                required
                className="pl-10 bg-background/50 border-input/50 focus:border-primary transition-all"
              />
            </div>
          </div>

          <SubmitButton
            formAction={resetPasswordAction}
            className="group relative w-full py-3 bg-gradient-to-r from-primary to-indigo-500 hover:from-indigo-500 hover:to-primary text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              <RefreshCw
                size={18}
                className="group-hover:rotate-180 transition-transform duration-300"
              />
              <span className="group-hover:translate-y-0 transition-transform duration-300">
                Passwort zurücksetzen
              </span>
            </span>
            <span className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
          </SubmitButton>

          <FormMessage message={searchParams} />
        </form>
      </div>
    </div>
  );
}
