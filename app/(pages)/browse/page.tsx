"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import { createRandomProducts, BRANDS } from "@/lib/fakerjs/products";
import Link from "next/link";

const CATEGORIES = ["NEUESTE", "ANGEBOT", "SOLE", "PREIS"];
const SHOE_MODELS = ["MERCURIAL", "PREDATOR", "PHANTOM", "TIEMPO", "COPA", "X"];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("NEUESTE");

  // Generiere Beispieldaten mit Faker.js
  const allProducts = createRandomProducts(12).map((product) => {
    // Zufällig ein Schuhmodell zuweisen
    const model = SHOE_MODELS[Math.floor(Math.random() * SHOE_MODELS.length)];
    // Manche Produkte haben einen Rabatt
    const hasDiscount = Math.random() > 0.7;
    const discountPercentage = hasDiscount
      ? Math.floor(Math.random() * 3) * 5 + 10
      : 0; // 10%, 15% oder 20%
    const salePrice = hasDiscount
      ? product.price * (1 - discountPercentage / 100)
      : undefined;

    return {
      ...product,
      model,
      salePrice,
      isNew: Math.random() > 0.7,
    };
  });

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase());

    // Kategorie-Filter
    const matchesCategory =
      (selectedCategory === "NEUESTE" && product.isNew) ||
      (selectedCategory === "ANGEBOT" && product.salePrice) ||
      selectedCategory === "SOLE" ||
      selectedCategory === "PREIS" || // Diese Filter werden in einer realen App komplexer sein
      selectedCategory === "";

    return matchesSearch && matchesCategory;
  });

  return (
    <main className="flex-1 flex flex-col gap-6 px-4 py-6 max-w-7xl mx-auto">
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

      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {CATEGORIES.map((category) => (
          <Button
            key={category}
            variant={selectedCategory === category ? "default" : "outline"}
            onClick={() =>
              setSelectedCategory(selectedCategory === category ? "" : category)
            }
            className="rounded-full whitespace-nowrap"
          >
            {category}
            {category === "SOLE" && <ChevronDown className="ml-1 h-4 w-4" />}
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
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                Neu
              </span>
            )}

            <div className="relative aspect-square overflow-hidden bg-muted flex items-center justify-center">
              {product.imageSrc ? (
                <img
                  src={product.imageSrc}
                  alt={product.name}
                  className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                // Wenn kein Bild vorhanden, zeige Modellname an
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-800">
                    {product.model}
                  </span>
                </div>
              )}

              {/* Preis-Badge oben rechts */}
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm text-black font-bold px-2 py-1 rounded shadow">
                {product.salePrice ? (
                  <>{product.salePrice.toFixed(2)}€</>
                ) : (
                  <>{product.price.toFixed(2)}€</>
                )}
              </div>
            </div>

            {/* Für Produkte ohne Bild: Zeige nur Modellname in der Mitte */}
            {!product.imageSrc && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{product.model}</span>
              </div>
            )}

            {/* Normale Produkte: Zeige Details unten */}
            {product.imageSrc && (
              <div className="p-3">
                <p className="text-sm text-muted-foreground">{product.brand}</p>
                <h3 className="font-medium text-sm truncate text-card-foreground">
                  {product.name}
                </h3>
              </div>
            )}
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Keine Produkte gefunden.</p>
        </div>
      )}
    </main>
  );
}
