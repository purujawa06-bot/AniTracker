
"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Clapperboard } from "lucide-react"

const mainNav = [
  { href: "/", label: "Home" },
  { href: "/browse/anime", label: "Browse Anime" },
  { href: "/browse/manga", label: "Browse Manga" },
  { href: "/watchlist", label: "Watchlist" },
]

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader className="border-b pb-4 mb-4">
            <SheetTitle>
                <Link href="/" className="flex items-center space-x-2" onClick={() => setOpen(false)}>
                    <Clapperboard className="h-6 w-6 text-primary" />
                    <span className="font-bold">AniTracker</span>
                </Link>
            </SheetTitle>
        </SheetHeader>
        <div className="p-4">
          <nav className="grid gap-4">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-lg font-semibold text-foreground/90 hover:text-primary"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
