import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react';
import {
  Github,
  Linkedin,
  MessageCircle,
  Send,
  ArrowUp,
  Code2,
  Sparkles
} from 'lucide-react';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/21Temu'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: '#'
  },
  {
    name: 'TikTok',
    icon: MessageCircle,
    href: '#'
  },
  {
    name: 'Telegram',
    icon: Send,
    href: 'https://t.me/abu_orthodox'
  }
];

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Services', href: '#services' },
  { name: 'Contact', href: '#contact' }
];

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const footerRef = useRef<HTMLElement | null>(null);

  const [showBackToTop, setShowBackToTop] = useState(false);

  // 3D software background parallax (-0.5 to 0.5)
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 120, damping: 22 });
  const smoothY = useSpring(pointerY, { stiffness: 120, damping: 22 });

  const gridRotateX = useTransform(smoothY, [-0.5, 0.5], [66, 56]);
  const gridRotateZ = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const gridPanX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const gridPanY = useTransform(smoothY, [-0.5, 0.5], [-22, 22]);

  const depthBackX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const depthBackY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);
  const depthFrontX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const depthFrontY = useTransform(smoothY, [-0.5, 0.5], [24, -24]);

  const handlePointerMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = footerRef.current?.getBoundingClientRect();
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
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLogs = [
    '0xF01  session.footer [ACTIVE]',
    '10101  build: react · vite · ts'
  ];

  return (
    <footer
      ref={footerRef}
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: '1250px' }}
      className="relative overflow-hidden bg-white text-slate-900 border-t border-slate-200/80"
    >
      {/* ======================================
          SOFTWARE 3D ANIMATED BACKGROUND
      ====================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 left-[15%] w-[360px] h-[360px] rounded-full bg-indigo-200/30 blur-[110px]"
        />
        <motion.div
          style={{ x: depthFrontX, y: depthFrontY }}
          animate={{ scale: [1.06, 0.96, 1.06] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-0 right-[12%] w-[340px] h-[340px] rounded-full bg-emerald-200/25 blur-[110px]"
        />

        {/* 3D Perspective Grid */}
        <div
          className="absolute inset-x-0 bottom-[-30%] h-[80%] flex items-center justify-center"
          style={{
            perspective: '900px',
            maskImage:
              'linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.12) 60%, transparent 100%)'
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
            animate={{ backgroundPosition: ['0px 0px', '0px 48px'] }}
            transition={{
              backgroundPosition: { duration: 3.8, repeat: Infinity, ease: 'linear' }
            }}
            className="w-[175%] h-[175%] border-t border-indigo-200/75"
            ref={(el) => {
              if (el) {
                el.style.backgroundImage =
                  'linear-gradient(to right, rgba(79, 70, 229, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.1) 1px, transparent 1px)';
                el.style.backgroundSize = '48px 48px';
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
            y: [0, -8, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="hidden md:flex items-center justify-center absolute top-8 right-[6%] w-11 h-11 rounded-xl border border-indigo-300/80 bg-white/85 font-mono text-[9px] font-semibold text-indigo-600 shadow-2xs"
        >
          0xFTR
        </motion.div>

        {/* Software Telemetry Streams */}
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          className="hidden xl:flex flex-col gap-1.5 absolute top-10 right-[22%] font-mono text-[10px] text-slate-600/80"
        >
          {footerLogs.map((line, idx) => (
            <motion.div
              key={line}
              animate={{ opacity: [0.4, 0.85, 0.4], x: [0, -5, 0] }}
              transition={{ duration: 4 + idx, repeat: Infinity, ease: 'easeInOut' }}
              className="px-2.5 py-0.5 rounded-md bg-white/85 border border-slate-200/80 shadow-2xs"
            >
              {line}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ======================================
          COMPACT FOOTER CONTENT
      ====================================== */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-9">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-3.5">
            <a
              href="#home"
              className="inline-flex items-center gap-3 group"
              aria-label="Go to homepage"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-indigo-600 text-white flex items-center justify-center font-mono text-sm font-black transition-colors">
                TM
              </div>
              <div>
                <p className="text-lg font-black tracking-tight text-slate-900 leading-none">
                  Temesgen<span className="text-indigo-600">.</span>
                </p>
                <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                  Software Developer
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-xs">
              Building clean, responsive web applications and reliable backend systems.
            </p>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 font-mono text-[11px] font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>Turning Ideas Into Code</span>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="md:col-span-4">
            <div className="flex items-center gap-2 mb-3.5">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800">
                Quick Navigation
              </h4>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-xs sm:text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Connect Column */}
          <div className="md:col-span-4">
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-800 mb-3.5">
              Connect With Me
            </h4>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
              Explore repositories, updates, and direct channels.
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                const isAvailable = link.href !== '#';

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target={isAvailable ? '_blank' : undefined}
                    rel={isAvailable ? 'noopener noreferrer' : undefined}
                    aria-label={link.name}
                    title={link.name}
                    onClick={(event) => {
                      if (!isAvailable) {
                        event.preventDefault();
                      }
                    }}
                    className={`w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 transition-colors ${
                      isAvailable
                        ? 'hover:border-indigo-600 hover:bg-indigo-600 hover:text-white'
                        : 'opacity-45 cursor-not-allowed'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-5 border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>
            © {currentYear}{' '}
            <span className="font-bold text-slate-800">Temesgen Minwyelet</span>.{' '}
            {t('footer.rights')}
          </p>

          <p className="font-mono text-[11px]">Built with React &amp; Tailwind CSS</p>

          <span className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-emerald-700">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>Available Online</span>
          </span>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.8,
          pointerEvents: showBackToTop ? 'auto' : 'none'
        }}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
        className="fixed bottom-6 right-6 z-40 w-10 h-10 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white flex items-center justify-center shadow-lg transition-colors"
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </footer>
  );
}