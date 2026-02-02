/**
 * HomePage Component
 * Main landing page with all sections
 * @module pages/HomePage
 */

import { lazy, Suspense, useState, useCallback, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Book,
  BookOpen,
  Briefcase,
  Calendar,
  Check,
  Clock,
  Copy,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  MessageSquare,
  Play,
  Sparkles,
  Star,
  TrendingUp,
  Users,
  X,
  Zap,
} from "lucide-react";

// Utility imports
import { cn, safeCopy, ratingToStars, buildNoteCopy } from "../utils";

// Data imports
import { services, projects, blogPosts, notes } from "../data";

// Hook imports
import { useScrollTo, useIntroLoader } from "../hooks";

// Component imports
import {
  Container,
  Section,
  GradientText,
  Card,
  Modal,
} from "../components/ui";

import {
  HeroBackground,
  WorldMapBackground,
  TrainBackground,
} from "../components/backgrounds";

import {
  IntroLoader,
  RoleType,
  GlobalStyles,
} from "../components/animations";

import { TerminalPanel } from "../components/terminal";
import { BooksSection } from "../components/sections/BooksSection";
import { Header } from "../components/layout/Header";
import { Footer } from "../components/layout/Footer";
import { FloatingActionButton } from "../components/animations/FloatingActionButton";

// Lazy loaded components
const NotesNebula = lazy(() => import("../components/backgrounds/NotesNebula"));

// Stat Card Component
const StatCard = ({ icon: Icon, value, label, gradient }) => (
  <motion.div whileHover={{ scale: 1.05, y: -5 }} className="relative">
    <div className={cn("absolute inset-0 rounded-2xl bg-gradient-to-r opacity-20 blur-xl", gradient)} />
    <Card className="relative p-6 text-center" hoverable={false}>
      <Icon className="mx-auto mb-3 h-8 w-8 text-cyan-400" />
      <div className={cn("text-4xl font-black bg-gradient-to-r bg-clip-text text-transparent", gradient)}>{value}</div>
      <div className="mt-2 text-sm text-gray-400">{label}</div>
    </Card>
  </motion.div>
);

// Service Card Component
const ServiceCard = ({ icon: Icon, title, description, features, gradient }) => (
  <motion.div
    whileHover={{ scale: 1.02, y: -5 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="group relative"
  >
    <div
      className={cn("absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-30", gradient)}
    />
    <Card className="relative h-full p-8" hoverable={false}>
      <div
        className={cn(
          "mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-r text-white transition-transform duration-500 group-hover:scale-110 group-hover:shadow-lg",
          gradient
        )}
      >
        <Icon size={28} />
      </div>
      <h3 className="mb-3 text-2xl font-bold text-white">{title}</h3>
      <p className="mb-6 text-gray-400">{description}</p>
      <ul className="space-y-2 text-sm text-gray-300">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className="h-4 w-4 text-cyan-400" />
            {f}
          </li>
        ))}
      </ul>
    </Card>
  </motion.div>
);

