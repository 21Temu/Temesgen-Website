
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';

import {
  Code2,
  Database,
  Globe,
  Layers,
  Terminal,
  Cpu,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Zap,
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Users,
  Lightbulb,
  Clock,
  CheckCircle2,
  ArrowUpRight
} from 'lucide-react';

export default function About() {

  const { t } = useTranslation();

  // ==========================================
  // SCROLL ANIMATION
  // ==========================================

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // ==========================================
  // PROFILE IMAGE
  // ==========================================

  const [avatarUrl, setAvatarUrl] = useState(null);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    let isMounted = true;

    fetch('https://api.github.com/users/21Temu')
      .then((response) => {

        if (!response.ok) {
          throw new Error('Unable to load GitHub profile');
        }

        return response.json();

      })
      .then((data) => {

        if (isMounted && data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }

      })
      .catch((error) => {

        console.error('GitHub avatar error:', error);

      })
      .finally(() => {

        if (isMounted) {
          setIsLoading(false);
        }

      });

    return () => {
      isMounted = false;
    };

  }, []);

  // ==========================================
  // TECHNICAL SKILLS
  // ==========================================

  const skills = [
    {
      name: 'React',
      level: 90,
      icon: Code2,
      color: 'from-cyan-400 to-blue-500',
      description: 'Frontend Development'
    },
    {
      name: 'Vue.js',
      level: 85,
      icon: Layers,
      color: 'from-emerald-400 to-green-500',
      description: 'Frontend Framework'
    },
    {
      name: 'Django / DRF',
      level: 85,
      icon: Database,
      color: 'from-green-400 to-teal-500',
      description: 'Backend Development'
    },
    {
      name: 'Laravel',
      level: 80,
      icon: Terminal,
      color: 'from-red-400 to-orange-500',
      description: 'Backend Framework'
    },
    {
      name: 'UI/UX Design',
      level: 80,
      icon: Sparkles,
      color: 'from-purple-400 to-pink-500',
      description: 'Interface Design'
    }
  ];

  // ==========================================
  // SOFT SKILLS
  // ==========================================

  const softSkills = [
    {
      name: 'Communication',
      icon: Users
    },
    {
      name: 'Teamwork & Collaboration',
      icon: Users
    },
    {
      name: 'Problem Solving',
      icon: Lightbulb
    },
    {
      name: 'Time Management',
      icon: Clock
    },
    {
      name: 'Adaptability',
      icon: Zap
    },
    {
      name: 'Leadership',
      icon: Award
    },
    {
      name: 'Microsoft Word',
      icon: BriefcaseBusiness
    },
    {
      name: 'Microsoft Excel',
      icon: Layers
    },
    {
      name: 'PDF Typing',
      icon: Code2
    },
    {
      name: 'Data Entry',
      icon: Database
    }
  ];

  // ==========================================
  // PROFILE STATISTICS
  // ==========================================

  const statistics = [
    {
      number: '5+',
      label: 'Years Learning',
      icon: GraduationCap
    },
    {
      number: '10+',
      label: 'Projects & Experiments',
      icon: Code2
    },
    {
      number: '5+',
      label: 'Technologies',
      icon: Cpu
    }
  ];

  // ==========================================
  // FLOATING TECHNOLOGY BADGES
  // ==========================================

  const floatingBadges = [
    {
      name: 'React',
      icon: Code2,
      position: '-top-5 -right-3 md:right-0',
      color: 'text-cyan-400',
      delay: 0
    },
    {
      name: 'Python',
      icon: Terminal,
      position: 'top-1/3 -left-8 md:-left-12',
      color: 'text-yellow-400',
      delay: 0.5
    },
    {
      name: 'Database',
      icon: Database,
      position: 'bottom-10 -right-8 md:-right-12',
      color: 'text-emerald-400',
      delay: 1
    }
  ];

  // ==========================================
  // ANIMATION VARIANTS
  // ==========================================

  const fadeUp = {
    hidden: {
      opacity: 0,
      y: 40
    },
    visible: {
      opacity: 1,
      y: 0
    }
  };

  return (

    <section
      id="about"
      className="relative py-28 overflow-hidden bg-zinc-50 dark:bg-[#080812] transition-colors duration-500"
    >

      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        {/* Blue Glow */}

        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-0 -left-40 w-[450px] h-[450px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[130px]"
        />

        {/* Purple Glow */}

        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.2, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-0 -right-40 w-[450px] h-[450px] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[130px]"
        />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.10]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(99,102,241,0.4) 1px, transparent 1px),
              linear-gradient(90deg, rgba(99,102,241,0.4) 1px, transparent 1px)
            `,
            backgroundSize: '55px 55px'
          }}
        />

      </div>

      {/* ======================================
          MAIN CONTAINER
      ====================================== */}

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >

        {/* ==================================
            SECTION HEADING
        ================================== */}

        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={fadeUp}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-20"
        >

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 dark:bg-indigo-500/10 mb-6">

            <Sparkles className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-cyan-300">
              Discover My Journey
            </span>

          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">

            {t('about.title')}

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
              {' '}Me.
            </span>

          </h2>

          <p className="max-w-2xl mx-auto text-zinc-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
            Passionate about technology, creativity, and building digital experiences that solve real-world problems.
          </p>

        </motion.div>

        {/* ======================================
            PROFILE + ABOUT CONTENT
        ====================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

          {/* ==================================
              PROFILE IMAGE CARD
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: -70,
              rotateY: -15
            }}
            animate={inView ? {
              opacity: 1,
              x: 0,
              rotateY: 0
            } : {}}
            transition={{
              duration: 1,
              ease: 'easeOut'
            }}
            className="lg:col-span-5 flex justify-center"
          >

            <div className="relative w-full max-w-[400px]">

              {/* Rotating Outer Ring */}

              <motion.div
                animate={{
                  rotate: 360
                }}
                transition={{
                  duration: 35,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-[-22px] rounded-[45%] border border-dashed border-indigo-400/40 dark:border-cyan-400/30"
              />

              {/* Second Ring */}

              <motion.div
                animate={{
                  rotate: -360
                }}
                transition={{
                  duration: 45,
                  repeat: Infinity,
                  ease: 'linear'
                }}
                className="absolute inset-[-12px] rounded-[45%] border border-purple-400/20"
              />

              {/* Profile Glow */}

              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/20 to-cyan-500/30 rounded-[35px] blur-3xl" />

              {/* Main Profile Card */}

              <motion.div
                animate={{
                  y: [0, -10, 0],
                  rotateX: [0, 2, 0],
                  rotateY: [0, -2, 0]
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="relative z-10 p-3 rounded-[35px] bg-white/70 dark:bg-white/[0.05] backdrop-blur-2xl border border-white dark:border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.15)]"
                style={{
                  transformStyle: 'preserve-3d',
                  perspective: '1000px'
                }}
              >

                {/* Image */}

                <div className="relative aspect-[4/5] overflow-hidden rounded-[27px] bg-zinc-200 dark:bg-zinc-900">

                  {isLoading ? (

                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-zinc-300 to-zinc-100 dark:from-zinc-800 dark:to-zinc-950" />

                  ) : (

                    <img
                      src={avatarUrl || 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&q=80'}
                      alt="Temesgen Minwyelet"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                  )}

                  {/* Image Gradient */}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />

                  {/* Profile Information */}

                  <div className="absolute bottom-0 left-0 right-0 p-7">

                    <div className="flex items-center gap-2 mb-3">

                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                      <span className="text-xs uppercase tracking-[0.2em] font-semibold text-emerald-300">
                        Developer
                      </span>

                    </div>

                    <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
                      Temesgen Minwyelet
                    </h3>

                    <p className="text-sm text-zinc-300">
                      Software Engineer & Full Stack Developer
                    </p>

                    <div className="flex items-center gap-3 mt-5">

                      <a
                        href="https://github.com/21Temu"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub profile"
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        <Github className="w-5 h-5" />
                      </a>

                      <a
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>

                      <a
                        href="#contact"
                        aria-label="Contact me"
                        className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all"
                      >
                        <Mail className="w-5 h-5" />
                      </a>

                    </div>

                  </div>

                </div>

              </motion.div>

              {/* Floating Technology Badges */}

              {floatingBadges.map((badge, index) => {

                const Icon = badge.icon;

                return (

                  <motion.div
                    key={badge.name}
                    initial={{
                      opacity: 0,
                      scale: 0.5
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -12, 0]
                    }}
                    transition={{
                      opacity: {
                        duration: 0.6,
                        delay: badge.delay
                      },
                      scale: {
                        duration: 0.6,
                        delay: badge.delay
                      },
                      y: {
                        duration: 4 + index,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: badge.delay
                      }
                    }}
                    className={`absolute ${badge.position} z-20 flex items-center gap-2 px-4 py-3 rounded-2xl bg-white/90 dark:bg-[#151525]/90 backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-xl`}
                  >

                    <Icon className={`w-5 h-5 ${badge.color}`} />

                    <span className="text-sm font-bold text-zinc-800 dark:text-white">
                      {badge.name}
                    </span>

                  </motion.div>

                );

              })}

            </div>

          </motion.div>

          {/* ==================================
              ABOUT TEXT
          ================================== */}

          <motion.div
            initial={{
              opacity: 0,
              x: 70
            }}
            animate={inView ? {
              opacity: 1,
              x: 0
            } : {}}
            transition={{
              duration: 1,
              delay: 0.2
            }}
            className="lg:col-span-7"
          >

            <div className="mb-10">

              <div className="inline-flex items-center gap-2 text-indigo-500 dark:text-cyan-400 mb-5">

                <Code2 className="w-5 h-5" />

                <span className="text-sm font-bold uppercase tracking-[0.2em]">
                  Who I Am
                </span>

              </div>

              <h3 className="text-3xl md:text-4xl font-black text-zinc-900 dark:text-white leading-tight mb-7">

                Turning Ideas Into

                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
                  Digital Reality.
                </span>

              </h3>

              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-[1.9] mb-6">
                {t('about.story')}
              </p>

              <p className="text-base text-zinc-600 dark:text-zinc-400 leading-[1.9]">
                I enjoy developing modern web applications, creating responsive user interfaces, designing scalable backend systems, and exploring new technologies to improve the way people interact with digital products.
              </p>

            </div>

            {/* ==================================
                STATISTICS
            ================================== */}

            <div className="grid grid-cols-3 gap-3 md:gap-5 mb-10">

              {statistics.map((statistic, index) => {

                const Icon = statistic.icon;

                return (

                  <motion.div
                    key={statistic.label}
                    initial={{
                      opacity: 0,
                      y: 30
                    }}
                    animate={inView ? {
                      opacity: 1,
                      y: 0
                    } : {}}
                    transition={{
                      duration: 0.6,
                      delay: 0.4 + index * 0.15
                    }}
                    whileHover={{
                      y: -7,
                      scale: 1.03
                    }}
                    className="relative overflow-hidden rounded-2xl p-4 md:p-5 bg-white/70 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-xl hover:shadow-indigo-500/10 transition-shadow"
                  >

                    <Icon className="w-5 h-5 text-indigo-500 dark:text-cyan-400 mb-3" />

                    <h4 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white">
                      {statistic.number}
                    </h4>

                    <p className="text-[10px] md:text-xs text-zinc-500 dark:text-zinc-400 mt-2 font-medium">
                      {statistic.label}
                    </p>

                  </motion.div>

                );

              })}

            </div>

            {/* GitHub Button */}

            <motion.a
              href="https://github.com/21Temu"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{
                scale: 1.04,
                x: 5
              }}
              whileTap={{
                scale: 0.97
              }}
              className="inline-flex items-center gap-3 px-6 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow"
            >

              <Github className="w-5 h-5" />

              Explore My GitHub

              <ArrowUpRight className="w-5 h-5" />

            </motion.a>

          </motion.div>

        </div>

        {/* ======================================
            TECHNICAL SKILLS
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
            duration: 0.8,
            delay: 0.4
          }}
          className="mt-32"
        >

          <div className="text-center mb-14">

            <span className="text-sm uppercase tracking-[0.25em] font-bold text-indigo-500 dark:text-cyan-400">
              My Expertise
            </span>

            <h3 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mt-4 mb-5">
              Technical Skills
            </h3>

            <p className="max-w-xl mx-auto text-zinc-500 dark:text-zinc-400">
              Technologies and tools I use to build modern digital solutions.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {skills.map((skill, index) => {

              const Icon = skill.icon;

              return (

                <motion.div
                  key={skill.name}
                  initial={{
                    opacity: 0,
                    y: 40
                  }}
                  animate={inView ? {
                    opacity: 1,
                    y: 0
                  } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.1
                  }}
                  whileHover={{
                    y: -8,
                    scale: 1.02
                  }}
                  className="group relative overflow-hidden p-7 rounded-3xl bg-white/70 dark:bg-white/[0.04] backdrop-blur-xl border border-zinc-200 dark:border-white/10 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
                >

                  {/* Hover Glow */}

                  <div className="absolute -right-20 -top-20 w-48 h-48 rounded-full bg-indigo-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  <div className="relative z-10">

                    <div className="flex items-center justify-between mb-6">

                      <div className={`w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br ${skill.color} shadow-lg`}>

                        <Icon className="w-6 h-6 text-white" />

                      </div>

                      <span className="text-sm font-bold text-zinc-500 dark:text-zinc-400">
                        {skill.level}%
                      </span>

                    </div>

                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                      {skill.name}
                    </h4>

                    <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-7">
                      {skill.description}
                    </p>

                    <div className="h-2 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">

                      <motion.div
                        initial={{
                          width: 0
                        }}
                        animate={inView ? {
                          width: `${skill.level}%`
                        } : {}}
                        transition={{
                          duration: 1.5,
                          delay: 0.7 + index * 0.15,
                          ease: 'easeOut'
                        }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color} shadow-[0_0_12px_rgba(99,102,241,0.4)]`}
                      />

                    </div>

                  </div>

                </motion.div>

              );

            })}

          </div>

        </motion.div>

        {/* ======================================
            SOFT SKILLS
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
            duration: 0.8,
            delay: 0.7
          }}
          className="mt-28"
        >

          <div className="text-center mb-12">

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-5">

              <Sparkles className="w-4 h-4 text-purple-500" />

              <span className="text-xs font-bold uppercase tracking-[0.2em] text-purple-500">
                Beyond Coding
              </span>

            </div>

            <h3 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-5">
              Professional Skills
            </h3>

            <p className="text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
              The personal and professional abilities that help me work effectively and deliver quality results.
            </p>

          </div>

          <div className="flex flex-wrap justify-center gap-4">

            {softSkills.map((skill, index) => {

              const Icon = skill.icon;

              return (

                <motion.div
                  key={skill.name}
                  initial={{
                    opacity: 0,
                    scale: 0.8,
                    y: 20
                  }}
                  animate={inView ? {
                    opacity: 1,
                    scale: 1,
                    y: 0
                  } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.8 + index * 0.05
                  }}
                  whileHover={{
                    scale: 1.08,
                    y: -5
                  }}
                  className="group flex items-center gap-3 px-5 py-4 rounded-2xl bg-white/70 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 backdrop-blur-xl shadow-sm hover:border-indigo-400/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 cursor-default"
                >

                  <Icon className="w-5 h-5 text-indigo-500 dark:text-cyan-400 group-hover:scale-110 transition-transform" />

                  <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 group-hover:text-indigo-500 dark:group-hover:text-white transition-colors">
                    {skill.name}
                  </span>

                  <CheckCircle2 className="w-4 h-4 text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />

                </motion.div>

              );

            })}

          </div>

        </motion.div>

        {/* ======================================
            BOTTOM DECORATIVE LINE
        ====================================== */}

        <motion.div
          initial={{
            scaleX: 0
          }}
          animate={inView ? {
            scaleX: 1
          } : {}}
          transition={{
            duration: 1.5,
            delay: 1
          }}
          className="mt-24 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"
        />

      </div>

    </section>

  );

}
