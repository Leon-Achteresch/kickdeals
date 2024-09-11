type Type_Deal = {
  id: number;
  name: string;
  price: number;
  dealDescription: string;
  discount: number;
  image?: string;
};

export const deals: Type_Deal[] = [
  {
    id: 1,
    name: "Nike",
    price: 120,
    dealDescription: "High-performance running shoes with advanced cushioning and support.",
    discount: 20,
    image: "https://images.unsplash.com/photo-1678489811694-86d1c6c1e1f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 2,
    name: "Adidas",
    price: 100,
    dealDescription: "Stylish and comfortable sneakers for everyday use.",
    discount: 15,
    image: "https://images.unsplash.com/photo-1606813902785-82bb8ac3f9d2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8MHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
  {
    id: 3,
    name: "Puma",
    price: 90,
    dealDescription: "Lightweight shoes designed for agility and comfort during sports activities.",
    discount: 10,
  },
  {
    id: 4,
    name: "Reebok",
    price: 110,
    dealDescription: "Versatile sneakers that combine style with athletic performance.",
    discount: 25,
    image: "https://images.unsplash.com/photo-1521334884684-d80222895322?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
  },
];
