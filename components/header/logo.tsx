import { APP_NAME } from "@/lib/constants/names";

export default function Logo() {
  return (
    <div className="flex items-center">
      <h1 className="font-bebas-neue text-xl sm:text-2xl tracking-wider font-bold truncate">
        {APP_NAME}
        <span className="text-primary">.</span>
      </h1>
    </div>
  );
}
