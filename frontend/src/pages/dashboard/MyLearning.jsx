import React from "react";
import { HiLightningBolt } from "react-icons/hi";
import { AlarmCheck, Badge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CarouselSize } from "../../components/LearningCarousel";
import { CompletedCarouselSize } from "../../components/LearningCarouselCompleted";
import BadgeCard from "../../components/BadgeCard";
import Calendar20 from "../../components/calendar-20";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const MyLearning = () => {
  const startedCoursesData = [
    {
      id: 1,
      title: "Intro to 3D Modeling",
      topic: "3D Modeling",
      level: "Beginner",
      description:
        "Learn the basics of shapes, lighting, and rendering in Blender.",
      detailedDescription:
        "Discover the fundamentals of 3D design using Blender. You’ll explore modeling tools, create simple shapes, and understand lighting and camera placement. This beginner-friendly course sets a solid foundation for your 3D journey.",
      instructor: "Michael Osei Frimpong",
      instructorBio:
        "3D artist and educator with over 7 years of experience in asset creation and animation.",
      badge: "3D Apprentice",
      lessonsCount: 8,
      duration: "3h 15m",
      price: "GH₵ 0.00 (Free)",
      rating: 4.8,
      thumbnail:
        "https://images.pexels.com/photos/3862367/pexels-photo-3862367.jpeg",
      progress: 0,
      isLocked: false,
    },
    {
      id: 2,
      title: "Game Asset Creation in Blender",
      topic: "3D Modeling",
      level: "Intermediate",
      description:
        "Create optimized 3D assets for real-time game environments.",
      detailedDescription:
        "Take your modeling to the next level by designing and texturing game-ready assets. You’ll learn UV unwrapping, baking textures, and exporting models for engines like Unity or Unreal.",
      instructor: "Adjoa Tetteh",
      instructorBio:
        "Environment artist specializing in stylized game worlds and visual storytelling.",
      badge: "3D Creator",
      lessonsCount: 10,
      duration: "4h 40m",
      price: "GH₵ 9.99",
      rating: 4.7,
      thumbnail:
        "https://images.pexels.com/photos/577585/pexels-photo-577585.jpeg",
      progress: 0,
      isLocked: true,
    },
    {
      id: 3,
      title: "Character Animation Mastery",
      topic: "3D Modeling",
      level: "Advanced",
      description: "Rig, animate, and bring your 3D characters to life.",
      detailedDescription:
        "This course dives deep into rigging and character animation workflows. You’ll learn bone setup, skin weighting, and keyframe animation to make characters move naturally and expressively.",
      instructor: "Kwesi Mensah",
      instructorBio:
        "3D animator who has worked on multiple indie and commercial projects.",
      badge: "3D Animator",
      lessonsCount: 12,
      duration: "6h 10m",
      price: "GH₵ 14.99",
      rating: 4.9,
      thumbnail:
        "https://images.pexels.com/photos/1921336/pexels-photo-1921336.jpeg",
      progress: 0,
      isLocked: true,
    },
    {
      id: 3,
      title: "Character Animation Mastery",
      topic: "3D Modeling",
      level: "Advanced",
      description: "Rig, animate, and bring your 3D characters to life.",
      detailedDescription:
        "This course dives deep into rigging and character animation workflows. You’ll learn bone setup, skin weighting, and keyframe animation to make characters move naturally and expressively.",
      instructor: "Kwesi Mensah",
      instructorBio:
        "3D animator who has worked on multiple indie and commercial projects.",
      badge: "3D Animator",
      lessonsCount: 12,
      duration: "6h 10m",
      price: "GH₵ 14.99",
      rating: 4.9,
      thumbnail:
        "https://images.pexels.com/photos/1921336/pexels-photo-1921336.jpeg",
      progress: 0,
      isLocked: true,
    },
  ];

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
    {
      id: 19,
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
  return (
    <div className="mb-5 px-10">
      {/* <div className="flex flex-col gap-6"> */}
      <div className="flex items-center justify-between my-6">
        <div className="font-bold text-2xl">My Learning Journey</div>

        <Dialog>
          <DialogTrigger>
            <div className="flex h-8 items-center justify-center rounded-lg p-2 gap-2 bg-primary text-white hover:bg-primary/80 duration-300 cursor-pointer">
              <AlarmCheck size={17} />
              <p className="">Set a reminder</p>
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set a reminder to study</DialogTitle>
              <DialogDescription>
                Select a time period when you would like to study and we'll send
                you an email to remind you about it.
              </DialogDescription>
              <Calendar20 />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>

      {/* Section 1: Overview Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-primary rounded-xl p-6 flex flex-col justify-center items-center">
          <h3 className="text-white mb-2">Current Streak</h3>
          <div className="text-white text-4xl font-bold flex h-8 items-center justify-center rounded-lg p-2 gap-1">
            <HiLightningBolt />
            <p>16</p>
          </div>
        </div>
        <div className="bg-sidebar rounded-xl p-6 flex flex-col justify-center items-center border border-border">
          <h3 className="text-foreground/50">Courses in Progress</h3>
          <p className="text-4xl font-bold mt-2">3</p>
        </div>
        <div className="bg-sidebar rounded-xl p-6 flex flex-col justify-center items-center border border-border">
          <h3 className="text-foreground/50">Completed Courses</h3>
          <p className="text-4xl font-bold mt-2">5</p>
        </div>
        <div className="bg-sidebar rounded-xl p-6 flex flex-col justify-center items-center border border-border">
          <h3 className="text-foreground/50">Total Learning Hours</h3>
          <p className="text-4xl font-bold mt-2">22h</p>
        </div>
      </div>

      {/* Section 2: Ongoing Courses */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
        <CarouselSize courses={startedCoursesData} className="w-full" />
      </div>

      {/* Section 3: Completed Courses */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Completed</h2>
        <CompletedCarouselSize
          courses={completedCoursesData}
          className="w-full"
        />
      </div>

      {/* Section 4: Badges */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Badges</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {completedCoursesData.map((completedCourse) => (
            <BadgeCard
              badgeName={completedCourse.badge}
              courseTitle={completedCourse.title}
              className="w-full"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
