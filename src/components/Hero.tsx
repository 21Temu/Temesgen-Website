import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';
import {
  ArrowRight,
  Code2,
  Braces,
  Database,
  Cpu,
  Terminal,
  Sparkles,
  Layers,
  Smartphone,
  ShieldCheck,
  Activity,
  GitBranch,
  ArrowUpRight
} from 'lucide-react';
import ecommerceImg from '../ecommerce.png';

export default function Hero() {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement | null>(null);
  const [imgError, setImgError] = useState(false);

  const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'Security-Minded Builder',
    'Website Developer',
    'App Developer'
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [roles.length]);

  // 3D pointer parallax (-0.5 to 0.5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 130, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 130, damping: 22 });

  const gridRotateX = useTransform(smoothY, [-0.5, 0.5], [68, 56]);
  const gridRotateZ = useTransform(smoothX, [-0.5, 0.5], [-9, 9]);
  const gridPanX = useTransform(smoothX, [-0.5, 0.5], [-36, 36]);
  const gridPanY = useTransform(smoothY, [-0.5, 0.5], [-28, 28]);

  const stageRotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const stageRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

  const layerBackX = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const layerBackY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
  const layerFrontX = useTransform(smoothX, [-0.5, 0.5], [38, -38]);
  const layerFrontY = useTransform(smoothY, [-0.5, 0.5], [32, -32]);

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
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

  const stackItems = [
    { name: 'React', icon: Code2 },
    { name: 'Python', icon: Terminal },
    { name: 'Database', icon: Database },
    { name: 'JavaScript', icon: Braces },
    { name: 'AI', icon: Cpu },
    { name: 'Mobile', icon: Smartphone }
  ];

  const telemetryLines = [
    '0xA4F9  init session --tls1.3 --strict',
    '101100  audit ./auth/token-rotator.ts -> OK',
    '0x7C21  build dist/ecommerce-bundle.js [0 err]'
  ];

  return (
    <section
      ref={containerRef}
      id="home"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: '1300px' }}
      className="relative min-h-screen bg-white text-slate-900 pt-24 pb-16 overflow-hidden"
    >
      {/* ======================================
          3D DEVELOPER & HACKER BACKGROUND
      ====================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Depth Glows */}
        <motion.div
          style={{ x: layerBackX, y: layerBackY }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-28 left-[18%] w-[460px] h-[460px] rounded-full bg-indigo-200/40 blur-[120px]"
        />
        <motion.div
          style={{ x: layerFrontX, y: layerFrontY }}
          animate={{ scale: [1.08, 0.94, 1.08] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-[10%] w-[440px] h-[440px] rounded-full bg-emerald-200/35 blur-[120px]"
        />

        {/* 3D Perspective Grid Plane */}
        <div
          className="absolute inset-x-0 bottom-[-28%] h-[76%] flex items-center justify-center"
          style={{
            perspective: '900px',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)'
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
            className="w-[175%] h-[175%] border-t border-indigo-300/70"
            ref={(el) => {
              if (el) {
                el.style.backgroundImage =
                  'linear-gradient(to right, rgba(79, 70, 229, 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.14) 1px, transparent 1px)';
                el.style.backgroundSize = '56px 56px';
              }
            }}
          />
        </div>

        {/* 3D Floating Wireframe Cube & Node Ring */}
        <motion.div
          style={{ x: layerFrontX, y: layerFrontY, transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: [20, 45, 20],
            rotateY: [0, 180, 360],
            y: [0, -12, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:flex items-center justify-center absolute top-24 right-[8%] w-16 h-16 rounded-2xl border border-indigo-300/80 bg-white/80 font-mono text-[10px] font-semibold text-indigo-600 shadow-xs"
        >
          0xDEV
        </motion.div>

        <motion.div
          style={{ x: layerBackX, y: layerBackY, transformStyle: 'preserve-3d' }}
          animate={{ rotateZ: [0, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="hidden lg:block absolute bottom-28 left-[6%] w-20 h-20 rounded-full border border-dashed border-emerald-500/45"
        />

        {/* Floating Hacker / Dev Log Fragments */}
        <motion.div
          style={{ x: layerBackX, y: layerBackY }}
          className="hidden xl:flex flex-col gap-2.5 absolute top-28 left-[42%] font-mono text-[11px] text-slate-600/80"
        >
          {telemetryLines.map((entry, idx) => (
            <motion.div
              key={entry}
              animate={{ opacity: [0.4, 0.9, 0.4], y: [0, -4, 0] }}
              transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
              className="px-3 py-1 rounded-md bg-white/80 border border-slate-200/80 shadow-2xs"
            >
              {entry}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ======================================
          NEW ASYMMETRIC BENTO HERO LAYOUT
      ====================================== */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 space-y-8">
        {/* Top Row: Identity & Role (Left) + 3D Visual Stage with src/ecommerce.png (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Identity Block */}
          <div className="lg:col-span-6 flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/85 backdrop-blur-md p-7 sm:p-10 shadow-xs">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 text-xs font-semibold">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                  </span>
                  Available for Opportunities
                  <Sparkles className="w-3.5 h-3.5" />
                </span>

                <span className="font-mono text-xs text-slate-500">
                  SYS // v2.6
                </span>
              </div>

              <p className="font-mono text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-indigo-600 mb-2">
                {t('hero.greeting')}
              </p>

              <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-slate-900 leading-[1.04] mb-4">
                {t('hero.name')}
              </h1>

              {/* Rotating Role */}
              <div className="h-11 sm:h-12 flex items-center mb-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={roles[roleIndex]}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.3, ease: 'easeOut' }}
                    className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-mono text-sm sm:text-base font-semibold"
                  >
                    <Terminal className="w-4 h-4 text-emerald-400" />
                    <span>{roles[roleIndex]}</span>
                  </motion.div>
                </AnimatePresence>
              </div>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed mb-8">
                {t('hero.description')}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#contact"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-indigo-600 text-white font-semibold text-sm sm:text-base shadow-sm hover:bg-indigo-700 transition-colors"
              >
                <span>{t('hero.hireMe')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-semibold text-sm sm:text-base hover:bg-slate-50 transition-colors"
              >
                <Layers className="w-4 h-4 text-indigo-600" />
                <span>{t('hero.viewProjects')}</span>
              </a>
            </div>
          </div>

          {/* Right 3D Stage Featuring src/ecommerce.png */}
          <div className="lg:col-span-6 flex" style={{ perspective: '1100px' }}>
            <motion.div
              style={{
                rotateX: stageRotateX,
                rotateY: stageRotateY,
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.15 }}
              className="w-full flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-5 sm:p-6 shadow-lg"
            >
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-slate-700">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>src/ecommerce.png</span>
                </div>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 hover:text-indigo-700"
                >
                  <span>Inspect</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="relative flex-1 min-h-[260px] sm:min-h-[320px] w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/80">
                {!imgError ? (
                  <img
                    src={ecommerceImg}
                    alt="E-commerce application preview"
                    onError={() => setImgError(true)}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center text-slate-500 p-6 text-center">
                    <Layers className="w-8 h-8 text-indigo-600 mb-2" />
                    <p className="text-sm font-semibold text-slate-800">
                      src/ecommerce.png
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Verify file exists at src/ecommerce.png
                    </p>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-mono text-slate-600">
                <span className="inline-flex items-center gap-1.5">
                  <GitBranch className="w-3.5 h-3.5 text-indigo-600" />
                  main · production-ready
                </span>
                <span className="text-emerald-700 font-semibold">
                  ● VERIFIED BUILD
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bento Strip: Tech Stack + Engineering & Security Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-7 rounded-2xl border border-slate-200/90 bg-white/85 backdrop-blur-md p-5 sm:p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Core Tech Stack
              </span>
              <span className="font-mono text-[11px] text-indigo-600">
                FULL-STACK & SYSTEMS
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {stackItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.name}
                    className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-50/90 border border-slate-200/75 text-slate-800 text-xs sm:text-sm font-semibold"
                  >
                    <Icon className="w-4 h-4 text-indigo-600 shrink-0" />
                    <span>{item.name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-5 rounded-2xl border border-slate-200/90 bg-white/85 backdrop-blur-md p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Engineering Mindset
              </span>
              <Activity className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Building resilient web and mobile architectures with clean APIs,
              structured data models, and security-first execution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}