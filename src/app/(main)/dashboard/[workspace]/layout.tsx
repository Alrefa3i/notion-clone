import React from "react";
import SideBar from "@/components/SideBar";
interface LayoutProps {
  children: React.ReactNode;
  params: any;
}

const Layout: React.FC<LayoutProps> = ({ children, params }) => {
  return (
    <main className="overflow-hidden w-screen h-screen flex ">
      <SideBar params={params} />

      <div className="dark:border-neutral-800 border-l-[1px] relative w-full overflow-scroll">
        {children}
      </div>
    </main>
  );
};
export default Layout;
