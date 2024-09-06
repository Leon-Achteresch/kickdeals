import Link from "next/link";

const NavigationBar = () => {
  return (
    <nav className="flex justify-between items-center border-b w-full p-4">
      <div className="flex gap-5 items-center font-semibold">
        <Link href={"/"}>KickDeals</Link>
      </div>
    </nav>
  );
};

export default NavigationBar;