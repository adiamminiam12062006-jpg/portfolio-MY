import { useEffect, useState } from "react";
import {
  ArrowDown,
  ArrowDownRight,
  ArrowUpRight,
  Code2,
  Database,
  Layers3,
  Award,
  Mail,
  Linkedin,
  Github,
  Sparkles,
  MapPin,
  Menu,
  X,
  BriefcaseBusiness,
  GraduationCap,
} from "lucide-react";

import PortfolioScene from "./PortfolioScene.jsx";

const profile = {
  name: "Pravin Kumar V M",
  email: "vmpravinkumar@gmail.com",
  linkedin: "https://www.linkedin.com/in/pravin121705",
  github: "https://github.com/pravin12060612-lab",
  location: "Salem, Tamil Nadu, India",
};
const skills = [
  { name: "Python", type: "Programming", icon: Code2 },
  { name: "Django & DRF", type: "Backend", icon: Layers3 },
  { name: "React & JavaScript", type: "Frontend", icon: Code2 },
  { name: "Node.js & Express", type: "Server", icon: Layers3 },
  { name: "MySQL & MongoDB", type: "Database", icon: Database },
  { name: "HTML, CSS & Git", type: "Web technologies", icon: Code2 },
];

const projects = [
  {
    id: "health",
    number: "01",
    category: "DJANGO · PYTHON · MYSQL",
    title: "SHC Student Health Care",
    description:
      "A college healthcare application covering student visits, medicine inventory, chronic illness tracking, and reporting workflows.",
    tags: ["Django", "Python", "MySQL", "Bootstrap"],
    color: "blue",
  },
  {
    id: "ekart",
    number: "02",
    category: "MERN STACK · INTERNSHIP",
    title: "Ekart E-Commerce",
    description:
      "A full-stack e-commerce application developed during my internship, featuring product browsing, authentication, and checkout workflows.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
    color: "mint",
  },
  {
    id: "student",
    number: "03",
    category: "WEB APPLICATION",
    title: "Student Management System",
    description:
      "A student information management project. Additional features and repository links can be added as the project is finalized.",
    tags: ["Web Development", "Database"],
    color: "orange",
  },
  {
    id: "portfolio",
    number: "04",
    category: "PERSONAL PROJECT",
    title: "MERN Stack Portfolio",
    description:
      "A portfolio project showcasing technical skills, software projects, and professional experience.",
    tags: ["MERN Stack", "Portfolio"],
    color: "purple",
  },
];

const experience = [
  {
    date: "JUN 2026",
    category: "INTERNSHIP",
    title: "Web Application Developer",
    company: "Cloudster Solutions Private Limited",
    description:
      "Developed a full-stack e-commerce application using MongoDB, Express.js, React, and Node.js. Worked on the product catalog, authentication, checkout, and responsive user experience.",
    icon: BriefcaseBusiness,
  },
  {
    date: "APR 2025 — JUN 2026",
    category: "PROFESSIONAL EXPERIENCE",
    title: "Python Full Stack Trainer",
    company: "CSC Computer Education Pvt. Ltd.",
    description:
      "Trained students in Python, Django, HTML, CSS, JavaScript, and MySQL. Mentored academic projects and supported practical programming exercises.",
    icon: Code2,
  },
  {
    date: "AUG — SEP 2026",
    category: "LEARNING EXPERIENCE",
    title: "Data Analytics with AI",
    company: "IBM",
    description:
      "A Data Analytics with AI learning experience listed in my professional profile.",
    icon: Database,
  },
  {
    date: "JUN 2024 — MAY 2027",
    category: "EDUCATION",
    title: "B.Sc. Computer Science",
    company: "Sacred Heart College (Autonomous), Tirupattur",
    description:
      "Undergraduate studies in Computer Science with an interest in software engineering and full-stack development.",
    icon: GraduationCap,
  },
];

const certifications = [
  ["Django Framework: Basic to Advanced", "GUVI Geeks Network"],
  ["React.js Certification", "GUVI Geeks Network"],
  ["Advanced Diploma in Computer Applications", "ADCA"],
  ["UI/UX Developer Certification", "Listed on LinkedIn"],
  ["WordPress Development Certification", "Listed on LinkedIn"],
  ["React.js in Tamil", "Course listed on LinkedIn"],
];

function SectionLabel({ number, children }) {
  return (
    <div className="section-label">
      <span>{number}</span>
      <span className="label-line" />
      {children}
    </div>
  );
}

