"use client";

import { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Search } from "lucide-react";

export function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logik für die Suche implementieren
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full max-w-2xl mx-auto">
      <Input
        type="text"
        placeholder="Suche..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="pr-10 h-12 rounded-full bg-muted dark:bg-secondary border-none shadow-sm"
      />
      <Button
        type="submit"
        size="icon"
        variant="ghost"
        className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
      >
        <Search className="h-5 w-5 text-muted-foreground" />
      </Button>
    </form>
  );
}
