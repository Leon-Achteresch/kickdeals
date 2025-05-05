"use client";

import { Button } from "../ui/button";

interface PromoCardProps {
  title: string;
  subtitle?: string;
  discount?: string;
  bgColor?: string;
  textColor?: string;
  buttonText?: string;
  buttonAction?: () => void;
  brandLogo?: string;
}

export function PromoCard({
  title,
  subtitle,
  discount,
  bgColor = "bg-emerald-500",
  textColor = "text-white",
  buttonText = "Jetzt shoppen",
  buttonAction,
  brandLogo,
}: PromoCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-xl ${bgColor} p-6 shadow-md dark:shadow-lg`}
    >
      {brandLogo && (
        <div className="flex justify-center mb-4">
          <img src={brandLogo} alt={title} className="h-16 object-contain" />
        </div>
      )}

      {discount && (
        <div className="absolute bottom-0 left-0 right-0 bg-red-600 dark:bg-red-700 py-2 px-4 text-white font-bold text-center">
          {discount}
        </div>
      )}

      <div
        className={`flex flex-col items-center ${textColor} ${discount ? "mb-10" : ""}`}
      >
        <h3 className="text-2xl font-bold mb-2">{title}</h3>
        {subtitle && <p className="text-sm mb-4 opacity-90">{subtitle}</p>}

        <Button
          onClick={buttonAction}
          variant="outline"
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 border-none"
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
}
