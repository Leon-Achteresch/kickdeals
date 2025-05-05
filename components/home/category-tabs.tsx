"use client";

import { useState } from "react";
import { Button } from "../ui/button";

export interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface CategoryTabsProps {
  categories: Category[];
  onChange?: (categoryId: string) => void;
}

export function CategoryTabs({ categories, onChange }: CategoryTabsProps) {
  const [activeCategory, setActiveCategory] = useState<string>(
    categories[0]?.id || ""
  );

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (onChange) {
      onChange(categoryId);
    }
  };

  return (
    <div className="w-full">
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={`
              rounded-full px-4 py-2 flex items-center whitespace-nowrap
              ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-transparent hover:bg-accent dark:hover:bg-accent/50"
              }
            `}
            onClick={() => handleCategoryChange(category.id)}
          >
            {category.icon && <span className="mr-2">{category.icon}</span>}
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
}
