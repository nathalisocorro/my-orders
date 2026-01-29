"use server"
import { Sidebar } from "lucide-react";
import AppSidebar from "./appSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import { getCurrentUser } from "@/src/app/api/auth/get-user/route";
import { toast } from "sonner";

const user = await getCurrentUser()

export default async function LeftDrawer() {
  return (
    <SidebarProvider>
      <AppSidebar user={user}/>
      <SidebarTrigger size={"lg"} className="h-10 w-10 hover:bg-[#3eb2b4]">
        <Sidebar size={"lg"} className="h-full w-10" />
      </SidebarTrigger>
    </SidebarProvider>
  );
}
