import Link from "next/link";
import { Home, LineChart, Car, FileText, Luggage, Bell } from "lucide-react";
import { Button } from "../ui/button";

const pages = [
  { icon: Home, name: "Dashboard", href: "/" },
  { icon: Luggage, name: "Delegations", href: "/delegations" },
  { icon: LineChart, name: "Analytics", href: "/analytics" },
  { icon: Car, name: "Cars", href: "/cars" },
  { icon: FileText, name: "Reports", href: "/reports" },
];

export default function SideMenu() {
  return (
    <div className="bg-background hidden border-r md:block">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-14 items-center justify-between border-b px-4 lg:h-[60px] lg:px-6">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 text-xl font-semibold w-full"
          >
            <span>Mirai</span>
          </Link>
          <div className="">
            <Link href="/notifications" className="flex items-center gap-2">
              <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                <Bell className="h-4 w-4" />
                <span className="sr-only">Toggle notifications</span>
              </Button>
              <span className="sr-only">Notifications</span>
            </Link>
          </div>
        </div>
        <div className="flex-1 px-2 text-sm font-medium lg:px-4 mr-16">
          {pages.map((page) => (
            <Link
              key={page.name}
              href={`/dashboard${page.href}`}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
            >
              <page.icon className="h-5 w-5" />
              {page.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
