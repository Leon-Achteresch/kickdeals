import { deals } from "@/src/Declarations/deals";
import { BiMedal, BiSolidRadiation } from "react-icons/bi";
import ShoeImage from "@/src/assets/Images/MockImage1.jpeg";
import Image from "next/image";
import { motion } from "framer-motion";
import SearchSection from "@/src/components/search-section/search-section";

const DealsPage = () => {
  return (
    <div className="w-full max-w-6xl mx-auto p-4 gap-6">
      <h1 className="text-4xl font-bold mb-8 text-center text1 text-gray-800">
        Angebote
      </h1>

      <div className="mb-4">
        <SearchSection />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {deals.map((deal, index) => (
          <div
            key={index}
            className="relative w-48 h-60 bg-gray-200 rounded-2xl overflow-hidden shadow-md"
          >
            {deal.image && (
              <div className="h-3/4 flex justify-center items-center p-2">
                <Image
                  src={ShoeImage}
                  alt={deal.name}
                  className="object-contain max-h-full"
                />
              </div>
            )}
            <div className="absolute top-2 right-2 text-black font-bold text-lg">
              <h1 className="shadow-glow animate-glow">
                {deal.price.toFixed(2)}€
              </h1>
            </div>
            <div className="absolute bottom-0 w-full bg-red-600 text-white text-center py-2 text-lg font-bold">
              {deal.discount}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsPage;
