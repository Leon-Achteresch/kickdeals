"use client";

import { useState, useEffect } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import FeaturedDeal from "../featured-deal/featured-deal";
import { featuredDeals } from "@/src/Declarations/featured-deals";

const FeaturedDealsCarousel = () => {
  const [slidesToShow, setSlidesToShow] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1536) {
        setSlidesToShow(2);
      } else if (window.innerWidth >= 1280) {
        setSlidesToShow(2);
      } else if (window.innerWidth >= 768) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(1);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      className="w-full px-4 sm:px-6 lg:px-8"
    >
      <CarouselContent>
        {featuredDeals.map((deal, index) => (
          <CarouselItem 
            key={index} 
            className={`pl-4 basis-1/${slidesToShow}`}
          >
            <FeaturedDeal {...deal} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default FeaturedDealsCarousel;