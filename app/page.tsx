import { SearchBar } from "@/components/home/search-bar";
import { BrandFilter } from "@/components/home/brand-filter";
import { PromoCard } from "@/components/home/promo-card";
import { ProductSection } from "@/components/home/product-section";
import { CategoryTabs } from "@/components/home/category-tabs";
import { ShoppingBag, Footprints, Shirt, Timer } from "lucide-react";
import {
  createRandomProducts,
  getRandomPromotion,
  CATEGORIES,
} from "@/lib/fakerjs/products";

// Generiere Beispieldaten mit Faker.js
const trendingProducts = createRandomProducts(4);
const newProducts = createRandomProducts(3);
const promotion = getRandomPromotion();

// Kategorien mit Icons
const categoriesWithIcons = [
  { id: "new", name: "Neu", icon: <Timer className="h-4 w-4" /> },
  { id: "shoes", name: "Schuhe", icon: <Footprints className="h-4 w-4" /> },
  { id: "sale", name: "Sale", icon: <ShoppingBag className="h-4 w-4" /> },
];

export default async function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4 py-6 max-w-7xl mx-auto">
        <div className="mb-4">
          <SearchBar />
        </div>

        <div className="mb-6">
          <BrandFilter />
        </div>

        <div className="mb-8">
          <PromoCard
            title={promotion.title}
            subtitle={promotion.subtitle}
            discount={promotion.discount}
            bgColor={promotion.bgColor}
          />
        </div>

        <div className="mb-6">
          <CategoryTabs categories={categoriesWithIcons} />
        </div>

        <div className="mb-8">
          <ProductSection
            title="Trends"
            products={trendingProducts}
            viewAllLink="/products/trending"
          />
        </div>

        <div className="mb-8">
          <ProductSection
            title="Neue Releases"
            products={newProducts}
            viewAllLink="/products/new"
          />
        </div>
      </main>
    </>
  );
}
