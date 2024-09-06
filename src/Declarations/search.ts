interface Shoe {
  id: string;
  name: string;
  brand: string;
  price: number;
}

export const mockShoes: Shoe[] = [
  { id: '1', name: "Nike Mercurial Vapor 14 Elite", brand: "Nike", price: 249.99 },
  { id: '2', name: "Adidas X Speedflow.1 FG", brand: "Adidas", price: 229.99 },
  { id: '3', name: "Puma Future Z 1.1 FG/AG", brand: "Puma", price: 199.99 },
  { id: '4', name: "New Balance Furon v6+ Pro FG", brand: "New Balance", price: 189.99 },
  { id: '5', name: "Under Armour Clone Magnetico Pro FG", brand: "Under Armour", price: 219.99 },
  { id: '6', name: "Nike Phantom GT2 Elite FG", brand: "Nike", price: 259.99 },
  { id: '7', name: "Adidas Predator Freak.1 FG", brand: "Adidas", price: 239.99 },
  { id: '8', name: "Puma King Platinum FG/AG", brand: "Puma", price: 179.99 },
];
