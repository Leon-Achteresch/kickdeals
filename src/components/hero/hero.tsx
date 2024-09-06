import { Button } from "@/components/ui/button";
import { Search, Tag } from "lucide-react";

const Hero = () => {
  return (
<section className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to KickDeals</h1>
        <p className="text-xl text-muted-foreground mb-8">Discover the best deals on sneakers and kick your savings into high gear!</p>
        <div className="flex justify-center gap-4">
          <Button size="lg">
            <Search className="mr-2 h-4 w-4" /> Find Deals
          </Button>
          <Button size="lg" variant="outline">
            <Tag className="mr-2 h-4 w-4" /> Browse Categories
          </Button>
        </div>
      </section>
  );
};

export default Hero;