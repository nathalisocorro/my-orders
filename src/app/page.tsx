import EmptyContent from "@/components/emptyState";
import FooterElement from "@/components/footer";
import LeftDrawer from "@/components/leftDrawer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getHomeData } from "@/lib/home";
import { Label } from "@radix-ui/react-label";
import { Bath, HomeIcon, Palmtree, School, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

/* const schoolProds = [
    {
      id: 3,
      title: "School Bag",
      desc: "For school and for adventure",
      img: "./school-bag.jpg",
      price: 15.4,
      categorySlug: "school"
    },
  
  ]

  const bathBodyProds = [
    {
      id: 4,
      title: "Bath gel",
      desc: "Experience the true fragance of the flowers",
      img: "./bath-gel.jpg",
      price: 5.49,
      categorySlug: "bath&body"
    }
  ]

  const homeProds = [
    {
      id: 1,
      title: "Bowls set",
      desc: "Ready to use for your next family trip, made with the best materials.",
      img: "./bowls.jpg",
      price: 10.5,
      categorySlug: "home"
    },
    {
      id: 2,
      title: "Blender",
      desc: "To enjoy the best goals, use the best means",
      img: "./spoons.jpg",
      price: 5.49,
      categorySlug: "home"
    },
  ] */

export default async function Home() {
  const categories = await getHomeData(3);

  return (
    <>
      <div className="flex bg-[#d7eff5] h-full justify-start">
        <main className="mx-4 my-5 w-full">
          <div className="flex justify-start gap-5">
            <div className="pt-5">
              <LeftDrawer />
            </div>
            <div className="w-full px-5">
              <div className="flex w-full justify-between items-center">
                <div>
                  <div className="flex justify-space-between items-end">
                    <Label className="text-5xl font-extrabold bg-linear-to-r from-[#22C1C3] to-[#FDBB2D] bg-clip-text text-transparent">
                      Sunset Store
                    </Label>
                    <Palmtree size={"50"} />
                  </div>
                  <p className="text-md text-gray-700 mt-1 font-bold md:ml-5">
                    Get whatever you need with a single click!
                  </p>
                </div>
                <div>
                  <Link href={"/orders"}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          size={"lg"}
                          className="ml-10 hover:bg-[#22C1C3]"
                          variant="ghost"
                        >
                          <ShoppingCart size={"40"} />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Orders</p>
                      </TooltipContent>
                    </Tooltip>
                  </Link>
                </div>
              </div>

              <div className="nowrap mt-10 bg-transparent">
                <div>
                  <h2 className="text-xl font-extrabold mb-3">
                    Some of our products:{" "}
                  </h2>
                </div>
                <div>
                  {categories.length === 0 ? (
                    <EmptyContent />
                  ) : (
                    categories.map((category) => (
                      <Card
                        key={category.id}
                        className="font-extrabold text-md text-[#0d393a] mb-4 bg-white hover:bg-[#f8f4ea]"
                      >
                        <CardHeader className="flex gap-4 justify-start items-center">
                          <h2 className="my-1 text-2xl">{category.title}</h2>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 items-center gap-4">
                            {category.products.map((product) => (
                              <Card
                                key={product.id}
                                className="w-full h-full p-0 m-0 shadow-gray-400"
                              >
                                <CardHeader className="p-0">
                                  <div className="relative w-full h-full">
                                    <Image
                                      src={product.img || "./placeholder.svg"}
                                      alt={product.title}
                                      height={"80"}
                                      width={"80"}
                                      className="object-fill w-full max-h-50 rounded-lg"
                                    />
                                    <Badge
                                      className="absolute top-3 right-2"
                                      color="#3eb2b4"
                                    >
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

                                {
                                  <CardFooter className="flex justify-between pb-4 text-xl font-extrabold text-[#FDBB2D]">
                                    <h2>${product.price.toString()}</h2>
                                  </CardFooter>
                                }
                              </Card>
                            ))}
                          </div>
                        </CardContent>

                        <CardFooter className="flex my-1 justify-center text-[#0d393a] ">
                          <Link
                            className="hover:text-[#FDBB2D]"
                            href={`/categories/${category.slug}`}
                          >
                            See more...
                          </Link>
                        </CardFooter>
                      </Card>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <FooterElement />
    </>
  );
}
