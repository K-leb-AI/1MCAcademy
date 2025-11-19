import React, { useEffect, useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, NotepadText } from "lucide-react";
import Loading from "../../components/Loading";
import { useUser } from "../../utils/UserProvider";
// import { MdWork } from "react-icons/md";
import Timeline from "@mui/lab/Timeline";
import TimelineItem, { timelineItemClasses } from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

import Makafui from "@/components/Makafui";

const NunyaAssistant = () => {
  const skillPaths = [
    {
      id: 1,
      title: "3D Modeling & Printing",
      description:
        "3D Modeling teaches students how to create digital objects and characters used in games, animation, and AR/VR. They learn the basics of shaping models, adding detail, and applying textures—along with how to prepare their designs for real-world 3D printing, turning digital creations into physical objects.",
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      keySkills: [
        "Fusion 360",
        "Blender",
        "Rendering and Animation",
        "Texturing and materials",
      ],
    },
    {
      id: 2,
      title: "Virtual Reality Development",
      description:
        "Virtual Reality Development introduces students to building immersive digital environments. Using tools like Unity or Unreal Engine, they learn how VR devices work and how to create interactive, engaging experiences that feel real and responsive.",
      image:
        "https://images.pexels.com/photos/1261820/pexels-photo-1261820.jpeg",
      keySkills: ["C#", "Unity", "Arkio"],
    },
    {
      id: 3,
      title: "Web Development",
      description:
        "Web Development covers the essentials of building modern websites and web applications. Students learn HTML, CSS, JavaScript, and tools like React, gaining the skills needed to design, develop, and deploy responsive, user-friendly sites.",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      keySkills: [
        "HTML",
        "CSS",
        "JavaScript",
        "ReactJs",
        "NodeJs",
        "Database Management",
      ],
    },
    {
      id: 4,
      title: "Python Programming",
      description:
        "Python Programming helps students develop strong coding foundations. They learn how to write clean code, solve problems, and work with data, preparing them for areas like automation, backend development, and data analysis.",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      keySkills: [
        "Python basics",
        "Data structures and algorithms",
        "Numpy",
        "TensorFlow",
      ],
    },
    {
      id: 5,
      title: "Entrepreneurship",
      description:
        "Entrepreneurship guides students through turning ideas into real businesses. They learn how to identify opportunities, validate concepts, understand customers, and build the skills needed to launch and manage a successful venture.",
      image:
        "https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg",
      keySkills: [
        "Business Model Design",
        "Market validation",
        "Pitching and fundraising",
        "Scaling operations",
      ],
    },
    {
      id: 6,
      title: "Drone Piloting",
      description:
        "Drone Piloting teaches students how to safely fly and control drones for creative and professional purposes. They explore aerial photography, navigation, and drone regulations while developing confidence and technical skill.",
      image:
        "https://images.pexels.com/photos/1045776/pexels-photo-1045776.jpeg",
      keySkills: [
        "Flight fundamentals",
        "Drone regulations and safety",
        "Aerial photography",
        "Mission planning and mapping",
      ],
    },
  ];

  const skillPathArticles = [
    {
      isActive: true,
      discipline: "3D Modeling",
      articles: [
        {
          title: "Understanding 3D Modeling | From Its Evolution To Revolution",
          url: "https://7cgi.com/blog/understanding-3dmodeling-evolution-to-revolution/?utm_source=chatgpt.com",
        },
        {
          title: "The Future of 3D Modeling in 2025 [Top Trends & Predictions]",
          url: "https://www.geeksforgeeks.org/blogs/future-of-3d-modeling/?utm_source=chatgpt.com",
        },
        {
          title: "3D Modeling in Gaming Industry: Evolution and Impact",
          url: "https://www.nextechar.com/blog/3d-modeling-in-gaming-industry?utm_source=chatgpt.com",
        },
      ],
    },
    {
      isActive: false,
      discipline: "VR Development",
      articles: [
        {
          title:
            "VR Applications: Key Industries Already Using Virtual Reality",
          url: "https://virtualspeech.com/blog/vr-applications?utm_source=chatgpt.com",
        },
        {
          title: "Today's Virtual Reality Use Cases and Industry Applications",
          url: "https://www.techtarget.com/searchcio/tip/Todays-virtual-reality-use-cases-and-industry-applications?utm_source=chatgpt.com",
        },
        {
          title:
            "Emerging Technologies in Augmented Reality (AR) and Virtual Reality",
          url: "https://www.mdpi.com/2504-4494/9/9/297?utm_source=chatgpt.com",
        },
      ],
    },
    {
      isActive: false,
      discipline: "Web Development",
      articles: [
        {
          title: "8 Web Development Trends for 2025",
          url: "https://wpengine.com/blog/web-development-trends/?utm_source=chatgpt.com",
        },
        {
          title: "9 Top Web Development Trends to Watch in 2025",
          url: "https://prismic.io/blog/web-development-trends?utm_source=chatgpt.com",
        },
        {
          title: "Top Web Development Statistics & Trends You Should Know",
          url: "https://www.digitalsilk.com/digital-trends/web-development-statistics/?utm_source=chatgpt.com",
        },
      ],
    },
    {
      isActive: false,
      discipline: "Python Programming",
      articles: [
        {
          title: "Digital Skills in Sub-Saharan Africa: Spotlight on Ghana",
          url: "https://www.ifc.org/content/dam/ifc/doc/mgrt/digital-skills-final-web-5-7-19.pdf?utm_source=chatgpt.com",
        },
        {
          title:
            "Ghana Targets 350,000 Youth for Coding and Digital Skills Training",
          url: "https://techafricanews.com/2025/09/05/ghana-targets-350000-youth-for-coding-and-digital-skills-training/?utm_source=chatgpt.com",
        },
      ],
    },
    {
      isActive: false,
      discipline: "Entrepreneurship",
      articles: [
        {
          title:
            "What Ghana Can Learn from Global Initiatives as It Trains One Million Coders",
          url: "https://www.myjoyonline.com/what-ghana-can-learn-from-global-initiatives-as-it-trains-one-million-coders/?utm_source=chatgpt.com",
        },
      ],
    },
    {
      isActive: false,
      discipline: "Drone Piloting",
      articles: [
        {
          title: "Drones for Development in Ghana",
          url: "https://penplusbytes.org/publications/drones-for-development-in-ghana/?utm_source=chatgpt.com",
        },
        {
          title: "How UAV Drones Can Accelerate Development in Ghana",
          url: "https://technologysalon.org/how-uav-drones-can-accelerate-development-in-ghana/?utm_source=chatgpt.com",
        },
        {
          title: "Top 7 Reasons You Should Consider Drone Training",
          url: "https://dronehubgh.com/blog/7-reasons-to-consider-drone-training?utm_source=chatgpt.com",
        },
      ],
    },
    {
      isActive: false,
      discipline: "Context & Local Relevance",
      articles: [
        {
          title: "Digital Skills in Sub-Saharan Africa: Spotlight on Ghana",
          url: "https://www.ifc.org/content/dam/ifc/doc/mgrt/digital-skills-final-web-5-7-19.pdf?utm_source=chatgpt.com",
        },
        {
          title:
            "Ghana Targets 350,000 Youth for Coding and Digital Skills Training",
          url: "https://techafricanews.com/2025/09/05/ghana-targets-350000-youth-for-coding-and-digital-skills-training/?utm_source=chatgpt.com",
        },
      ],
    },
  ];

  const { isLoading, userProfile } = useUser();

  if (isLoading) {
    return <Loading />;
  }

  useEffect(() => {}, []);

  return (
    <div className="flex gap-8 flex-col md:flex-row px-4 mt-6 md:px-10">
      <div className="w-full md:w-3/5 h-[85vh] rounded-xl bg-sidebar relative md:sticky md:top-26 top-3 bottom-8 md:mt-3.5 mb-8">
        <Makafui />
      </div>

      <div className="w-full md:w-2/5">
        <h1 className="text-2xl font-bold mt-0 md:mt-6 mb-2">Ask Makafui</h1>
        <p className="text-foreground/70 md:mb-5 text-justify leading-6">
          Makafui is your personal AI guide on Nunya, ready to help you master
          digital skills across all six disciplines. Makafui explains clearly,
          breaks down complex concepts into simple, understandable steps, and
          guides you through problems, while providing actionable, step-by-step
          help whenever you get stuck.
        </p>
        <div className="">
          <h1 className="text-2xl font-bold my-4 mt-8">
            Confused about your learning path?
          </h1>
          <p className="leading-6 mb-5 text-foreground/50 text-justify">
            If you're confused about anything related to your area of expertise
            and what you'll learn in that area, you can read a bit about it here
            and if you still need some clarification, don't hesistate to text
            Makafui!
          </p>
        </div>

        <Timeline
          sx={{
            [`& .${timelineItemClasses.root}:before`]: {
              flex: 0,
              padding: 0,
            },
          }}
          position="left"
          className="-ml-10 -mr-4"
        >
          {skillPaths.map((skill, index) => (
            <TimelineItem key={index}>
              <TimelineSeparator className="">
                <TimelineDot />
                <TimelineConnector className="opacity-30" />
              </TimelineSeparator>
              <TimelineContent>
                <div className="shadow-md px-8 py-5 mb-5 rounded-xl font-primary bg-sidebar">
                  <p className="text-lg font-bold mb-2 text-left">
                    {skill.title}
                  </p>
                  <p className="text-xs mb-5 text-foreground/50 text-justify leading-6">
                    {skill.description}
                  </p>
                  <div className="flex gap-2 w-full flex-wrap">
                    {skill.keySkills.map((keySkill, index) => (
                      <div
                        key={index}
                        className="bg-accent px-2 py-2 rounded-lg text-xs"
                      >
                        {keySkill}
                      </div>
                    ))}
                  </div>
                </div>
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>

        <div className="p-5 border border-sidebar bg-sidebar rounded-xl w-full mr-15 mb-7">
          <h1 className="text-xl font-bold mb-5">Relevant articles</h1>
          {skillPathArticles.map((article, index) => (
            <Collapsible
              key={index}
              defaultOpen={article.isActive}
              className="group/collapsible mb-4"
            >
              <CollapsibleTrigger className="flex items-center gap-3">
                <p className="text-sm leading-6 font-semibold">
                  {article.discipline}
                </p>
                <ChevronRight
                  size={14}
                  className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
                />
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-2">
                {article.articles.map((subArticle, index) => (
                  <div
                    className="flex border-l pl-5 border-border gap-2"
                    key={index}
                  >
                    <NotepadText
                      size={10}
                      className="text-foreground/50 mt-1"
                    />
                    <a
                      href={subArticle.url}
                      className="block text-foreground/50 pb-2 text-xs"
                      target="_blank"
                    >
                      {subArticle.title}
                    </a>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NunyaAssistant;
