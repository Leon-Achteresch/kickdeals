"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { createRandomProducts } from "@/lib/fakerjs/products";
import {
  ArrowLeft,
  Star,
  StarHalf,
  Share2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Link from "next/link";

type CompareProduct = {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  imageSrc: string;
  attributes: {
    material: string;
    weight: string;
    soleType: string;
    closureType: string;
    terrain: string;
    extras: string[];
  };
  rating: number;
  advantages: string[];
  disadvantages: string[];
};

export default function ComparePage() {
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    attributes: true,
    advantages: true,
    disadvantages: true,
  });

  // Erzeuge zwei zufällige Produkte mit detaillierteren Informationen für den Vergleich
  const [products, setProducts] = useState<CompareProduct[]>([]);

  useEffect(() => {
    // Hier würden in einer echten App die Produkte aus einer URL oder dem Zustand geladen
    // Für das Beispiel erzeugen wir zufällige Produkte
    const fakeMaterials = ["Synthetik", "Leder", "Mesh", "Stoff", "Wildleder"];
    const fakeWeights = ["280g", "310g", "250g", "290g", "320g"];
    const fakeSoleTypes = [
      "Gummi",
      "Kunststoff",
      "Karbon",
      "EVA-Schaum",
      "Boost",
    ];
    const fakeClosures = [
      "Schnürsenkel",
      "Klettverschluss",
      "Slip-On",
      "BOA",
      "Schnallen",
    ];
    const fakeTerrains = ["Indoor", "Rasen", "Kunstrasen", "Halle", "Allround"];
    const fakeExtras = [
      "Reflektoren",
      "Wasserdicht",
      "Atmungsaktiv",
      "Verstärkte Zehen",
      "Extra Dämpfung",
    ];
    const fakeAdvantages = [
      "Hervorragende Traktion",
      "Leichtgewicht",
      "Langlebig",
      "Gute Dämpfung",
      "Atmungsaktiv",
      "Wasserdicht",
      "Guter Halt",
    ];
    const fakeDisadvantages = [
      "Etwas schwer",
      "Hoher Preis",
      "Engere Passform",
      "Wenig Farbauswahl",
      "Einlaufzeit benötigt",
      "Nicht wasserdicht",
    ];

    // Erstelle 2 Produkte für den Vergleich
    const baseProducts = createRandomProducts(2);
    const detailedProducts: CompareProduct[] = baseProducts.map((product) => {
      // Zufällige Anzahl an Vorteilen und Nachteilen generieren
      const randomAdvantages = [];
      const randomDisadvantages = [];

      // 3-5 zufällige Vorteile
      for (let i = 0; i < Math.floor(Math.random() * 3) + 3; i++) {
        const advantage =
          fakeAdvantages[Math.floor(Math.random() * fakeAdvantages.length)];
        if (!randomAdvantages.includes(advantage)) {
          randomAdvantages.push(advantage);
        }
      }

      // 2-4 zufällige Nachteile
      for (let i = 0; i < Math.floor(Math.random() * 2) + 2; i++) {
        const disadvantage =
          fakeDisadvantages[
            Math.floor(Math.random() * fakeDisadvantages.length)
          ];
        if (!randomDisadvantages.includes(disadvantage)) {
          randomDisadvantages.push(disadvantage);
        }
      }

      // Zufällige Extras, 2-4 Stück
      const randomExtras = [];
      for (let i = 0; i < Math.floor(Math.random() * 3) + 2; i++) {
        const extra = fakeExtras[Math.floor(Math.random() * fakeExtras.length)];
        if (!randomExtras.includes(extra)) {
          randomExtras.push(extra);
        }
      }

      return {
        ...product,
        attributes: {
          material:
            fakeMaterials[Math.floor(Math.random() * fakeMaterials.length)],
          weight: fakeWeights[Math.floor(Math.random() * fakeWeights.length)],
          soleType:
            fakeSoleTypes[Math.floor(Math.random() * fakeSoleTypes.length)],
          closureType:
            fakeClosures[Math.floor(Math.random() * fakeClosures.length)],
          terrain:
            fakeTerrains[Math.floor(Math.random() * fakeTerrains.length)],
          extras: randomExtras,
        },
        rating: Math.round((Math.random() * 2 + 3) * 10) / 10, // Rating zwischen 3.0 und 5.0
        advantages: randomAdvantages,
        disadvantages: randomDisadvantages,
      };
    });

    setProducts(detailedProducts);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Rendere Sterne für das Rating
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star
          key={`star-${i}`}
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <StarHalf
          key="half-star"
          className="h-4 w-4 fill-yellow-400 text-yellow-400"
        />
      );
    }

    // Leere Sterne bis 5
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-muted-foreground" />
      );
    }

    return stars;
  };

  if (products.length < 2) {
    return (
      <div className="flex items-center justify-center h-60">
        <p>Produkte werden geladen...</p>
      </div>
    );
  }

  return (
    <main className="flex-1 flex flex-col px-4 py-6 max-w-7xl mx-auto">
      <div className="flex items-center mb-6">
        <Link href="/browse">
          <Button variant="ghost" size="sm" className="p-0 h-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Zurück zur Übersicht
          </Button>
        </Link>
        <h1 className="text-2xl font-bold ml-auto">Produktvergleich</h1>
        <Button variant="ghost" size="icon" className="ml-auto">
          <Share2 className="h-5 w-5" />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Produktbilder und Grundinformationen */}
        {products.map((product, index) => (
          <div key={product.id} className="flex flex-col">
            <div className="rounded-lg overflow-hidden bg-muted aspect-square mb-4">
              <img
                src={product.imageSrc}
                alt={product.name}
                className="object-cover h-full w-full"
              />
            </div>

            <h2 className="text-xl font-bold truncate">{product.name}</h2>
            <p className="text-muted-foreground mb-2">{product.brand}</p>

            <div className="flex items-center gap-1 mb-2">
              {renderRating(product.rating)}
              <span className="text-sm ml-1">{product.rating.toFixed(1)}</span>
            </div>

            <div className="flex items-center mb-4">
              {product.salePrice ? (
                <>
                  <span className="text-lg font-bold">
                    {product.salePrice.toFixed(2)} €
                  </span>
                  <span className="text-muted-foreground text-sm line-through ml-2">
                    {product.price.toFixed(2)} €
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold">
                  {product.price.toFixed(2)} €
                </span>
              )}
            </div>

            <Button variant="default" className="w-full">
              In den Warenkorb
            </Button>
          </div>
        ))}
      </div>

      {/* Technische Eigenschaften */}
      <div className="mt-8 border rounded-lg overflow-hidden">
        <div
          className="flex items-center justify-between p-4 bg-muted cursor-pointer"
          onClick={() => toggleSection("attributes")}
        >
          <h3 className="font-medium">Technische Eigenschaften</h3>
          {expandedSections.attributes ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>

        {expandedSections.attributes && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Material */}
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Material:</span>
                <span>{products[0].attributes.material}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Material:</span>
                <span>{products[1].attributes.material}</span>
              </div>

              {/* Gewicht */}
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Gewicht:</span>
                <span>{products[0].attributes.weight}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Gewicht:</span>
                <span>{products[1].attributes.weight}</span>
              </div>

              {/* Sohlentyp */}
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Sohlentyp:</span>
                <span>{products[0].attributes.soleType}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Sohlentyp:</span>
                <span>{products[1].attributes.soleType}</span>
              </div>

              {/* Verschluss */}
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Verschluss:</span>
                <span>{products[0].attributes.closureType}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Verschluss:</span>
                <span>{products[1].attributes.closureType}</span>
              </div>

              {/* Terrain */}
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Einsatzbereich:</span>
                <span>{products[0].attributes.terrain}</span>
              </div>
              <div className="flex justify-between items-center py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium">Einsatzbereich:</span>
                <span>{products[1].attributes.terrain}</span>
              </div>

              {/* Extras */}
              <div className="flex flex-col py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium mb-2">Extras:</span>
                <ul className="space-y-1">
                  {products[0].attributes.extras.map((extra, i) => (
                    <li key={i} className="text-sm">
                      • {extra}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col py-2 px-4 bg-muted/50 rounded">
                <span className="font-medium mb-2">Extras:</span>
                <ul className="space-y-1">
                  {products[1].attributes.extras.map((extra, i) => (
                    <li key={i} className="text-sm">
                      • {extra}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Vorteile */}
      <div className="mt-4 border rounded-lg overflow-hidden">
        <div
          className="flex items-center justify-between p-4 bg-muted cursor-pointer"
          onClick={() => toggleSection("advantages")}
        >
          <h3 className="font-medium">Vorteile</h3>
          {expandedSections.advantages ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>

        {expandedSections.advantages && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col py-2 px-4 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-900">
                <ul className="space-y-2">
                  {products[0].advantages.map((adv, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col py-2 px-4 bg-green-50 dark:bg-green-950/30 rounded border border-green-200 dark:border-green-900">
                <ul className="space-y-2">
                  {products[1].advantages.map((adv, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-green-600 mr-2">✓</span>
                      <span>{adv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Nachteile */}
      <div className="mt-4 border rounded-lg overflow-hidden mb-8">
        <div
          className="flex items-center justify-between p-4 bg-muted cursor-pointer"
          onClick={() => toggleSection("disadvantages")}
        >
          <h3 className="font-medium">Nachteile</h3>
          {expandedSections.disadvantages ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </div>

        {expandedSections.disadvantages && (
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col py-2 px-4 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-900">
                <ul className="space-y-2">
                  {products[0].disadvantages.map((disadv, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>{disadv}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col py-2 px-4 bg-red-50 dark:bg-red-950/30 rounded border border-red-200 dark:border-red-900">
                <ul className="space-y-2">
                  {products[1].disadvantages.map((disadv, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-red-600 mr-2">✗</span>
                      <span>{disadv}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
