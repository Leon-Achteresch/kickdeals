"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";
import { createRandomProducts } from "@/lib/fakerjs/products";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function FavoritesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showOnlyAvailable, setShowOnlyAvailable] = useState(false);

  // Generiere Beispieldaten mit Faker.js
  const favoriteProducts = createRandomProducts(8).map((product) => ({
    ...product,
    available: Math.random() > 0.3, // 70% Wahrscheinlichkeit, dass Produkt verfügbar ist
  }));

  const filteredProducts = favoriteProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (!showOnlyAvailable || product.available)
  );

  return (
    <main className="flex-1 flex flex-col gap-6 px-4 py-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">Meine Favoriten</h1>

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

      <div className="flex items-center space-x-2 mb-4">
        <Checkbox
          id="showAvailable"
          checked={showOnlyAvailable}
          onCheckedChange={(checked) =>
            setShowOnlyAvailable(checked as boolean)
          }
        />
        <label
          htmlFor="showAvailable"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Nur verfügbare Produkte anzeigen
        </label>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/shoe/${product.id}`}
            className="group rounded-lg overflow-hidden border border-border bg-card hover:shadow-md transition-all"
          >
            <div className="relative aspect-square overflow-hidden bg-muted">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
              />
              {product.salePrice && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                  Sale
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm text-muted-foreground">{product.brand}</p>
              <h3 className="font-medium text-sm truncate text-card-foreground">
                {product.name}
              </h3>
              <div className="flex justify-between items-center mt-1">
                <div className="flex gap-2 items-center">
                  {product.salePrice ? (
                    <>
                      <span className="font-bold text-card-foreground">
                        {product.salePrice.toFixed(2)} €
                      </span>
                      <span className="text-muted-foreground text-sm line-through">
                        {product.price.toFixed(2)} €
                      </span>
                    </>
                  ) : (
                    <span className="font-bold text-card-foreground">
                      {product.price.toFixed(2)} €
                    </span>
                  )}
                </div>
                <Badge variant={product.available ? "default" : "secondary"}>
                  {product.available ? "Verfügbar" : "Nicht verfügbar"}
                </Badge>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Keine Favoriten gefunden.</p>
        </div>
      )}
    </main>
  );
}
