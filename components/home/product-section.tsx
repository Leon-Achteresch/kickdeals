"use client";

import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  imageSrc: string;
  brand: string;
}

interface ProductSectionProps {
  title: string;
  products: Product[];
  viewAllLink?: string;
}

export function ProductSection({
  title,
  products,
  viewAllLink,
}: ProductSectionProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {viewAllLink && (
          <Button
            variant="link"
            className="flex items-center text-sm gap-1 p-0 h-auto"
          >
            Alle anzeigen
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map((product) => (
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
              <div className="flex gap-2 items-center mt-1">
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
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
