import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
}) => (

  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-muted-foreground">{description}</p>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-2xl font-bold">${price}</span>
        <span className="text-green-600 font-semibold">Save ${savings}</span>
      </div>
    </CardContent>
  </Card>
)

export default FeaturedDeal;