export default function App() {
  const [activeScene, setActiveScene] = useState(0);
  const [activeProject, setActiveProject] = useState("health");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = [
      ...document.querySelectorAll("[data-scene-index]"),
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          );

        if (visible[0]) {
          setActiveScene(
            Number(visible[0].target.dataset.sceneIndex)
          );
        }
      },
      {
        rootMargin: "-20% 0px -35% 0px",
        threshold: [0.1, 0.3, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateProgress = () => {
      const max =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        max > 0 ? (window.scrollY / max) * 100 : 0;

      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${progress}%`
      );
    };

    updateProgress();

    window.addEventListener("scroll", updateProgress, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", updateProgress);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="portfolio">
      {/* HEADER */}
      <header className="header">
        <a className="brand" href="#home" onClick={closeMenu}>
          <span className="brand-symbol">P.</span>

          <span className="brand-copy">
            PRAVIN KUMAR V M
            <small>DEVELOPER PORTFOLIO</small>
          </span>
        </a>

        <nav className={menuOpen ? "nav nav-open" : "nav"}>
          <a href="#about" onClick={closeMenu}>About</a>
          <a href="#skills" onClick={closeMenu}>Skills</a>
          <a href="#projects" onClick={closeMenu}>Projects</a>
          <a href="#experience" onClick={closeMenu}>Experience</a>

          <a
            className="nav-cta"
            href="#contact"
            onClick={closeMenu}
          >
            Let's talk <ArrowUpRight size={14} />
          </a>
        </nav>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        {/* ONE FULL-WIDTH HERO — NO SPLIT SCREEN */}
        <section
          className="hero"
          id="home"
          data-scene-index="0"
        >
          <div className="hero-content">
            <div className="availability">
              <span className="status-dot" />
              OPEN TO SOFTWARE DEVELOPER OPPORTUNITIES
            </div>

            <p className="hero-eyebrow">
              <Sparkles size={15} />
              HELLO, I'M PRAVIN KUMAR V M
            </p>

            <h1>
              Building useful
              <br />
              digital <span>experiences.</span>
            </h1>

            <p className="hero-role">
              Python Developer
              <span>·</span>
              Full Stack Developer
            </p>

            <p className="hero-description">
              I develop practical web applications by combining
              clean interfaces, reliable backend systems, and
              thoughtful problem-solving.
            </p>

            <div className="hero-actions">
              <a className="btn-primary" href="#projects">
                Explore my work
                <ArrowDownRight size={17} />
              </a>

              <a
                className="btn-secondary"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                View LinkedIn
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>

          {/* THE 3D OBJECT IS INTEGRATED INTO THE SAME HERO */}
          <div className="hero-stage">
            <div className="stage-grid" />

            <div className="stage-label stage-label-top">
              <span>INTERACTIVE 3D</span>
              <span>01 — CREATIVE ENGINEERING</span>
            </div>

            <div className="stage-glow" />

            <PortfolioScene
              activeScene={activeScene}
              activeProject={activeProject}
            />

            <div className="stage-pill stage-pill-left">
              <Code2 size={15} />
              <span>
                <strong>Clean code</strong>
                <small>Thoughtful solutions</small>
              </span>
            </div>

            <div className="stage-pill stage-pill-right">
              <Layers3 size={15} />
              <span>
                <strong>Full stack</strong>
                <small>Frontend to backend</small>
              </span>
            </div>

            <div className="stage-caption">
              <span>3D / 01</span>
              <span className="caption-line" />
              <span>
                {[
                  "Creative engineering",
                  "About me",
                  "Technology",
                  "Selected projects",
                  "Experience",
                  "Continuous learning",
                  "Contact",
                ][activeScene] || "Creative engineering"}
              </span>
            </div>
          </div>

          <div className="hero-bottom">
            <div className="hero-stat">
              <strong>Python</strong>
              <span>BACKEND DEVELOPMENT</span>
            </div>

            <div className="hero-stat">
              <strong>MERN</strong>
              <span>FULL STACK DEVELOPMENT</span>
            </div>

            <div className="hero-stat">
              <strong>2027</strong>
              <span>EXPECTED GRADUATION</span>
            </div>

            <a className="scroll-cue" href="#about">
              SCROLL TO DISCOVER
              <ArrowDown size={15} />
            </a>
          </div>
        </section>

        {/* ABOUT */}
        <section
          className="section about-section"
          id="about"
          data-scene-index="1"
        >
          <div className="section-container">
            <SectionLabel number="01">ABOUT ME</SectionLabel>

            <h2 className="section-title">
              Developer by practice.
              <br />
              <span>Problem-solver by nature.</span>
            </h2>

            <div className="about-content">
              <p>
                I'm pursuing a B.Sc. in Computer Science at
                Sacred Heart College (Autonomous), Tirupattur.
                I enjoy transforming ideas into working
                applications and learning from every project.
              </p>

              <p>
                My experience includes Python full-stack
                training, a MERN stack e-commerce internship,
                and student-focused web application projects.
              </p>
            </div>

            <div className="location-pill">
              <MapPin size={15} />
              {profile.location}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section
          className="section skills-section"
          id="skills"
          data-scene-index="2"
        >
          <div className="section-container">
            <SectionLabel number="02">
              TECHNICAL SKILLS
            </SectionLabel>

            <div className="section-heading-row">
              <h2 className="section-title">
                Technology meets
                <br />
                <span>problem-solving.</span>
              </h2>

              <p className="section-intro">
                A practical toolkit for developing modern
                web applications across frontend, backend,
                and database technologies.
              </p>
            </div>

            <div className="skills-grid">
              {skills.map(({ name, type, icon: Icon }, index) => (
                <article className="skill-card" key={name}>
                  <div className="skill-card-top">
                    <span>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <Icon size={21} strokeWidth={1.5} />
                  </div>

                  <h3>{name}</h3>
                  <p>{type}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section
          className="section projects-section"
          id="projects"
          data-scene-index="3"
        >
          <div className="section-container">
            <SectionLabel number="03">
              SELECTED PROJECTS
            </SectionLabel>

            <div className="section-heading-row">
              <h2 className="section-title">
                A few things
                <br />
                <span>I've worked on.</span>
              </h2>

              <p className="section-intro">
                Select a project to change the 3D sculpture's
                accent colour. Add your real repository links
                before publishing.
              </p>
            </div>

            <div className="projects-grid">
              {projects.map((project) => (
                <button
                  key={project.id}
                  className={`project-card project-${project.color} ${
                    activeProject === project.id
                      ? "project-selected"
                      : ""
                  }`}
                  onClick={() => setActiveProject(project.id)}
                  onMouseEnter={() => setActiveProject(project.id)}
                >
                  <div className="project-card-art">
                    <span className="project-art-number">
                      {project.number}
                    </span>

                    <div className="project-art-shape">
                      <div />
                      <div />
                      <div />
                    </div>

                    <ArrowUpRight
                      size={19}
                      className="project-art-arrow"
                    />
                  </div>

                  <div className="project-card-content">
                    <span className="project-category">
                      {project.category}
                    </span>

                    <h3>{project.title}</h3>

                    <p>{project.description}</p>

                    <div className="project-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>

                    <span className="project-action">
                      PROJECT OVERVIEW
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </button>
              ))}
            </div>

            <p className="project-note">
              Repository links will be added after the actual
              GitHub URLs are supplied.
            </p>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section
          className="section experience-section"
          id="experience"
          data-scene-index="4"
        >
          <div className="section-container">
            <SectionLabel number="04">
              EXPERIENCE & EDUCATION
            </SectionLabel>

            <h2 className="section-title">
              The journey behind
              <br />
              <span>the developer.</span>
            </h2>

            <div className="timeline">
              {experience.map((item) => {
                const Icon = item.icon;

                return (
                  <article className="timeline-item" key={item.title}>
                    <div className="timeline-date">
                      {item.date}
                    </div>

                    <div className="timeline-marker">
                      <Icon size={17} />
                    </div>

                    <div className="timeline-content">
                      <span>{item.category}</span>
                      <h3>{item.title}</h3>
                      <h4>{item.company}</h4>
                      <p>{item.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* CERTIFICATIONS */}
        <section
          className="section certification-section"
          id="certifications"
          data-scene-index="5"
        >
          <div className="section-container">
            <SectionLabel number="05">
              CERTIFICATIONS
            </SectionLabel>

            <div className="section-heading-row">
              <h2 className="section-title">
                Keep learning.
                <br />
                <span>Keep building.</span>
              </h2>

              <p className="section-intro">
                Technical courses and certifications listed
                in my professional profile.
              </p>
            </div>

            <div className="certification-grid">
              {certifications.map(([name, source], index) => (
                <article className="certification-card" key={name}>
                  <div className="certification-number">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <Award size={20} />

                  <h3>{name}</h3>
                  <p>{source}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section
          className="contact-section"
          id="contact"
          data-scene-index="6"
        >
          <div className="section-container">
            <SectionLabel number="06">
              GET IN TOUCH
            </SectionLabel>

            <h2 className="contact-title">
              Let's create
              <br />
              <span>something meaningful.</span>
            </h2>

            <p className="contact-description">
              I'm interested in entry-level Software Developer,
              Python Developer, Django Developer, and Full Stack
              Developer opportunities.
            </p>

            <a
              className="email-button"
              href={`mailto:${profile.email}`}
            >
              <Mail size={19} />
              {profile.email}
              <ArrowUpRight size={16} />
            </a>

            <div className="social-links">
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin size={17} />
                LinkedIn
                <ArrowUpRight size={14} />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} />
                GitHub
                <ArrowUpRight size={14} />
              </a>
            </div>

            <footer className="footer">
              <a href="#home">PRAVIN KUMAR V M</a>
              <span>DESIGNED WITH PURPOSE.</span>
              <a href="#home">BACK TO TOP ↑</a>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}