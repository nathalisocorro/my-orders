"use client";

import { Label } from "@radix-ui/react-label";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "./ui/sidebar";
import {
  Box,
  ClipboardList,
  ListOrdered,
  LogOut,
  Palmtree,
  PalmtreeIcon,
  ShoppingBag,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Avatar } from "./ui/avatar";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";

export default function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <>
      <Sidebar>
        <SidebarHeader className="bg-[#3eb2b4]">
          <Label className="flex justify-start items-center gap-2 font-extrabold text-xl text-white px-5 pt-3">
            Sunset Store <PalmtreeIcon size={"20"} />
          </Label>
          <div className="flex justify-end">
            <Badge className="text-[#3eb2b4] bg-white">Admin</Badge>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <Link
              href={"/"}
              className={`py-3 ${pathname === "/" ? "text-[#FDBB2D]" : "text-black"} hover:text-[#FDBB2D]`}
            >
              <div className="flex flex-start items-center gap-2 font-bold py-2 px-3">
                <Palmtree />
                <h3>Home</h3>
              </div>
              <h6 className="text-gray-500 text-sm px-3">Main page</h6>
            </Link>
            <Link
              href={"/categories"}
              className={`py-3 ${pathname === "/categories" ? "text-[#FDBB2D]" : "text-black"} hover:text-[#FDBB2D]`}
            >
              <div className="flex flex-start items-center gap-2 font-bold py-2 px-3">
                <ClipboardList />
                <h3>Categories</h3>
              </div>
              <h6 className="text-gray-500 text-sm px-3">
                List all the available categories
              </h6>
            </Link>
            <Link
              href={"/products"}
              className={`py-3 ${pathname === "/products" ? "text-[#FDBB2D]" : "text-black"} hover:text-[#FDBB2D]`}
            >
              <div className="flex flex-start items-center gap-2 font-bold py-2 px-3">
                <Box />
                <h3>Our products</h3>
              </div>
              <h6 className="text-gray-500 text-sm px-3">
                List all the available products
              </h6>
            </Link>
            <Link
              href={"/orders"}
              className={`py-3 ${pathname === "/orders" ? "text-[#FDBB2D]" : "text-black"} hover:text-[#FDBB2D]`}
            >
              <div className="flex flex-start items-center gap-2 font-bold py-2 px-3">
                <ShoppingBag />
                Orders
              </div>
              <h6 className="text-gray-500 text-sm px-3">
                List all the orders
              </h6>
            </Link>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter className="flex flex-row items-center justify-start px-3 text-sm mb-2">
          <Avatar>
            <AvatarImage
              className="border-2 border-[#3eb2b4] rounded-4xl"
              src="https://tse1.explicit.bing.net/th/id/OIP.0VUlY37k8_RL1FKov9zD9gHaHa?pid=ImgDet&w=184&h=184&c=7&dpr=1.3&o=7&rm=3"
            />
            <AvatarFallback>UN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <h3>Logged User</h3>
            <h4>user@gmail.com</h4>
          </div>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="ml-10" variant="ghost">
                <LogOut />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Log out</p>
            </TooltipContent>
          </Tooltip>
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
