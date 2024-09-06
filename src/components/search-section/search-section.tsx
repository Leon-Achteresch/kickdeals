import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchSection = () => {
  return (
    <section>
      <div className="flex gap-4">
        <Input placeholder="Suche nach Schuhe..." className="flex-grow" />
        <Button className=" bg-defaultprimary">Suche</Button>
      </div>
    </section>
  );
};

export default SearchSection;