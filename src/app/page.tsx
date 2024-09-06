import { TrendingUp } from "lucide-react";
import Hero from "../components/hero/hero";
import SearchSection from "../components/search-section/search-section";
import FeaturedDealsCarousel from "../components/featured-deals-caroussel/featured-deals-caroussel";
import NewsletterSection from "../components/newsletter-section/newsletter-section";

export default async function Index() {
  return (
    <main className=" flex flex-col gap-10 px-4 max-w-6xl mx-auto w-full ">
      <Hero />
      <SearchSection />

      <section>
        <div className="text-2xl font-semibold mb-6 flex items-center justify-between w-full">
          <div className="flex items-center flex-row">
            <TrendingUp className="mr-2 h-6 w-6" /> Featured Deals
          </div>
          <p className="text-sm text-blue-500 items-center flex cursor-pointer hover:underline">
            Alle anzeigen
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeaturedDealsCarousel />
        </div>
      </section>

      <NewsletterSection />
    </main>
  );
}
