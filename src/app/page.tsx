import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { TrendingUp } from "lucide-react";
import FeaturedDeal from "../components/featured-deal/featured-deal";
import Hero from "../components/hero/hero";
import SearchSection from "../components/search-section/search-section";
import FeaturedDealsCarousel from "../components/featured-deals-caroussel/featured-deals-caroussel";

export default async function Index() {
  return (
    <main className="flex-1 flex flex-col gap-12 px-4 py-8 max-w-6xl mx-auto w-full ">
      <Hero />
      <SearchSection />

      {/* Featured Deals Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-6 flex items-center">
          <TrendingUp className="mr-2 h-6 w-6" /> Featured Deals
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeaturedDealsCarousel />
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="bg-muted p-8 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">
          Stay Updated on the Latest Deals
        </h2>
        <p className="mb-4">
          Subscribe to our newsletter and never miss out on exclusive offers!
        </p>
        <div className="flex gap-4">
          <Input placeholder="Enter your email" className="flex-grow" />
          <Button>Subscribe</Button>
        </div>
      </section>
    </main>
  );
}
