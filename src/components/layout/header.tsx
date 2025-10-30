
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MobileNav } from '@/components/layout/mobile-nav';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Clapperboard className="h-6 w-6 text-primary" />
            <span className="font-bold">AniTracker</span>
          </Link>
        </div>
        <nav className="hidden flex-1 items-center space-x-4 md:flex">
          <Link href="/browse/anime">
            <Button variant="ghost">Browse Anime</Button>
          </Link>
          <Link href="/browse/manga">
            <Button variant="ghost">Browse Manga</Button>
          </Link>
          <Link href="/watchlist">
            <Button variant="ghost">Watchlist</Button>
          </Link>
        </nav>
        <div className="flex flex-1 justify-end md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
