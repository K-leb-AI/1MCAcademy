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

const completedCoursesData = [
  {
    id: 14,
    title: "Building and Validating Your MVP",
    topic: "Entrepreneurship",
    level: "Intermediate",
    description: "Design, test, and validate your minimum viable product.",
    detailedDescription:
      "Explore practical methods to build and test MVPs with real users. You’ll learn rapid prototyping, data-driven validation, and user feedback loops.",
    instructor: "Kojo Baidoo",
    instructorBio:
      "Product strategist helping startups turn ideas into scalable products.",
    badge: "Venture Builder",
    lessonsCount: 8,
    duration: "3h 50m",
    price: "GH₵ 8.99",
    rating: 4.8,
    thumbnail:
      "https://images.pexels.com/photos/7414285/pexels-photo-7414285.jpeg",
    progress: 0,
    isLocked: true,
  },
  {
    id: 15,
    title: "Scaling and Growth Strategies",
    topic: "Entrepreneurship",
    level: "Advanced",
    description: "Learn how to scale sustainably and manage a growing team.",
    detailedDescription:
      "Master the principles of startup scaling — hiring effectively, managing cash flow, and entering new markets. You’ll gain frameworks for sustainable growth and leadership in fast-moving environments.",
    instructor: "Michael Osei Frimpong",
    instructorBio:
      "Startup growth consultant and entrepreneur with 10+ years of experience.",
    badge: "Growth Expert",
    lessonsCount: 9,
    duration: "5h 20m",
    price: "$12.99",
    rating: 4.9,
    thumbnail:
      "https://images.pexels.com/photos/9052312/pexels-photo-9052312.jpeg",
    progress: 0,
    isLocked: true,
  },

  // 🛸 DRONE PILOTING
  {
    id: 16,
    title: "Basics of Drone Operation & Safety",
    topic: "Drone Piloting",
    level: "Beginner",
    description:
      "Learn drone controls, flight regulations, and safe operation.",
    detailedDescription:
      "A beginner-friendly guide to understanding drone mechanics, flight safety, and regulations. You’ll perform basic maneuvers and gain confidence in controlling drones.",
    instructor: "Yaw Owusu",
    instructorBio:
      "Certified drone pilot with experience in aerial photography and mapping.",
    badge: "Drone Novice",
    lessonsCount: 5,
    duration: "2h 20m",
    price: "GH₵ 0.00 (Free)",
    rating: 4.6,
    thumbnail:
      "https://images.pexels.com/photos/739410/pexels-photo-739410.jpeg",
    progress: 0,
    isLocked: false,
  },
  {
    id: 17,
    title: "Aerial Photography & Mapping",
    topic: "Drone Piloting",
    level: "Intermediate",
    description: "Capture stunning visuals and map terrains using drones.",
    detailedDescription:
      "Dive into aerial photography techniques and mapping fundamentals. Learn about camera settings, flight paths, and post-processing for visual storytelling.",
    instructor: "Afua Owusu",
    instructorBio: "Aerial imaging specialist and photography instructor.",
    badge: "Aerial Creator",
    lessonsCount: 7,
    duration: "3h 30m",
    price: "GH₵ 9.99",
    rating: 4.8,
    thumbnail:
      "https://images.pexels.com/photos/1612461/pexels-photo-1612461.jpeg",
    progress: 0,
    isLocked: true,
  },
  {
    id: 18,
    title: "Drone Applications in Industry",
    topic: "Drone Piloting",
    level: "Advanced",
    description:
      "Explore professional drone uses in logistics, inspection, and mapping.",
    detailedDescription:
      "Understand how drones are transforming industries from agriculture to construction. You’ll learn mission planning, automated flights, and compliance for commercial operations.",
    instructor: "Michael Osei Frimpong",
    instructorBio:
      "Commercial drone pilot with 8+ years in industrial UAV operations.",
    badge: "Drone Specialist",
    lessonsCount: 8,
    duration: "4h 45m",
    price: "$11.99",
    rating: 4.8,
    thumbnail:
      "https://images.pexels.com/photos/12032545/pexels-photo-12032545.jpeg",
    progress: 0,
    isLocked: true,
  },
];

export function CarouselSpacing() {
  return (
    <Carousel className="w-full px-10">
      <CarouselContent className="-ml-1">
        {completedCoursesData.map((completedCourse, index) => (
          <CarouselItem key={index} className="pl-1 md:basis-1/2 lg:basis-1/2">
            <BadgeCard
              key={index}
              courseTitle={completedCourse.title}
              badgeName={completedCourse.badge}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
