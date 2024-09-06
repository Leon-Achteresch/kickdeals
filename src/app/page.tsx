import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TrendingUp } from "lucide-react";
import FeaturedDeal from "../components/featured-deal/featured-deal";
import Hero from "../components/hero/hero";
import SearchSection from "../components/search-section/search-section";
import FeaturedDealsCarousel from "../components/featured-deals-caroussel/featured-deals-caroussel";

export default async function Index() {
  return (
    <main className=" flex flex-col gap-12 px-4  max-w-6xl mx-auto w-full ">
      <Hero />
      <SearchSection />

      {/* Featured Deals Section */}
      <section>
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <TrendingUp className="mr-2 h-6 w-6" /> Featured Deals
          </h2>
          <p className="text-sm text-blue-500 cursor-pointer hover:underline">Alle anzeigen</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeaturedDealsCarousel />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Bleibe auf dem Laufenden mit den neuesten Deals
        </h2>
        <p className="mb-4">
          Abonniere unseren Newsletter und verpasse niemals auf exklusive Angebote!
        </p>
        <div className="flex gap-4">
          <Input placeholder="E-Mail-Adresse" className="flex-grow" />
          <Button>Subscribe</Button>
        </div>
      </section>
    </main>
  );
}
