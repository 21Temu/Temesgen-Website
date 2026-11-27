
import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  ExternalLink,
  Github,
  ArrowRight,
  X,
  ArrowLeft,
  Code2,
  Globe,
  Layers,
  Monitor,
  Rocket,
  Terminal,
  CheckCircle2,
  GitBranch,
  Eye
} from 'lucide-react';

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
    useTransform(mouseY, [-0.5, 0.5], [5, -5]),
    { stiffness: 160, damping: 22 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-5, 5]),
    { stiffness: 160, damping: 22 }
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
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

  const openProject = () => {
    if (project.liveUrl && project.liveUrl !== '#') {
      window.open(project.liveUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: 'easeOut'
      }}
      className="h-full"
      style={{ perspective: 1100 }}
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
        className="group h-full rounded-3xl overflow-hidden bg-white border border-slate-200 shadow-sm hover:shadow-2xl hover:border-indigo-300 transition-all duration-500"
      >
        {/* Project Image - Click to Open Live Website */}
        <div
          role="link"
          tabIndex={project.liveUrl !== '#' ? 0 : -1}
          aria-label={`Open ${project.title} in a new tab`}
          onClick={openProject}
          onKeyDown={(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              openProject();
            }
          }}
          className={`relative w-full aspect-[16/11] overflow-hidden bg-slate-100 ${
            project.liveUrl !== '#' ? 'cursor-pointer' : ''
          }`}
        >
          <img
            src={project.image}
            alt={`${project.title} interface preview`}
            loading="lazy"
            className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />

          {/* Image Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500 pointer-events-none" />

          {/* Project Number */}
          <div className="absolute top-4 left-4 pointer-events-none">
            <span className="px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur-md border border-white/70 text-slate-900 font-mono text-xs font-bold shadow-sm">
              PROJECT {project.number}
            </span>
          </div>

          {/* Featured Label */}
          {project.featured && (
            <div className="absolute top-4 right-4 pointer-events-none">
              <span className="px-3 py-1.5 rounded-lg bg-indigo-600/95 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                Featured
              </span>
            </div>
          )}

          {/* Open Website Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <div className="w-14 h-14 rounded-2xl bg-white/95 backdrop-blur-md text-indigo-600 flex items-center justify-center shadow-xl scale-90 group-hover:scale-100 transition-transform duration-300">
              <ExternalLink className="w-6 h-6" />
            </div>
          </div>

          {/* Project Title */}
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6 pointer-events-none">
            <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-indigo-300 mb-2">
              {project.category}
            </span>

            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {project.title}
            </h3>
          </div>
        </div>

        {/* Card Footer */}
        <div className="px-5 py-4 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onView(project)}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-slate-500 hover:text-indigo-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
            <span>View Details</span>
          </button>

          <button
            type="button"
            onClick={openProject}
            disabled={!project.liveUrl || project.liveUrl === '#'}
            aria-label={`Open ${project.title} live website in a new tab`}
            className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // 3D Background Parallax
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, {
    stiffness: 120,
    damping: 22
  });

  const smoothY = useSpring(pointerY, {
    stiffness: 120,
    damping: 22
  });

  const gridRotateX = useTransform(smoothY, [-0.5, 0.5], [66, 56]);
  const gridRotateZ = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const gridPanX = useTransform(smoothX, [-0.5, 0.5], [-34, 34]);
  const gridPanY = useTransform(smoothY, [-0.5, 0.5], [-26, 26]);

  const depthBackX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const depthBackY = useTransform(smoothY, [-0.5, 0.5], [-18, 18]);
  const depthFrontX = useTransform(smoothX, [-0.5, 0.5], [34, -34]);
  const depthFrontY = useTransform(smoothY, [-0.5, 0.5], [28, -28]);

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    pointerX.set(x);
    pointerY.set(y);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  // Modal Scroll Lock
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

  // Close Modal With Escape
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedProject(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Project UI Image Generator
  const createProjectImage = (
    title: string,
    subtitle: string,
    theme: string,
    type: 'ecommerce' | 'portfolio' | 'dems'
  ) => {
    const content = {
      ecommerce: `
        <rect x="25" y="25" width="750" height="450" rx="18" fill="#ffffff"/>
        <rect x="25" y="25" width="750" height="65" rx="18" fill="#f8fafc"/>
        <text x="55" y="65" font-size="23" font-weight="bold" fill="#111827">MelakeShop</text>
        <text x="430" y="64" font-size="14" fill="#475569">Home</text>
        <text x="490" y="64" font-size="14" fill="#475569">Shop</text>
        <text x="540" y="64" font-size="14" fill="#475569">About</text>
        <rect x="650" y="42" width="90" height="32" rx="9" fill="#7c3aed"/>
        <text x="695" y="63" font-size="12" text-anchor="middle" fill="white">Cart (2)</text>
        <rect x="45" y="110" width="710" height="210" rx="15" fill="#f3e8ff"/>
        <text x="75" y="175" font-size="35" font-weight="bold" fill="#1e1b4b">Shop Smarter.</text>
        <text x="75" y="220" font-size="35" font-weight="bold" fill="#1e1b4b">Live Better.</text>
        <text x="75" y="255" font-size="15" fill="#64748b">Discover products made for you.</text>
        <rect x="75" y="275" width="125" height="32" rx="8" fill="#7c3aed"/>
        <text x="137" y="296" font-size="12" text-anchor="middle" fill="white">Shop Now</text>
        <rect x="500" y="135" width="190" height="155" rx="15" fill="#ddd6fe"/>
        <circle cx="595" cy="195" r="55" fill="#a78bfa"/>
        <path d="M555 185 Q595 135 635 185 L625 245 Q595 270 565 245Z" fill="#4c1d95"/>
        <rect x="45" y="340" width="210" height="110" rx="12" fill="#f8fafc"/>
        <rect x="270" y="340" width="210" height="110" rx="12" fill="#f8fafc"/>
        <rect x="495" y="340" width="260" height="110" rx="12" fill="#f8fafc"/>
        <g fill="#334155" font-size="14">
          <text x="65" y="375">Featured Products</text>
          <text x="290" y="375">Best Sellers</text>
          <text x="515" y="375">Special Offers</text>
        </g>
        <g fill="#7c3aed">
          <rect x="65" y="390" width="160" height="8" rx="4"/>
          <rect x="290" y="390" width="150" height="8" rx="4"/>
          <rect x="515" y="390" width="190" height="8" rx="4"/>
        </g>
      `,
      portfolio: `
        <rect x="25" y="25" width="750" height="450" rx="18" fill="#111827"/>
        <rect x="25" y="25" width="750" height="65" rx="18" fill="#172033"/>
        <circle cx="55" cy="57" r="13" fill="#8b5cf6"/>
        <text x="80" y="63" font-size="20" font-weight="bold" fill="white">Developer Portfolio</text>
        <g fill="#cbd5e1" font-size="14">
          <text x="470" y="62">Home</text>
          <text x="535" y="62">About</text>
          <text x="600" y="62">Projects</text>
          <text x="675" y="62">Contact</text>
        </g>
        <circle cx="630" cy="255" r="125" fill="#312e81"/>
        <circle cx="630" cy="215" r="58" fill="#a78bfa"/>
        <path d="M535 390 Q540 285 630 285 Q720 285 725 390Z" fill="#4c1d95"/>
        <text x="70" y="165" font-size="18" fill="#a78bfa">HELLO, I'M</text>
        <text x="70" y="220" font-size="39" font-weight="bold" fill="white">Software</text>
        <text x="70" y="265" font-size="39" font-weight="bold" fill="white">Developer.</text>
        <text x="70" y="305" font-size="16" fill="#cbd5e1">Building modern digital experiences</text>
        <text x="70" y="330" font-size="16" fill="#cbd5e1">with React, Django and TypeScript.</text>
        <rect x="70" y="365" width="135" height="38" rx="9" fill="#7c3aed"/>
        <text x="137" y="389" text-anchor="middle" font-size="13" fill="white">View My Work</text>
        <rect x="220" y="365" width="115" height="38" rx="9" fill="#263449" stroke="#64748b"/>
        <text x="277" y="389" text-anchor="middle" font-size="13" fill="white">Contact Me</text>
      `,
      dems: `
        <rect x="25" y="25" width="750" height="450" rx="18" fill="#ffffff"/>
        <rect x="25" y="25" width="750" height="65" rx="18" fill="#eff6ff"/>
        <text x="55" y="65" font-size="25" font-weight="bold" fill="#1e40af">DEMS</text>
        <g fill="#475569" font-size="14">
          <text x="440" y="63">Home</text>
          <text x="500" y="63">Courses</text>
          <text x="570" y="63">About</text>
          <text x="630" y="63">Contact</text>
        </g>
        <rect x="690" y="42" width="60" height="30" rx="8" fill="#2563eb"/>
        <text x="720" y="62" font-size="12" text-anchor="middle" fill="white">Login</text>
        <rect x="45" y="110" width="710" height="205" rx="14" fill="#eff6ff"/>
        <text x="75" y="170" font-size="34" font-weight="bold" fill="#172554">Distance Education</text>
        <text x="75" y="212" font-size="34" font-weight="bold" fill="#172554">Made Easy.</text>
        <text x="75" y="250" font-size="15" fill="#475569">Learn anytime, anywhere with online courses.</text>
        <rect x="75" y="270" width="125" height="32" rx="8" fill="#2563eb"/>
        <text x="137" y="291" font-size="12" text-anchor="middle" fill="white">Get Started</text>
        <rect x="510" y="145" width="165" height="105" rx="10" fill="#bfdbfe"/>
        <rect x="530" y="160" width="125" height="75" rx="5" fill="#2563eb"/>
        <path d="M520 250 L665 250 L685 265 L500 265Z" fill="#64748b"/>
        <path d="M570 145 L610 115 L650 145Z" fill="#1e3a8a"/>
        <rect x="45" y="335" width="210" height="115" rx="12" fill="#f8fafc"/>
        <rect x="270" y="335" width="210" height="115" rx="12" fill="#f8fafc"/>
        <rect x="495" y="335" width="260" height="115" rx="12" fill="#f8fafc"/>
        <g fill="#1e40af" font-size="14" font-weight="bold">
          <text x="65" y="370">Online Courses</text>
          <text x="290" y="370">Assessments</text>
          <text x="515" y="370">Student Dashboard</text>
        </g>
        <g fill="#93c5fd">
          <rect x="65" y="390" width="155" height="9" rx="4"/>
          <rect x="290" y="390" width="155" height="9" rx="4"/>
          <rect x="515" y="390" width="195" height="9" rx="4"/>
        </g>
      `
    };

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
        <defs>
          <linearGradient id="background" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stop-color="${theme}"/>
            <stop offset="100%" stop-color="#e2e8f0"/>
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="12" stdDeviation="12" flood-opacity=".15"/>
          </filter>
        </defs>
        <rect width="800" height="500" fill="url(#background)"/>
        <circle cx="700" cy="70" r="100" fill="white" opacity=".16"/>
        <circle cx="70" cy="430" r="110" fill="white" opacity=".2"/>
        <g filter="url(#shadow)">
          ${content[type]}
        </g>
        <text x="400" y="490" text-anchor="middle" font-size="1" fill="transparent">${title} ${subtitle}</text>
      </svg>
    `;

    return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
  };

  // Project Data
  const projects: Project[] = [
    {
      title: 'E-Commerce Platform',
      description:
        'A modern full-stack e-commerce platform featuring product discovery, secure checkout, inventory management, order tracking, and a powerful administration dashboard.',
      image: createProjectImage(
        'E-Commerce Platform',
        'Online Shopping Experience',
        '#c4b5fd',
        'ecommerce'
      ),
      tags: ['React', 'Django DRF', 'PostgreSQL', 'Tailwind CSS'],
      liveUrl: 'https://melakeshop.vercel.app',
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
        'An interactive multi-language developer portfolio featuring responsive layouts, GitHub integrations, and smooth motion transitions.',
      image: createProjectImage(
        'Personal Portfolio',
        'Developer Portfolio',
        '#312e81',
        'portfolio'
      ),
      tags: ['React', 'TypeScript', 'Tailwind CSS', 'Motion'],
      liveUrl: 'https://abraham-dereje-mekonnen.vercel.app',
      githubUrl: '#',
      category: 'Web Development',
      number: '02',
      featured: false,
      status: 'Live Project',
      details:
        'A personal portfolio website designed to present professional skills, technical experience, projects, and contact information through a responsive interface.'
    },
    {
      title: 'Distance Education Management System',
      description:
        'A university distance-learning platform with student registration, course management, online examinations, AI learning assistance, and academic reporting.',
      image: createProjectImage(
        'Distance Education Management System',
        'University Learning Platform',
        '#93c5fd',
        'dems'
      ),
      tags: ['React', 'Django DRF', 'PostgreSQL', 'AI Integration'],
      liveUrl: 'https://dems-frontend.onrender.com',
      githubUrl: '#',
      category: 'Academic Management System',
      number: '03',
      featured: true,
      status: 'Live Project',
      details:
        'A university-focused learning management platform that connects students, instructors, department heads, registrars, and administrators with courses, assessments, records, and AI support.'
    }
  ];

  const buildLogs = [
    '0xB12  vite build -> dist/assets [OK]',
    '10110  api/projects/01..03 synced',
    '0x4F8  lint & typecheck passed'
  ];

  const closeModal = () => setSelectedProject(null);

  return (
    <section
      ref={sectionRef}
      id="projects"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: '1250px' }}
      className="relative py-24 bg-white text-slate-900 overflow-hidden border-t border-slate-100"
    >
      {/* 3D Animated Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-24 left-[14%] w-[440px] h-[440px] rounded-full bg-indigo-200/35 blur-[120px]"
        />

        <motion.div
          style={{ x: depthFrontX, y: depthFrontY }}
          animate={{ scale: [1.08, 0.95, 1.08] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-12 right-[10%] w-[420px] h-[420px] rounded-full bg-emerald-200/30 blur-[120px]"
        />

        {/* 3D Grid */}
        <div
          className="absolute inset-x-0 bottom-[-26%] h-[74%] flex items-center justify-center"
          style={{
            perspective: '900px',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)'
          }}
        >
          <motion.div
            style={{
              rotateX: gridRotateX,
              rotateZ: gridRotateZ,
              x: gridPanX,
              y: gridPanY,
              transformStyle: 'preserve-3d'
            }}
            animate={{
              backgroundPosition: ['0px 0px', '0px 56px']
            }}
            transition={{
              backgroundPosition: {
                duration: 3.6,
                repeat: Infinity,
                ease: 'linear'
              }
            }}
            className="w-[175%] h-[175%] border-t border-indigo-200/80"
            ref={(el) => {
              if (el) {
                el.style.backgroundImage =
                  'linear-gradient(to right, rgba(79, 70, 229, 0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.12) 1px, transparent 1px)';
                el.style.backgroundSize = '56px 56px';
              }
            }}
          />
        </div>

        {/* Floating Node */}
        <motion.div
          style={{
            x: depthFrontX,
            y: depthFrontY,
            transformStyle: 'preserve-3d'
          }}
          animate={{
            rotateX: [20, 44, 20],
            rotateY: [0, 180, 360],
            y: [0, -12, 0]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="hidden md:flex items-center justify-center absolute top-24 right-[6%] w-14 h-14 rounded-2xl border border-indigo-300/80 bg-white/85 font-mono text-[10px] font-semibold text-indigo-600 shadow-sm"
        >
          0xPRJ
        </motion.div>

        {/* Build Telemetry */}
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          className="hidden xl:flex flex-col gap-2 absolute top-28 right-[24%] font-mono text-[11px] text-slate-600/80"
        >
          {buildLogs.map((line) => (
            <motion.div
              key={line}
              animate={{
                opacity: [0.4, 0.88, 0.4],
                x: [0, -6, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="px-3 py-1 rounded-md bg-white/85 border border-slate-200/80 shadow-sm"
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Main Content */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Centered Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto mb-12 text-center"
        >
          <div className="inline-flex items-center justify-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/90 text-indigo-700 text-xs font-mono font-semibold mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Featured Projects</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-4">
            Digital Experiences.
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            A collection of projects that demonstrate full-stack architecture,
            clean interfaces, and practical software engineering.
          </p>
        </motion.div>

        {/* Registry Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-10 border-b border-slate-200/80">
          <div className="flex items-center gap-2.5 font-mono text-xs text-slate-600">
            <GitBranch className="w-4 h-4 text-indigo-600" />
            <span>
              workspace://projects · {projects.length} entries
            </span>
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/90 border border-slate-200 text-xs font-bold text-slate-800">
            <span>0{projects.length}</span>
            <span className="text-slate-400 font-mono">PROJECTS</span>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 items-stretch">
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

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.65,
            delay: 0.25
          }}
          className="mt-20 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-7 sm:p-10 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Rocket className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                Need a custom web or software solution?
              </h3>

              <p className="text-sm sm:text-base text-slate-600 mt-1.5 leading-relaxed">
                From e-commerce platforms to management systems and modern
                web apps, let us turn your requirements into reliable software.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-900 text-white font-semibold text-sm sm:text-base hover:bg-indigo-600 transition-colors shrink-0"
          >
            <span>Let's Work Together</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Project Details Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={closeModal}
            />

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
                y: 20
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.96,
                y: 16
              }}
              transition={{
                duration: 0.25,
                ease: 'easeOut'
              }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-modal-title"
              className="relative w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 px-5 sm:px-7 py-4 border-b border-slate-200 bg-white">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>

                <div className="text-center min-w-0">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                    PROJECT {selectedProject.number}
                  </span>

                  <h3
                    id="project-modal-title"
                    className="text-base sm:text-lg font-black text-slate-900 truncate"
                  >
                    {selectedProject.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close modal"
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Image Preview */}
                  <div className="lg:col-span-7 relative min-h-[240px] lg:min-h-[440px] bg-slate-100 border-b lg:border-b-0 lg:border-r border-slate-200">
                    <img
                      src={selectedProject.image}
                      alt={`${selectedProject.title} preview`}
                      className="absolute inset-0 w-full h-full object-cover object-top"
                    />

                    <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/95 border border-slate-200 font-mono text-xs font-bold text-slate-800">
                      <Monitor className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{selectedProject.category}</span>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-white">
                    <div>
                      <div className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-indigo-600 mb-2">
                        <Terminal className="w-3.5 h-3.5" />
                        <span>Project Overview</span>
                      </div>

                      <h4 className="text-2xl font-black text-slate-900 mb-3">
                        {selectedProject.title}
                      </h4>

                      <p className="text-sm text-slate-600 leading-relaxed mb-5">
                        {selectedProject.description}
                      </p>

                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {selectedProject.details}
                      </p>

                      {/* Status */}
                      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between mb-6">
                        <span className="text-xs font-semibold text-slate-500">
                          Status
                        </span>

                        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          {selectedProject.status}
                        </span>
                      </div>

                      {/* Technologies */}
                      <h5 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                        Technologies
                      </h5>

                      <div className="flex flex-wrap gap-1.5 mb-8">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md bg-indigo-50 border border-indigo-200/70 font-mono text-xs font-semibold text-indigo-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Project Links */}
                    <div className="space-y-2.5 pt-4 border-t border-slate-100">
                      {selectedProject.liveUrl !== '#' && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors"
                        >
                          <Globe className="w-4 h-4" />
                          <span>Visit Live Website</span>
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}

                      {selectedProject.githubUrl !== '#' && (
                        <a
                          href={selectedProject.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold text-sm hover:bg-slate-50 transition-colors"
                        >
                          <Github className="w-4 h-4" />
                          <span>View Source Code</span>
                        </a>
                      )}

                      {selectedProject.liveUrl === '#' &&
                        selectedProject.githubUrl === '#' && (
                          <div className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-100 text-slate-500 font-semibold text-xs">
                            <Code2 className="w-4 h-4" />
                            <span>Project Preview Coming Soon</span>
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
