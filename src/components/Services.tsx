
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

import {
  Code2,
  Database,
  Layout,
  Smartphone,
  X,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Layers,
  Zap,
  Globe,
  ShieldCheck,
  Palette,
  Server,
  MonitorSmartphone,
  Rocket,
  ExternalLink,
  Workflow,
  MousePointer2
} from 'lucide-react';

// ==========================================
// SERVICE INTERFACE
// ==========================================

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  definition: string;
  whatIWillBuild: string;
  icon: React.ElementType;
  color: string;
  secondaryColor: string;
  bg: string;
  gradient: string;
  technologies: string[];
  features: string[];
  deliverables: string[];
  number: string;
}

// ==========================================
// 3D SERVICE CARD
// ==========================================

function ServiceCard({
  service,
  index,
  inView,
  onClick
}: {
  service: Service;
  index: number;
  inView: boolean;
  onClick: (service: Service) => void;
}) {

  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    { stiffness: 180, damping: 20 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    { stiffness: 180, damping: 20 }
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

  const Icon = service.icon;

  return (

    <motion.div
      initial={{ opacity: 0, y: 70, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: 'easeOut'
      }}
      style={{ perspective: 1200 }}
      className="h-full"
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
        onClick={() => onClick(service)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            onClick(service);
          }
        }}
        role="button"
        tabIndex={0}
        aria-label={`Explore ${service.title} services`}
        className={`group relative h-full min-h-[390px] rounded-[30px] p-[1px] bg-gradient-to-br ${service.gradient} cursor-pointer`}
      >

        <div className="relative h-full min-h-[388px] flex flex-col overflow-hidden rounded-[29px] bg-white dark:bg-[#11111e] shadow-xl group-hover:shadow-[0_25px_80px_rgba(99,102,241,0.15)] transition-shadow duration-500">

          {/* Animated Background */}

          <div className="absolute inset-0 overflow-hidden pointer-events-none">

            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -30, 20, 0]
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className={`absolute -top-20 -right-20 w-64 h-64 rounded-full ${service.bg} blur-[90px] opacity-60`}
            />

          </div>

          {/* Card Content */}

          <div className="relative z-10 p-8 flex-1 flex flex-col">

            {/* Top Row */}

            <div className="flex items-center justify-between mb-9">

              <div className={`w-16 h-16 rounded-2xl ${service.bg} border border-white/10 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>

                <Icon className={`w-8 h-8 ${service.color}`} />

              </div>

              <span className="text-5xl font-black text-zinc-200 dark:text-white/[0.06] group-hover:text-blue-500/20 transition-colors">

                {service.number}

              </span>

            </div>

            {/* Title */}

            <div className="mb-4">

              <span className={`text-xs font-black uppercase tracking-[0.2em] ${service.color}`}>

                {service.subtitle}

              </span>

              <h3 className="text-2xl md:text-3xl font-black mt-3 text-zinc-900 dark:text-white group-hover:translate-x-1 transition-transform">

                {service.title}

              </h3>

            </div>

            {/* Description */}

            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400 mb-7">

              {service.description}

            </p>

            {/* Technology Tags */}

            <div className="flex flex-wrap gap-2 mb-8">

              {service.technologies.slice(0, 3).map((tech) => (

                <span
                  key={tech}
                  className="px-3 py-2 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300 border border-zinc-200 dark:border-white/10"
                >

                  {tech}

                </span>

              ))}

              {service.technologies.length > 3 && (

                <span className="px-3 py-2 rounded-lg text-xs font-bold bg-zinc-100 dark:bg-white/[0.05] text-zinc-500">

                  +{service.technologies.length - 3}

                </span>

              )}

            </div>

            {/* Bottom Action */}

            <div className="mt-auto pt-6 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">

              <span className="text-sm font-black text-zinc-900 dark:text-white">

                Explore Service

              </span>

              <motion.div
                whileHover={{ x: 5 }}
                className={`w-11 h-11 rounded-xl ${service.bg} flex items-center justify-center`}
              >

                <ArrowRight className={`w-5 h-5 ${service.color}`} />

              </motion.div>

            </div>

          </div>

        </div>

      </motion.div>

    </motion.div>

  );

}

// ==========================================
// MAIN SERVICES COMPONENT
// ==========================================

export default function Services() {

  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedService, setSelectedService] =
    useState<Service | null>(null);

  // ==========================================
  // BODY SCROLL LOCK
  // ==========================================

  useEffect(() => {

    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };

  }, [selectedService]);

  // ==========================================
  // ESCAPE KEY
  // ==========================================

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'Escape') {
        setSelectedService(null);
      }

    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

  }, []);

  // ==========================================
  // SERVICE DATA
  // ==========================================

  const services: Service[] = [

    {
      id: 1,
      number: '01',

      title: 'Web Development',

      subtitle: 'Modern Web Experiences',

      description:
        'Building beautiful, fast, responsive, and user-friendly websites that help businesses establish a strong digital presence.',

      definition:
        'Web development is the process of designing, building, and maintaining websites and web applications. It combines frontend interfaces, backend functionality, performance optimization, accessibility, and responsive design.',

      whatIWillBuild:
        'I can develop modern websites and interactive web applications using React and other modern frontend technologies. The focus is on clean interfaces, responsive layouts, reusable components, performance, and a smooth user experience.',

      icon: Layout,

      color: 'text-blue-500',

      secondaryColor: 'text-cyan-500',

      bg: 'bg-blue-500/10',

      gradient: 'from-blue-500/60 via-cyan-500/30 to-purple-500/50',

      technologies: [
        'React',
        'JavaScript',
        'TypeScript',
        'Tailwind CSS',
        'HTML5',
        'CSS3'
      ],

      features: [
        'Responsive website development',
        'Modern user interfaces',
        'SEO-friendly structure',
        'Performance optimization',
        'Cross-browser compatibility',
        'Reusable components'
      ],

      deliverables: [
        'Business websites',
        'Personal portfolios',
        'Landing pages',
        'Interactive web applications'
      ]

    },

    {
      id: 2,
      number: '02',

      title: 'Backend Development',

      subtitle: 'Powerful Server Architecture',

      description:
        'Developing secure APIs, database systems, authentication, and reliable server-side applications.',

      definition:
        'Backend development focuses on the server-side functionality of an application. It manages business logic, APIs, databases, authentication, authorization, and communication between different application components.',

      whatIWillBuild:
        'I can develop backend applications and REST APIs using Django REST Framework and Laravel. This includes database modeling, authentication, API endpoints, data validation, permissions, and structured application architecture.',

      icon: Database,

      color: 'text-purple-500',

      secondaryColor: 'text-violet-500',

      bg: 'bg-purple-500/10',

      gradient: 'from-purple-500/60 via-violet-500/30 to-pink-500/50',

      technologies: [
        'Python',
        'Django',
        'Django REST Framework',
        'PostgreSQL',
        'Laravel',
        'MySQL'
      ],

      features: [
        'REST API development',
        'Database architecture',
        'Authentication systems',
        'Role-based permissions',
        'Data validation',
        'API documentation'
      ],

      deliverables: [
        'REST APIs',
        'Admin dashboards',
        'Authentication systems',
        'Database-driven applications'
      ]

    },

    {
      id: 3,
      number: '03',

      title: 'Full-Stack Solutions',

      subtitle: 'Complete Application Development',

      description:
        'Creating complete digital products by combining frontend, backend, database, and application functionality.',

      definition:
        'Full-stack development involves building both the frontend and backend of an application. It connects user interfaces with server-side logic, APIs, and databases to create a complete working system.',

      whatIWillBuild:
        'I can develop end-to-end web applications, from planning the database and designing APIs to building interactive React interfaces and connecting everything together. The goal is a maintainable, functional, and scalable application.',

      icon: Code2,

      color: 'text-pink-500',

      secondaryColor: 'text-rose-500',

      bg: 'bg-pink-500/10',

      gradient: 'from-pink-500/60 via-purple-500/30 to-blue-500/50',

      technologies: [
        'React',
        'Django REST Framework',
        'Python',
        'PostgreSQL',
        'JavaScript',
        'REST APIs'
      ],

      features: [
        'Frontend and backend integration',
        'Complete authentication flows',
        'Database integration',
        'Admin and user dashboards',
        'API integration',
        'Application deployment support'
      ],

      deliverables: [
        'E-commerce platforms',
        'Management systems',
        'Learning platforms',
        'Business applications'
      ]

    },

    {
      id: 4,
      number: '04',

      title: 'UI/UX Design',

      subtitle: 'Creative Digital Interfaces',

      description:
        'Designing intuitive, visually appealing, and user-centered interfaces for websites and digital applications.',

      definition:
        'UI design focuses on the visual appearance and interactive elements of a product. UX design focuses on how users interact with that product, including usability, accessibility, navigation, and the overall experience.',

      whatIWillBuild:
        'I can create structured, modern interfaces with clear layouts, consistent visual elements, thoughtful navigation, and responsive design. The goal is to make digital products easier and more enjoyable to use.',

      icon: Smartphone,

      color: 'text-orange-500',

      secondaryColor: 'text-amber-500',

      bg: 'bg-orange-500/10',

      gradient: 'from-orange-500/60 via-amber-500/30 to-pink-500/50',

      technologies: [
        'Figma',
        'Tailwind CSS',
        'React',
        'CSS3',
        'Responsive Design',
        'Prototyping'
      ],

      features: [
        'User interface design',
        'Responsive layouts',
        'Design consistency',
        'User-friendly navigation',
        'Wireframes and prototypes',
        'Interactive components'
      ],

      deliverables: [
        'Website interface designs',
        'Dashboard layouts',
        'Mobile-friendly interfaces',
        'Design prototypes'
      ]

    }

  ];

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {
    setSelectedService(null);
  };

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <section
      id="services"
      className="relative py-28 md:py-36 overflow-hidden bg-zinc-50 dark:bg-[#080812] transition-colors duration-500"
    >

      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-48 -left-48 w-[550px] h-[550px] rounded-full bg-blue-500/10 blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, -70, 40, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/2 -right-48 w-[550px] h-[550px] rounded-full bg-purple-500/10 blur-[150px]"
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

        {/* HEADER */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-7">

            <Sparkles className="w-4 h-4 text-blue-500" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">

              What I Can Do For You

            </span>

          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-7">

            {t('services.title')}

            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">

              Turning Ideas Into Reality.

            </span>

          </h2>

          <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">

            I provide modern development and design services to help transform ideas into functional, beautiful, and reliable digital experiences.

          </p>

          <div className="flex items-center justify-center gap-3 mt-9">

            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500" />

            <div className="w-2 h-2 rounded-full bg-blue-500" />

            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />

            <div className="w-2 h-2 rounded-full bg-purple-500" />

            <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500" />

          </div>

        </motion.div>

        {/* SERVICE GRID */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">

          {services.map((service, index) => (

            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              inView={inView}
              onClick={setSelectedService}
            />

          ))}

        </div>

        {/* SERVICE BOTTOM STATISTICS */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-16"
        >

          <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">

              <Globe className="w-6 h-6 text-blue-500" />

            </div>

            <div>

              <h4 className="text-xl font-black text-zinc-900 dark:text-white">

                Web

              </h4>

              <p className="text-xs text-zinc-500 font-semibold">

                Digital Experiences

              </p>

            </div>

          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">

              <Server className="w-6 h-6 text-purple-500" />

            </div>

            <div>

              <h4 className="text-xl font-black text-zinc-900 dark:text-white">

                Backend

              </h4>

              <p className="text-xs text-zinc-500 font-semibold">

                APIs & Databases

              </p>

            </div>

          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 flex items-center gap-4">

            <div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center">

              <MonitorSmartphone className="w-6 h-6 text-pink-500" />

            </div>

            <div>

              <h4 className="text-xl font-black text-zinc-900 dark:text-white">

                Full Stack

              </h4>

              <p className="text-xs text-zinc-500 font-semibold">

                Complete Applications

              </p>

            </div>

          </div>

        </motion.div>

        {/* CTA BANNER */}

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="relative mt-24 p-[1px] rounded-[32px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
        >

          <div className="relative overflow-hidden rounded-[31px] bg-white dark:bg-[#11111e] p-9 md:p-14 text-center">

            <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-purple-500/10 blur-[100px]" />

            <div className="relative z-10">

              <motion.div
                animate={{
                  y: [0, -8, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="w-20 h-20 mx-auto mb-7 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/30"
              >

                <Rocket className="w-10 h-10 text-white" />

              </motion.div>

              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-5">

                Have an Idea? Let's Build It.

              </h3>

              <p className="max-w-2xl mx-auto text-base text-zinc-600 dark:text-zinc-400 leading-relaxed mb-9">

                Whether you need a modern website, a powerful backend, or a complete application, let's discuss your project and explore how I can help.

              </p>

              <a
                href="#contact"
                className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black hover:scale-105 transition-transform duration-300 shadow-xl"
              >

                Let's Work Together

                <ArrowRight className="w-5 h-5" />

              </a>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ======================================
          SERVICE DETAILS MODAL
      ====================================== */}

      <AnimatePresence>

        {selectedService && (

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          >

            {/* BACKDROP */}

            <div
              className="absolute inset-0 bg-black/85 backdrop-blur-xl"
              onClick={closeModal}
            />

            {/* MODAL */}

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.85,
                y: 50
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0
              }}
              exit={{
                opacity: 0,
                scale: 0.9,
                y: 30
              }}
              transition={{
                duration: 0.4,
                ease: 'easeOut'
              }}
              className="relative w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden rounded-[28px] bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.5)]"
            >

              {/* MODAL HEADER */}

              <div className="relative z-10 flex items-center justify-between gap-3 px-5 sm:px-7 py-5 border-b border-zinc-200 dark:border-white/10 bg-white dark:bg-[#11111e]">

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

                  <span className="block text-xs font-bold uppercase tracking-widest text-blue-500 mb-1">

                    Service Details

                  </span>

                  <h3 className="text-base sm:text-xl font-black text-zinc-900 dark:text-white truncate">

                    {selectedService.title}

                  </h3>

                </div>

                <button
                  onClick={closeModal}
                  aria-label="Close service details"
                  className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-red-500 hover:text-white transition-all text-zinc-500"
                >

                  <X className="w-6 h-6" />

                </button>

              </div>

              {/* MODAL BODY */}

              <div className="flex-1 overflow-y-auto bg-zinc-50 dark:bg-[#080812] p-5 sm:p-8">

                <div className="max-w-3xl mx-auto space-y-8">

                  {/* SERVICE HERO */}

                  <div className={`relative overflow-hidden rounded-3xl p-7 sm:p-9 ${selectedService.bg} border border-zinc-200 dark:border-white/10`}>

                    <div className="relative z-10 flex items-center gap-5">

                      <div className="w-16 h-16 rounded-2xl bg-white dark:bg-white/10 flex items-center justify-center shadow-lg">

                        {(() => {
                          const Icon = selectedService.icon;

                          return (
                            <Icon className={`w-9 h-9 ${selectedService.color}`} />
                          );
                        })()}

                      </div>

                      <div>

                        <span className={`text-xs font-black uppercase tracking-widest ${selectedService.color}`}>

                          {selectedService.subtitle}

                        </span>

                        <h4 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white mt-2">

                          {selectedService.title}

                        </h4>

                      </div>

                    </div>

                    <p className="relative z-10 text-sm leading-7 text-zinc-700 dark:text-zinc-300 mt-6">

                      {selectedService.description}

                    </p>

                  </div>

                  {/* DEFINITION */}

                  <div>

                    <h4 className="flex items-center gap-3 text-lg font-black text-zinc-900 dark:text-white mb-4">

                      <span className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">

                        <Workflow className="w-5 h-5 text-blue-500" />

                      </span>

                      What Is This Service?

                    </h4>

                    <p className="p-6 rounded-2xl bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10 text-sm leading-8 text-zinc-600 dark:text-zinc-400">

                      {selectedService.definition}

                    </p>

                  </div>

                  {/* WHAT I WILL BUILD */}

                  <div>

                    <h4 className="flex items-center gap-3 text-lg font-black text-zinc-900 dark:text-white mb-4">

                      <span className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">

                        <Rocket className="w-5 h-5 text-purple-500" />

                      </span>

                      What I Can Build

                    </h4>

                    <p className="p-6 rounded-2xl bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10 text-sm leading-8 text-zinc-600 dark:text-zinc-400">

                      {selectedService.whatIWillBuild}

                    </p>

                  </div>

                  {/* FEATURES */}

                  <div>

                    <h4 className="flex items-center gap-3 text-lg font-black text-zinc-900 dark:text-white mb-5">

                      <span className="w-9 h-9 rounded-xl bg-emerald-500/10 flex items-center justify-center">

                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />

                      </span>

                      Key Features

                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {selectedService.features.map((feature) => (

                        <div
                          key={feature}
                          className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10"
                        >

                          <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-500" />

                          <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">

                            {feature}

                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* TECHNOLOGIES */}

                  <div>

                    <h4 className="flex items-center gap-3 text-lg font-black text-zinc-900 dark:text-white mb-5">

                      <span className="w-9 h-9 rounded-xl bg-cyan-500/10 flex items-center justify-center">

                        <Code2 className="w-5 h-5 text-cyan-500" />

                      </span>

                      Technologies

                    </h4>

                    <div className="flex flex-wrap gap-3">

                      {selectedService.technologies.map((tech) => (

                        <span
                          key={tech}
                          className="px-4 py-3 rounded-xl bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10 text-sm font-bold text-zinc-700 dark:text-zinc-300 shadow-sm"
                        >

                          {tech}

                        </span>

                      ))}

                    </div>

                  </div>

                  {/* DELIVERABLES */}

                  <div>

                    <h4 className="flex items-center gap-3 text-lg font-black text-zinc-900 dark:text-white mb-5">

                      <span className="w-9 h-9 rounded-xl bg-orange-500/10 flex items-center justify-center">

                        <Layers className="w-5 h-5 text-orange-500" />

                      </span>

                      What You Can Get

                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                      {selectedService.deliverables.map((item) => (

                        <div
                          key={item}
                          className="flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10"
                        >

                          <Zap className="w-4 h-4 flex-shrink-0 text-orange-500" />

                          <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">

                            {item}

                          </span>

                        </div>

                      ))}

                    </div>

                  </div>

                  {/* CONTACT CTA */}

                  <div className="p-7 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white">

                    <div className="flex items-center gap-3 mb-3">

                      <Sparkles className="w-6 h-6" />

                      <h4 className="text-xl font-black">

                        Ready to Start?

                      </h4>

                    </div>

                    <p className="text-sm text-white/80 leading-7 mb-6">

                      Let's discuss your project, understand your requirements, and explore the right solution.

                    </p>

                    <a
                      href="#contact"
                      onClick={closeModal}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-zinc-900 font-black hover:scale-105 transition-transform"
                    >

                      Contact Me

                      <ArrowRight className="w-5 h-5" />

                    </a>

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
