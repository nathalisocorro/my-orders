import FooterElement from "@/components/footer";
import LeftDrawer from "@/components/leftDrawer";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
    <div className="flex bg-[#d7eff5] h-full justify-start">
      <main className="mx-4 my-5 w-full">
        <div className="flex justify-start gap-5">
            <div className="pt-5">
            <LeftDrawer />
            </div>
            <div className="w-full px-5">
                {children}
            </div>
            </div>
    </main>
    </div>
    <FooterElement />
    </>
  );
}
