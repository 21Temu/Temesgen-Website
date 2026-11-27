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
  Server,
  MonitorSmartphone,
  Rocket,
  Workflow,
  Terminal
} from 'lucide-react';

interface Service {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  definition: string;
  whatIWillBuild: string;
  icon: React.ElementType;
  badgeClass: string;
  technologies: string[];
  features: string[];
  deliverables: string[];
  number: string;
}

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
    useTransform(mouseY, [-0.5, 0.5], [6, -6]),
    { stiffness: 160, damping: 22 }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-6, 6]),
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

  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      style={{ perspective: 1100 }}
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
        className="group h-full flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-5 shadow-2xs hover:border-indigo-300 hover:shadow-md transition-all duration-300 cursor-pointer"
      >
        <div>
          {/* Top Row: Compact Icon & Number */}
          <div className="flex items-center justify-between gap-3 mb-4">
            <div
              className={`w-10 h-10 rounded-xl flex items-center justify-center ${service.badgeClass}`}
            >
              <Icon className="w-5 h-5" />
            </div>

            <span className="font-mono text-[11px] font-bold px-2.5 py-0.5 rounded-md bg-slate-50 border border-slate-200/80 text-slate-500">
              #{service.number}
            </span>
          </div>

          {/* Title Only */}
          <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
            {service.title}
          </h3>
        </div>

        {/* Footer Action */}
        <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
          <span>Explore Service</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Services() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // 3D software background parallax (-0.5 to 0.5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22 });

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const services: Service[] = [
    {
      id: 1,
      number: '01',
      title: 'Web Development',
      subtitle: 'Modern Web Experiences',
      description:
        'Building fast, responsive, and user-friendly websites that establish a clear and reliable digital presence.',
      definition:
        'Web development is the process of designing, building, and maintaining websites and web applications. It combines frontend interfaces, backend functionality, performance optimization, accessibility, and responsive design.',
      whatIWillBuild:
        'I build modern websites and interactive web applications using React and modern frontend tools with clean layouts, reusable components, and smooth responsiveness.',
      icon: Layout,
      badgeClass: 'bg-indigo-600 text-white',
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
        'Developing structured APIs, database schemas, authentication flows, and dependable server-side logic.',
      definition:
        'Backend development focuses on the server-side functionality of an application. It manages business logic, APIs, databases, authentication, authorization, and communication between application components.',
      whatIWillBuild:
        'I build backend services and REST APIs using Django REST Framework and Laravel with relational modeling, validation, role permissions, and clean endpoints.',
      icon: Database,
      badgeClass: 'bg-violet-600 text-white',
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
        'Delivering end-to-end applications that connect frontend interfaces, REST APIs, and persistent databases.',
      definition:
        'Full-stack development involves building both the frontend and backend of an application. It connects user interfaces with server-side logic, APIs, and databases to create a complete working system.',
      whatIWillBuild:
        'I deliver end-to-end web systems—from database design and backend APIs to interactive React interfaces, dashboards, and deployment readiness.',
      icon: Code2,
      badgeClass: 'bg-slate-900 text-white',
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
        'Crafting clear, consistent, and accessible interfaces focused on usability across desktop and mobile screens.',
      definition:
        'UI design focuses on the visual appearance and interactive elements of a product. UX design focuses on how users interact with that product, including usability, accessibility, navigation, and the overall experience.',
      whatIWillBuild:
        'I design structured interfaces with clear visual hierarchy, consistent spacing, intuitive navigation, and responsive layouts tailored to user workflows.',
      icon: Smartphone,
      badgeClass: 'bg-emerald-600 text-white',
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

  const serviceLogs = [
    '0xS01  services.ready(4 modules)',
    '10101  api: rest · auth · db synced',
    '0x8E2  ui: responsive & accessible'
  ];

  const closeModal = () => setSelectedService(null);

  return (
    <section
      ref={sectionRef}
      id="services"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: '1250px' }}
      className="relative py-20 bg-white text-slate-900 overflow-hidden border-t border-slate-100"
    >
      {/* ======================================
          SOFTWARE 3D ANIMATED BACKGROUND
      ====================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-[14%] w-[440px] h-[440px] rounded-full bg-indigo-200/35 blur-[120px]"
        />
        <motion.div
          style={{ x: depthFrontX, y: depthFrontY }}
          animate={{ scale: [1.08, 0.95, 1.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 right-[10%] w-[420px] h-[420px] rounded-full bg-emerald-200/30 blur-[120px]"
        />

        {/* 3D Perspective Grid */}
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
            animate={{ backgroundPosition: ['0px 0px', '0px 56px'] }}
            transition={{
              backgroundPosition: { duration: 3.6, repeat: Infinity, ease: 'linear' }
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

        {/* Floating 3D Wireframe Node */}
        <motion.div
          style={{ x: depthFrontX, y: depthFrontY, transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: [20, 44, 20],
            rotateY: [0, 180, 360],
            y: [0, -12, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:flex items-center justify-center absolute top-24 right-[6%] w-14 h-14 rounded-2xl border border-indigo-300/80 bg-white/85 font-mono text-[10px] font-semibold text-indigo-600 shadow-2xs"
        >
          0xSVC
        </motion.div>

        {/* Software Telemetry Streams */}
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          className="hidden xl:flex flex-col gap-2 absolute top-28 right-[24%] font-mono text-[11px] text-slate-600/80"
        >
          {serviceLogs.map((line, idx) => (
            <motion.div
              key={line}
              animate={{ opacity: [0.4, 0.88, 0.4], x: [0, -6, 0] }}
              transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
              className="px-3 py-1 rounded-md bg-white/85 border border-slate-200/80 shadow-2xs"
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/90 text-indigo-700 text-xs font-mono font-semibold mb-3.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>What I Can Do For You</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3.5">
            {t('services.title')}{' '}
            <span className="text-indigo-600">Turning Ideas Into Reality.</span>
          </h2>
        </motion.div>

        {/* Compact Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 items-stretch">
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

        {/* Service Pillars Summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10"
        >
          <div className="p-4 rounded-2xl border border-slate-200/90 bg-white/90 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-200/70 text-indigo-600 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">Web</h4>
              <p className="font-mono text-xs text-slate-500">Digital Experiences</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/90 bg-white/90 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-violet-50 border border-violet-200/70 text-violet-600 flex items-center justify-center shrink-0">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">Backend</h4>
              <p className="font-mono text-xs text-slate-500">APIs &amp; Databases</p>
            </div>
          </div>

          <div className="p-4 rounded-2xl border border-slate-200/90 bg-white/90 flex items-center gap-3.5 shadow-2xs">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/70 text-emerald-600 flex items-center justify-center shrink-0">
              <MonitorSmartphone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-base font-black text-slate-900">Full Stack</h4>
              <p className="font-mono text-xs text-slate-500">Complete Applications</p>
            </div>
          </div>
        </motion.div>

        {/* CTA Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="mt-12 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-6"
        >
          <div className="flex items-start gap-4 max-w-2xl">
            <div className="w-11 h-11 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Rocket className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Have an Idea? Let&apos;s Build It.
              </h3>
              <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                Whether you need a web interface, a backend API, or a complete application, let&apos;s map out your scope.
              </p>
            </div>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors shrink-0"
          >
            <span>Let&apos;s Work Together</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* ======================================
          SERVICE DETAILS MODAL (WHITE)
      ====================================== */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 16 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl"
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
                    Service Details
                  </span>
                  <h3 className="text-base sm:text-xl font-black text-slate-900 truncate">
                    {selectedService.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close service details"
                  className="w-9 h-9 rounded-xl border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto bg-slate-50/60 p-5 sm:p-8">
                <div className="max-w-3xl mx-auto space-y-6">
                  {/* Hero Block */}
                  <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200 shadow-2xs">
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${selectedService.badgeClass}`}
                      >
                        {(() => {
                          const Icon = selectedService.icon;
                          return <Icon className="w-7 h-7" />;
                        })()}
                      </div>
                      <div>
                        <span className="block font-mono text-xs font-bold uppercase tracking-wider text-indigo-600">
                          {selectedService.subtitle}
                        </span>
                        <h4 className="text-2xl sm:text-3xl font-black text-slate-900">
                          {selectedService.title}
                        </h4>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                      {selectedService.description}
                    </p>
                  </div>

                  {/* Definition */}
                  <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-2xs">
                    <h4 className="flex items-center gap-2.5 text-base font-black text-slate-900 mb-3">
                      <Workflow className="w-4 h-4 text-indigo-600" />
                      <span>What Is This Service?</span>
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedService.definition}
                    </p>
                  </div>

                  {/* What I Can Build */}
                  <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-2xs">
                    <h4 className="flex items-center gap-2.5 text-base font-black text-slate-900 mb-3">
                      <Terminal className="w-4 h-4 text-indigo-600" />
                      <span>What I Can Build</span>
                    </h4>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {selectedService.whatIWillBuild}
                    </p>
                  </div>

                  {/* Key Features */}
                  <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-2xs">
                    <h4 className="flex items-center gap-2.5 text-base font-black text-slate-900 mb-4">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Key Features</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-sm font-medium text-slate-700"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technologies */}
                  <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-2xs">
                    <h4 className="flex items-center gap-2.5 text-base font-black text-slate-900 mb-4">
                      <Code2 className="w-4 h-4 text-indigo-600" />
                      <span>Technologies</span>
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedService.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1.5 rounded-lg bg-indigo-50 border border-indigo-200/70 font-mono text-xs font-semibold text-indigo-700"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverables */}
                  <div className="rounded-2xl p-6 bg-white border border-slate-200 shadow-2xs">
                    <h4 className="flex items-center gap-2.5 text-base font-black text-slate-900 mb-4">
                      <Layers className="w-4 h-4 text-indigo-600" />
                      <span>What You Can Get</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedService.deliverables.map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-2.5 p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-sm font-bold text-slate-800"
                        >
                          <Zap className="w-4 h-4 text-indigo-600 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
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