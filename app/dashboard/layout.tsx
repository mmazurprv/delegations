import SideMenu from "@/components/dashboard/side-menu";
import TopMenu from "@/components/dashboard/top-menu";
import { TooltipProvider } from "@radix-ui/react-tooltip";
import React, { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-muted/40 flex min-h-screen">
      <SideMenu />
      <div className="flex flex-1 flex-col">
        <TopMenu />
        <main className="flex-1 p-4  ">{children}</main>
      </div>
    </div>
  );
}
