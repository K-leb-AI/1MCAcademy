import * as React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge, Verified } from "lucide-react";

export function CompletedCarouselSize({ courses }) {
  console.log(courses);
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="lg:px-10"
    >
      <CarouselContent>
        {courses?.map((course, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <Card>
              <CardContent className="">
                <div className=" rounded-xl hover:scale-[1.005] duration-300 ">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.course.thumbnail_url}
                      className={`w-12 aspect-square rounded-xl object-cover`}
                    />
                    <div className="">
                      <h3 className="text-lg font-semibold">
                        {course.course.title}
                      </h3>
                      <p className="text-sm text-foreground/50">
                        {course.course.instructor.name}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-foreground gap-2 mt-3">
                    <p className="leading-4">{course.course.badge.title}</p>
                    <Verified size={15} className="text-green-600" />
                  </div>

                  <Button
                    variant="secondary"
                    className="w-full mt-5 cursor-pointer"
                  >
                    Revisit Course
                  </Button>
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
