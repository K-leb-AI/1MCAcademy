import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import BadgeCard from "./BadgeCard";

export function CarouselSpacing({ badgeList }) {
  return (
    <Carousel className="w-full px-10 h-full">
      <CarouselContent className="-ml-1">
        {badgeList.map((badge, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/2">
            <BadgeCard
              key={index}
              courseTitle={badge.course.title}
              badgeName={badge.course.badge}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
