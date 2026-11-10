
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';

import {
  ExternalLink,
  Github,
  ArrowRight,
  X,
  ArrowLeft,
  Sparkles,
  Code2,
  Globe,
  Layers,
  Monitor,
  Rocket,
  Eye,
  Terminal,
  Zap,
  Maximize2,
  CheckCircle2
} from 'lucide-react';

// ==========================================
// PROJECT INTERFACE
// ==========================================

interface Project {
  title: string;
  description: string;
  image: string;
  tags: string[];
  liveUrl: string;
  githubUrl: string;
  category: string;
  number: string;
  featured: boolean;
  status: string;
  details: string;
}

// ==========================================
// PROJECT CARD COMPONENT
// ==========================================

function ProjectCard({
  project,
  index,
  onView,
  inView
}: {
  project: Project;
  index: number;
  onView: (project: Project) => void;
  inView: boolean;
}) {

  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    { stiffness: 200, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    { stiffness: 200, damping: 20 }
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;

    const y = (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

  };

  const handleMouseLeave = () => {

    mouseX.set(0);
    mouseY.set(0);

  };

  const tagColors = [
    'bg-blue-500/10 text-blue-500 border-blue-500/20',
    'bg-purple-500/10 text-purple-500 border-purple-500/20',
    'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    'bg-orange-500/10 text-orange-500 border-orange-500/20'
  ];

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 80,
        rotateX: 10
      }}
      animate={inView ? {
        opacity: 1,
        y: 0,
        rotateX: 0
      } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.15,
        ease: 'easeOut'
      }}
      className="h-full"
      style={{
        perspective: 1200
      }}
    >

      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="group relative h-full rounded-[30px] p-[1px] bg-gradient-to-br from-zinc-300/60 via-zinc-200/30 to-zinc-300/60 dark:from-white/20 dark:via-white/5 dark:to-white/10 hover:from-blue-500/60 hover:via-purple-500/50 hover:to-cyan-500/60 transition-colors duration-500"
      >

        {/* CARD INNER */}

        <div className="relative h-full flex flex-col overflow-hidden rounded-[29px] bg-white dark:bg-[#10101c] shadow-xl transition-all duration-500 group-hover:shadow-[0_25px_80px_rgba(99,102,241,0.15)]">

          {/* IMAGE AREA */}

          <div className="relative h-64 sm:h-72 overflow-hidden">

            <motion.img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Image Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Top Labels */}

            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">

              <span className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white text-xs font-bold tracking-widest">

                PROJECT {project.number}

              </span>

              {project.featured && (

                <span className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">

                  <Sparkles className="w-3 h-3" />

                  FEATURED

                </span>

              )}

            </div>

            {/* Bottom Image Content */}

            <div className="absolute bottom-5 left-6 right-6">

              <div className="flex items-center gap-2 mb-3">

                <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399]" />

                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">

                  {project.category}

                </span>

              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">

                {project.title}

              </h3>

            </div>

            {/* Hover View Button */}

            <motion.button
              onClick={() => onView(project)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ scale: 1.08 }}
              className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-white/90 text-zinc-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-2xl"
              aria-label={`View ${project.title}`}
            >

              <Eye className="w-7 h-7" />

            </motion.button>

          </div>

          {/* CARD BODY */}

          <div className="relative flex-1 flex flex-col p-7">

            {/* Description */}

            <p className="text-zinc-600 dark:text-zinc-400 text-sm md:text-base leading-relaxed mb-7">

              {project.description}

            </p>

            {/* Technologies */}

            <div className="flex flex-wrap gap-2 mb-8">

              {project.tags.map((tag, tagIndex) => (

                <span
                  key={tag}
                  className={`px-3 py-2 rounded-xl border text-xs font-bold ${tagColors[tagIndex % tagColors.length]}`}
                >

                  {tag}

                </span>

              ))}

            </div>

            {/* Card Footer */}

            <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">

              <button
                onClick={() => onView(project)}
                className="group/btn inline-flex items-center gap-2 font-bold text-sm text-zinc-900 dark:text-white hover:text-blue-500 dark:hover:text-cyan-400 transition-colors"
              >

                Explore Project

                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />

              </button>

              <div className="flex items-center gap-3">

                {project.githubUrl !== '#' && (

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-white/[0.05] hover:bg-zinc-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                    aria-label="GitHub repository"
                  >

                    <Github className="w-5 h-5" />

                  </a>

                )}

                {project.liveUrl !== '#' && (

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => event.stopPropagation()}
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-white/[0.05] hover:bg-blue-600 hover:text-white transition-all"
                    aria-label="Live website"
                  >

                    <ExternalLink className="w-5 h-5" />

                  </a>

                )}

              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </motion.div>

  );

}

