import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NewsletterSection = () => {
  return (
    <section className="bg-muted p-8 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">
        Bleibe auf dem Laufenden mit den neuesten Deals
      </h2>
      <p className="mb-4">
        Abonniere unseren Newsletter und verpasse niemals auf exklusive
        Angebote!
      </p>
      <div className="flex gap-4">
        <Input placeholder="E-Mail-Adresse" className="flex-grow" />
        <Button>Abonnieren</Button>
      </div>
    </section>
  );
};

export default NewsletterSection;