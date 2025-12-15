import React, { useMemo, useState } from "react";
import { Search, Star, Download, Mail, Phone, Github, Linkedin, MapPin, ExternalLink, ShoppingCart, User } from "lucide-react";

/**
 * Amazon-Style Interactive Resume — Anish Agarwal
 *
 * How it works:
 * - Top bar mimics Amazon header with logo-style name, search bar, and action icons.
 * - Left panel provides filter chips (Departments) similar to Amazon facets.
 * - Main area renders each item (Projects, Education, Skills) as a product-style card.
 * - Search filters across title, tech stack, and description bullets.
 * - Cards show star ratings (for skills) or static 5★ for projects/education.
 * - CTA buttons: "Know more" (links) and "Hire Me" (mailto).
 *
 * Styling: TailwindCSS, minimal and clean, rounded-2xl and soft shadows.
 */

// ====== DATA FROM YOUR RESUME ======
const PROFILE = {
  name: "Anish Agarwal",
  role: "MCA Student • Full-Stack Developer",
  location: "Kolkata, India",
  phone: "+91-9830782179",
  email: "agarwalanish270902@gmail.com",
  linkedin: "https://linkedin.com/in/anish-agarwal-b37521225",
  github: "https://github.com/Anni27-hub",
};

const CATEGORIES = [
  { key: "projects", label: "Projects" },
  { key: "education", label: "Education" },
  { key: "skills", label: "Skills" },
  { key: "achievements", label: "Achievements" },
  { key: "extracurricular", label: "Extracurricular" },
];

const PROJECTS = [
  {
    id: "fitoholic",
    title: "Fitoholic – Fitness Tracker",
    subtitle: "React, Spring Boot, MySQL, Razorpay, Google Gemini",
    period: "Jan 2025 – May 2025",
    bullets: [
      "Full‑stack app with JWT auth, password reset (SMTP), role‑based admin, profile mgmt.",
      "Interactive dashboards (steps, calories, water, weight) with charts + Gemini chatbot.",
      "Razorpay payments, secure Admin Panel; REST APIs in Spring Boot/Hibernate/MySQL; UI in React/Tailwind/Framer Motion.",
    ],
    links: [],
  },
  {
    id: "ecommerce",
    title: "Full‑Stack E‑commerce with Recommendations",
    subtitle: "MERN, FAISS, Weaviate",
    period: "Jul 2024 – Dec 2024",
    bullets: [
      "Product listing, cart, orders, and cloud deployment.",
      "Personalized recommendations using FAISS vector search + Weaviate.",
    ],
    links: [],
  },
  {
    id: "medium",
    title: "Medium‑Clone Blogging Platform",
    subtitle: "React, Node.js, Express, MongoDB, TypeScript",
    period: "Jan 2024 – Jun 2024",
    bullets: [
      "Auth, role‑based access, CRUD posts/comments, real‑time notifications.",
      "REST APIs with Express/MongoDB; responsive UI in React, Tailwind, TypeScript.",
    ],
    links: [],
  },
  {
    id: "sushi",
    title: "Sushi Restaurant Website",
    subtitle: "HTML5, CSS3, JS (ES Modules), Vite",
    period: "Jun 2023 – Nov 2023",
    bullets: [
      "Animated landing page: Hero, About, Popular Dishes, Newsletter, Footer.",
      "Scroll animations (AOS), BEM styling, optimized with Vite.",
    ],
    links: [],
  },
];

const EDUCATION = [
  {
    id: "mca",
    title: "Birla Institute of Technology, Mesra",
    subtitle: "Master of Computer Applications (MCA) — Present",
    period: "Jul 2025 – Jun 2027",
  },
  {
    id: "bca",
    title: "Techno India, Kolkata",
    subtitle: "Bachelor of Computer Applications (BCA), CGPA: 8.5",
    period: "Jul 2022 – Jun 2025",
  },
  {
    id: "senior",
    title: "North Point School, Kolkata",
    subtitle: "Senior Secondary (Science), Percentage: 83%",
    period: "Apr 2019 – Mar 2021",
  },
  {
    id: "secondary",
    title: "Adamas International School, Kolkata",
    subtitle: "Secondary, Percentage: 91%",
    period: "Apr 2018 – Mar 2019",
  },
];

