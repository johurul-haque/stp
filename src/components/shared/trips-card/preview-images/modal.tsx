'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { MapPinIcon } from 'lucide-react';
import Image from 'next/image';
import { PreviewImagesCarousel } from '.';

type PropsType = {
  images: string[];
  destination: string;
};

export function PreviewImagesModal({ images, destination }: PropsType) {
  return (
    <Dialog>
      <div className="relative overflow-clip rounded group max-2xl:-order-1">
        <Image
          src={images[0]}
          className="aspect-video object-cover max-w-full"
          alt={`Image for ${destination}`}
          width={800}
          height={800}
        />

        {!!(images.length - 1) && (
          <div className="bg-neutral-950/60 py-1 text-xs text-center absolute bottom-0 inset-x-0 text-white">
            +{images.length - 1} more <span className="sr-only">images</span>
          </div>
        )}

        <DialogTrigger asChild>
          <button className="absolute inset-0 text-xs tracking-wider text-neutral-300 bg-neutral-950/65 opacity-0 group-hover:opacity-100 transition-all focus-visible:opacity-100">
            View image(s)
          </button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-medium text-base flex items-start gap-2 mb-1.5">
            <MapPinIcon
              aria-hidden
              size={22}
              className="text-neutral-600 dark:text-neutral-700 flex-shrink-0"
            />
            {destination}
          </DialogTitle>

          <PreviewImagesCarousel images={images} destination={destination} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
