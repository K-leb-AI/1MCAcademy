import { useEffect, useState } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import { CiRedo } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { supabase } from "../../supabaseClient";
import toast from "react-hot-toast";

const classes = [
  {
    id: 1,
    name: "3D Modeling",
    skill_path: "3d modeling and printing",
    level: "beginner",
  },
  {
    id: 2,
    name: "3D Modeling",
    skill_path: "3d modeling and printing",
    level: "intermediate",
  },
  {
    id: 3,
    name: "3D Modeling",
    skill_path: "3d modeling and printing",
    level: "advanced",
  },
  {
    id: 4,
    name: "VR Development",
    skill_path: "virtual reality development",
    level: "beginner",
  },
  {
    id: 5,
    name: "VR Development",
    skill_path: "virtual reality development",
    level: "intermediate",
  },
  {
    id: 6,
    name: "VR Development",
    skill_path: "virtual reality development",
    level: "advanced",
  },
  {
    id: 7,
    name: "Web Development",
    skill_path: "web development",
    level: "beginner",
  },
  {
    id: 8,
    name: "Web Development",
    skill_path: "web development",
    level: "intermediate",
  },
  {
    id: 9,
    name: "Web Development",
    skill_path: "web development",
    level: "advanced",
  },
  {
    id: 10,
    name: "Python",
    skill_path: "python programming",
    level: "beginner",
  },
  {
    id: 11,
    name: "Python",
    skill_path: "python programming",
    level: "intermediate",
  },
  {
    id: 12,
    name: "Python",
    skill_path: "python programming",
    level: "advanced",
  },
  {
    id: 13,
    name: "Entrepreneurship",
    skill_path: "entrepreneurship",
    level: "beginner",
  },
  {
    id: 14,
    name: "Entrepreneurship",
    skill_path: "entrepreneurship",
    level: "intermediate",
  },
  {
    id: 15,
    name: "Entrepreneurship",
    skill_path: "entrepreneurship",
    level: "advanced",
  },
  {
    id: 16,
    name: "Drone Piloting",
    skill_path: "drone piloting",
    level: "beginner",
  },
  {
    id: 17,
    name: "Drone Piloting",
    skill_path: "drone piloting",
    level: "intermediate",
  },
  {
    id: 18,
    name: "Drone Piloting",
    skill_path: "drone piloting",
    level: "advanced",
  },
];

function getRecommendations(experienceLevel, interest, goal) {
  let recommended = classes.filter((c) => c.level === experienceLevel);

  if (interest === "design") {
    recommended = recommended.filter((c) =>
      ["3d", "vr-dev"].includes(c.skill_path)
    );
  } else if (interest === "software") {
    recommended = recommended.filter((c) =>
      ["web-dev", "python"].includes(c.skill_path)
    );
  } else if (interest === "hardware") {
    recommended = recommended.filter((c) => c.skill_path === "drone");
  } else if (interest === "business") {
    recommended = recommended.filter(
      (c) => c.skill_path === "entrepreneurship"
    );
  }
  return recommended;
}

const experienceOptions = [
  {
    value: "beginner",
    label: "No experience - Beginner",
    desc: "New to most tech concepts",
  },
  {
    value: "intermediate",
    label: "Some experience - Intermediate",
    desc: "I know the basics",
  },
  {
    value: "advanced",
    label: "Comfortable with tech - Advanced",
    desc: "I learn quickly",
  },
];

const interestOptions = [
  {
    value: "design",
    label: "Creative and Design",
    skill_paths: "3D Modeling, VR Development",
  },
  {
    value: "software",
    label: "Software Development",
    skill_paths: "Web Dev, Python",
  },
  {
    value: "hardware",
    label: "Hardware and Physical Projects",
    skill_paths: "Drone Piloting",
  },
  {
    value: "business",
    label: "Business and Entrepreneurship",
    skill_paths: "Entrepreneurship",
  },
];

const goalOptions = [
  { value: "new", label: "Learn a completely new skill", emoji: "🌱" },
  {
    value: "improve",
    label: "Get better at something I have started",
    emoji: "📈",
  },
  { value: "portfolio", label: "Build a portfolio or project", emoji: "🎯" },
  { value: "career", label: "Career change or advancement", emoji: "💼" },
];