const SKILLS = {
  languages: ["Java", "C", "Python"],
  web: [
    "HTML",
    "CSS",
    "JavaScript",
    "ReactJS",
    "NodeJS",
    "NextJS",
    "ExpressJS",
    "Spring Boot",
    "Hibernate",
    "MySQL",
    "MongoDB",
  ],
  tools: [
    "Git",
    "GitHub",
    "VS Code",
    "Eclipse",
    "Packet Tracer",
    "Dia",
    "NetBeans",
    "Mobaxterm",
  ],
  os: ["Windows", "Linux (elementary)", "Unix"],
  core: [
    "OOP",
    "DSA",
    "DBMS",
    "OS",
    "Networks",
    "Computer Architecture",
    "Unix & Shell",
    "Software Engineering",
    "Cybersecurity",
  ],
};

const ACHIEVEMENTS = [
  {
    id: "preamble",
    text:
      "Certificate — Government of India, Ministry of Parliamentary Affairs for Preamble to the Constitution of India (Azadi Ka Amrit Mahotsav).",
  },
  { id: "iot", text: "Infosys Springboard — Internet of Things." },
  { id: "cyber", text: "Tata Forage — Cybersecurity Analyst." },
  { id: "bcg", text: "BCG Forage — Strategy Consulting." },
  { id: "viz", text: "Tata Forage — Data Visualization." },
  { id: "gcp", text: "Google Cloud Platform Overview." },
  { id: "hult", text: "Organizing Member, Hult Prize (2022, 2023)." },
  { id: "iic", text: "Conducted IIC TMSL Tech & Graphics Workshops." },
];

const EXTRAS = [
  { id: "cr", text: "Class Representative." },
  { id: "tug", text: "District Level Tug‑of‑War Winner." },
  { id: "photo", text: "Photography and Photo Editing." },
  { id: "iicm", text: "Institution Innovation Council (IIC) Member." },
  { id: "rallies", text: "Active Participant in Awareness Rallies." },
];

// ====== HELPERS ======
const starRow = (n = 5) => (
  <div className="flex items-center gap-1" aria-label={`${n} star rating`}>
    {Array.from({ length: 5 }).map((_, i) => (
      <Star key={i} className={`h-4 w-4 ${i < n ? "fill-current" : "opacity-30"}`} />
    ))}
  </div>
);

