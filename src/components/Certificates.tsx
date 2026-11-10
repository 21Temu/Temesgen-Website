
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
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
  GraduationCap,
  Trophy,
  CalendarDays,
  Eye,
  BadgeCheck,
  Medal,
  Download,
  Layers,
  ChevronRight,
  CheckCircle2,
  Star
} from 'lucide-react';

// ==========================================
// CERTIFICATE INTERFACE
// ==========================================

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

// ==========================================
// 3D CERTIFICATE CARD
// ==========================================

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
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    {
      stiffness: 180,
      damping: 20
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    {
      stiffness: 180,
      damping: 20
    }
  );

  const handleMouseMove = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {

    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();

    const x =
      (event.clientX - rect.left) / rect.width - 0.5;

    const y =
      (event.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);

  };

  const handleMouseLeave = () => {

    mouseX.set(0);
    mouseY.set(0);

  };

  return (

    <motion.div
      initial={{
        opacity: 0,
        y: 70,
        scale: 0.9
      }}
      animate={inView ? {
        opacity: 1,
        y: 0,
        scale: 1
      } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.15,
        ease: 'easeOut'
      }}
      style={{
        perspective: 1200
      }}
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
        className="group relative h-full rounded-[30px] p-[1px] bg-gradient-to-br from-zinc-300/70 via-zinc-200/20 to-zinc-300/70 dark:from-white/20 dark:via-white/5 dark:to-white/10 hover:from-blue-500/70 hover:via-purple-500/60 hover:to-cyan-400/70 transition-colors duration-500"
      >

        <div className="relative h-full flex flex-col overflow-hidden rounded-[29px] bg-white dark:bg-[#11111e] shadow-xl group-hover:shadow-[0_25px_80px_rgba(99,102,241,0.18)] transition-shadow duration-500">

          {/* ==================================
              CERTIFICATE IMAGE
          ================================== */}

          <div className="relative h-64 overflow-hidden bg-zinc-950">

            <motion.img
              src={cert.image}
              alt={cert.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />

            {/* Image Overlay */}

            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />

            {/* Top Badge */}

            <div className="absolute top-5 left-5 right-5 flex items-center justify-between">

              <span className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-xl border border-white/20 text-white text-xs font-bold uppercase tracking-widest">

                CERTIFICATE {String(cert.id).padStart(2, '0')}

              </span>

              {cert.featured && (

                <span className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">

                  <Star className="w-3 h-3 fill-current" />

                  FEATURED

                </span>

              )}

            </div>

            {/* Floating Certificate Icon */}

            <motion.div
              animate={{
                y: [0, -7, 0],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
              className="absolute top-20 right-7 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center shadow-2xl"
            >

              <span className="text-3xl">

                {cert.icon}

              </span>

            </motion.div>

            {/* Image Bottom */}

            <div className="absolute bottom-5 left-6 right-6">

              <div className="flex items-center gap-2 mb-2">

                <Award className="w-4 h-4 text-cyan-400" />

                <span className="text-xs font-bold uppercase tracking-widest text-white/80">

                  {cert.category}

                </span>

              </div>

              <p className="text-white font-bold text-lg">

                {cert.issuer}

              </p>

            </div>

            {/* Hover Overlay */}

            <button
              onClick={() => onView(cert)}
              aria-label={`Preview ${cert.title}`}
              className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300"
            >

              <motion.div
                whileHover={{
                  scale: 1.1
                }}
                className="w-16 h-16 rounded-full bg-white text-zinc-900 flex items-center justify-center shadow-2xl"
              >

                <Eye className="w-7 h-7" />

              </motion.div>

            </button>

          </div>

          {/* ==================================
              CERTIFICATE INFORMATION
          ================================== */}

          <div className="relative flex-1 flex flex-col p-7">

            {/* Issuer and Date */}

            <div className="flex items-center justify-between gap-3 mb-5">

              <div className="flex items-center gap-2 text-blue-500 dark:text-cyan-400">

                <GraduationCap className="w-4 h-4" />

                <span className="text-xs font-bold">

                  {cert.issuer}

                </span>

              </div>

              <div className="flex items-center gap-2 text-zinc-500">

                <CalendarDays className="w-4 h-4" />

                <span className="text-xs font-bold">

                  {cert.date}

                </span>

              </div>

            </div>

            {/* Title */}

            <h3 className="text-xl font-black leading-snug text-zinc-900 dark:text-white mb-4 group-hover:text-blue-500 dark:group-hover:text-cyan-400 transition-colors">

              {cert.title}

            </h3>

            {/* Description */}

            <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400 mb-7">

              {cert.description}

            </p>

            {/* Footer */}

            <div className="mt-auto pt-5 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between">

              <button
                onClick={() => onView(cert)}
                className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-purple-500 transition-colors"
              >

                View Certificate

                <ChevronRight className="w-4 h-4" />

              </button>

              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-white/[0.05] text-purple-500">

                <ShieldCheck className="w-5 h-5" />

              </div>

            </div>

          </div>

        </div>

      </motion.div>

    </motion.div>

  );

}

// ==========================================
// MAIN CERTIFICATES COMPONENT
// ==========================================

export default function Certificates() {

  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedCert, setSelectedCert] =
    useState<Certificate | null>(null);

  // ==========================================
  // BODY SCROLL LOCK
  // ==========================================

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

  // ==========================================
  // ESCAPE KEY
  // ==========================================

  useEffect(() => {

    const handleKeyDown = (event: KeyboardEvent) => {

      if (event.key === 'Escape') {

        setSelectedCert(null);

      }

    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {

      window.removeEventListener('keydown', handleKeyDown);

    };

  }, []);

  // ==========================================
  // CERTIFICATE DATA
  // Replace with your actual credentials.
  // ==========================================

  const certificates: Certificate[] = [

    {
      id: 1,

      title: 'Your React Development Certificate',

      issuer: 'Your Actual Issuing Organization',

      date: 'Your Completion Year',

      image:
        'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&q=85',

      icon: '⚛️',

      link: '#',

      category: 'Frontend Development',

      credentialId: 'Add actual credential ID',

      description:
        'Replace this description with the actual skills, topics, and achievements covered by your certificate.',

      featured: true

    },

    {
      id: 2,

      title: 'Your Python / Django Certificate',

      issuer: 'Your Actual Issuing Organization',

      date: 'Your Completion Year',

      image:
        'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200&q=85',

      icon: '🐍',

      link: '#',

      category: 'Backend Development',

      credentialId: 'Add actual credential ID',

      description:
        'Replace this description with the actual Django, Python, API development, or backend topics covered by your certificate.',

      featured: true

    },

    {
      id: 3,

      title: 'Your Database Development Certificate',

      issuer: 'Your Actual Issuing Organization',

      date: 'Your Completion Year',

      image:
        'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=1200&q=85',

      icon: '🐘',

      link: '#',

      category: 'Database Development',

      credentialId: 'Add actual credential ID',

      description:
        'Replace this description with the actual database technologies, SQL concepts, and database design skills covered by your certificate.',

      featured: false

    }

  ];

  // ==========================================
  // CLOSE MODAL
  // ==========================================

  const closeModal = () => {

    setSelectedCert(null);

  };

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <section
      id="certificates"
      className="relative py-28 md:py-36 overflow-hidden bg-zinc-50 dark:bg-[#080812] transition-colors duration-500"
    >

      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{
            x: [0, 70, -40, 0],
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
            x: [0, -80, 40, 0],
            y: [0, 60, -40, 0],
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

          {/* Badge */}

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-7">

            <Trophy className="w-4 h-4 text-purple-500" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">

              Achievements & Recognition

            </span>

          </div>

          {/* Heading */}

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-7">

            Certificates

            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">

              Learning Never Ends.

            </span>

          </h2>

          {/* Description */}

          <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">

            Every achievement represents a step forward in my journey of learning, developing new skills, and exploring modern technologies.

          </p>

          {/* Decoration */}

          <div className="flex items-center justify-center gap-3 mt-9">

            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500" />

            <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_12px_#3b82f6]" />

            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />

            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_12px_#a855f7]" />

            <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500" />

          </div>

        </motion.div>

        {/* ======================================
            CERTIFICATE STATISTICS
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 30
          }}
          animate={inView ? {
            opacity: 1,
            y: 0
          } : {}}
          transition={{
            duration: 0.7,
            delay: 0.2
          }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-12"
        >

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10">

            <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">

              <Award className="w-6 h-6 text-blue-500" />

            </div>

            <div>

              <p className="text-2xl font-black text-zinc-900 dark:text-white">

                {certificates.length}

              </p>

              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">

                Certificates Displayed

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10">

            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">

              <Layers className="w-6 h-6 text-purple-500" />

            </div>

            <div>

              <p className="text-2xl font-black text-zinc-900 dark:text-white">

                03

              </p>

              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">

                Learning Areas

              </p>

            </div>

          </div>

          <div className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10">

            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center">

              <BadgeCheck className="w-6 h-6 text-emerald-500" />

            </div>

            <div>

              <p className="text-2xl font-black text-zinc-900 dark:text-white">

                Verified

              </p>

              <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">

                Credential Links

              </p>

            </div>

          </div>

        </motion.div>

        {/* ======================================
            CERTIFICATE GRID
        ====================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">

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

        {/* ======================================
            BOTTOM CTA
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={inView ? {
            opacity: 1,
            y: 0
          } : {}}
          transition={{
            duration: 0.8,
            delay: 0.7
          }}
          className="relative mt-24 p-[1px] rounded-[32px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400"
        >

          <div className="relative overflow-hidden rounded-[31px] bg-white dark:bg-[#11111e] p-9 md:p-12 text-center">

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

                <Medal className="w-10 h-10 text-white" />

              </motion.div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">

                <Sparkles className="w-4 h-4 text-blue-500" />

                <span className="text-xs font-bold uppercase tracking-widest text-blue-500">

                  Always Growing

                </span>

              </div>

              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white mb-5">

                Knowledge Is My Greatest Investment.

              </h3>

              <p className="max-w-2xl mx-auto text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">

                I believe in continuous learning, practical experience, and staying curious about new technologies and development opportunities.

              </p>

            </div>

          </div>

        </motion.div>

      </div>

      {/* ======================================
          CERTIFICATE PREVIEW MODAL
      ====================================== */}

      <AnimatePresence>

        {selectedCert && (

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
              className="relative w-full max-w-5xl max-h-[92vh] flex flex-col overflow-hidden rounded-[28px] bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.5)]"
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

                    Certificate Preview

                  </span>

                  <h3 className="text-sm sm:text-lg font-black text-zinc-900 dark:text-white truncate">

                    {selectedCert.title}

                  </h3>

                </div>

                <button
                  onClick={closeModal}
                  aria-label="Close certificate preview"
                  className="w-11 h-11 flex items-center justify-center rounded-xl hover:bg-red-500 hover:text-white transition-all text-zinc-500"
                >

                  <X className="w-6 h-6" />

                </button>

              </div>

              {/* MODAL BODY */}

              <div className="flex-1 overflow-y-auto bg-zinc-100 dark:bg-[#080812] p-5 sm:p-8">

                <div className="max-w-4xl mx-auto">

                  {/* Certificate Image */}

                  <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-blue-500/40 via-purple-500/30 to-cyan-400/40">

                    <div className="rounded-2xl overflow-hidden bg-white dark:bg-zinc-900">

                      <img
                        src={selectedCert.image}
                        alt={selectedCert.title}
                        className="w-full max-h-[65vh] object-contain"
                      />

                    </div>

                  </div>

                  {/* Certificate Details */}

                  <div className="mt-7 p-6 rounded-2xl bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10">

                    <div className="flex items-center gap-3 mb-5">

                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">

                        <Award className="w-6 h-6 text-blue-500" />

                      </div>

                      <div>

                        <h4 className="font-black text-zinc-900 dark:text-white">

                          {selectedCert.title}

                        </h4>

                        <p className="text-sm text-zinc-500">

                          {selectedCert.issuer}

                        </p>

                      </div>

                    </div>

                    <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400 mb-6">

                      {selectedCert.description}

                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.04]">

                        <p className="text-xs text-zinc-500 mb-2">

                          Completion Date

                        </p>

                        <p className="font-bold text-zinc-900 dark:text-white">

                          {selectedCert.date}

                        </p>

                      </div>

                      <div className="p-4 rounded-xl bg-zinc-100 dark:bg-white/[0.04]">

                        <p className="text-xs text-zinc-500 mb-2">

                          Credential ID

                        </p>

                        <p className="font-bold text-zinc-900 dark:text-white break-all">

                          {selectedCert.credentialId}

                        </p>

                      </div>

                    </div>

                    {/* Verification Link */}

                    {selectedCert.link !== '#' && (

                      <a
                        href={selectedCert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 flex items-center justify-center gap-3 w-full px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:scale-[1.02] transition-transform"
                      >

                        <ShieldCheck className="w-5 h-5" />

                        Verify Credential

                        <ExternalLink className="w-4 h-4" />

                      </a>

                    )}

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
