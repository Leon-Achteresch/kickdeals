"use client";

import Link from "next/link";
import { createRandomProducts } from "@/lib/fakerjs/products";
import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  imageSrc: string;
  brand: string;
}

interface RecommendedProductsProps {
  currentProductId: string;
}

export function RecommendedProducts({
  currentProductId,
}: RecommendedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Im Client generieren, um hydration Probleme zu vermeiden
    const recommendedProducts = createRandomProducts(4);
    // Entferne das aktuelle Produkt aus den Empfehlungen falls vorhanden
    const filteredProducts = recommendedProducts.filter(
      (product) => product.id !== currentProductId
    );
    setProducts(
      filteredProducts.length > 0 ? filteredProducts : recommendedProducts
    );
  }, [currentProductId]);

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold mb-6">Ähnliche Produkte</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/shoe/${product.id}`}
            className="group rounded-xl overflow-hidden hover:shadow-lg transition-all"
          >
            <div className="relative aspect-square overflow-hidden bg-gray-100">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="object-cover h-full w-full group-hover:scale-105 transition-transform duration-300"
              />
              {product.salePrice && (
                <span className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Sale
                </span>
              )}
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-500">{product.brand}</p>
              <h3 className="font-medium text-sm truncate">{product.name}</h3>
              <div className="flex gap-2 items-center mt-1">
                {product.salePrice ? (
                  <>
                    <span className="font-bold">
                      {product.salePrice.toFixed(2)} €
                    </span>
                    <span className="text-gray-500 text-sm line-through">
                      {product.price.toFixed(2)} €
                    </span>
                  </>
                ) : (
                  <span className="font-bold">
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
