import { Sidebar } from "lucide-react";
import AppSidebar from "./appSidebar";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";

export default function LeftDrawer() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger size={"lg"} className="h-10 w-10 hover:bg-[#3eb2b4]">
        <Sidebar size={"lg"} className="h-full w-10" />
      </SidebarTrigger>
    </SidebarProvider>
  );
}
