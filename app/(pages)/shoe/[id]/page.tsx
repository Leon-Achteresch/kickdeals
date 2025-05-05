import { faker } from "@faker-js/faker/locale/de";
import Image from "next/image";
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Share2,
  Star,
  SplitSquareVertical,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { BRANDS } from "@/lib/fakerjs/products";
import { RecommendedProducts } from "@/components/home/recommended-products";

interface ShoeParams {
  params: {
    id: string;
  };
}

export default async function ShoePage({ params }: Readonly<ShoeParams>) {
  // Seed für konsistente Daten basierend auf ID
  faker.seed(parseInt(params.id, 36) || 123);

  // Generiere konsistente Schuhdaten basierend auf ID
  const brand = faker.helpers.arrayElement(BRANDS);
  const name = `${brand} Air Zoom Mercurial Vapor ${faker.number.int({ min: 10, max: 20 })} Elite FG`;
  const price = faker.number.int({ min: 99, max: 219 }) + 0.99;
  const oldPrice = faker.helpers.maybe(() => price * 1.2, { probability: 0.7 });
  const discount = oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0;
  const rating = faker.number.float({ min: 3.5, max: 5, fractionDigits: 1 });
  const reviewCount = faker.number.int({ min: 5, max: 350 });
  const color = faker.helpers.arrayElement([
    "Grau/Schwarz",
    "Schwarz/Rot",
    "Blau/Weiß",
    "Weiß/Schwarz",
    "Rot/Gold",
  ]);
  const sizes = [39, 40, 41, 42, 43, 44, 45, 46];
  const availableSizes = sizes.filter(() =>
    faker.helpers.maybe(() => true, { probability: 0.8 })
  );
  const description = `Der ${name} ist ein hochmoderner Fußballschuh für explosive Geschwindigkeit und präzise Ballkontrolle. Die innovative Sohlenplatte sorgt für optimale Traktion auf natürlichem Rasen.`;

  const features = [
    "Rising Gem Technologie für explosive Beschleunigung",
    "Atmungsaktives Obermaterial für optimalen Komfort",
    "Asymmetrisches Schnürsystem für präzise Passform",
    "Leichte Vaporsole für reaktionsfreudige Dämpfung",
    "Strukturiertes Obermaterial für verbesserte Ballkontrolle",
  ];

  return (
    <main className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-gray-600 hover:text-black transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Zurück
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Linke Spalte - Produktbilder */}
        <div className="space-y-4">
          <div className="relative aspect-square bg-gray-100 rounded-2xl overflow-hidden">
            <Image
              src="/placeholder-shoe.jpg"
              alt={name}
              fill
              className="object-contain p-8"
            />
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-100 rounded-lg overflow-hidden"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/placeholder-shoe.jpg"
                    alt={`${name} Ansicht ${i + 1}`}
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Rechte Spalte - Produktdetails */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{name}</h1>
            <h2 className="text-xl text-gray-600">{color}</h2>
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : i < rating ? "text-yellow-400 fill-yellow-400 opacity-50" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({reviewCount} Bewertungen)
            </span>
          </div>

          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold">{price.toFixed(2)} €</span>
            {oldPrice && (
              <>
                <span className="text-lg text-gray-500 line-through">
                  {oldPrice.toFixed(2)} €
                </span>
                <span className="ml-2 px-2 py-1 text-xs font-semibold text-white bg-red-500 rounded-full">
                  -{discount}%
                </span>
              </>
            )}
          </div>

          <div>
            <h3 className="text-md font-semibold mb-2">Größe wählen</h3>
            <div className="grid grid-cols-4 gap-2">
              {sizes.map((size) => (
                <Button
                  key={size}
                  variant={availableSizes.includes(size) ? "outline" : "ghost"}
                  className={`h-12 ${!availableSizes.includes(size) && "opacity-40 cursor-not-allowed"}`}
                  disabled={!availableSizes.includes(size)}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          <div className="pt-4 space-y-4">
            <Button className="w-full h-12 text-md font-semibold gap-2">
              <ShoppingBag className="h-5 w-5" />
              In den Warenkorb
            </Button>

            <div className="grid grid-cols-3 gap-2">
              <Button variant="outline" className="h-12 gap-2">
                <Heart className="h-5 w-5" />
                Merken
              </Button>
              <Button variant="outline" className="h-12 gap-2">
                <Share2 className="h-5 w-5" />
                Teilen
              </Button>
              <Link href={`/compare?product1=${params.id}`} className="w-full">
                <Button variant="outline" className="h-12 gap-2 w-full">
                  <SplitSquareVertical className="h-5 w-5" />
                  Vergleichen
                </Button>
              </Link>
            </div>
          </div>

          <div className="pt-6 border-t">
            <h3 className="text-xl font-semibold mb-3">Produktbeschreibung</h3>
            <p className="text-gray-700">{description}</p>

            <h4 className="text-lg font-semibold mt-4 mb-2">Highlights</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="inline-block h-5 w-5 mr-2 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs">
                    ✓
                  </span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Ähnliche Produkte */}
      <RecommendedProducts currentProductId={params.id} />
    </main>
  );
}