function Chip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 rounded-full border text-sm transition-all duration-150 ${
        active ? "bg-amber-500 text-white border-amber-500" : "bg-white hover:bg-neutral-50 border-neutral-300"
      }`}
    >
      {label}
    </button>
  );
}

function Card({ title, subtitle, period, bullets = [], footer, cta, badge }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-neutral-200 p-4 md:p-6 grid gap-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg md:text-xl font-semibold leading-snug">{title}</h3>
          {subtitle && <p className="text-sm md:text-base text-neutral-600 mt-1">{subtitle}</p>}
          {period && <p className="text-xs md:text-sm text-neutral-500 mt-1">{period}</p>}
        </div>
        {badge}
      </div>
      {bullets?.length > 0 && (
        <ul className="list-disc pl-5 text-sm md:text-[15px] text-neutral-800 grid gap-1">
          {bullets.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>
      )}
      {footer}
      {cta && (
        <div className="pt-1">
          {cta}
        </div>
      )}
    </div>
  );
}

export default function AmazonStyleResume() {
  const [query, setQuery] = useState("");
  const [activeCats, setActiveCats] = useState(["projects", "education", "skills", "achievements", "extracurricular"]);

  const toggleCat = (key) => {
    setActiveCats((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
  };

  const normalizedQuery = query.trim().toLowerCase();

  const filteredProjects = useMemo(() => {
    if (!normalizedQuery) return PROJECTS;
    return PROJECTS.filter((p) =>
      [p.title, p.subtitle, p.period, ...(p.bullets || [])]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [normalizedQuery]);

  const skillGroups = useMemo(() => {
    if (!normalizedQuery) return SKILLS;
    const contains = (arr) => arr.filter((s) => s.toLowerCase().includes(normalizedQuery));
    return {
      languages: contains(SKILLS.languages),
      web: contains(SKILLS.web),
      tools: contains(SKILLS.tools),
      os: contains(SKILLS.os),
      core: contains(SKILLS.core),
    };
  }, [normalizedQuery]);

  const anySkills = Object.values(skillGroups).some((arr) => arr.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-100 to-white">
      {/* Top Bar */}
      <header className="sticky top-0 z-20 bg-[#131921] text-white">
        <div className="mx-auto max-w-7xl px-3 md:px-6 py-3 flex items-center gap-3 md:gap-4">
          {/* Logo-style name */}
          <div className="flex items-center gap-2">
            <div className="text-xl md:text-2xl font-bold">Anish<span className="text-amber-400">.in</span></div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex items-center">
            <div className="w-full bg-white rounded-md md:rounded-lg overflow-hidden flex items-center">
              <div className="hidden md:block pl-3 text-sm text-neutral-600 whitespace-nowrap">All</div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Anish's skills & experience"
                className="w-full px-3 py-2 md:py-2.5 text-neutral-800 outline-none"
              />
              <button className="px-3 md:px-4 py-2 md:py-2.5 bg-amber-400 text-black flex items-center gap-2">
                <Search className="h-4 w-4" />
                <span className="hidden md:inline">Search</span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <a href={`mailto:${PROFILE.email}`} className="flex items-center gap-1 hover:text-amber-300">
              <Mail className="h-5 w-5" />
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-amber-300">
              <Github className="h-5 w-5" />
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:text-amber-300">
              <Linkedin className="h-5 w-5" />
            </a>
            <button className="flex items-center gap-1 hover:text-amber-300" title="Hire Me">
              <ShoppingCart className="h-5 w-5" />
            </button>
            <button className="flex items-center gap-1 hover:text-amber-300" title="Profile">
              <User className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Sub-header */}
      <div className="bg-[#232f3e] text-white">
        <div className="mx-auto max-w-7xl px-3 md:px-6 py-2 text-sm flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>Delivering from <b>Kolkata</b></span>
          </div>
          <div className="opacity-80">Open to Internships • Remote/On‑site</div>
          <div className="opacity-80">Call: {PROFILE.phone}</div>
          <div className="opacity-80">Email: {PROFILE.email}</div>
        </div>
      </div>

      {/* Content */}
      <main className="mx-auto max-w-7xl px-3 md:px-6 py-6 grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Sidebar Filters */}
        <aside className="md:col-span-3 lg:col-span-3">
          <div className="bg-white border border-neutral-200 rounded-2xl shadow-sm p-4 md:p-5 sticky top-24">
            <h2 className="text-lg font-semibold mb-3">Departments</h2>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Chip key={c.key} label={c.label} active={activeCats.includes(c.key)} onClick={() => toggleCat(c.key)} />
              ))}
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-semibold mb-2">Quick Links</h3>
              <div className="grid gap-2 text-sm">
                <a className="inline-flex items-center gap-2 text-blue-700 hover:underline" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" /> LinkedIn
                </a>
                <a className="inline-flex items-center gap-2 text-blue-700 hover:underline" href={PROFILE.github} target="_blank" rel="noreferrer">
                  <ExternalLink className="h-4 w-4" /> GitHub
                </a>
                <a className="inline-flex items-center gap-2 text-blue-700 hover:underline" href={`mailto:${PROFILE.email}`}>
                  <ExternalLink className="h-4 w-4" /> Email
                </a>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <h3 className="text-sm font-semibold mb-2">Download</h3>
              <a
                className="inline-flex items-center gap-2 px-3 py-2 bg-amber-500 text-black rounded-md hover:bg-amber-400"
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert("Export to PDF/Download can be wired to your hosted file or a generator.");
                }}
              >
                <Download className="h-4 w-4" /> Resume (PDF)
              </a>
            </div>
          </div>
        </aside>

        {/* Main Listings */}
        <section className="md:col-span-9 lg:col-span-9 grid gap-6">
          {/* Projects */}
          {activeCats.includes("projects") && (
            <div>
              <div className="flex items-baseline justify-between mb-3">
                <h2 className="text-xl md:text-2xl font-semibold">Projects</h2>
                <div className="text-sm text-neutral-600">Showing {filteredProjects.length} results</div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {filteredProjects.map((p) => (
                  <Card
                    key={p.id}
                    title={p.title}
                    subtitle={p.subtitle}
                    period={p.period}
                    bullets={p.bullets}
                    badge={<div className="hidden md:block">{starRow(5)}</div>}
                    cta={
                      <div className="flex items-center gap-2">
                        {p.links?.map((link, i) => (
                          <a key={i} href={link.href} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-neutral-900 text-white rounded-md text-sm inline-flex items-center gap-2 hover:bg-neutral-800">
                            <ExternalLink className="h-4 w-4" /> {link.label || "Live"}
                          </a>
                        ))}
                        <a href={`mailto:${PROFILE.email}?subject=Regarding%20${encodeURIComponent(p.title)}`} className="px-3 py-1.5 bg-amber-500 text-black rounded-md text-sm hover:bg-amber-400 inline-flex items-center gap-2">
                          <ShoppingCart className="h-4 w-4" /> Hire Me
                        </a>
                      </div>
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {activeCats.includes("education") && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Education</h2>
              <div className="grid gap-4">
                {EDUCATION.map((e) => (
                  <Card key={e.id} title={e.title} subtitle={e.subtitle} period={e.period} badge={<div>{starRow(5)}</div>} />
                ))}
              </div>
            </div>
          )}

          {/* Skills */}
          {activeCats.includes("skills") && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Skills</h2>
              {!anySkills ? (
                <p className="text-neutral-600">No skills match your search. Try a different query.</p>
              ) : (
                <div className="grid gap-4">
                  <Card
                    title="Programming Languages"
                    subtitle={"Proficiency: "+ SKILLS.languages.join(", ")}
                    footer={
                      <div className="flex flex-wrap gap-2">
                        {skillGroups.languages.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-sm">{s}</span>
                        ))}
                      </div>
                    }
                    badge={<div>{starRow(5)}</div>}
                  />
                  <Card
                    title="Web / Frameworks / Databases"
                    subtitle="ReactJS, NodeJS, NextJS, ExpressJS, Spring Boot, Hibernate, MySQL, MongoDB"
                    footer={
                      <div className="flex flex-wrap gap-2">
                        {skillGroups.web.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-sm">{s}</span>
                        ))}
                      </div>
                    }
                    badge={<div>{starRow(5)}</div>}
                  />
                  <Card
                    title="Tools"
                    subtitle="Git, GitHub, VS Code, Eclipse, Packet Tracer, Dia, NetBeans, Mobaxterm"
                    footer={
                      <div className="flex flex-wrap gap-2">
                        {skillGroups.tools.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-sm">{s}</span>
                        ))}
                      </div>
                    }
                    badge={<div>{starRow(4)}</div>}
                  />
                  <Card
                    title="Operating Systems"
                    subtitle="Windows, Linux (elementary), Unix"
                    footer={
                      <div className="flex flex-wrap gap-2">
                        {skillGroups.os.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-sm">{s}</span>
                        ))}
                      </div>
                    }
                    badge={<div>{starRow(4)}</div>}
                  />
                  <Card
                    title="Core Subjects"
                    subtitle="OOP, DSA, DBMS, OS, Networks, Computer Architecture, Unix & Shell, SE, Cybersecurity"
                    footer={
                      <div className="flex flex-wrap gap-2">
                        {skillGroups.core.map((s) => (
                          <span key={s} className="px-2.5 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-sm">{s}</span>
                        ))}
                      </div>
                    }
                    badge={<div>{starRow(5)}</div>}
                  />
                </div>
              )}
            </div>
          )}

          {/* Achievements */}
          {activeCats.includes("achievements") && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Achievements & Certifications</h2>
              <div className="grid gap-4">
                {ACHIEVEMENTS.map((a) => (
                  <Card key={a.id} title={a.text} badge={<div>{starRow(5)}</div>} />
                ))}
              </div>
            </div>
          )}

          {/* Extracurricular */}
          {activeCats.includes("extracurricular") && (
            <div>
              <h2 className="text-xl md:text-2xl font-semibold mb-3">Extracurricular</h2>
              <div className="grid gap-4">
                {EXTRAS.map((x) => (
                  <Card key={x.id} title={x.text} badge={<div>{starRow(4)}</div>} />
                ))}
              </div>
            </div>
          )}
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-neutral-50">
        <div className="mx-auto max-w-7xl px-3 md:px-6 py-8 grid gap-2 text-sm text-neutral-700">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-semibold">Contact:</span>
            <a href={`mailto:${PROFILE.email}`} className="inline-flex items-center gap-2 hover:underline"><Mail className="h-4 w-4" /> {PROFILE.email}</a>
            <span className="inline-flex items-center gap-2"><Phone className="h-4 w-4" /> {PROFILE.phone}</span>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline"><Linkedin className="h-4 w-4" /> LinkedIn</a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:underline"><Github className="h-4 w-4" /> GitHub</a>
          </div>
          <div className="text-xs text-neutral-500">© {new Date().getFullYear()} Anish Agarwal — Amazon‑style interactive resume.</div>
        </div>
      </footer>
    </div>
  );
}
