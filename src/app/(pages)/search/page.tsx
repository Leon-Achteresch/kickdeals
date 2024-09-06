"use client";
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { mockShoes } from '@/src/Declarations/search';

// Definieren der Shoe-Schnittstelle
interface Shoe {
  id: string;
  name: string;
  brand: string;
  price: number;
}

const SearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredShoes, setFilteredShoes] = useState<Shoe[]>([]);
  const [isSearched, setIsSearched] = useState<boolean>(false);

  const handleSearch = (): void => {
    const filtered = mockShoes.filter((shoe: Shoe) => 
      shoe.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShoes(filtered);
    setIsSearched(true);
  };

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredShoes([]);
      setIsSearched(false);
    }
  }, [searchTerm]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Stöbern</h1>
      <section className="flex gap-4 w-full mb-8">
        <Input 
          placeholder="Suche nach Schuhen..." 
          className="flex-grow text-lg p-3 "
          value={searchTerm}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
          onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleSearch()}
        />
        <Button 
          className="bg-defaultprimary hover:bg-blue-700 text-white text-lg px-6 transition duration-300 ease-in-out"
          onClick={handleSearch}
        >
          Suche
        </Button>
      </section>
      {!isSearched && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 text-xl mb-8"
        >
          Beginnen Sie Ihre Suche, um Schuhe anzuzeigen.
        </motion.p>
      )}
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {filteredShoes.map((shoe: Shoe) => (
          <motion.div 
            key={shoe.id}
            className="border p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out bg-white"
            whileHover={{ scale: 1.03 }}
          >
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">{shoe.name}</h2>
            <p className="text-gray-600 mb-4">{shoe.brand}</p>
            <p className="text-2xl font-bold text-blue-600">{shoe.price.toFixed(2)} €</p>
          </motion.div>
        ))}
      </motion.div>
      {isSearched && filteredShoes.length === 0 && (
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 text-xl mt-8"
        >
          Keine Ergebnisse gefunden. Versuchen Sie es mit einem anderen Suchbegriff.
        </motion.p>
      )}
    </div>
  );
};

export default SearchPage;