import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";

interface ByCatProps {
  products: any[];
}

export default function ProductsByCategory({ products }: ByCatProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center gap-4 my-10">
      {products.map((product: any) => (
        <Card
          key={product.id}
          className="w-full h-full p-0 m-0 shadow-gray-400"
        >
          <CardHeader className="p-0">
            <div className="relative w-full h-full">
              <Image
                src={"../placeholder.svg"}
                alt={product.title}
                height={"80"}
                width={"80"}
                className="object-fill w-full max-h-50 rounded-lg"
              />
              <Badge className="absolute top-3 right-2" color="#3eb2b4">
                {product.categorySlug}
              </Badge>
              <h2 className="absolute bottom-3 left-3 text-lg font-bold">
                {product.title}
              </h2>
            </div>
          </CardHeader>
          <CardContent className="font-medium text-md">
            {product.desc}
          </CardContent>

          <CardFooter className="pb-4 text-xl font-extrabold text-[#FDBB2D]">
            ${product.price}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
