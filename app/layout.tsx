import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Roboto } from "next/font/google";
import { Bebas_Neue } from "next/font/google";
import Navigation from "@/components/header/navigation";
import { PostHogProvider } from "@/components/PostHogProvider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "KICKCOMPARE - Die besten Angebote für Sportschuhe",
  description:
    "Finde die besten Angebote für Sportschuhe deiner Lieblingsmarken",
};

const roboto = Roboto({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${roboto.variable} ${bebasNeue.variable}`}
      suppressHydrationWarning
    >
      <body className="bg-background text-foreground">
        <PostHogProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="flex flex-col min-h-screen w-full">
              {/* Header-Bereich - fixiert */}
              <div className="sticky top-0 z-40 w-full">
                <Navigation />
              </div>

              {/* Hauptinhalt - scrollbar */}
              <main className="flex-1 w-full overflow-y-auto px-4 sm:px-5">
                <div className="mx-auto max-w-5xl w-full pt-6 pb-20 md:pb-10">
                  {children}
                </div>
              </main>
            </div>
          </ThemeProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
