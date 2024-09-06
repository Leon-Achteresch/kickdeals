import { headers } from "next/headers";
import { ReactNode } from "react";

interface PagesLayoutProps {
  children: ReactNode;
}

export default function PagesLayout({ children }: PagesLayoutProps) {
  const headersList = headers();
  // read the custom x-url header
  const header_url = headersList.get("x-url") || "";

  return (
    <div className="p-4">
      {children}
    </div>
  );
}
