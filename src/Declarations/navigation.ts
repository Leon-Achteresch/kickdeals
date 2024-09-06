import React from "react";

type Type_NavigationList = {
  name: string;
  href: string;
  icon?: React.ReactNode;
};

export const NavigastionList = [
  { name: "Home", href: "/", icon: null },
  { name: "Deals", href: "/deals", icon: null  },
  { name: "Profile", href: "/profile" , icon: null },
  { name: "Settings", href: "/settings", icon: null  },
];