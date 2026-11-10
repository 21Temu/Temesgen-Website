
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';

import {
  Github,
  Linkedin,
  MessageCircle,
  Send,
  ArrowUp,
  Heart,
  Code2,
  Sparkles,
  ExternalLink
} from 'lucide-react';

// ==========================================
// SOCIAL LINKS
// ==========================================

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    href: 'https://github.com/21Temu',
    color: 'hover:text-white',
    bg: 'hover:bg-zinc-800',
    border: 'hover:border-zinc-600'
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    href: '#',
    color: 'hover:text-blue-500',
    bg: 'hover:bg-blue-500/10',
    border: 'hover:border-blue-500/30'
  },
  {
    name: 'TikTok',
    icon: MessageCircle,
    href: '#',
    color: 'hover:text-pink-500',
    bg: 'hover:bg-pink-500/10',
    border: 'hover:border-pink-500/30'
  },
  {
    name: 'Telegram',
    icon: Send,
    href: 'https://t.me/abu_orthodox',
    color: 'hover:text-sky-500',
    bg: 'hover:bg-sky-500/10',
    border: 'hover:border-sky-500/30'
  }
];

// ==========================================
// MAIN FOOTER
// ==========================================

export default function Footer() {

  const { t } = useTranslation();

  const currentYear = new Date().getFullYear();

  const [showBackToTop, setShowBackToTop] = useState(false);

  // ==========================================
  // SCROLL DETECTION
  // ==========================================

  useEffect(() => {

    const handleScroll = () => {

      setShowBackToTop(window.scrollY > 400);

    };

    window.addEventListener('scroll', handleScroll, {
      passive: true
    });

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  // ==========================================
  // SCROLL TO TOP
  // ==========================================

  const scrollToTop = () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  };

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <footer className="relative overflow-hidden bg-white dark:bg-[#080812] border-t border-zinc-200 dark:border-white/10 transition-colors duration-500">

      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -30, 30, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-48 left-1/4 w-96 h-96 rounded-full bg-blue-500/10 blur-[130px]"
        />

        <motion.div
          animate={{
            x: [0, -40, 30, 0],
            y: [0, 30, -20, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-48 right-1/4 w-96 h-96 rounded-full bg-purple-500/10 blur-[130px]"
        />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)
            `,
            backgroundSize: '45px 45px'
          }}
        />

      </div>

      {/* ======================================
          TOP GRADIENT LINE
      ====================================== */}

      <div className="relative h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-70" />

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-8">

        {/* ======================================
            FOOTER MAIN GRID
        ====================================== */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-14 pb-16">

          {/* BRAND */}

          <div className="space-y-7">

            <a
              href="#home"
              className="inline-flex items-center gap-3 group"
              aria-label="Go to homepage"
            >

              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.08
                }}
                className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-400 flex items-center justify-center shadow-xl shadow-blue-500/20"
              >

                <span className="text-2xl font-black text-white">

                  TM

                </span>

                <div className="absolute inset-0 rounded-2xl bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />

              </motion.div>

              <div>

                <h3 className="text-2xl font-black tracking-tight text-zinc-900 dark:text-white">

                  Temesgen<span className="text-blue-500">.</span>

                </h3>

                <p className="text-xs font-bold tracking-[0.2em] uppercase text-zinc-500">

                  Software Developer

                </p>

              </div>

            </a>

            <p className="max-w-sm text-sm leading-7 text-zinc-600 dark:text-zinc-400">

              Building modern digital experiences with creativity, clean code, and a passion for technology.

            </p>

            <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20">

              <Code2 className="w-4 h-4 text-blue-500" />

              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">

                Turning Ideas Into Code

              </span>

            </div>

          </div>

          {/* QUICK LINKS */}

          <div>

            <div className="flex items-center gap-3 mb-7">

              <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center">

                <Sparkles className="w-5 h-5 text-purple-500" />

              </div>

              <h4 className="text-lg font-black text-zinc-900 dark:text-white">

                Quick Navigation

              </h4>

            </div>

            <div className="grid grid-cols-2 gap-x-5 gap-y-5">

              {[
                { name: 'Home', href: '#home' },
                { name: 'About', href: '#about' },
                { name: 'Projects', href: '#projects' },
                { name: 'Skills', href: '#skills' },
                { name: 'Experience', href: '#experience' },
                { name: 'Certificates', href: '#certificates' },
                { name: 'Services', href: '#services' },
                { name: 'Contact', href: '#contact' }
              ].map((item, index) => (

                <motion.a
                  key={item.name}
                  href={item.href}
                  whileHover={{ x: 5 }}
                  className="flex items-center gap-2 text-sm font-semibold text-zinc-500 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                >

                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />

                  {item.name}

                </motion.a>

              ))}

            </div>

          </div>

          {/* SOCIAL LINKS */}

          <div>

            <div className="flex items-center gap-3 mb-7">

              <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center">

                <MessageCircle className="w-5 h-5 text-blue-500" />

              </div>

              <h4 className="text-lg font-black text-zinc-900 dark:text-white">

                Connect With Me

              </h4>

            </div>

            <p className="text-sm leading-7 text-zinc-500 dark:text-zinc-400 mb-7">

              Follow my work, explore my projects, and connect with me on social platforms.

            </p>

            <div className="flex flex-wrap gap-3">

              {socialLinks.map((link, index) => {

                const Icon = link.icon;

                const isAvailable = link.href !== '#';

                return (

                  <motion.a
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
                    whileHover={isAvailable ? {
                      y: -6,
                      scale: 1.08
                    } : {}}
                    whileTap={isAvailable ? {
                      scale: 0.95
                    } : {}}
                    className={`relative w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-zinc-500 ${link.color} ${link.bg} ${link.border} transition-all duration-300 ${!isAvailable ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >

                    <Icon className="w-5 h-5" />

                    {isAvailable && (

                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 border-2 border-white dark:border-[#080812]" />

                    )}

                  </motion.a>

                );

              })}

            </div>

            <a
              href="#contact"
              className="inline-flex items-center gap-2 mt-8 text-sm font-black text-blue-600 dark:text-blue-400 hover:gap-4 transition-all"
            >

              Let's Work Together

              <ArrowUp className="w-4 h-4 rotate-45" />

            </a>

          </div>

        </div>

        {/* ======================================
            DIVIDER
        ====================================== */}

        <div className="h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-white/15 to-transparent" />

        {/* ======================================
            BOTTOM FOOTER
        ====================================== */}

        <div className="flex flex-col md:flex-row items-center justify-between gap-5 pt-8">

          <div className="text-center md:text-left">

            <p className="text-sm text-zinc-500">

              © {currentYear} <span className="font-black text-zinc-800 dark:text-zinc-200">

                Temesgen Minwyelet

              </span>. {t('footer.rights')}

            </p>

          </div>

          <div className="flex items-center gap-2 text-sm text-zinc-500">

            <span>Designed & Built with</span>

            <motion.span
              animate={{
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity
              }}
            >

              <Heart className="w-4 h-4 text-red-500 fill-red-500" />

            </motion.span>

            <span>and React</span>

          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-zinc-500">

            <span className="w-2 h-2 rounded-full bg-emerald-500" />

            Available Online

          </div>

        </div>

      </div>

      {/* ======================================
          BACK TO TOP BUTTON
      ====================================== */}

      <motion.button
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{
          opacity: showBackToTop ? 1 : 0,
          scale: showBackToTop ? 1 : 0.7,
          pointerEvents: showBackToTop ? 'auto' : 'none'
        }}
        onClick={scrollToTop}
        aria-label="Scroll to top"
        title="Back to top"
        className="fixed bottom-7 right-7 z-40 w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30 hover:shadow-purple-500/40 transition-shadow"
      >

        <ArrowUp className="w-5 h-5" />

      </motion.button>

    </footer>

  );

}
