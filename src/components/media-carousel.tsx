import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { JikanAnyMedia } from "@/lib/types";
import { MediaCard } from "./anime-card";
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

interface MediaCarouselProps {
    title: string;
    fetcher: () => Promise<JikanAnyMedia[]>;
    link?: string;
}

export async function MediaCarousel({ title, fetcher, link }: MediaCarouselProps) {
    const mediaList = await fetcher();

    if (!mediaList || mediaList.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                {link && (
                    <Button asChild variant="ghost">
                        <Link href={link}>
                            View All <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                )}
            </div>
            <Carousel opts={{
                align: "start",
                dragFree: true,
            }}
            className="w-full"
            >
                <CarouselContent>
                    {mediaList.map((media) => (
                        <CarouselItem key={media.mal_id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6">
                             <div className="p-1">
                                <MediaCard media={media} />
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="hidden lg:flex" />
                <CarouselNext className="hidden lg:flex" />
            </Carousel>
        </div>
    )
}
