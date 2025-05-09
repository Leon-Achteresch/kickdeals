import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();

  const user = await supabase.auth.getUser();

  if (!user.data.user) {
    redirect("/");
  }

  return (
    <div className="max-w-7xl flex flex-col gap-12 items-start">{children}</div>
  );
}
