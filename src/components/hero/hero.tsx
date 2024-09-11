import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { marken } from "@/src/Declarations/marken";
import Link from "next/link";
import { BiMedal, BiPurchaseTagAlt, BiSolidRadiation } from "react-icons/bi";

const Hero = () => {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold mb-4 text1">
        Willkommen bei KickDeals
      </h1>
      <p className="text-xl text-muted-foreground mb-8">
        Entdecke die besten Deals auf Fußballschuhe und schocke deine
        Spareinlagen in hoher Geschwindigkeit!
      </p>
      <div className="text-2xl font-semibold mb-6 flex items-center justify-between w-full">
        <div className="flex items-center flex-row">
          <BiSolidRadiation className="mr-2 h-6 w-6" />
          Marken
        </div>
        <p className="text-sm text-blue-500 items-center flex cursor-pointer hover:underline">
          Alle anzeigen
        </p>
      </div>
      <ScrollArea className="w-full whitespace-nowrap">
        <div className="flex w-max space-x-4 p-4">
          {marken.map((marke, index) => (
            <Link
              key={index}
              className="bg-background text-lg flex items-center shadow-md justify-center rounded-full px-4 py-2 text-primary hover:bg-primary hover:text-white border-2 h-24 w-24"
              href={`/marke/${marke.id}`}
            >
              <span className="mr-2">{marke.name}</span>
            </Link>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </section>
  );
};

export default Hero;
