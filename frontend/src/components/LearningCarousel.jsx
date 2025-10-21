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

export function CarouselSize({ courses }) {
  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="lg:px-10"
    >
      <CarouselContent>
        {courses.map((course, index) => (
          <CarouselItem
            key={index}
            className="md:basis-1/2 lg:basis-1/3 h-full"
          >
            <Card>
              <CardContent className="">
                <div className=" rounded-xl hover:scale-[1.005] duration-300 ">
                  <div className="flex items-center gap-4">
                    <img
                      src={course.thumbnail}
                      className={`w-12 aspect-square rounded-xl object-cover`}
                    />
                    <div className="">
                      <h3 className="text-lg font-semibold">{course.title}</h3>
                      <p className="text-sm text-foreground/50">
                        {course.instructor}
                      </p>
                    </div>
                  </div>

                  <div className="w-full bg-foreground/10 h-0.5 ounded-full mt-3">
                    <div
                      className="bg-primary h-0.5 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                  <div className="text-xs text-foreground/50 mt-2 flex justify-end">
                    45% complete . 7/15 lessons
                  </div>
                  <Button
                    variant="secondary"
                    className="w-full mt-5 cursor-pointer"
                  >
                    Continue
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
