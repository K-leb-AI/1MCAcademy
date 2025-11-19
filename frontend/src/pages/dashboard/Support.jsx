import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { User, Headset, HelpCircle, Lock } from "lucide-react";
import Loading from "../../components/Loading";
import { useUser } from "../../utils/UserProvider";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronRight } from "lucide-react";
import toast from "react-hot-toast";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState("Frequently Asked Questions");
  const [supportMessage, setSupportMessage] = useState("");
  const { userProfile, isLoading } = useUser();

  const faqs = [
    // Getting Started
    {
      question: "What is Nunya?",
      answer:
        "Nunya is a Ghanaian online learning platform designed to teach digital skills across six disciplines: 3D Modeling & Printing, VR Development, Web Development, Python Programming, Entrepreneurship, and Drone Piloting. We align with Ghana's One Million Coders initiative to empower the next generation of digital creators and innovators.",
    },
    {
      question: "How do I sign up?",
      answer:
        "Simply visit the Nunya website or app and click 'Sign Up.' Enter your email, create a password, and complete the initial skills survey. The survey helps us recommend the best learning path for you based on your interests and experience level.",
    },
    {
      question: "Is Nunya free?",
      answer:
        "Nunya offers free access to core learning materials. Some advanced courses or certifications may require a paid subscription. Check the pricing page for current details.",
    },
    {
      question: "Do I need any prior experience?",
      answer:
        "No! Nunya is designed for beginners through advanced learners. All courses start with foundational concepts and progress gradually. Choose your starting level when you begin a skill path.",
    },

    // Skill Paths & Courses
    {
      question: "What are Skill Paths?",
      answer:
        "Skill Paths are structured learning journeys through one of our six disciplines. Each path takes you from beginner to advanced level, with courses, projects, and assessments along the way.",
    },
    {
      question: "How do I choose a Skill Path?",
      answer:
        "Take our initial survey to get personalized recommendations, or explore all paths in the Skill Paths Hub. You can start multiple paths at once—there's no limit!",
    },
    {
      question: "How long does it take to complete a Skill Path?",
      answer:
        "It depends on the path and your pace. Most paths take 8-12 weeks to complete if you dedicate 5-10 hours per week. You can work at your own speed.",
    },
    {
      question: "Can I switch Skill Paths?",
      answer:
        "Yes! You can pause one path and start another anytime. Your progress is saved, so you can return later to continue where you left off.",
    },
    {
      question: "What if I fall behind?",
      answer:
        "Nunya is self-paced—there are no deadlines. Learn at whatever speed works for your schedule. Makafui (our AI mentor) is always available to help you catch up or clarify concepts.",
    },

    // Learning & Content
    {
      question: "What formats are the courses in?",
      answer:
        "Courses include video lessons, interactive tutorials, written guides, hands-on projects, and quizzes. Different content types help reinforce learning in different ways.",
    },
    {
      question: "How do I know if I'm learning effectively?",
      answer:
        "Each course has quizzes and projects to test your understanding. Your progress dashboard shows your completion percentage and skills mastered. Makafui can also help identify weak areas.",
    },
    {
      question: "Can I download course materials?",
      answer:
        "Video downloads depend on your subscription tier. Most written materials can be saved or printed for offline reference.",
    },
    {
      question: "What if I don't understand a lesson?",
      answer:
        "Use Makafui, our AI mentor, to ask questions anytime. You can also check lesson discussions or reach out to our support team.",
    },

    // Makafui (AI Mentor)
    {
      question: "Who is Makafui?",
      answer:
        "Makafui is your personal AI learning mentor. They're available 24/7 to explain concepts, help you solve problems, and keep you motivated throughout your learning journey.",
    },
    {
      question: "How do I use Makafui?",
      answer:
        "Open the chat at the bottom right of the app and type your question. Makafui understands the context of your learning path and previous conversations, so they can provide tailored help.",
    },
    {
      question: "What kinds of questions can I ask Makafui?",
      answer:
        "You can ask Makafui anything related to your courses: explain a concept, help debug code, suggest next steps, answer general questions about your skill path, or get motivation when you're struggling.",
    },
    {
      question: "Does Makafui remember our previous conversations?",
      answer:
        "Yes! Makafui remembers your entire chat history in a session, so they understand the context of your questions and can build on previous explanations.",
    },
    {
      question: "Is Makafui a replacement for human instructors?",
      answer:
        "No, Makafui is a supplement. They provide on-demand support and clarification, but human-created course content and expert instruction remain central to your learning.",
    },

    // Progress & Assessments
    {
      question: "How is my progress tracked?",
      answer:
        "Your progress is tracked through completed lessons, quizzes, and projects. Each course shows a percentage-based progress bar. Your dashboard gives an overview of all paths.",
    },
    {
      question: "What are badges and achievements?",
      answer:
        "Badges are earned for completing milestones like finishing a course level or mastering a specific skill. They're displayed on your profile to showcase your accomplishments.",
    },
    {
      question: "Can I get a certificate after completing a Skill Path?",
      answer:
        "Yes! Upon completing all courses in a Skill Path, you'll receive a certificate of completion that you can share on your LinkedIn or resume.",
    },
    {
      question: "How are quizzes graded?",
      answer:
        "Quizzes are auto-graded immediately after submission. You'll see your score and which questions you got wrong, with explanations for correct answers.",
    },
    {
      question: "What if I fail a quiz?",
      answer:
        "You can retake quizzes as many times as you need. There's no penalty—we want you to master the material. Use Makafui to clarify concepts before trying again.",
    },

    // Technical & Account
    {
      question: "What devices can I use Nunya on?",
      answer:
        "Nunya works on desktop, tablet, and mobile devices. You can start a course on one device and continue on another—your progress syncs automatically.",
    },
    {
      question: "Do I need a powerful computer?",
      answer:
        "No. Nunya works on most laptops and computers. Some 3D modeling or VR content may run better on more powerful systems, but basic browsing works on any device.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click 'Forgot Password' on the login page, enter your email, and follow the reset link sent to your inbox.",
    },
    {
      question: "Can I delete my account?",
      answer:
        "Yes, you can delete your account in Settings. Note that this will permanently remove all your progress and data.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. Nunya uses industry-standard encryption and follows data protection best practices. Your personal information is never shared with third parties.",
    },
    {
      question: "What should I do if I encounter a bug?",
      answer:
        "Report it through the 'Help' menu in the app or email support@nunya.com with details about what happened. Our team will investigate and get back to you.",
    },

    // Community & Support
    {
      question: "Is there a community forum?",
      answer:
        "Yes! Connect with other learners, share projects, ask questions, and get support in our community forum. It's a great way to network and find accountability partners.",
    },
    {
      question: "How do I get technical support?",
      answer:
        "Contact our support team through the Help section in-app, or email support@nunya.com. We typically respond within 24 hours.",
    },
    {
      question: "Can I provide feedback on courses?",
      answer:
        "Absolutely! We value your feedback. After completing a course, you'll see a feedback form. You can also suggest improvements anytime in the Settings menu.",
    },
    {
      question: "Are there live sessions or mentorship?",
      answer:
        "Some skill paths offer optional live group sessions or 1-on-1 mentorship (may require paid tier). Check your course details to see what's available.",
    },

    // Ghana-Specific & Local Context
    {
      question: "Why focus on Ghana's digital future?",
      answer:
        "Nunya is part of Ghana's One Million Coders initiative to equip Ghanaians with world-class digital skills. We align our content with local opportunities and global job market demands.",
    },
    {
      question: "Are courses relevant to Ghana's job market?",
      answer:
        "Yes! We highlight job opportunities in Ghana and across Africa. Our content reflects real skills demanded by tech companies, startups, and freelance markets in the region.",
    },
    {
      question: "Can I monetize what I learn?",
      answer:
        "Absolutely. Many graduates freelance, start their own businesses, or get hired by tech companies. Our Entrepreneurship path specifically covers turning skills into income.",
    },
    {
      question: "Is there a local community or meetups?",
      answer:
        "Yes! Nunya organizes regional meetups and networking events. Follow our social media or check the app for upcoming events in your area.",
    },

    // Troubleshooting
    {
      question: "Why isn't my progress saving?",
      answer:
        "Check your internet connection and refresh the page. If the issue persists, clear your browser cache or try a different browser.",
    },
    {
      question: "Why are videos buffering?",
      answer:
        "Videos buffer due to slow internet. Try reducing video quality in settings, or download videos when available for offline viewing.",
    },
    {
      question: "I'm locked out of my account. What do I do?",
      answer:
        "Click 'Forgot Password' to reset your account, or contact support@nunya.com for assistance.",
    },
    {
      question: "The app is crashing on my device. What should I do?",
      answer:
        "Try refreshing the page. If it continues, report the issue with your device details to our support team in the report section.",
    },
  ];

  const handleChange = (value) => {
    setSupportMessage(value);
  };

  const handleSend = async () => {
    if (!supportMessage.trim()) {
      toast.error("Please enter a message");
      return;
    }

    try {
      const response = await fetch(import.meta.env.VITE_SUPPORT_EMAIL_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`, // Add this!
        },
        body: JSON.stringify({
          userEmail: userProfile.email,
          supportMessage: supportMessage,
        }),
      });

      const result = await response.json();
      console.log(result);

      if (!response.ok) {
        throw new Error(result.error || "Failed to send email");
      }

      toast.success(
        "Support request sent successfully! We'll get back to you soon."
      );
      setSupportMessage(""); // Clear form
    } catch (error) {
      console.error("Error sending support email:", error);
      toast.error(
        error.message || "Failed to send support request. Please try again."
      );
    }
  };

  const tabs = [
    {
      name: "Frequently Asked Questions",
      icon: <HelpCircle size={16} />,
    },
    {
      name: "Report Issue",
      icon: <Headset size={16} />,
    },
  ];

  const renderContent = () => {
    if (isLoading) {
      return <Loading />;
    }
    switch (activeTab) {
      case "Frequently Asked Questions":
        return faqs.map((faq, index) => (
          <Collapsible key={index} className="group/collapsible">
            <CollapsibleTrigger className="flex justify-between gap-3 border border-border px-4 py-5 rounded-lg mb-1 w-full bg-sidebar/50">
              <div className="text-sm leading-6 ">{faq.question}</div>
              <ChevronRight
                size={14}
                className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90"
              />
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <div className="flex border-l-3 pl-5 border-primary/50 gap-2 px-4 py-2 mb-3">
                {faq.answer}
              </div>
            </CollapsibleContent>
          </Collapsible>
        ));

      case "Report Issue":
        return (
          <div className="mt-6">
            <p className="text-sm text-foreground/50 mb-3">
              Need assistance? Reach out to our support team or leave feedback.
            </p>
            <textarea
              className="w-full px-6 py-4 bg-sidebar rounded-md focus:outline-none placeholder:text-foreground/50"
              rows="6"
              placeholder="Describe your issue or suggestion..."
              onChange={(e) => handleChange(e.target.value)}
              value={supportMessage}
            />
            <Button variant="default" className="mt-3" onClick={handleSend}>
              Send Message
            </Button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rounded-xl mb-5 px-10">
      <h1 className="text-2xl font-bold mt-6 mb-5">Support</h1>

      {/* Tabs */}
      <div className="flex gap-6 pb-3 mb-3">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 pb-2 text-sm font-medium transition-colors ${
              activeTab === tab.name
                ? "text-primary border-b-2 border-primary"
                : "text-foreground/60 hover:text-primary"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="overflow-y-auto">{renderContent()}</div>
    </div>
  );
}
