
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, ListVideo } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/browse", icon: Compass, label: "Browse" },
  { href: "/watchlist", icon: ListVideo, label: "Watchlist" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-card border-t z-50">
      <div className="flex justify-around items-center h-full">
        {navItems.map(({ href, icon: Icon, label }) => {
          const isActive = (href === "/" && pathname === href) || (href !== "/" && pathname.startsWith(href));
          return (
            <Link href={href} key={label} className={cn(
              "flex flex-col items-center justify-center text-xs gap-1 w-full h-full",
              isActive ? "text-primary" : "text-muted-foreground"
            )}>
              <Icon className="w-6 h-6" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
