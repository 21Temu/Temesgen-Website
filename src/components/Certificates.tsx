
import { useState, useEffect, useRef } from 'react';
import type { MouseEvent, KeyboardEvent } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  Award,
  ExternalLink,
  X,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Trophy,
  Medal,
  ChevronRight,
  CalendarDays,
  GraduationCap,
  Layers
} from 'lucide-react';

interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  icon: string;
  link: string;
  category: string;
  credentialId: string;
  description: string;
  featured: boolean;
}

/* ======================================
   CERTIFICATE IMAGE GENERATOR
====================================== */

function createCertificateImage(
  title: string,
  subtitle: string,
  accent: string,
  number: string
) {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="820" viewBox="0 0 1200 820">
      <defs>
        <linearGradient id="paper" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#ffffff"/>
          <stop offset="100%" stop-color="#f1f5f9"/>
        </linearGradient>
        <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.2" fill="${accent}" opacity=".12"/>
        </pattern>
      </defs>

      <rect width="1200" height="820" fill="#e2e8f0"/>
      <rect x="28" y="28" width="1144" height="764" rx="12" fill="url(#paper)" stroke="${accent}" stroke-width="5"/>
      <rect x="48" y="48" width="1104" height="724" rx="7" fill="none" stroke="${accent}" stroke-width="2"/>
      <rect x="48" y="48" width="1104" height="724" fill="url(#dots)"/>

      <path d="M48 190 H1152" stroke="${accent}" stroke-width="2" opacity=".35"/>
      <path d="M48 630 H1152" stroke="${accent}" stroke-width="2" opacity=".35"/>

      <circle cx="600" cy="112" r="42" fill="${accent}" opacity=".12"/>
      <circle cx="600" cy="112" r="31" fill="none" stroke="${accent}" stroke-width="3"/>
      <path d="M585 112 L596 123 L617 99" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>

      <text x="600" y="225" text-anchor="middle" font-family="Georgia, serif" font-size="26" fill="#64748b" letter-spacing="7">
        CERTIFICATE OF COMPLETION
      </text>

      <text x="600" y="305" text-anchor="middle" font-family="Georgia, serif" font-size="48" font-weight="bold" fill="#0f172a">
        ${title}
      </text>

      <text x="600" y="365" text-anchor="middle" font-family="Arial, sans-serif" font-size="22" fill="#475569">
        This illustrative sample recognizes learning in
      </text>

      <text x="600" y="420" text-anchor="middle" font-family="Arial, sans-serif" font-size="34" font-weight="bold" fill="${accent}">
        ${subtitle}
      </text>

      <text x="600" y="485" text-anchor="middle" font-family="Arial, sans-serif" font-size="19" fill="#64748b">
        SAMPLE PORTFOLIO DESIGN — NOT AN ISSUED CERTIFICATE
      </text>

      <path d="M250 555 H480 M720 555 H950" stroke="#94a3b8" stroke-width="2"/>

      <text x="365" y="585" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" fill="#475569">
        SAMPLE SIGNATURE
      </text>

      <text x="835" y="585" text-anchor="middle" font-family="Arial, sans-serif" font-size="17" fill="#475569">
        DEMO REFERENCE
      </text>

      <text x="600" y="700" text-anchor="middle" font-family="Arial, sans-serif" font-size="30" font-weight="bold" fill="${accent}" opacity=".20" letter-spacing="8">
        SAMPLE — NOT A REAL CREDENTIAL
      </text>

      <text x="600" y="750" text-anchor="middle" font-family="Arial, sans-serif" font-size="15" fill="#64748b">
        ${number} · DEMONSTRATION ONLY
      </text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

/* ======================================
   CERTIFICATE CARD
   IMAGE + TITLE ONLY
   CLICK CARD TO VIEW DETAILS
====================================== */

function CertificateCard({
  cert,
  index,
  inView,
  onView
}: {
  cert: Certificate;
  index: number;
  inView: boolean;
  onView: (cert: Certificate) => void;
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

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
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

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onView(cert);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: 'easeOut'
      }}
      style={{ perspective: 1100 }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={`View details for ${cert.title}`}
        onClick={() => onView(cert)}
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d'
        }}
        className="group h-full cursor-pointer overflow-hidden rounded-3xl border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-indigo-300 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        {/* Certificate Image */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
          <img
            src={cert.image}
            alt={`${cert.title} sample certificate`}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-slate-950/0 transition-all duration-300 group-hover:bg-slate-950/35">
            <div className="flex h-12 w-12 scale-75 items-center justify-center rounded-full bg-white text-indigo-600 opacity-0 shadow-xl transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
              <ChevronRight className="h-6 w-6" />
            </div>
          </div>
        </div>

        {/* Certificate Title Only */}
        <div className="flex min-h-[76px] items-center justify-center px-5 py-5 text-center">
          <h3 className="text-lg font-black leading-snug text-slate-900 transition-colors duration-300 group-hover:text-indigo-600">
            {cert.title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ======================================
   MAIN CERTIFICATES COMPONENT
====================================== */

export default function Certificates() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedCert, setSelectedCert] = useState<Certificate | null>(null);

  /* Background Motion */
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

  const handlePointerMove = (event: MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();

    if (!rect) return;

    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  /* Certificate Data */
  const certificates: Certificate[] = [
    {
      id: 1,
      title: 'React Development',
      issuer: 'Sample Portfolio Entry',
      date: 'Demo Entry',
      image: createCertificateImage(
        'React Development',
        'Frontend Development',
        '#4f46e5',
        'DEMO-REACT-001'
      ),
      icon: '⚛️',
      link: 'https://react.dev/learn',
      category: 'Frontend Development',
      credentialId: 'DEMO-REACT-001',
      description:
        'A sample certificate design representing learning in React, reusable components, hooks, state management, and modern frontend development. This is a demonstration, not an earned credential.',
      featured: true
    },
    {
      id: 2,
      title: 'Python & Django Development',
      issuer: 'Sample Portfolio Entry',
      date: 'Demo Entry',
      image: createCertificateImage(
        'Python and Django',
        'Backend Development',
        '#059669',
        'DEMO-DJANGO-002'
      ),
      icon: '🐍',
      link: 'https://docs.djangoproject.com/en/stable/intro/',
      category: 'Backend Development',
      credentialId: 'DEMO-DJANGO-002',
      description:
        'A sample certificate design representing learning in Python, Django, REST APIs, backend architecture, and web application development. This is a demonstration, not an earned credential.',
      featured: true
    },
    {
      id: 3,
      title: 'Database Development',
      issuer: 'Sample Portfolio Entry',
      date: 'Demo Entry',
      image: createCertificateImage(
        'Database Development',
        'SQL and Database Design',
        '#7c3aed',
        'DEMO-DATABASE-003'
      ),
      icon: '🐘',
      link: 'https://www.postgresql.org/docs/current/tutorial.html',
      category: 'Database Development',
      credentialId: 'DEMO-DATABASE-003',
      description:
        'A sample certificate design representing learning in SQL, relational database concepts, PostgreSQL, database design, and data management. This is a demonstration, not an earned credential.',
      featured: false
    }
  ];

  const certLogs = [
    '0xC01  sample designs loaded (3)',
    '10110  demo entries · no credentials claimed',
    '0x7D9  continuous learning active'
  ];

  const closeModal = () => setSelectedCert(null);

  /* Lock Body Scroll + Escape Key */
  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedCert]);

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedCert(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="certificates"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: '1250px' }}
      className="relative overflow-hidden border-t border-slate-100 bg-white py-24 text-slate-900"
    >
      {/* ======================================
          ANIMATED BACKGROUND
      ====================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-24 left-[14%] h-[440px] w-[440px] rounded-full bg-indigo-200/35 blur-[120px]"
        />

        <motion.div
          style={{ x: depthFrontX, y: depthFrontY }}
          animate={{ scale: [1.08, 0.95, 1.08] }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-12 right-[10%] h-[420px] w-[420px] rounded-full bg-emerald-200/30 blur-[120px]"
        />

        {/* 3D Grid */}
        <div
          className="absolute inset-x-0 bottom-[-26%] flex h-[74%] items-center justify-center"
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
            className="h-[175%] w-[175%] border-t border-indigo-200/80"
          >
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  'linear-gradient(to right, rgba(79, 70, 229, 0.13) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.12) 1px, transparent 1px)',
                backgroundSize: '56px 56px'
              }}
            />
          </motion.div>
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
          className="absolute right-[6%] top-24 hidden h-14 w-14 items-center justify-center rounded-2xl border border-indigo-300/80 bg-white/85 font-mono text-[10px] font-semibold text-indigo-600 shadow-sm md:flex"
        >
          0xCRT
        </motion.div>

        {/* Telemetry */}
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          className="absolute right-[24%] top-28 hidden flex-col gap-2 font-mono text-[11px] text-slate-600/80 xl:flex"
        >
          {certLogs.map((line, index) => (
            <motion.div
              key={line}
              animate={{
                opacity: [0.4, 0.88, 0.4],
                x: [0, -6, 0]
              }}
              transition={{
                duration: 4 + index,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="rounded-md border border-slate-200/80 bg-white/85 px-3 py-1 shadow-sm"
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-6">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <div className="mb-4 inline-flex items-center justify-center gap-2 rounded-full border border-indigo-200 bg-indigo-50/90 px-3.5 py-1.5 font-mono text-xs font-semibold text-indigo-700">
            <Trophy className="h-3.5 w-3.5" />
            <span>Achievements &amp; Recognition</span>
          </div>

          <h2 className="mb-4 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Certificates{' '}
            <span className="text-indigo-600">
              Learning Never Ends.
            </span>
          </h2>
        </motion.div>

        {/* Summary Cards */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">
                {String(certificates.length).padStart(2, '0')}
              </p>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Sample Designs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-600 text-white">
              <Layers className="h-5 w-5" />
            </div>
            <div>
              <p className="text-2xl font-black text-slate-900">03</p>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Learning Areas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 rounded-2xl border border-slate-200/90 bg-white/90 p-5 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black text-slate-900">
                Demo Only
              </p>
              <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Sample Credentials
              </p>
            </div>
          </div>
        </motion.div>

        {/* ======================================
            CERTIFICATE GRID
            ONLY IMAGE + TITLE
        ====================================== */}

        <div className="grid grid-cols-1 items-stretch gap-7 md:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert, index) => (
            <CertificateCard
              key={cert.id}
              cert={cert}
              index={index}
              inView={inView}
              onView={setSelectedCert}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="mt-16 flex flex-col justify-between gap-6 rounded-3xl border border-slate-200/90 bg-white/95 p-7 shadow-sm backdrop-blur-md sm:flex-row sm:items-center sm:p-9"
        >
          <div className="flex max-w-2xl items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Medal className="h-6 w-6" />
            </div>

            <div>
              <div className="mb-1 inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-indigo-600">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Always Growing</span>
              </div>

              <h3 className="text-2xl font-black text-slate-900">
                Knowledge Is My Greatest Investment.
              </h3>

              <p className="mt-1 text-sm leading-relaxed text-slate-600">
                Committed to continuous learning, hands-on engineering
                practice, and adapting to modern tools.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ======================================
          CERTIFICATE DETAIL MODAL
      ====================================== */}

      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6"
          >
            {/* Modal Backdrop */}
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
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
              aria-labelledby="certificate-modal-title"
              className="relative flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 border-b border-slate-200 bg-white px-5 py-4 sm:px-7">

                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3.5 py-2 text-xs font-bold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </button>

                <div className="min-w-0 text-center">
                  <span className="block font-mono text-[10px] font-bold uppercase tracking-widest text-indigo-600">
                    Sample Certificate Preview
                  </span>

                  <h3
                    id="certificate-modal-title"
                    className="truncate text-sm font-black text-slate-900 sm:text-lg"
                  >
                    {selectedCert.title}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close certificate preview"
                  className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-900 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="flex-1 overflow-y-auto bg-slate-50/60 p-5 sm:p-8">
                <div className="mx-auto max-w-3xl space-y-6">

                  {/* Large Certificate Image */}
                  <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
                    <img
                      src={selectedCert.image}
                      alt={`${selectedCert.title} sample certificate`}
                      className="mx-auto max-h-[60vh] w-full rounded-xl object-contain"
                    />
                  </div>

                  {/* Certificate Information */}
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">

                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-200/70 bg-indigo-50 text-indigo-600">
                        <Award className="h-5 w-5" />
                      </div>

                      <div>
                        <h4 className="text-lg font-black text-slate-900">
                          {selectedCert.title}
                        </h4>

                        <p className="text-xs font-semibold text-slate-500">
                          {selectedCert.issuer}
                        </p>
                      </div>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-slate-600">
                      {selectedCert.description}
                    </p>

                    {/* Demo Notice */}
                    <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                      <p className="text-sm font-bold text-amber-800">
                        Demo design only
                      </p>

                      <p className="mt-1 text-xs leading-relaxed text-amber-700">
                        This is a sample portfolio illustration, not an
                        official certificate or proof of course completion.
                      </p>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">

                      <div className="rounded-xl border border-slate-200/70 bg-slate-50 p-4">
                        <p className="mb-1 font-mono text-[11px] font-semibold uppercase text-slate-400">
                          Category
                        </p>

                        <p className="text-sm font-bold text-slate-900">
                          {selectedCert.category}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200/70 bg-slate-50 p-4">
                        <p className="mb-1 font-mono text-[11px] font-semibold uppercase text-slate-400">
                          Completion Date
                        </p>

                        <p className="text-sm font-bold text-slate-900">
                          {selectedCert.date}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200/70 bg-slate-50 p-4">
                        <p className="mb-1 font-mono text-[11px] font-semibold uppercase text-slate-400">
                          Issuer
                        </p>

                        <p className="text-sm font-bold text-slate-900">
                          {selectedCert.issuer}
                        </p>
                      </div>

                      <div className="rounded-xl border border-slate-200/70 bg-slate-50 p-4">
                        <p className="mb-1 font-mono text-[11px] font-semibold uppercase text-slate-400">
                          Demo Reference
                        </p>

                        <p className="break-all font-mono text-sm font-bold text-slate-900">
                          {selectedCert.credentialId}
                        </p>
                      </div>
                    </div>

                    {/* Learning Resource */}
                    <a
                      href={selectedCert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-600"
                    >
                      <ShieldCheck className="h-4 w-4" />
                      <span>Explore Learning Resources</span>
                      <ExternalLink className="h-4 w-4" />
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
