"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

type PropsType = {
  images: string[];
  destination: string;
  className?: string;
};

export function PreviewImagesCarousel({
  images,
  destination,
  className,
}: PropsType) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <Carousel setApi={setApi}>
      <CarouselContent className={cn(className)}>
        {images.map((image) => (
          <CarouselItem key={image}>
            <Image
              src={image}
              className="aspect-video object-cover max-w-full"
              alt={`Image for ${destination}`}
              width={800}
              height={800}
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="flex justify-center items-center gap-x-4 mt-2">
        <CarouselPrevious />

        <div className="py-2 text-center text-sm text-neutral-500 dark:text-neutral-400 font-mono">
          {current} of {count}
        </div>

        <CarouselNext />
      </div>
    </Carousel>
  );
}
