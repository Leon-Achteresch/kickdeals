import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";

type FeaturedDealProps = {
  title: string;
  description: string;
  price: number;
  savings: number;
};

const FeaturedDeal: React.FC<FeaturedDealProps> = ({
  title,
  description,
  price,
  savings,
}) => {
  const router = useRouter();
  return (
    <Card onClick={() => router.push(`/product/${title}`)}>
      <CardHeader>
        <CardTitle className="text-2xl text1 font-bold">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{description}</p>
        <div className="mt-4 flex justify-between items-center">
          <span className="text-2xl font-bold">${price}</span>
          <span className="text-green-600 font-semibold">Save ${savings}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeaturedDeal;
