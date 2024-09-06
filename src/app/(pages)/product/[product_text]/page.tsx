"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useRouter } from "next/navigation";
import { BiArrowBack, BiBell } from "react-icons/bi";
import { motion } from "framer-motion";
import Image from "next/image";

const ProductPage = () => {
  const { product_text } = useParams();
  const router = useRouter();

  const purchaseOptions = [
    { name: "Nike", url: "https://nike.com" },
    { name: "Adidas", url: "https://adidas.com" },
    { name: "Puma", url: "https://puma.com" },
    { name: "New Balance", url: "https://new-balance.com" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-6xl mx-auto p-4"
    >
      <div className="flex items-center justify-between mb-4">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Button
            onClick={() => router.back()}
            className="bg-transparent text-defaultprimary hover:bg-transparent hover:text-blue-700 text-lg px-6 transition duration-300 ease-in-out"
          >
            <BiArrowBack size={20} className="mr-2" />
          </Button>
        </motion.div>
        <motion.h1
          className="text-4xl font-bold text-center text1 flex-grow"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Produkt
        </motion.h1>
        <div className="w-[100px]"></div>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-600 text-center text1 text-xl">
            {product_text}
          </p>
          <div>
            <Image
              src="/placeholder-product-image.jpg"
              alt="Product Image"
              width={500}
              height={500}
              className="rounded-xl shadow-lg"
            />
          </div>
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex flex-row justify-between items-center">
                  Angebote
                  <Button variant="outline" className="bg-transparent">
                    <BiBell size={20} />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col w-full gap-4">
                  {purchaseOptions.map((option, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-between"
                      onClick={() => window.open(option.url, "_blank")}
                    >
                      {option.name}
                      <span className="text-sm text-gray-600">70,00 €</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Produktdetails</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Hier können weitere Produktdetails angezeigt werden.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProductPage;
