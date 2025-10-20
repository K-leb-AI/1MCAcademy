import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const trophies = [
  "Baby Web Developer",
  "Constant Fighter",
  "Finished my course",
  "Time Keeper",
  "Intermediate Web Developer",
  "Time and Chance",
  "Baby Web Developer",
  "Constant Fighter",
  "Finished my course",
  "Time Keeper",
  "Intermediate Web Developer",
  "Time and Chance",
];

export function CarouselSpacing() {
  return (
    <Carousel className="w-full">
      <CarouselContent className="-ml-1">
        {trophies.map((trophyName, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/3">
            <Card className="aspect-square bg-card m-0 p-0">
              <CardContent className="flex items-center justify-center border aspect-square">
                <div className="flex justify-center items-center flex-col gap-3">
                  <img src="trophy.png" alt="" className="w-24 aspect-square" />
                  <span className="text-sm text-center">{trophyName}</span>
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