// ==========================================
// MAIN PROJECTS COMPONENT
// ==========================================

export default function Projects() {

  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedProject, setSelectedProject] =
    useState<Project | null>(null);

  // ==========================================
  // BODY SCROLL LOCK
  // ==========================================

  useEffect(() => {

    if (selectedProject) {

      document.body.style.overflow = 'hidden';

    } else {

      document.body.style.overflow = '';

    }

    return () => {

      document.body.style.overflow = '';

    };

  }, [selectedProject]);

  // ==========================================
  // ESCAPE KEY
  // ==========================================

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'Escape') {

        setSelectedProject(null);

      }

    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {

      window.removeEventListener('keydown', handleKeyDown);

    };

  }, []);

  // ==========================================
  // PROJECT DATA
  // ==========================================

  const projects: Project[] = [

    {
      title: 'E-Commerce Platform',

      description:
        'A modern full-stack e-commerce platform featuring product discovery, secure checkout, inventory management, order tracking, and a powerful administration dashboard.',

      image:
        'https://images.unsplash.com/photo-1557821552-17105176677c?w=1200&q=85',

      tags: [
        'React',
        'Django DRF',
        'PostgreSQL',
        'Tailwind CSS'
      ],

      liveUrl:
        'https://melakeshop.vercel.app',

      githubUrl: '#',

      category: 'Full Stack Development',

      number: '01',

      featured: true,

      status: 'Live Project',

      details:
        'This e-commerce solution provides a complete shopping experience, including product browsing, cart management, customer accounts, order processing, payment workflows, and administrative tools.'
    },

    {
      title: 'Personal Portfolio',

      description:
        'An interactive multi-language developer portfolio featuring elegant animations, responsive layouts, dark mode, GitHub integrations, and a modern user experience.',

      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=85',

      tags: [
        'React',
        'TypeScript',
        'Tailwind CSS',
        'Framer Motion'
      ],

      liveUrl:
        'https://abraham-dereje-mekonnen.vercel.app',

      githubUrl: '#',

      category: 'Web Development',

      number: '02',

      featured: false,

      status: 'Live Project',

      details:
        'A personal portfolio website designed to present professional skills, technical experience, certificates, projects, and contact information through a responsive and animated interface.'
    },

    {
      title: 'Distance Education Management System',

      description:
        'A comprehensive university distance-learning platform with student registration, course management, online examinations, AI learning assistance, and academic reporting.',

      image:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=1200&q=85',

      tags: [
        'React',
        'Django DRF',
        'PostgreSQL',
        'AI Integration'
      ],

      liveUrl: '#',

      githubUrl: '#',

      category: 'Academic Management System',

      number: '03',

      featured: true,

      status: 'Development',

      details:
        'A university-focused learning management platform that connects students, teachers, department heads, deans, registrars, and administrators. It includes course materials, assignments, examinations, academic records, notifications, communication, and AI-powered learning support.'
    }

  ];

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {

    setSelectedProject(null);

  };

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <section
      id="projects"
      className="relative py-28 md:py-36 overflow-hidden bg-zinc-50 dark:bg-[#080812] transition-colors duration-500"
    >

      {/* ======================================
          BACKGROUND DECORATIONS
      ====================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <motion.div
          animate={{
            x: [0, 80, -40, 0],
            y: [0, -60, 40, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-48 -left-48 w-[550px] h-[550px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/2 -right-48 w-[550px] h-[550px] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[150px]"
        />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px'
          }}
        />

      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >

        {/* ======================================
            SECTION HEADER
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={inView ? {
            opacity: 1,
            y: 0
          } : {}}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-20"
        >

          {/* Section Badge */}

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-7">

            <Sparkles className="w-4 h-4 text-blue-500" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-cyan-400">

              My Creative Work

            </span>

          </div>

          {/* Main Title */}

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-7">

            {t('projects.title')}

            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">

              Digital Experiences.

            </span>

          </h2>

          {/* Description */}

          <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">

            A collection of projects that demonstrate my passion for building modern, scalable, and interactive digital solutions.

          </p>

          {/* Decorative Line */}

          <div className="flex items-center justify-center gap-3 mt-9">

            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500" />

            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />

            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />

            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />

            <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500" />

          </div>

        </motion.div>

        {/* ======================================
            PROJECT COUNT INFORMATION
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={inView ? {
            opacity: 1,
            y: 0
          } : {}}
          transition={{
            duration: 0.6,
            delay: 0.2
          }}
          className="flex flex-col sm:flex-row items-center justify-between gap-5 mb-10"
        >

          <div className="flex items-center gap-3">

            <div className="w-11 h-11 rounded-xl bg-blue-500/10 flex items-center justify-center">

              <Layers className="w-5 h-5 text-blue-500" />

            </div>

            <div>

              <h3 className="font-bold text-zinc-900 dark:text-white">

                Selected Projects

              </h3>

              <p className="text-xs text-zinc-500">

                A showcase of my development journey

              </p>

            </div>

          </div>

          <div className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10">

            <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">

              0{projects.length}

            </span>

            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">

              Featured Works

            </span>

          </div>

        </motion.div>

        {/* ======================================
            PROJECT GRID
        ====================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">

          {projects.map((project, index) => (

            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              onView={setSelectedProject}
              inView={inView}
            />

          ))}

        </div>

        {/* ======================================
            PROJECT CTA BANNER
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60
          }}
          animate={inView ? {
            opacity: 1,
            y: 0
          } : {}}
          transition={{
            duration: 0.8,
            delay: 0.7
          }}
          className="relative mt-28 rounded-[35px] p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 shadow-[0_30px_100px_rgba(99,102,241,0.15)]"
        >

          <div className="relative overflow-hidden rounded-[34px] bg-white dark:bg-[#10101c] p-9 md:p-16 text-center">

            {/* Background Glow */}

            <motion.div
              animate={{
                rotate: 360
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute -top-48 -right-48 w-96 h-96 rounded-full border border-purple-500/20"
            />

            <motion.div
              animate={{
                rotate: -360
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: 'linear'
              }}
              className="absolute -bottom-48 -left-48 w-96 h-96 rounded-full border border-blue-500/20"
            />

            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/[0.05] via-transparent to-purple-500/[0.08]" />

            {/* CTA Content */}

            <div className="relative z-10">

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-20 h-20 mx-auto mb-7 rounded-3xl flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 shadow-2xl shadow-purple-500/30"
              >

                <Rocket className="w-10 h-10 text-white" />

              </motion.div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">

                <Zap className="w-4 h-4 text-purple-500" />

                <span className="text-xs font-bold uppercase tracking-widest text-purple-500">

                  Let's Build Something

                </span>

              </div>

              <h3 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-6">

                Need a Custom Website?

                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">

                  Let's Make It Happen.

                </span>

              </h3>

              <p className="max-w-2xl mx-auto text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-10">

                Whether you need a professional website, e-commerce platform, or a complex web application, I'm ready to turn your ideas into powerful digital experiences.

              </p>

              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.06,
                  y: -4
                }}
                whileTap={{
                  scale: 0.96
                }}
                className="inline-flex items-center gap-3 px-9 py-5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-shadow"
              >

                Let's Work Together

                <ArrowRight className="w-5 h-5" />

              </motion.a>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ======================================
          PROJECT DETAILS MODAL
      ====================================== */}

      <AnimatePresence>

        {selectedProject && (

          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          >

            {/* BACKDROP */}

            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
              onClick={closeModal}
            />

            {/* MODAL WINDOW */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 60,
                rotateX: 8
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                rotateX: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 40
              }}
              transition={{
                duration: 0.4,
                ease: 'easeOut'
              }}
              className="relative w-full max-w-6xl max-h-[92vh] flex flex-col overflow-hidden rounded-[30px] bg-white dark:bg-[#10101c] border border-zinc-200 dark:border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.5)]"
            >

              {/* ==================================
                  MODAL HEADER
              ================================== */}

              <div className="relative z-20 flex items-center justify-between gap-3 px-5 sm:px-8 py-5 border-b border-zinc-200 dark:border-white/10 bg-white dark:bg-[#10101c]">

                <button
                  onClick={closeModal}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors text-zinc-600 dark:text-zinc-300"
                >

                  <ArrowLeft className="w-5 h-5" />

                  <span className="hidden sm:block font-semibold">

                    Back

                  </span>

                </button>

                <div className="flex-1 min-w-0 text-center">

                  <span className="block text-xs uppercase tracking-widest text-blue-500 font-bold mb-1">

                    PROJECT {selectedProject.number}

                  </span>

                  <h3 className="text-base sm:text-xl font-black text-zinc-900 dark:text-white truncate">

                    {selectedProject.title}

                  </h3>

                </div>

                <button
                  onClick={closeModal}
                  className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-red-500 hover:text-white transition-all text-zinc-500"
                  aria-label="Close project preview"
                >

                  <X className="w-6 h-6" />

                </button>

              </div>

              {/* ==================================
                  MODAL BODY
              ================================== */}

              <div className="flex-1 overflow-y-auto">

                <div className="grid grid-cols-1 lg:grid-cols-5 min-h-full">

                  {/* LEFT PROJECT IMAGE */}

                  <div className="lg:col-span-3 relative min-h-[260px] lg:min-h-[500px] bg-zinc-950 overflow-hidden">

                    <img
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-80"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

                    <div className="absolute top-6 left-6">

                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white text-xs font-bold">

                        <Monitor className="w-4 h-4" />

                        PROJECT PREVIEW

                      </span>

                    </div>

                    <div className="absolute bottom-8 left-7 right-7">

                      <p className="text-sm font-bold text-cyan-400 mb-3 uppercase tracking-widest">

                        {selectedProject.category}

                      </p>

                      <h4 className="text-3xl sm:text-4xl font-black text-white mb-4">

                        {selectedProject.title}

                      </h4>

                      <p className="text-white/70 leading-relaxed max-w-xl">

                        {selectedProject.description}

                      </p>

                    </div>

                  </div>

                  {/* RIGHT PROJECT DETAILS */}

                  <div className="lg:col-span-2 p-6 sm:p-9 flex flex-col">

                    <div className="flex items-center gap-2 mb-7">

                      <Terminal className="w-5 h-5 text-blue-500" />

                      <h4 className="text-lg font-black text-zinc-900 dark:text-white">

                        Project Details

                      </h4>

                    </div>

                    <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400 mb-8">

                      {selectedProject.details}

                    </p>

                    {/* Status */}

                    <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 mb-8">

                      <div className="flex items-center justify-between">

                        <span className="text-sm text-zinc-500 dark:text-zinc-400">

                          Project Status

                        </span>

                        <span className="flex items-center gap-2 text-sm font-bold text-emerald-500">

                          <CheckCircle2 className="w-4 h-4" />

                          {selectedProject.status}

                        </span>

                      </div>

                    </div>

                    {/* Technologies */}

                    <h5 className="font-bold text-zinc-900 dark:text-white mb-4">

                      Technologies Used

                    </h5>

                    <div className="flex flex-wrap gap-2 mb-10">

                      {selectedProject.tags.map((tag: string) => (

                        <span
                          key={tag}
                          className="px-3 py-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-500 text-xs font-bold"
                        >

                          {tag}

                        </span>

                      ))}

                    </div>

                    {/* Action Buttons */}

                    <div className="mt-auto flex flex-col gap-3">

                      {selectedProject.liveUrl !== '#' && (

                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:scale-[1.02] transition-transform shadow-lg shadow-blue-500/20"
                        >

                          <Globe className="w-5 h-5" />

                          Visit Live Website

                          <ExternalLink className="w-4 h-4" />

                        </a>

                      )}

                      {selectedProject.githubUrl !== '#' && (

                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-white/[0.06] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white font-bold hover:bg-zinc-200 dark:hover:bg-white/10 transition-colors"
                        >

                          <Github className="w-5 h-5" />

                          View Source Code

                        </a>

                      )}

                      {selectedProject.liveUrl === '#' && selectedProject.githubUrl === '#' && (

                        <div className="flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-zinc-100 dark:bg-white/[0.06] text-zinc-500 dark:text-zinc-400 font-semibold text-sm">

                          <Code2 className="w-5 h-5" />

                          Project Preview Coming Soon

                        </div>

                      )}

                    </div>

                  </div>

                </div>

              </div>

            </motion.div>

          </motion.div>

        )}

      </AnimatePresence>

    </section>

  );

}
