import { IconType } from "react-icons";
import { FaHome, FaSearch, FaHeart, FaInfoCircle } from "react-icons/fa";

type NavigationItem = {
  name: string;
  href: string;
  icon: IconType;
};

export const NavigationList: NavigationItem[] = [
  { name: "Home", href: "/", icon: FaHome },
  { name: "Stöbern", href: "/deals", icon: FaSearch },
  { name: "Favoriten", href: "/favorites", icon: FaHeart },
  { name: "Allgemein", href: "/overview", icon: FaInfoCircle },
];