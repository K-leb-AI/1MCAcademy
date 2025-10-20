import React from "react";
import CourseCard from "../../components/CourseCard";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Courses = () => {
  const coursesData = [
    // 🧱 3D MODELING
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

    // 🕶️ VR DEVELOPMENT
    {
      id: 4,
      title: "VR Development Fundamentals",
      topic: "VR Development",
      level: "Beginner",
      description: "Build your first immersive VR scene using Unity.",
      detailedDescription:
        "Get started with virtual reality by setting up Unity for VR. You’ll create simple interactive experiences, explore physics, and learn how VR worlds are structured.",
      instructor: "Ama Boateng",
      instructorBio:
        "Unity developer passionate about immersive storytelling and spatial design.",
      badge: "VR Explorer",
      lessonsCount: 7,
      duration: "3h 00m",
      price: "GH₵ 0.00 (Free)",
      rating: 4.6,
      thumbnail:
        "https://images.pexels.com/photos/3175983/pexels-photo-3175983.jpeg",
      progress: 0,
      isLocked: false,
    },
    {
      id: 5,
      title: "Building Interactive VR Worlds",
      topic: "VR Development",
      level: "Intermediate",
      description: "Design engaging VR environments with Unity’s XR tools.",
      detailedDescription:
        "Learn to add interactivity and usability to your VR experiences. This course covers teleportation systems, physics interactions, and optimization techniques.",
      instructor: "David Ntim",
      instructorBio:
        "AR/VR engineer focused on real-time graphics and interaction systems.",
      badge: "VR Creator",
      lessonsCount: 9,
      duration: "4h 25m",
      price: "GH₵ 11.99",
      rating: 4.8,
      thumbnail:
        "https://images.pexels.com/photos/3175979/pexels-photo-3175979.jpeg",
      progress: 0,
      isLocked: true,
    },

    {
      id: 14,
      title: "Publishing & Optimizing VR Experiences",
      topic: "VR Development",
      level: "Advanced",
      description: "Learn to optimize and deploy VR projects across platforms.",
      detailedDescription:
        "Master the final stages of VR production — performance optimization, lighting tweaks, and deployment to platforms like Meta Quest and SteamVR. Gain the confidence to launch your own VR experiences to the public.",
      instructor: "Michael Osei Frimpong",
      instructorBio:
        "VR developer and trainer with a background in Unity and XR systems.",
      badge: "VR Developer",
      lessonsCount: 10,
      duration: "5h 00m",
      price: "$13.99",
      rating: 4.9,
      thumbnail:
        "https://images.pexels.com/photos/3183187/pexels-photo-3183187.jpeg",
      progress: 0,
      isLocked: true,
    },

    // 💻 WEB DEVELOPMENT
    {
      id: 6,
      title: "Intro to Web Development",
      topic: "Web Development",
      level: "Beginner",
      description:
        "Build your first responsive website using HTML, CSS, and JavaScript.",
      detailedDescription:
        "A complete beginner’s guide to modern web development. You’ll design layouts with HTML, style them with CSS, and add interactivity using JavaScript.",
      instructor: "Sarah Owusu",
      instructorBio:
        "Frontend engineer passionate about teaching web design fundamentals.",
      badge: "Web Beginner",
      lessonsCount: 10,
      duration: "4h 00m",
      price: "GH₵ 0.00 (Free)",
      rating: 4.9,
      thumbnail:
        "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg",
      progress: 0,
      isLocked: false,
    },
    {
      id: 7,
      title: "Building Interactive Web Apps",
      topic: "Web Development",
      level: "Intermediate",
      description:
        "Use APIs and frameworks to create dynamic web applications.",
      detailedDescription:
        "In this hands-on course, you’ll learn how to use modern JavaScript frameworks and REST APIs to build responsive, data-driven web experiences.",
      instructor: "Kojo Agyeman",
      instructorBio:
        "Full-stack developer and mentor with 8+ years of experience in JS frameworks.",
      badge: "Web Coder",
      lessonsCount: 11,
      duration: "5h 10m",
      price: "GH₵ 12.99",
      rating: 4.8,
      thumbnail:
        "https://images.pexels.com/photos/326503/pexels-photo-326503.jpeg",
      progress: 0,
      isLocked: true,
    },
    {
      id: 16,
      title: "Responsive Design & Accessibility",
      topic: "Web Development",
      level: "Intermediate",
      description:
        "Design inclusive, mobile-first websites that everyone can use.",
      detailedDescription:
        "Explore how to create accessible and responsive designs with CSS Grid, Flexbox, and ARIA principles. Ensure your websites look great and function well for all users.",
      instructor: "Ama Tetteh",
      instructorBio: "Frontend accessibility advocate and UX designer.",
      badge: "Web Designer",
      lessonsCount: 8,
      duration: "4h 10m",
      price: "$9.99",
      rating: 4.7,
      thumbnail:
        "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
      progress: 0,
      isLocked: true,
    },

    // 🐍 PYTHON PROGRAMMING
    {
      id: 8,
      title: "Python Basics for Everyone",
      topic: "Python Programming",
      level: "Beginner",
      description:
        "Learn Python syntax, loops, and data structures with projects.",
      detailedDescription:
        "A practical introduction to Python programming for complete beginners. You’ll write simple scripts, work with conditionals and loops, and practice your skills through coding exercises.",
      instructor: "Michael Osei Frimpong",
      instructorBio:
        "Software developer and data analyst with a passion for teaching programming.",
      badge: "Python Newbie",
      lessonsCount: 9,
      duration: "3h 20m",
      price: "GH₵ 0.00 (Free)",
      rating: 4.7,
      thumbnail:
        "https://images.pexels.com/photos/27427258/pexels-photo-27427258.jpeg",
      progress: 0,
      isLocked: false,
    },
    {
      id: 9,
      title: "Working with Data in Python",
      topic: "Python Programming",
      level: "Intermediate",
      description: "Analyze and visualize data with pandas and matplotlib.",
      detailedDescription:
        "Learn to manipulate and analyze datasets using Python libraries like pandas and matplotlib. You’ll build small data projects to visualize trends and patterns.",
      instructor: "Afia Boadu",
      instructorBio:
        "Data scientist and instructor specializing in analytics and visualization.",
      badge: "Data Wrangler",
      lessonsCount: 10,
      duration: "4h 30m",
      price: "GH₵ 10.99",
      rating: 4.8,
      thumbnail:
        "https://images.pexels.com/photos/10816120/pexels-photo-10816120.jpeg",
      progress: 0,
      isLocked: true,
    },
    {
      id: 17,
      title: "Building Real-World Python Projects",
      topic: "Python Programming",
      level: "Advanced",
      description:
        "Create automation scripts, APIs, and small web apps with Python.",
      detailedDescription:
        "Apply your Python skills to real-world scenarios. You’ll build automation tools, APIs, and simple web applications using Flask, while learning software structuring and deployment basics.",
      instructor: "Yaw Oppong",
      instructorBio:
        "Backend engineer and Python instructor specializing in automation.",
      badge: "Python Pro",
      lessonsCount: 11,
      duration: "5h 30m",
      price: "$13.99",
      rating: 4.8,
      thumbnail:
        "https://images.pexels.com/photos/5053838/pexels-photo-5053838.jpeg",
      progress: 0,
      isLocked: true,
    },

    // 🚀 ENTREPRENEURSHIP
    {
      id: 10,
      title: "Idea to Action: Starting Your Venture",
      topic: "Entrepreneurship",
      level: "Beginner",
      description: "Turn your ideas into a solid startup concept.",
      detailedDescription:
        "Learn how to identify market needs, define your value proposition, and craft a lean business model. Perfect for aspiring founders taking their first steps.",
      instructor: "Esi Nyamekye",
      instructorBio:
        "Startup consultant and entrepreneur who has coached 50+ early-stage founders.",
      badge: "Startup Starter",
      lessonsCount: 6,
      duration: "2h 40m",
      price: "GH₵ 0.00 (Free)",
      rating: 4.9,
      thumbnail:
        "https://images.pexels.com/photos/7414273/pexels-photo-7414273.jpeg",
      progress: 0,
      isLocked: false,
    },
    {
      id: 11,
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
      id: 18,
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
      id: 12,
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
      id: 13,
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
    <div>
      <div className="flex w-full max-w-sm items-center gap-2">
        <Input type="text" placeholder="Search a course" />
        <Button type="submit" variant="default" className="cursor-pointer">
          <Search size={15} />
          Search
        </Button>
      </div>

      <div className="mt-8 grid lg:grid-cols-3 gap-5">
        {coursesData.map((course) => (
          <CourseCard course={course} />
        ))}
      </div>
    </div>
  );
};

export default Courses;
