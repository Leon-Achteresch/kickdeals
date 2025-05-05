"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { createRandomProducts, BRANDS } from "@/lib/fakerjs/products";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function OffersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Generiere Beispieldaten mit Faker.js (nur Produkte mit Rabatten)
  const offerProducts = createRandomProducts(8).map((product) => {
    const discountPercentage = Math.floor(Math.random() * 4) * 5 + 5; // 5%, 10%, 15% oder 20%
    const salePrice = product.price * (1 - discountPercentage / 100);

    return {
      ...product,
      salePrice: salePrice,
      discountPercentage: discountPercentage,
      brandLogo: product.brand === "Nike" ? "/nike-logo.png" : null, // Beispiel für ein Logo
    };
  });

  const filteredProducts = offerProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);
    return matchesSearch && matchesBrand;
  });

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  return (
    <main className="flex-1 flex flex-col gap-6 px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Aktuelle Angebote</h1>

      <div className="flex items-center gap-2 mb-4">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Suche..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pr-10 h-12 rounded-full bg-muted dark:bg-secondary border-none shadow-sm"
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
          >
            <Search className="h-5 w-5 text-muted-foreground" />
          </Button>
        </div>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full"
        >
          <SlidersHorizontal className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {BRANDS.slice(0, 5).map((brand) => (
          <Button
            key={brand}
            variant={selectedBrands.includes(brand) ? "default" : "outline"}
            size="sm"
            onClick={() => toggleBrand(brand)}
            className="rounded-full"
          >
            {brand}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/shoe/${product.id}`}
            className="group rounded-lg overflow-hidden border border-border bg-card hover:shadow-md transition-all relative"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              {product.brandLogo ? (
                <div className="absolute left-2 top-2 h-10 w-10 flex items-center justify-center bg-white rounded-full p-1 z-10">
                  <img
                    src={product.brandLogo}
                    alt={product.brand}
                    className="max-h-full max-w-full"
                  />
                </div>
              ) : null}
              <img
                src={product.imageSrc}
                alt={product.name}
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h3 className="font-medium text-sm truncate text-card-foreground">
                {product.name}
              </h3>
              <div className="flex gap-2 items-center mt-1">
                <span className="font-bold text-card-foreground">
                  {product.salePrice.toFixed(2)} €
                </span>
                <span className="text-muted-foreground text-sm line-through">
                  {product.price.toFixed(2)} €
                </span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-red-600 text-white font-bold text-center py-1">
              {product.discountPercentage}%
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Keine Angebote gefunden.</p>
        </div>
      )}
    </main>
  );
}
