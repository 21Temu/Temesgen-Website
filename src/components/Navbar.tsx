
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  Moon,
  Sun,
  Globe,
  Menu,
  X,
  Code2,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { cn } from '../lib/utils';

export default function Navbar() {

  const { t, i18n } = useTranslation();

  // ==========================================
  // NAVBAR STATES
  // ==========================================

  const [isScrolled, setIsScrolled] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [activeSection, setActiveSection] = useState('home');

  const [isDark, setIsDark] = useState(() => {

    if (typeof window !== 'undefined') {

      const savedTheme = localStorage.getItem('theme');

      if (savedTheme) {
        return savedTheme === 'dark';
      }

      return window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;

    }

    return true;

  });

  // ==========================================
  // NAVIGATION LINKS
  // ==========================================

  const navLinks = [
    {
      name: t('nav.about'),
      href: '#about',
      id: 'about'
    },
    {
      name: t('nav.projects'),
      href: '#projects',
      id: 'projects'
    },
    {
      name: t('nav.experience'),
      href: '#experience',
      id: 'experience'
    },
    {
      name: 'Certificates',
      href: '#certificates',
      id: 'certificates'
    },
    {
      name: t('nav.services'),
      href: '#services',
      id: 'services'
    },
    {
      name: t('nav.contact'),
      href: '#contact',
      id: 'contact'
    }
  ];

  // ==========================================
  // SCROLL DETECTION
  // ==========================================

  useEffect(() => {

    const handleScroll = () => {

      setIsScrolled(window.scrollY > 30);

      const sections = navLinks
        .map((link) => document.getElementById(link.id))
        .filter(Boolean);

      let currentSection = 'home';

      sections.forEach((section) => {

        const sectionTop = section.offsetTop - 180;

        if (window.scrollY >= sectionTop) {
          currentSection = section.id;
        }

      });

      setActiveSection(currentSection);

    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, []);

  // ==========================================
  // THEME MANAGEMENT
  // ==========================================

  useEffect(() => {

    if (isDark) {

      document.documentElement.classList.add('dark');

      localStorage.setItem('theme', 'dark');

    } else {

      document.documentElement.classList.remove('dark');

      localStorage.setItem('theme', 'light');

    }

  }, [isDark]);

  const toggleTheme = () => {

    setIsDark((previousTheme) => !previousTheme);

  };

  // ==========================================
  // LANGUAGE MANAGEMENT
  // ==========================================

  const toggleLanguage = () => {

    const newLanguage = i18n.language.startsWith('en')
      ? 'am'
      : 'en';

    i18n.changeLanguage(newLanguage);

  };

  // ==========================================
  // MOBILE MENU MANAGEMENT
  // ==========================================

  const closeMobileMenu = () => {

    setIsMenuOpen(false);

  };

  // ==========================================
  // NAVIGATION LINK COMPONENT
  // ==========================================

  const NavigationLinks = ({ mobile = false }) => {

    return (

      <div
        className={cn(
          mobile
            ? 'flex flex-col gap-2'
            : 'hidden lg:flex items-center gap-1'
        )}
      >

        {navLinks.map((link, index) => {

          const isActive = activeSection === link.id;

          return (

            <motion.a
              key={link.id}
              href={link.href}
              onClick={closeMobileMenu}
              initial={mobile ? { opacity: 0, x: -15 } : false}
              animate={mobile ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.3,
                delay: mobile ? index * 0.06 : 0
              }}
              whileHover={{
                y: mobile ? 0 : -2
              }}
              className={cn(
                'relative group flex items-center',
                'font-medium transition-all duration-300',
                mobile
                  ? 'px-5 py-4 rounded-xl text-base'
                  : 'px-3 py-2 rounded-full text-[13px] xl:text-sm',
                isActive
                  ? 'text-indigo-500 dark:text-cyan-300'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-500 dark:hover:text-white',
                mobile && isActive
                  ? 'bg-indigo-500/10 dark:bg-indigo-400/10'
                  : 'hover:bg-zinc-100 dark:hover:bg-white/[0.05]'
              )}
            >

              {mobile && (
                <span
                  className={cn(
                    'w-1.5 h-1.5 rounded-full mr-3',
                    isActive
                      ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.8)]'
                      : 'bg-zinc-400 dark:bg-zinc-600'
                  )}
                />
              )}

              {link.name}

              {/* Active Indicator */}

              {!mobile && isActive && (

                <motion.span
                  layoutId="navbar-active-indicator"
                  className="absolute -bottom-1 left-3 right-3 h-[2px] rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.7)]"
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30
                  }}
                />

              )}

              {/* Hover Indicator */}

              {!mobile && (

                <span
                  className={cn(
                    'absolute inset-0 rounded-full -z-10',
                    'bg-gradient-to-r from-blue-500/10 to-purple-500/10',
                    'opacity-0 group-hover:opacity-100 transition-opacity duration-300',
                    isActive && 'opacity-100'
                  )}
                />

              )}

              {mobile && (

                <ChevronRight
                  className="w-4 h-4 ml-auto opacity-40"
                />

              )}

            </motion.a>

          );

        })}

      </div>

    );

  };

  // ==========================================
  // THEME BUTTON
  // ==========================================

  const ThemeButton = ({ mobile = false }) => {

    return (

      <motion.button
        type="button"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleTheme}
        aria-label="Toggle color theme"
        className={cn(
          'relative flex items-center justify-center',
          'rounded-full transition-all duration-300',
          'border border-zinc-200 dark:border-white/10',
          'bg-zinc-100 dark:bg-white/[0.05]',
          'hover:bg-indigo-500/10 dark:hover:bg-indigo-400/10',
          'hover:border-indigo-400/40',
          mobile ? 'w-11 h-11' : 'w-10 h-10'
        )}
      >

        <AnimatePresence mode="wait">

          <motion.span
            key={isDark ? 'sun' : 'moon'}
            initial={{
              opacity: 0,
              rotate: -90,
              scale: 0.5
            }}
            animate={{
              opacity: 1,
              rotate: 0,
              scale: 1
            }}
            exit={{
              opacity: 0,
              rotate: 90,
              scale: 0.5
            }}
            transition={{
              duration: 0.25
            }}
          >

            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-500" />
            )}

          </motion.span>

        </AnimatePresence>

      </motion.button>

    );

  };

  // ==========================================
  // LANGUAGE BUTTON
  // ==========================================

  const LanguageButton = ({ mobile = false }) => {

    return (

      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={toggleLanguage}
        aria-label="Change website language"
        className={cn(
          'flex items-center justify-center gap-2',
          'rounded-full font-semibold transition-all duration-300',
          'border border-zinc-200 dark:border-white/10',
          'bg-zinc-100 dark:bg-white/[0.05]',
          'text-zinc-700 dark:text-zinc-300',
          'hover:text-indigo-500 dark:hover:text-cyan-300',
          'hover:border-indigo-400/40',
          mobile
            ? 'px-4 h-11 text-sm'
            : 'px-4 h-10 text-xs'
        )}
      >

        <Globe className="w-4 h-4" />

        <span>
          {i18n.language.startsWith('en') ? 'አማ' : 'EN'}
        </span>

      </motion.button>

    );

  };

  // ==========================================
  // NAVBAR RENDER
  // ==========================================

  return (

    <>

      <motion.nav
        initial={{
          y: -100,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1]
        }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-500',
          isScrolled
            ? 'py-3'
            : 'py-5'
        )}
      >

        {/* ==================================
            FLOATING NAVBAR CONTAINER
        ================================== */}

        <div
          className={cn(
            'relative max-w-7xl mx-auto px-4 sm:px-6',
            'transition-all duration-500'
          )}
        >

          <div
            className={cn(
              'relative flex items-center justify-between',
              'rounded-2xl px-4 md:px-6',
              'transition-all duration-500',
              isScrolled
                ? 'py-3 bg-white/80 dark:bg-[#090914]/85 backdrop-blur-2xl border border-zinc-200/80 dark:border-white/10 shadow-[0_10px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_10px_50px_rgba(0,0,0,0.35)]'
                : 'py-2 bg-white/40 dark:bg-white/[0.02] backdrop-blur-md border border-white/10 dark:border-white/[0.04]'
            )}
          >

            {/* ==================================
                LOGO
            ================================== */}

            <motion.a
              href="#home"
              onClick={closeMobileMenu}
              whileHover={{
                scale: 1.05
              }}
              whileTap={{
                scale: 0.95
              }}
              className="relative flex items-center gap-3 shrink-0"
            >

              {/* Logo Icon */}

              <div className="relative flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 shadow-[0_0_25px_rgba(99,102,241,0.3)]">

                <Code2 className="w-6 h-6 text-white" />

                <motion.div
                  animate={{
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity
                  }}
                  className="absolute inset-0 rounded-xl border border-cyan-300/50"
                />

              </div>

              {/* Logo Text */}

              <div className="flex flex-col">

                <span className="text-xl md:text-2xl font-black tracking-tighter text-zinc-900 dark:text-white leading-none">

                  TM<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">.</span>

                </span>

                <span className="hidden sm:block text-[9px] uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-500 font-semibold mt-1">

                  Developer Portfolio

                </span>

              </div>

            </motion.a>

            {/* ==================================
                DESKTOP NAVIGATION
            ================================== */}

            <NavigationLinks />

            {/* ==================================
                DESKTOP ACTIONS
            ================================== */}

            <div className="hidden md:flex items-center gap-3">

              <div className="flex items-center gap-2 pr-3 border-r border-zinc-200 dark:border-white/10">

                <LanguageButton />

                <ThemeButton />

              </div>

              {/* Let's Talk Button */}

              <motion.a
                href="#contact"
                whileHover={{
                  scale: 1.05,
                  y: -2
                }}
                whileTap={{
                  scale: 0.95
                }}
                className="relative group flex items-center gap-2 px-5 py-3 rounded-xl overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold text-sm shadow-[0_0_20px_rgba(79,70,229,0.25)] hover:shadow-[0_0_35px_rgba(79,70,229,0.5)] transition-shadow duration-300"
              >

                <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <span className="relative flex items-center gap-2">

                  <Sparkles className="w-4 h-4" />

                  Let's Talk

                </span>

              </motion.a>

            </div>

            {/* ==================================
                MOBILE ACTIONS
            ================================== */}

            <div className="flex md:hidden items-center gap-2">

              <LanguageButton mobile />

              <ThemeButton mobile />

              <motion.button
                type="button"
                whileTap={{
                  scale: 0.9
                }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isMenuOpen}
                className="relative flex items-center justify-center w-11 h-11 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-100 dark:bg-white/[0.05] text-zinc-800 dark:text-white hover:border-indigo-400/50 transition-all"
              >

                <AnimatePresence mode="wait">

                  <motion.span
                    key={isMenuOpen ? 'close' : 'menu'}
                    initial={{
                      opacity: 0,
                      rotate: -90,
                      scale: 0.5
                    }}
                    animate={{
                      opacity: 1,
                      rotate: 0,
                      scale: 1
                    }}
                    exit={{
                      opacity: 0,
                      rotate: 90,
                      scale: 0.5
                    }}
                    transition={{
                      duration: 0.2
                    }}
                  >

                    {isMenuOpen ? (
                      <X className="w-5 h-5" />
                    ) : (
                      <Menu className="w-5 h-5" />
                    )}

                  </motion.span>

                </AnimatePresence>

              </motion.button>

            </div>

          </div>

          {/* ==================================
              MOBILE NAVIGATION DROPDOWN
          ================================== */}

          <AnimatePresence>

            {isMenuOpen && (

              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -15
                }}
                animate={{
                  opacity: 1,
                  height: 'auto',
                  y: 0
                }}
                exit={{
                  opacity: 0,
                  height: 0,
                  y: -15
                }}
                transition={{
                  duration: 0.35,
                  ease: 'easeInOut'
                }}
                className="md:hidden overflow-hidden"
              >

                <div className="mt-3 p-4 rounded-2xl bg-white/95 dark:bg-[#090914]/95 backdrop-blur-2xl border border-zinc-200 dark:border-white/10 shadow-2xl">

                  {/* Mobile Header */}

                  <div className="flex items-center justify-between px-4 py-3 mb-3 border-b border-zinc-200 dark:border-white/10">

                    <div className="flex items-center gap-2">

                      <Sparkles className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />

                      <span className="text-xs uppercase tracking-[0.2em] font-bold text-zinc-500 dark:text-zinc-400">

                        Navigation

                      </span>

                    </div>

                    <span className="text-xs text-zinc-400">

                      Explore Portfolio

                    </span>

                  </div>

                  {/* Mobile Links */}

                  <NavigationLinks mobile />

                  {/* Mobile Contact Button */}

                  <motion.a
                    href="#contact"
                    onClick={closeMobileMenu}
                    whileTap={{
                      scale: 0.97
                    }}
                    className="mt-4 flex items-center justify-center gap-3 w-full py-4 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/20"
                  >

                    <Sparkles className="w-4 h-4" />

                    Let's Talk

                    <ChevronRight className="w-4 h-4" />

                  </motion.a>

                  {/* Mobile Footer */}

                  <div className="flex items-center justify-center gap-2 mt-5 pt-4 border-t border-zinc-200 dark:border-white/10">

                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                    <span className="text-xs text-zinc-500 dark:text-zinc-400">

                      Welcome to my portfolio

                    </span>

                  </div>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

        </div>

      </motion.nav>

    </>

  );

}
