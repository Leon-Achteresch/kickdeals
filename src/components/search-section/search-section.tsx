import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchSection = () => {
  return (
    <section>
      <div className="flex gap-4">
        <Input placeholder="Search for deals..." className="flex-grow" />
        <Button>Search</Button>
      </div>
    </section>
  );
};

export default SearchSection;