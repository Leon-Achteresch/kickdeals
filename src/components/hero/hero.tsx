import { Button } from "@/components/ui/button";
import { BiMedal, BiPurchaseTagAlt } from "react-icons/bi";

const Hero = () => {
  return (
    <section className="text-center">
      <h1 className="text-4xl font-bold mb-4">Willkommen bei KickDeals</h1>
      <p className="text-xl text-muted-foreground mb-8">
        Entdecke die besten Deals auf Fußballschuhe und schocke deine
        Spareinlagen in hoher Geschwindigkeit!
      </p>
      <div className="flex justify-center gap-4">
        <Button size="lg" className=" bg-defaultprimary text-lg">
          <BiMedal className="mr-2 h-4 w-4" /> Marken
        </Button>
        <Button size="lg" variant="outline" className="text-lg">
          <BiPurchaseTagAlt className="mr-2 h-4 w-4" /> Kategorien
        </Button>
      </div>
    </section>
  );
};

export default Hero;