export default function RecommendationSurvey() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [experience, setExperience] = useState(null);
  const [interest, setInterest] = useState(null);
  const [goal, setGoal] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const [loggedUser, setLoggedUser] = useState();

  const handleEnroll = async (recommendation) => {
    let region = localStorage.getItem("region");
    region = JSON.parse(region);
    const { data, error } = await supabase
      .from("profile")
      .insert({
        experience: recommendation.level,
        skill_path: recommendation.name,
        user_id: loggedUser.id,
        region,
      })
      .select();

    console.log(data);

    if (error) {
      console.error("Profile insert error:", error);
      return;
    } else {
      navigate("/dashboard");
      toast(`Welcome, ${loggedUser.user_metadata.display_name}`);
    }
  };

  const handleContinue = () => {
    if (step === 0 && experience) {
      setStep(1);
    } else if (step === 1 && interest) {
      setStep(2);
    } else if (step === 2 && goal) {
      const recs = getRecommendations(experience, interest, goal);
      setRecommendations(recs);
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step === 3) {
      setRecommendations(null);
      setStep(2);
    } else if (step > 0) {
      setStep(step - 1);
    }
  };

  const handleReset = () => {
    setStep(0);
    setExperience(null);
    setInterest(null);
    setGoal(null);
    setRecommendations(null);
  };

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) setLoggedUser(user);
      } catch (error) {
        console.error("Error in survey for auth:", error);
      }
    };

    handleAuth();
  });

  return (
    <div className="flex items-center flex-col w-[300px]">
      <div className="w-full max-w-2xl">
        {step < 3 ? (
          <div className="">
            {step > 0 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 text-foreground mb-6 font-medium cursor-pointer"
              >
                <FaChevronLeft size={10} />
                Back
              </button>
            )}

            {step === 0 && (
              <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{
                  translateX: 0,
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
              >
                <div className="flex flex-col justify-center items-center">
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    Let's get to know you
                  </h1>
                  <p className="text-muted-foreground mb-8 text-center text-sm">
                    To find the perfect class for you, We'd like to ask just a
                    few questions.
                  </p>
                  <div className="space-y-4">
                    <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                      What is your experience level with technology?
                    </h2>
                    {experienceOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setExperience(opt.value)}
                        className={`w-full p-4 border-1 rounded-lg text-left transition-all cursor-pointer ${
                          experience === opt.value
                            ? "border-primary bg-primary/5"
                            : "border-gray/30 hover:border-primary/60"
                        }`}
                      >
                        <div className="font-semibold text-sm">{opt.label}</div>
                        <div className="text-xs text-gray">{opt.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{
                  translateX: 0,
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
              >
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                    What interests you most?
                  </h2>
                  <div className="space-y-4">
                    {interestOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setInterest(opt.value)}
                        className={`w-full p-4 border-1 rounded-lg text-left transition-all ${
                          interest === opt.value
                            ? "border-primary bg-primary/5"
                            : "border-gray/30 hover:border-primary/60"
                        }`}
                      >
                        <div className="font-semibold text-foreground text-sm">
                          {opt.label}
                        </div>
                        <div className="text-xs text-foreground/50">
                          {opt.skill_paths}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                initial={{ translateX: -100, opacity: 0 }}
                animate={{
                  translateX: 0,
                  opacity: 1,
                  transition: { duration: 0.5 },
                }}
              >
                <div>
                  <h2 className="text-xl font-semibold text-foreground mb-6 text-center">
                    What is your main goal?
                  </h2>
                  <div className="space-y-4">
                    {goalOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setGoal(opt.value)}
                        className={`w-full p-4 border-1 rounded-lg text-left transition-all ${
                          goal === opt.value
                            ? "border-primary bg-primary/5"
                            : "border-gray/30 hover:border-primary/60"
                        }`}
                      >
                        <div className="font-semibold text-foreground text-sm">
                          {opt.emoji} {opt.label}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <button
              onClick={handleContinue}
              disabled={
                (step === 0 && !experience) ||
                (step === 1 && !interest) ||
                (step === 2 && !goal)
              }
              className="w-full mt-8 bg-primary hover:bg-primary/80 disabled:bg-secondary disabled:text-foreground/50 text-primary-foreground font-semibold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors duration-300 cursor-pointer"
            >
              Continue
              <FaChevronRight size={10} />
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ translateX: -100, opacity: 0 }}
            animate={{
              translateX: 0,
              opacity: 1,
              transition: { duration: 0.5 },
            }}
          >
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2 text-center">
                Your Recommendations
              </h1>
              <p className="text-gray mb-8 text-center">
                Based on your answers, here are the perfect classes for you:
              </p>

              <div className="space-y-4 mb-8">
                {recommendations.map((cls) => (
                  <div
                    key={cls.id}
                    className="px-6 py-4 border border-primary rounded-lg hover:shadow-md transition-shadow bg-primary/5"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-foreground">
                          {cls.name}
                        </h3>
                        <div className="mt-1 inline-block">
                          <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full capitalize">
                            {cls.level}
                          </span>
                        </div>
                      </div>
                      <button
                        className="bg-primary hover:bg-primary/80 text-primary-foreground px-4 py-1 rounded-lg font-medium transition-colors cursor-pointer"
                        onClick={() => handleEnroll(cls)}
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={handleReset}
                className="flex gap-2 justify-center items-center w-full bg-primary hover:bg-primary/80 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
              >
                <CiRedo size={20} />
                Start Over
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
