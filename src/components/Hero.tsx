
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowRight,
  Code2,
  Braces,
  Database,
  Globe,
  Cpu,
  Terminal,
  Sparkles,
  Layers,
  Github,
  Monitor,
  Smartphone,
  Zap
} from 'lucide-react';

export default function Hero() {
  const { t } = useTranslation();

  // ==========================================
  // ROTATING PROFESSIONAL ROLES
  // ==========================================

  const roles = [
    'Software Engineer',
    'Full Stack Developer',
    'Website Developer',
    'App Developer',
    'Problem Solver'
  ];

  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((previousIndex) => {
        return (previousIndex + 1) % roles.length;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ==========================================
  // FLOATING TECHNOLOGY ELEMENTS
  // ==========================================

  const floatingTechnologies = [
    {
      name: 'React',
      icon: Code2,
      position: 'top-12 left-5 md:left-20',
      delay: 0,
      color: 'text-cyan-400'
    },
    {
      name: 'Python',
      icon: Terminal,
      position: 'top-28 right-5 md:right-24',
      delay: 0.5,
      color: 'text-yellow-400'
    },
    {
      name: 'Database',
      icon: Database,
      position: 'bottom-32 left-5 md:left-24',
      delay: 1,
      color: 'text-emerald-400'
    },
    {
      name: 'Web',
      icon: Globe,
      position: 'bottom-20 right-5 md:right-20',
      delay: 1.5,
      color: 'text-purple-400'
    }
  ];

  // ==========================================
  // MAIN HERO SECTION
  // ==========================================

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050510] pt-24 pb-20"
    >

      {/* ======================================
          BACKGROUND ATMOSPHERE
      ====================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        {/* Main Blue Glow */}

        <motion.div
          animate={{
            x: [0, 70, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[140px]"
        />

        {/* Purple Glow */}

        <motion.div
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.8, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600/20 blur-[140px]"
        />

        {/* Pink Glow */}

        <motion.div
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -60, 30, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-pink-600/10 blur-[150px]"
        />

        {/* Grid Background */}

        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
            maskImage: 'radial-gradient(ellipse at center, black 20%, transparent 80%)'
          }}
        />

        {/* Small Background Stars */}

        {[...Array(35)].map((_, index) => (
          <motion.div
            key={index}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [0.7, 1.5, 0.7]
            }}
            transition={{
              duration: 2 + (index % 4),
              repeat: Infinity,
              delay: index * 0.15
            }}
            className="absolute w-1 h-1 bg-white rounded-full"
            style={{
              left: `${(index * 37) % 100}%`,
              top: `${(index * 53) % 100}%`
            }}
          />
        ))}
      </div>

      {/* ======================================
          FLOATING TECHNOLOGY CARDS
      ====================================== */}

      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none hidden md:block">

        {floatingTechnologies.map((technology, index) => {
          const Icon = technology.icon;

          return (
            <motion.div
              key={technology.name}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -18, 0]
              }}
              transition={{
                opacity: { duration: 0.8, delay: technology.delay },
                scale: { duration: 0.8, delay: technology.delay },
                y: {
                  duration: 4 + index,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: technology.delay
                }
              }}
              className={`absolute ${technology.position} z-10`}
            >
              <div className="group flex items-center gap-3 px-5 py-4 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_35px_rgba(99,102,241,0.08)] hover:border-indigo-400/40 transition-all duration-500">

                <Icon
                  className={`w-6 h-6 ${technology.color}`}
                />

                <span className="text-sm font-semibold text-white/80">
                  {technology.name}
                </span>

              </div>
            </motion.div>
          );
        })}

      </div>

      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <div className="relative z-20 w-full max-w-7xl mx-auto px-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 50
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 1,
            ease: 'easeOut'
          }}
          className="max-w-5xl mx-auto text-center"
        >

          {/* Availability Badge */}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 mb-10 rounded-full border border-emerald-400/20 bg-emerald-400/[0.07] backdrop-blur-xl"
          >

            <span className="relative flex h-2.5 w-2.5">

              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />

              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />

            </span>

            <span className="text-sm font-medium text-emerald-300 tracking-wide">
              Available for Opportunities
            </span>

            <Sparkles className="w-4 h-4 text-emerald-300" />

          </motion.div>

          {/* Greeting */}

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-2xl font-medium text-zinc-400 mb-5 tracking-[0.2em] uppercase"
          >
            {t('hero.greeting')}
          </motion.h2>

          {/* Main Name */}

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
              filter: 'blur(15px)'
            }}
            animate={{
              opacity: 1,
              scale: 1,
              filter: 'blur(0px)'
            }}
            transition={{
              duration: 1.2,
              delay: 0.5
            }}
            className="relative mb-8"
          >

            <h1 className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-tight">

              <span
                className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-500"
                style={{
                  textShadow: '0 0 60px rgba(99,102,241,0.25)'
                }}
              >
                {t('hero.name')}
              </span>

            </h1>

            {/* Decorative Underline */}

            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '180px' }}
              transition={{
                delay: 1.2,
                duration: 1
              }}
              className="h-1 mx-auto mt-5 rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 shadow-[0_0_20px_rgba(99,102,241,0.8)]"
            />

          </motion.div>

          {/* ==================================
              ANIMATED ROLE
          ================================== */}

          <div className="h-16 md:h-20 flex items-center justify-center mb-7">

            <AnimatePresence mode="wait">

              <motion.h3
                key={roleIndex}
                initial={{
                  opacity: 0,
                  y: 30,
                  rotateX: -45,
                  filter: 'blur(10px)'
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  rotateX: 0,
                  filter: 'blur(0px)'
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  rotateX: 45,
                  filter: 'blur(10px)'
                }}
                transition={{
                  duration: 0.6,
                  ease: 'easeInOut'
                }}
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-white"
              >

                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-400">
                  {roles[roleIndex]}
                </span>

              </motion.h3>

            </AnimatePresence>

          </div>

          {/* Description */}

          <motion.p
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 0.8,
              duration: 0.8
            }}
            className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-zinc-400 leading-relaxed mb-12"
          >
            {t('hero.description')}
          </motion.p>

          {/* ==================================
              ACTION BUTTONS
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 1,
              duration: 0.8
            }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5"
          >

            {/* Hire Me */}

            <motion.a
              href="#contact"
              whileHover={{
                scale: 1.07,
                y: -5
              }}
              whileTap={{
                scale: 0.95
              }}
              className="group relative inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-[0_0_35px_rgba(79,70,229,0.4)] hover:shadow-[0_0_55px_rgba(79,70,229,0.7)] transition-shadow duration-500"
            >

              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <span className="relative flex items-center gap-3">
                {t('hero.hireMe')}

                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </span>

            </motion.a>

            {/* View Projects */}

            <motion.a
              href="#projects"
              whileHover={{
                scale: 1.07,
                y: -5
              }}
              whileTap={{
                scale: 0.95
              }}
              className="group inline-flex items-center justify-center gap-3 px-9 py-4 rounded-full border border-white/15 bg-white/[0.04] backdrop-blur-xl text-white font-bold text-lg hover:border-indigo-400/60 hover:bg-indigo-500/10 transition-all duration-300"
            >

              <Layers className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />

              {t('hero.viewProjects')}

            </motion.a>

          </motion.div>

          {/* ==================================
              TECHNOLOGY STACK
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              delay: 1.3,
              duration: 1
            }}
            className="mt-20"
          >

            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500 font-semibold mb-7">
              Technologies I Work With
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-7">

              {[
                { name: 'React', icon: Code2 },
                { name: 'Python', icon: Terminal },
                { name: 'Database', icon: Database },
                { name: 'JavaScript', icon: Braces },
                { name: 'AI', icon: Cpu },
                { name: 'Mobile', icon: Smartphone }
              ].map((technology, index) => {

                const Icon = technology.icon;

                return (
                  <motion.div
                    key={technology.name}
                    whileHover={{
                      y: -8,
                      scale: 1.12
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 300
                    }}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-300"
                  >

                    <Icon
                      className="w-4 h-4 text-indigo-400"
                    />

                    <span className="text-sm font-medium">
                      {technology.name}
                    </span>

                  </motion.div>
                );
              })}

            </div>

          </motion.div>

        </motion.div>

      </div>

      {/* ======================================
          BOTTOM SCROLL INDICATOR
      ====================================== */}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >

        <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">
          Scroll to explore
        </span>

        <motion.div
          animate={{
            y: [0, 10, 0]
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >

          <motion.div
            animate={{
              opacity: [1, 0.2, 1]
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity
            }}
            className="w-1 h-2 rounded-full bg-cyan-400"
          />

        </motion.div>

      </motion.div>

    </section>
  );
}
