"use client";
import Hero from "../components/hero/hero";
import SearchSection from "../components/search-section/search-section";
import FeaturedDealsCarousel from "../components/featured-deals-caroussel/featured-deals-caroussel";
import NewsletterSection from "../components/newsletter-section/newsletter-section";
import { motion } from "framer-motion";
import { BiTrendingUp } from "react-icons/bi";
import Link from "next/link";

export default function Index() {
  return (
    <main className="flex flex-col gap-10 p-6 px-4 max-w-6xl mx-auto w-full">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Hero />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <SearchSection />
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="text-2xl font-semibold mb-6 flex items-center justify-between w-full">
          <div className="flex items-center flex-row">
            <BiTrendingUp className="mr-2 h-6 w-6" /> Featured Deals
          </div>
          <p className="text-sm text-blue-500 items-center flex cursor-pointer hover:underline">
            Alle anzeigen
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <FeaturedDealsCarousel />
        </motion.div>
      </motion.section>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <NewsletterSection />
      </motion.div>
      <div>
        <Link href={"/impressum"}>
          <p className="text-center text-sm text-muted-foreground">
            {" "}
            Impressum & Kontakt{" "}
          </p>
        </Link>
        <Link href={"/datenschutz"}>
          <p className="text-center text-sm text-muted-foreground">
            {" "}
            Datenschutz{" "}
          </p>
        </Link>
        <Link href={"/agb"}>
          <p className="text-center text-sm text-muted-foreground"> AGB </p>
        </Link>
      </div>
    </main>
  );
}
