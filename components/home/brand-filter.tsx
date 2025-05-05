"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { BRANDS } from "@/lib/fakerjs/products";

interface Brand {
  name: string;
  logo?: string;
}

// Verwende die importierten Marken aus Faker.js
const brands: Brand[] = BRANDS.slice(0, 6).map((name) => ({ name }));

export function BrandFilter() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  const toggleBrand = (brandName: string) => {
    if (selectedBrands.includes(brandName)) {
      setSelectedBrands(selectedBrands.filter((name) => name !== brandName));
    } else {
      setSelectedBrands([...selectedBrands, brandName]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-foreground">Marken</h3>
        <Button variant="link" size="sm" className="text-sm p-0 h-auto">
          Alle anzeigen
        </Button>
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {brands.slice(0, 5).map((brand) => (
          <Badge
            key={brand.name}
            variant={
              selectedBrands.includes(brand.name) ? "default" : "outline"
            }
            className={`px-4 py-2 rounded-full cursor-pointer transition-colors ${
              selectedBrands.includes(brand.name)
                ? "bg-primary text-primary-foreground hover:bg-primary/90"
                : "bg-muted hover:bg-muted/80 text-foreground dark:bg-secondary dark:text-secondary-foreground"
            }`}
            onClick={() => toggleBrand(brand.name)}
          >
            {brand.name}
          </Badge>
        ))}
      </div>
    </div>
  );
}
