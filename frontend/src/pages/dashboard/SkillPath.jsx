import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight, Plus } from "lucide-react";

const SkillPath = () => {
  const skillPaths = [
    {
      id: 1,
      title: "3D Modeling",
      description:
        "Master the art of creating digital 3D assets for games, animation, and AR/VR experiences.",
      image:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg",
      keySkills: [
        "3D geometry fundamentals",
        "Modeling workflows (Blender)",
        "Lighting and rendering",
        "Texturing and materials",
      ],
      levels: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      id: 2,
      title: "Virtual Reality Development",
      description:
        "Build immersive VR experiences and interactive environments with Unity and Unreal Engine.",
      image:
        "https://images.pexels.com/photos/1261820/pexels-photo-1261820.jpeg",
      keySkills: [
        "Spatial design principles",
        "VR device integration",
        "Interactive environment scripting",
        "Performance optimization",
      ],
      levels: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      id: 3,
      title: "Web Development",
      description:
        "Learn to design and build responsive, modern web applications from scratch.",
      image:
        "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
      keySkills: [
        "HTML, CSS, and JavaScript",
        "Frontend frameworks (React)",
        "APIs and backend basics",
        "Deployment and version control",
      ],
      levels: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      id: 4,
      title: "Python Programming",
      description:
        "Build coding foundations with Python and move toward data analysis and automation.",
      image:
        "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg",
      keySkills: [
        "Python syntax and logic",
        "Data structures and algorithms",
        "APIs and file handling",
        "Automation and scripting",
      ],
      levels: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      id: 5,
      title: "Entrepreneurship",
      description:
        "Develop the mindset and tools to start, manage, and scale innovative businesses.",
      image:
        "https://images.pexels.com/photos/3183172/pexels-photo-3183172.jpeg",
      keySkills: [
        "Business model design",
        "Market validation",
        "Pitching and fundraising",
        "Scaling operations",
      ],
      levels: ["Beginner", "Intermediate", "Advanced"],
    },
    {
      id: 6,
      title: "Drone Piloting",
      description:
        "Learn how to operate drones safely and professionally for photography, mapping, and delivery.",
      image:
        "https://images.pexels.com/photos/1045776/pexels-photo-1045776.jpeg",
      keySkills: [
        "Flight fundamentals",
        "Drone regulations and safety",
        "Aerial photography",
        "Mission planning and mapping",
      ],
      levels: ["Beginner", "Intermediate", "Advanced"],
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

  return (
    <div className="mb-5 px-10">
      {/* --- Page Heading --- */}
      <h1 className="text-2xl font-bold mt-6 mb-2">Skill Paths</h1>
      <p className="text-foreground/70 mb-8">
        Explore learning paths designed to take you from beginner to expert
        across six essential disciplines — all aligned with Ghana’s One Million
        Coders initiative to empower the next generation of digital creators.
      </p>

      {/* --- Skill Path Cards --- */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {skillPaths.map((path) => (
          <div
            key={path.id}
            className="bg-sidebar rounded-xl p-3 hover:scale-[1.01] duration-300 shadow-sm"
          >
            <div
              className="w-full h-50 rounded-lg bg-cover bg-center mb-4"
              style={{ backgroundImage: `url(${path.image})` }}
            ></div>

            <h2 className="text-xl font-semibold mb-2">{path.title}</h2>
            <p className="text-sm text-foreground/60 mb-3">
              {path.description}
            </p>

            <ul className="text-xs text-foreground/50 mb-3 space-y-1">
              {path.keySkills.map((skill, i) => (
                <li key={i}>• {skill}</li>
              ))}
            </ul>

            <p className="text-xs text-primary font-medium">
              Levels: {path.levels.join(" → ")}
            </p>
          </div>
        ))}
      </div>

      {/* --- WHY THESE SIX DISCIPLINES --- */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3 text-foreground">
          <h2 className="text-2xl font-bold mb-4">
            Why These Six Disciplines Were Chosen
          </h2>
          <p className="mb-4 text-foreground/60 text-justify">
            Ghana’s{" "}
            <span className="font-semibold">One Million Coders initiative</span>{" "}
            envisions a digital future where every young person can build,
            create, and participate in technology-driven opportunities. These
            six disciplines—3D Modeling, VR Development, Web Development, Python
            Programming, Entrepreneurship, and Drone Piloting—were chosen
            strategically to align with this national goal.
          </p>

          <div className="space-y-6 text-sm leading-relaxed">
            <div>
              <h3 className="font-semibold text-lg">3D Modeling</h3>
              <p className="text-justify text-foreground/60">
                3D design powers industries from animation and gaming to
                architecture and AR/VR. By mastering 3D Modeling, learners can
                create digital assets that feed Ghana’s creative and tech
                sectors—unlocking exportable digital work opportunities.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">VR Development</h3>
              <p className="text-justify text-foreground/60">
                Virtual Reality opens doors to immersive learning, tourism, and
                interactive design. Building VR expertise empowers Ghanaians to
                move beyond consumption into creating world-class immersive
                experiences.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Web Development</h3>
              <p className="text-justify text-foreground/60">
                Web Development remains the backbone of the global digital
                economy. These skills provide the most direct route to
                employability, freelance work, and startup innovation—central to
                Ghana’s goal of becoming a regional digital talent hub.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Python Programming</h3>
              <p className="text-justify text-foreground/60">
                Python is simple yet powerful—used for automation, data
                analysis, and AI. It bridges foundational coding skills with
                real-world application, preparing learners for tech roles and
                problem-solving across industries.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Entrepreneurship</h3>
              <p className="text-justify text-foreground/60">
                Beyond technical skills, an entrepreneurial mindset turns
                knowledge into opportunity. This discipline helps learners build
                ventures, validate ideas, and create jobs—aligning with the
                national digital job creation agenda.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-lg">Drone Piloting</h3>
              <p className="text-justify text-foreground/60">
                Drone technology merges hardware, data, and digital control.
                It’s transforming agriculture, logistics, and creative
                industries. Training drone pilots extends Ghana’s innovation
                footprint into new frontiers of work and data services.
              </p>
            </div>
          </div>

          <p className="mt-8 text-sm text-justify text-foreground/60">
            Together, these disciplines represent Ghana’s commitment to building
            a generation of creators—not just coders. Each path offers a clear
            progression from beginner to advanced level, ensuring that every
            learner gains both the technical depth and creative confidence to
            thrive in a digital-first world.
          </p>
        </div>
        <div className="p-5 border border-sidebar bg-sidebar rounded-xl w-full lg:w-1/3">
          <h1 className="text-xl font-bold mb-10">Relevant articles</h1>
          {skillPathArticles.map((article, index) => (
            <Collapsible
              key={index}
              defaultOpen={article.isActive}
              className="group/collapsible mb-8"
            >
              <CollapsibleTrigger className="flex items-center gap-3">
                <p className="text-lg leading-6 font-semibold">
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
                    <Plus size={10} className="text-foreground/50 mt-1" />
                    <a
                      href={subArticle.url}
                      className="block text-foreground/50 pb-2"
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

export default SkillPath;
