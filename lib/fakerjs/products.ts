import { faker } from "@faker-js/faker/locale/de";

export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  imageSrc: string;
  brand: string;
  description?: string;
  category?: string;
}

export const BRANDS = [
  "Nike",
  "Adidas",
  "Puma",
  "Mizuno",
  "New Balance",
  "Under Armour",
  "Asics",
  "Reebok",
  "Converse",
  "Vans",
];

export function createRandomProduct(): Product {
  const brand = faker.helpers.arrayElement(BRANDS);
  const price = parseFloat(faker.commerce.price({ min: 59, max: 299 }));
  const hasDiscount = faker.helpers.maybe(() => true, { probability: 0.3 }); // 30% Chance auf Rabatt

  return {
    id: faker.string.uuid(),
    name: `${brand} ${faker.commerce.productName()}`,
    price: price,
    salePrice: hasDiscount ? price * 0.7 : undefined, // 30% Rabatt
    imageSrc: "/nike-jr-air-zoom-mercurial-vapor-elite-fg-weiss-hv4887-fussballschuh-right-out.webp",
    brand: brand,
    description: faker.commerce.productDescription(),
    category: faker.helpers.arrayElement([
      "Laufschuhe",
      "Sneaker",
      "Sportschuhe",
      "Trainingsschuhe",
    ]),
  };
}

export function createRandomProducts(count: number = 4): Product[] {
  return faker.helpers.multiple(createRandomProduct, {
    count: count,
  });
}

export const CATEGORIES = [
  { id: "new", name: "Neu" },
  { id: "shoes", name: "Schuhe" },
  { id: "clothing", name: "Kleidung" },
  { id: "sale", name: "Sale" },
  { id: "running", name: "Laufschuhe" },
  { id: "basketball", name: "Basketball" },
  { id: "soccer", name: "Fußball" },
  { id: "training", name: "Training" },
];

export function getRandomPromotion() {
  const promoTypes = [
    {
      title: faker.helpers.arrayElement(BRANDS),
      subtitle:
        faker.commerce.productAdjective() + " " + faker.commerce.product(),
      discount: `${faker.number.int({ min: 10, max: 50 })}% RABATT AUF ALLE ${faker.helpers.arrayElement(BRANDS)} SCHUHE`,
      bgColor: "bg-emerald-500 dark:bg-emerald-600",
    },
    {
      title: "FLASH SALE",
      subtitle: "Nur heute!",
      discount: `${faker.number.int({ min: 15, max: 40 })}% RABATT AUF AUSGEWÄHLTE ARTIKEL`,
      bgColor: "bg-blue-500 dark:bg-blue-600",
    },
    {
      title: faker.commerce.productAdjective(),
      subtitle: faker.company.catchPhrase(),
      discount: `BIS ZU ${faker.number.int({ min: 20, max: 70 })}% RABATT`,
      bgColor: "bg-purple-500 dark:bg-purple-600",
    },
  ];

  return faker.helpers.arrayElement(promoTypes);
}