// Project Card Component
const ProjectCard = ({ project, onClick }) => (
  <motion.div
    whileHover={{ y: -10 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="group relative cursor-pointer"
    onClick={onClick}
  >
    <div
      className={cn("absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-30", project.gradient)}
    />
    <Card className="relative overflow-hidden p-0" hoverable={false}>
      <div className="relative h-56">
        <img src={project.image} alt={project.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <div className="mb-2 flex flex-wrap gap-2">
            {project.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="rounded-full bg-white/20 px-3 py-1 text-xs text-white backdrop-blur-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-6">
        <h3 className="mb-2 text-xl font-bold text-white">{project.title}</h3>
        <p className="mb-4 text-sm text-gray-400 line-clamp-2">{project.description}</p>
        <div className="flex items-center justify-between border-t border-white/10 pt-4">
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <Star size={14} className="text-yellow-400" /> {project.stars}
            </span>
            <span>{project.year}</span>
          </div>
          <ArrowRight className="h-5 w-5 text-cyan-400 opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100" />
        </div>
      </div>
    </Card>
  </motion.div>
);

// Blog Card Component
const BlogCard = ({ post }) => (
  <motion.a
    href={post.link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -8 }}
    transition={{ type: "spring", stiffness: 300, damping: 15 }}
    className="group relative block"
  >
    <div
      className={cn("absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-all duration-500 group-hover:opacity-30", post.gradient)}
    />
    <Card className="relative overflow-hidden p-0" hoverable={false}>
      <div className="relative h-48">
        <img src={post.image} alt={post.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full bg-cyan-500/90 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">{post.category}</span>
      </div>
      <div className="p-6">
        <div className="mb-3 flex items-center gap-3 text-xs text-gray-400">
          <span className="flex items-center gap-1">
            <Calendar size={12} /> {post.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} /> {post.readTime}
          </span>
        </div>
        <h3 className="mb-2 text-lg font-bold text-white transition-colors group-hover:text-cyan-400">{post.title}</h3>
        <p className="text-sm text-gray-400 line-clamp-2">{post.excerpt}</p>
      </div>
    </Card>
  </motion.a>
);

// Book Card Component
const BookCard = ({ book, onClick }) => (
  <motion.div
    whileHover={{ y: -5 }}
    onClick={onClick}
    className="group relative cursor-pointer"
  >
    <Card className="relative overflow-hidden p-6" hoverable={false}>
      <div className={cn("absolute right-0 top-0 h-24 w-24 rounded-bl-[80px] bg-gradient-to-br opacity-20 transition-opacity group-hover:opacity-30", book.gradient)} />
      <div className="mb-4 text-4xl">{book.emoji}</div>
      <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{book.category}</span>
      <h3 className="text-xl font-bold text-white transition-colors group-hover:text-cyan-400">{book.title}</h3>
      <p className="mt-1 text-sm text-gray-400">{book.author}</p>
      <p className="mt-3 text-xs text-cyan-300">{ratingToStars(book.rating)}</p>
      <p className="mt-4 text-sm text-gray-300 line-clamp-3">{book.summary}</p>
    </Card>
  </motion.div>
);

// Note Card Component
const NoteCard = ({ note }) => (
  <div className="group relative">
    <div
      className={cn("absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-opacity group-hover:opacity-25", note.gradient)}
    />
    <Card className="p-8" hoverable={false}>
      <h3 className="text-2xl font-black text-white">{note.title}</h3>
      <p className="mt-2 text-sm text-gray-300">{note.subtitle}</p>
      <ul className="mt-6 space-y-3 text-sm text-gray-200">
        {note.bullets.slice(0, 3).map((b, i) => (
          <li key={i} className="flex items-start gap-3">
            <span className="mt-1 h-2 w-2 rounded-full bg-white/30" />
            <span>{b}</span>
          </li>
        ))}
      </ul>
      <div className="mt-7 flex gap-3">
        <button
          onClick={() => safeCopy(buildNoteCopy(note))}
          className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs text-white transition-colors hover:bg-white/20"
        >
          <Copy size={14} /> Copy
        </button>
        {note.link && (
          <a href={note.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs text-white transition-colors hover:bg-white/20">
            <ExternalLink size={14} /> Source
          </a>
        )}
      </div>
    </Card>
  </div>
);

// Personal Info
const personalInfo = {
  name: "Abdullah Al Mamun",
  email: "cs.abdullah@gmail.com",
  linkedin: "https://www.linkedin.com/in/abdu11ahmamun/",
  github: "https://github.com/Abdu11ahMamun",
};

export default function HomePage() {
  const shouldReduceMotion = useReducedMotion();
  const scrollTo = useScrollTo();
  const { showIntro } = useIntroLoader();
  const location = useLocation();

  // State management
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Handle scroll to section from hash
  useEffect(() => {
    if (location.hash) {
      const sectionId = location.hash.replace('#', '');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  // Header navigation items
  const navItems = [
    { label: "Services", id: "services" },
    { label: "Projects", id: "projects" },
    { label: "Books", id: "books" },
    { label: "Notes", id: "notes" },
    { label: "Blog", id: "blog" },
    { label: "Contact", id: "contact" },
  ];

  // Handle email copy
  const handleCopyEmail = useCallback(() => {
    safeCopy(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  // Stats data
  const stats = [
    { icon: Briefcase, value: "5+", label: "Years Experience", gradient: "from-cyan-500 to-blue-500" },
    { icon: Users, value: "50+", label: "Happy Clients", gradient: "from-purple-500 to-pink-500" },
    { icon: TrendingUp, value: "100+", label: "Projects Done", gradient: "from-orange-500 to-red-500" },
  ];

  return (
    <>
      <GlobalStyles />
      <AnimatePresence mode="wait">
        {showIntro ? (
          <IntroLoader key="loader" />
        ) : (
          <motion.div
            key="main"
            initial={shouldReduceMotion ? {} : { opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-[#0a0a0f]"
          >
            {/* Header */}
            <Header
              navItems={navItems}
              scrollTo={scrollTo}
              mobileMenuOpen={mobileMenuOpen}
              setMobileMenuOpen={setMobileMenuOpen}
            />

            {/* Hero Section */}
            <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
              <HeroBackground />
              <Container className="relative z-10">
                <div className="grid items-center gap-12 lg:grid-cols-2">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                  >
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300">
                      <Zap size={16} className="animate-pulse" />
                      Open to new opportunities
                    </div>
                    <h1 className="text-5xl font-black leading-tight md:text-7xl">
                      <span className="text-white">I'm </span>
                      <GradientText>Abdullah</GradientText>
                    </h1>
                    <RoleType />
                    <p className="mt-6 max-w-lg text-lg text-gray-400">
                      Crafting digital experiences that merge performance,
                      aesthetics, and cutting-edge technology. Let's build
                      something extraordinary together.
                    </p>
                    <div className="mt-8 flex flex-wrap gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollTo("contact")}
                        className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/25"
                      >
                        <MessageSquare size={20} />
                        Let's Connect
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => scrollTo("projects")}
                        className="flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10"
                      >
                        <Play size={20} />
                        View Projects
                      </motion.button>
                    </div>
                    <div className="mt-8 flex items-center gap-4">
                      <a
                        href={personalInfo.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        <Github size={24} />
                      </a>
                      <a
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        <Linkedin size={24} />
                      </a>
                      <button
                        onClick={handleCopyEmail}
                        className="flex items-center gap-2 text-gray-400 transition-colors hover:text-white"
                      >
                        <Mail size={24} />
                        {copied && <span className="text-xs text-green-400">Copied!</span>}
                      </button>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <TerminalPanel />
                  </motion.div>
                </div>
              </Container>
            </section>

            {/* Stats Section */}
            <Section id="stats" className="py-16">
              <Container>
                <div className="grid gap-6 sm:grid-cols-3">
                  {stats.map((stat, idx) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <StatCard {...stat} />
                    </motion.div>
                  ))}
                </div>
              </Container>
            </Section>

            {/* Services Section (with World Map) */}
            <Section id="services" className="relative py-32 overflow-hidden">
              <WorldMapBackground />
              <Container className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16 text-center"
                >
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-300">
                    <Briefcase size={16} />
                    What I Offer
                  </div>
                  <h2 className="text-5xl font-black md:text-6xl">
                    <GradientText gradient="from-cyan-400 via-blue-500 to-purple-600">Services & Expertise</GradientText>
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">End-to-end solutions for the modern digital landscape.</p>
                </motion.div>
                <div className="grid gap-8 lg:grid-cols-3">
                  {services.map((s, idx) => (
                    <motion.div
                      key={s.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <ServiceCard {...s} />
                    </motion.div>
                  ))}
                </div>
              </Container>
            </Section>

            {/* Projects Section (with Train) */}
            <Section id="projects" className="relative py-32 overflow-hidden">
              <TrainBackground />
              <Container className="relative z-10">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16 text-center"
                >
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-6 py-2 text-sm font-semibold text-purple-300">
                    <Sparkles size={16} />
                    Featured Work
                  </div>
                  <h2 className="text-5xl font-black md:text-6xl">
                    <GradientText gradient="from-purple-400 via-pink-500 to-rose-500">Project Showcase</GradientText>
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">Selected projects that showcase my skills and passion for innovation.</p>
                </motion.div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {projects.map((p, idx) => (
                    <motion.div
                      key={p.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <ProjectCard project={p} onClick={() => setSelectedProject(p)} />
                    </motion.div>
                  ))}
                </div>
              </Container>
            </Section>

            {/* Books Section - New Component */}
            <BooksSection />

            {/* Notes Section (with Nebula) */}
            <Section id="notes" className="relative py-32 overflow-hidden">
              <div className="absolute inset-0">
                <Suspense fallback={<div className="h-96" />}>
                  <NotesNebula />
                </Suspense>
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/35 to-black/80" />
              </div>
              <Container className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16 text-center"
                >
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-300">
                    <Sparkles size={16} />
                    Notes with atmosphere
                  </div>
                  <h2 className="text-5xl font-black md:text-6xl">
                    <GradientText gradient="from-cyan-400 via-purple-500 to-pink-500">Notes & Highlights</GradientText>
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-300">
                    Quick takeaways, short summaries, and ideas — written like a clean terminal log.
                  </p>
                </motion.div>
                <div className="grid gap-8 md:grid-cols-3">
                  {notes.map((n, idx) => (
                    <motion.div
                      key={n.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.08 }}
                    >
                      <NoteCard note={n} />
                    </motion.div>
                  ))}
                </div>
              </Container>
            </Section>

            {/* Blog Section */}
            <Section id="blog" className="py-32">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/30 to-black" />
              <Container className="relative">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-16 text-center"
                >
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-300">
                    <Book size={16} />
                    Latest Articles
                  </div>
                  <h2 className="text-5xl font-black md:text-6xl">
                    <GradientText gradient="from-cyan-400 via-teal-500 to-emerald-500">Tech Blog</GradientText>
                  </h2>
                  <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-400">
                    Thoughts, tutorials, and insights from my development journey.
                  </p>
                </motion.div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {blogPosts.map((post, idx) => (
                    <motion.div
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                    >
                      <BlogCard post={post} />
                    </motion.div>
                  ))}
                </div>
              </Container>
            </Section>

            {/* Contact Section */}
            <Section id="contact" className="py-32">
              <Container>
                <div className="mx-auto max-w-3xl text-center">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                  >
                    <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-6 py-2 text-sm font-semibold text-cyan-300">
                      <Mail size={16} />
                      Let's Talk
                    </div>
                    <h2 className="text-5xl font-black md:text-6xl">
                      <GradientText>Get In Touch</GradientText>
                    </h2>
                    <p className="mx-auto mt-4 max-w-xl text-lg text-gray-400">
                      Have a project in mind or just want to say hi? I'd love to hear from you!
                    </p>
                    <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={`mailto:${personalInfo.email}`}
                        className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-8 py-4 font-semibold text-white shadow-lg shadow-cyan-500/25 sm:w-auto"
                      >
                        <Mail size={20} />
                        Send Email
                      </motion.a>
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        href={personalInfo.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-full border border-white/20 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/10 sm:w-auto"
                      >
                        <Linkedin size={20} />
                        Connect on LinkedIn
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
              </Container>
            </Section>

            {/* Footer */}
            <Footer personalInfo={personalInfo} scrollTo={scrollTo} />

            {/* Floating Action Button */}
            <FloatingActionButton scrollTo={scrollTo} />

            {/* Modals */}
            <AnimatePresence>
              {selectedProject && (
                <Modal isOpen={true} onClose={() => setSelectedProject(null)}>
                  <div className="relative max-h-[90vh] overflow-y-auto rounded-3xl bg-[#12121a] p-8">
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    >
                      <X size={20} />
                    </button>
                    <div className="relative mb-6 h-64 overflow-hidden rounded-2xl">
                      <img src={selectedProject.image} alt={selectedProject.title} className="h-full w-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-transparent to-transparent" />
                    </div>
                    <div className="mb-2 flex flex-wrap gap-2">
                      {selectedProject.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-cyan-500/20 px-3 py-1 text-xs text-cyan-300">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="mb-2 text-2xl font-bold text-white">{selectedProject.title}</h3>
                    <p className="mb-6 text-gray-400">{selectedProject.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.demo && (
                        <a
                          href={selectedProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 px-6 py-3 text-sm font-semibold text-white"
                        >
                          <ExternalLink size={16} />
                          Live Demo
                        </a>
                      )}
                      {selectedProject.github && (
                        <a
                          href={selectedProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                        >
                          <Github size={16} />
                          View Code
                        </a>
                      )}
                    </div>
                  </div>
                </Modal>
              )}

              {selectedBook && (
                <Modal isOpen={true} onClose={() => setSelectedBook(null)}>
                  <div className="relative max-h-[90vh] overflow-y-auto rounded-3xl bg-[#12121a] p-8">
                    <button
                      onClick={() => setSelectedBook(null)}
                      className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
                    >
                      <X size={20} />
                    </button>
                    <div className="mb-6 flex items-start gap-6">
                      <div className="text-6xl">{selectedBook.emoji}</div>
                      <div>
                        <span className="mb-2 inline-block rounded-full bg-white/10 px-3 py-1 text-xs text-gray-300">{selectedBook.category}</span>
                        <h3 className="text-2xl font-bold text-white">{selectedBook.title}</h3>
                        <p className="text-gray-400">{selectedBook.author}</p>
                        <p className="mt-2 text-cyan-300">{ratingToStars(selectedBook.rating)}</p>
                      </div>
                    </div>
                    <p className="text-gray-300">{selectedBook.summary}</p>
                  </div>
                </Modal>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
