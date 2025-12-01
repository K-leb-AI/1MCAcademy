import React, { useState } from "react";
import { ArrowRight, Menu, X, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BackgroundBeams } from "@/components/ui/shadcn-io/background-beams";
import { motion, useScroll } from "motion/react";

export const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const navLinks = [
    {
      link: "Home",
      url: "#home",
    },
    {
      link: "About us",
      url: "#about-us",
    },
    {
      link: "Pricing",
      url: "#pricing",
    },
    {
      link: "Testimonials",
      url: "#testimonials",
    },
    {
      link: "Partner With Us",
      url: "#partner",
    },
    {
      link: "Contact",
      url: "#contact",
    },
  ];

  const reasons = [
    {
      reason: "Hands-On Learning That Solves Real Problems",
      explanation:
        "Learners don’t just watch tutorials — they build real projects that tackle challenges in their communities. From digital record systems to small business apps, our training leads to tangible impact.",
    },
    {
      reason: "Home-Grown Innovation, Global Standards",
      explanation:
        "Built by a passionate team from KNUST’s Innovation Center, our programs combine local understanding with world-class digital education — designed for Ghanaians, by Ghanaians.",
    },
    {
      reason: "Mentorship and Career Pathways",
      explanation:
        "Our learners are supported by mentors, industry professionals, and alumni who guide them from learning to earning — connecting education to real career opportunities.",
    },
  ];

  const { scrollYProgress } = useScroll();

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-25 bg-background border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-bold">Nunya Learners' Arena</div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <div
            className={`${
              mobileMenuOpen ? "flex" : "hidden"
            } md:flex flex-col md:flex-row md:items-center gap-8 absolute md:static top-16 left-0 right-0 md:top-auto p-6 md:p-0 bg-background md:bg-transparent md:border-0 border-b border-border`}
          >
            {navLinks.map((link, index) => (
              <a href={link.url} key={index} className="text-sm">
                {link.link}
              </a>
            ))}
          </div>
          <button
            className="px-4 py-2 bg-primary text-white text-sm rounded-xl hover:bg-primary/80 duration-300 cursor-pointer hidden md:block"
            onClick={() => navigate("/auth/signup")}
          >
            Get Started
          </button>
        </div>
      </nav>
      {/* Hero */}
      <section
        id="home"
        className="pt-32 pb-16 px-6 max-w-4xl mx-auto text-center h-screen flex flex-col items-center justify-center"
      >
        <BackgroundBeams className="" />
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight z-20">
          Learn anything, anywhere
        </h1>
        <p className="text-lg text-foreground/50 font-extralight mb-8 max-w-2xl mx-auto z-20">
          Master new skills with expert instructors and a community of learners.
          Start your learning journey today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center z-20">
          <button
            className="px-6 py-2 bg-primary text-white rounded-xl hover:bg-primary/80 transition flex items-center justify-center gap-2 group text-sm cursor-pointer"
            onClick={() => navigate("/auth/signup")}
          >
            Get Started
            <ArrowRight
              size={16}
              className="group-hover:translate-x-1 transition"
            />
          </button>
          <button
            className="px-6 py-2 border border-primary/50 rounded-xl hover:bg-primary/10 transition text-sm cursor-pointer"
            onClick={() => navigate("/auth/login")}
          >
            Login
          </button>
        </div>
      </section>
      {/* Stats */}
      <section className="py-12 px-6 max-w-6xl mx-auto border-t border-b border-border">
        <div className="grid grid-cols-3 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-4xl font-bold">30+</p>
            <p className="text-sm text-foreground/30 mt-1">Hours of Learning</p>
          </div>
          <div>
            <p className="text-4xl font-bold">300+</p>
            <p className="text-sm text-foreground/30 mt-1">Learners</p>
          </div>
          <div>
            <p className="text-4xl font-bold">20+</p>
            <p className="text-sm text-foreground/30 mt-1">Instructors</p>
          </div>
          <div className="hidden md:block">
            <p className="text-4xl font-bold">95%</p>
            <p className="text-sm text-foreground/30 mt-1">Satisfaction</p>
          </div>
        </div>
      </section>
      {/* Features */}
      <section id="about-us" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold md:mb-16 mb-6 text-center">
          About Us
        </h2>
        <div className="grid md:grid-cols-5 gap-12 w-full">
          <motion.div
            initial={{ translateY: -150 }}
            animate={
              {
                // translateY: scrollY,
              }
            }
          >
            <div className="col-span-1 h-[50vh] rounded-xl bg-accent hidden md:block mt-8"></div>
          </motion.div>
          <div className="col-span-3 text-sm text-justify">
            <p className="text-foreground/60 leading-5.5">
              At Nunya, we believe that every Ghanaian — regardless of location
              or background — deserves the opportunity to thrive in the digital
              economy. Our mission is to bridge the digital divide by providing
              accessible, high-quality remote training in coding, digital
              literacy, and tech entrepreneurship for indigenous communities
              across the country.
              <br />
              <br />
              Born out of the spirit of innovation at the Kwame Nkrumah
              University of Science and Technology (KNUST), our team is made up
              of nine passionate innovators led by Mr. Makafui Bedzra, Manager
              of the Innovation Center at the College of Engineering, KNUST. The
              team — Caleb Lamptey, Mary Asamoah, Sefam Adagbe, Nathaniel Sambi,
              Christian Addy, Michael Osei Frimpong, Faisal Nurideen, and Bubune
              Doe-Kiinnii — brings together expertise in software development,
              instructional design, community engagement, and education
              technology.
              <br />
              <br />
              Our initiative directly supports the Government of Ghana’s “One
              Million Coders Initiative”, aligning with the national goal to
              empower a new generation of problem solvers and tech creators.
              Through a blended approach of online mentorship, practical
              project-based learning, and localized digital hubs, we aim to make
              technology education inclusive and sustainable — even in the most
              remote parts of the country.
              <br />
              <br />
              At Nunya, we’re not just teaching code — we’re building a
              movement. A movement that inspires young people to use technology
              to tell their stories, create solutions for their communities, and
              drive Ghana’s digital transformation from the grassroots up. Join
              us as we empower the next wave of digital innovators and ensure
              that no community is left behind in Ghana’s journey toward a
              smarter, more connected future.
            </p>
          </div>
          <div className="col-span-1 h-[50vh] rounded-xl bg-accent hidden md:block mt-8"></div>
        </div>
      </section>
      <section className="py-20 px-6 max-w-6xl mx-auto">
        <div className="italic text-4xl mx-auto w-full text-center">
          "Talent knows no boundaries — and neither should opportunity."
        </div>
      </section>
      <section id="features" className="py-20 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-16 text-center">
          Why choose Nunya?
        </h2>
        <div className="grid md:grid-cols-3 gap-0">
          {reasons.map((reason, index) => (
            <div
              key={index}
              className="aspect-square relative px-8 py-4 border border-border/50 flex justify-end flex-col overflow-hidden group"
            >
              <h1 className="absolute text-[160px] font-extrabold -top-40 right-7 blur-xl leading-45 text-foreground/3 duration-300 group-hover:top-0 group-hover:blur-none">
                {index + 1}
              </h1>
              <h3 className="text-3xl font-bold mb-3">{reason.reason}</h3>
              <p className="text-foreground/60">{reason.explanation}</p>
            </div>
          ))}
        </div>
      </section>
      {/* Pricing */}
      <section id="pricing" className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          A simple pricing system
        </h2>
        <p className="text-center text-foreground/60 mb-12 mt-8">
          Our pricing model follows a freemium approach — designed to make
          digital education accessible to everyone. We provide free access to a
          selection of introductory courses, allowing users to gain a strong
          foundation and experience the full value of our learning platform. For
          learners who wish to advance further, intermediate and specialized
          courses are available at affordable rates. Each course is priced with
          the average Ghanaian learner in mind, ensuring that cost is never a
          barrier to growth. We also offer flexible payment options to make
          learning convenient and sustainable — because we believe that
          investing in digital skills should be both accessible and empowering.
        </p>

        <div className=""></div>
      </section>
      {/* Testimonials */}
      <section
        id="testimonials"
        className="py-20 px-6 max-w-6xl mx-auto border-t border-border"
      >
        <h2 className="text-3xl font-bold text-center mb-12">
          Loved by learners
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "James Asante",
              role: "Local Farmer",
              text: "Nunya helped me transition careers. I learned new skills and landed my dream job within a year.",
            },
            {
              name: "Mary Asamoah",
              role: "Teacher",
              text: "The courses are well-structured and the instructors truly care about student success.",
            },
            {
              name: "Isaac Danso",
              role: "Entrepreneur",
              text: "I used Nunya courses to launch my startup. The practical knowledge I gained was invaluable.",
            },
          ].map((testimonial, i) => (
            <div key={i} className="p-6 border border-border/50 rounded-xl">
              <p className="text-foreground/60 mb-4">"{testimonial.text}"</p>
              <p className="font-semibold text-sm">{testimonial.name}</p>
              <p className="text-xs text-foreground/60">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </section>

      <section
        id="partner"
        className="py-20 px-6 max-w-6xl mx-auto text-center border-t border-border"
      >
        <h2 className="text-3xl font-bold mb-10">Partner with us</h2>
        <div className="text-foreground/60 mb-6 flex gap-4 flex-col">
          <img className="rounded-xl" src="pic.jpg" />
          <div className="text-justify">
            <p>
              At Nunya Initiative, we believe lasting impact happens through
              collaboration. Our mission to make digital skills accessible to
              every Ghanaian thrives when we work hand-in-hand with
              forward-thinking organizations, communities, and institutions that
              share our vision. We invite corporate bodies, NGOs, educational
              institutions, local authorities, and community leaders to partner
              with us in empowering the next generation of Ghanaian innovators.
            </p>
            <p className="mt-5 text-xl font-bold text-foreground">
              What We Offer
            </p>
            <ol className="list-decimal pl-4">
              <li>
                In-Person Digital Training: Our team conducts structured,
                hands-on training sessions in local communities, schools, and
                innovation hubs. These sessions cover practical digital skills
                such as coding, digital literacy, and entrepreneurship —
                delivered by certified trainers from our KNUST-led team.
              </li>
              <br />
              <li>
                Custom Training Programs: We design tailored programs to meet
                the unique needs of your organization or community. Whether it’s
                empowering youth, upskilling employees, or supporting women in
                tech, we adapt our curriculum to your goals.
              </li>
              <br />
              <li>
                Community Outreach & Engagement: We collaborate with local
                leaders and stakeholders to ensure cultural relevance,
                inclusivity, and maximum participation in every program we run.
              </li>
              <br />
              <li>
                Certification & Career Support: Participants receive recognized
                certificates and ongoing mentorship opportunities — helping them
                transition from learners to active contributors in the digital
                economy.
              </li>
            </ol>
            <p className="mt-5">
              By partnering with Nunya, you’re not just supporting education —
              you’re investing in Ghana’s future workforce. Together, we can
              bridge the digital divide, unlock local potential, and build
              communities equipped for the technology-driven world ahead.
            </p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="py-20 px-6 max-w-4xl mx-auto border-t border-border"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Get in touch</h2>
        <p className="text-foreground/60 mb-12 text-center">
          Have questions? Reach out to our team.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="p-6 border border-border rounded-lg text-center">
            <h3 className="text-lg font-bold mb-2">Email</h3>
            <p className="text-foreground/60 text-sm mb-3">
              Get in touch via email
            </p>
            <a
              href="mailto:mbedzra@cynosol.com"
              className="text-foreground font-medium hover:text-foreground/60 transition"
            >
              mbedzra@cynosol.com
            </a>
          </div>

          <div className="p-6 border border-border rounded-lg text-center">
            <h3 className="text-lg font-bold mb-2">Phone</h3>
            <p className="text-foreground/60 text-sm mb-3">
              Call us Monday to Friday
            </p>
            <a
              href="tel:+233558000835"
              className="text-foreground font-medium hover:text-foreground/60 transition"
            >
              +233 55 800 0835
            </a>
          </div>

          <div className="p-6 border border-slate-200 rounded-lg text-center">
            <h3 className="text-lg font-bold mb-2">Address</h3>
            <p className="text-foreground/60 text-sm hover:text-foreground transition">
              Innovation Centre, COE
              <br />
              KNUST, Kumasi
            </p>
          </div>
        </div>

        <div className="mt-12 p-8 border border-border rounded-lg bg-primary/5">
          <h3 className="text-lg font-bold mb-4">Office Hours</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-foreground/60">
            <div>
              <p className="font-medium text-foreground mb-2">
                Monday - Friday
              </p>
              <p>9:00 AM - 6:00 PM (GMT)</p>
            </div>
            <div>
              <p className="font-medium text-foreground mb-2">
                Saturday - Sunday
              </p>
              <p>10:00 AM - 4:00 PM (GMT)</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 max-w-3xl mx-auto text-center border-t border-border">
        <h2 className="text-3xl font-bold mb-4">Ready to learn?</h2>
        <p className="text-foreground/60 mb-6">
          Join millions learning on Nunya. No credit card required.
        </p>
        <button
          className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary/80 transition flex items-center justify-center gap-2 group text-sm font-medium mx-auto"
          onClick={() => navigate("/auth/signup")}
        >
          Get Started
          <ArrowRight
            size={16}
            className="group-hover:translate-x-1 transition"
          />
        </button>
      </section>
      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 bg-primary/5">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <p className="font-bold mb-2">Nunya</p>
              <p className="text-sm text-slate-600">
                Learn anything, anywhere.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Product</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    For Teams
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Company</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    Careers
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-slate-900 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2025 Nunya. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
