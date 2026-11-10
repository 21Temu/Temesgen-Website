
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';

import {
  Briefcase,
  GraduationCap,
  Code2,
  Rocket,
  Sparkles,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  ChevronDown,
  Terminal,
  Laptop,
  Layers,
  Award
} from 'lucide-react';

// ==========================================
// EXPERIENCE INTERFACE
// ==========================================

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  date: string;
  type: string;
  description: string;
  details: string[];
  icon: typeof Briefcase;
  color: string;
  category: 'education' | 'experience' | 'development';
  current?: boolean;
}

// ==========================================
// EXPERIENCE CARD
// ==========================================

function ExperienceCard({
  experience,
  index,
  inView
}: {
  experience: ExperienceItem;
  index: number;
  inView: boolean;
}) {

  const [expanded, setExpanded] = useState(false);

  const Icon = experience.icon;

  const isLeft = index % 2 === 0;

  return (

    <motion.div
      initial={{
        opacity: 0,
        x: isLeft ? -80 : 80,
        rotateY: isLeft ? -8 : 8
      }}
      animate={inView ? {
        opacity: 1,
        x: 0,
        rotateY: 0
      } : {}}
      transition={{
        duration: 0.8,
        delay: index * 0.2,
        ease: 'easeOut'
      }}
      className={`relative w-full md:w-1/2 ${
        isLeft
          ? 'md:pr-16 md:mr-auto'
          : 'md:pl-16 md:ml-auto'
      }`}
    >

      {/* TIMELINE CONNECTOR */}

      <div
        className={`hidden md:block absolute top-12 w-16 h-px bg-gradient-to-r from-blue-500/60 to-purple-500/60 ${
          isLeft ? 'right-0' : 'left-0'
        }`}
      />

      {/* MOBILE CONNECTOR */}

      <div className="md:hidden absolute left-[-30px] top-12 w-7 h-px bg-gradient-to-r from-blue-500 to-purple-500" />

      {/* CARD */}

      <motion.div
        whileHover={{
          y: -8,
          scale: 1.015
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20
        }}
        className="group relative"
      >

        {/* GLOW BORDER */}

        <div className="absolute -inset-[1px] rounded-[27px] bg-gradient-to-br from-blue-500/50 via-purple-500/20 to-cyan-500/50 opacity-40 group-hover:opacity-100 blur-[1px] transition-opacity duration-500" />

        <div className="relative overflow-hidden rounded-[26px] border border-zinc-200 dark:border-white/10 bg-white dark:bg-[#11111e] p-7 sm:p-8 shadow-xl group-hover:shadow-[0_20px_70px_rgba(99,102,241,0.15)] transition-shadow duration-500">

          {/* CARD DECORATION */}

          <div className="absolute -top-20 -right-20 w-48 h-48 rounded-full bg-blue-500/10 blur-[70px] pointer-events-none" />

          {/* CARD TOP */}

          <div className="relative flex items-start justify-between gap-4 mb-7">

            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${experience.color} shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-transform duration-500`}>

              <Icon className="w-7 h-7 text-white" />

            </div>

            {experience.current && (

              <span className="flex items-center gap-2 px-3 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-xs font-bold">

                <span className="relative flex w-2 h-2">

                  <span className="absolute inline-flex w-full h-full rounded-full bg-emerald-400 opacity-75 animate-ping" />

                  <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-500" />

                </span>

                CURRENT

              </span>

            )}

          </div>

          {/* DATE */}

          <div className="flex items-center gap-2 text-blue-500 dark:text-cyan-400 mb-4">

            <CalendarDays className="w-4 h-4" />

            <span className="text-xs font-bold uppercase tracking-widest">

              {experience.date}

            </span>

          </div>

          {/* TITLE */}

          <h3 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white mb-2 leading-tight">

            {experience.title}

          </h3>

          {/* COMPANY */}

          <h4 className="flex items-center gap-2 text-sm font-semibold text-zinc-500 dark:text-zinc-400 mb-5">

            <MapPin className="w-4 h-4 text-purple-500 shrink-0" />

            {experience.company}

          </h4>

          {/* CATEGORY */}

          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-purple-500/10 border border-purple-500/20 text-purple-500 text-xs font-bold mb-5">

            {experience.type}

          </span>

          {/* DESCRIPTION */}

          <p className="text-sm leading-7 text-zinc-600 dark:text-zinc-400">

            {experience.description}

          </p>

          {/* EXPAND DETAILS */}

          <AnimatePresence>

            {expanded && (

              <motion.div
                initial={{
                  opacity: 0,
                  height: 0
                }}
                animate={{
                  opacity: 1,
                  height: 'auto'
                }}
                exit={{
                  opacity: 0,
                  height: 0
                }}
                className="overflow-hidden"
              >

                <div className="mt-6 pt-6 border-t border-zinc-200 dark:border-white/10">

                  <h5 className="text-sm font-bold text-zinc-900 dark:text-white mb-4">

                    Key Highlights

                  </h5>

                  <div className="space-y-3">

                    {experience.details.map((detail, detailIndex) => (

                      <div
                        key={detailIndex}
                        className="flex items-start gap-3"
                      >

                        <div className="mt-1 w-5 h-5 shrink-0 rounded-full bg-blue-500/10 flex items-center justify-center">

                          <ArrowUpRight className="w-3 h-3 text-blue-500" />

                        </div>

                        <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">

                          {detail}

                        </p>

                      </div>

                    ))}

                  </div>

                </div>

              </motion.div>

            )}

          </AnimatePresence>

          {/* EXPAND BUTTON */}

          <button
            onClick={() => setExpanded(!expanded)}
            className="mt-7 pt-5 w-full border-t border-zinc-200 dark:border-white/10 flex items-center justify-between text-sm font-bold text-blue-500 hover:text-purple-500 transition-colors"
          >

            <span>

              {expanded ? 'Show Less' : 'Explore Details'}

            </span>

            <motion.div
              animate={{
                rotate: expanded ? 180 : 0
              }}
              transition={{
                duration: 0.3
              }}
            >

              <ChevronDown className="w-5 h-5" />

            </motion.div>

          </button>

        </div>

      </motion.div>

    </motion.div>

  );

}

// ==========================================
// MAIN EXPERIENCE COMPONENT
// ==========================================

export default function Experience() {

  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // ==========================================
  // EXPERIENCE DATA
  // Edit these entries to match your real history.
  // ==========================================

  const experiences: ExperienceItem[] = [

    {
      id: 1,

      title: 'Software Engineering Student',

      company: 'Mekdela Amba University',

      date: 'Your actual study period',

      type: 'Education',

      description:
        'Studying Software Engineering with a focus on software development, programming, database systems, and modern application architecture.',

      details: [
        'Learning software engineering principles and application development.',
        'Working with programming languages, databases, and web technologies.',
        'Developing practical software projects to strengthen technical skills.'
      ],

      icon: GraduationCap,

      color: 'from-blue-500 to-indigo-600',

      category: 'education'

    },

    {
      id: 2,

      title: 'Junior Full Stack Developer',

      company: 'Personal & Academic Projects',

      date: 'Your actual development period',

      type: 'Software Development',

      description:
        'Building full-stack web applications using React, Django REST Framework, and PostgreSQL, focusing on responsive interfaces, REST APIs, and database-driven applications.',

      details: [
        'Building interactive frontend applications with React and JavaScript.',
        'Developing backend APIs using Django REST Framework.',
        'Working with PostgreSQL databases and application integration.',
        'Creating complete web applications with authentication and management features.'
      ],

      icon: Code2,

      color: 'from-purple-500 to-pink-600',

      category: 'development'

    },

    {
      id: 3,

      title: 'Full Stack Application Development',

      company: 'Independent Projects',

      date: 'Ongoing',

      type: 'Project Development',

      description:
        'Designing and developing real-world applications, including e-commerce platforms, portfolio websites, and a university distance education management system.',

      details: [
        'Developing e-commerce functionality and administration dashboards.',
        'Building a distance education management platform.',
        'Integrating frontend interfaces with backend REST APIs.',
        'Exploring AI-powered features and modern development tools.'
      ],

      icon: Rocket,

      color: 'from-orange-500 to-red-600',

      category: 'experience',

      current: true

    }

  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <section
      id="experience"
      className="relative py-28 md:py-36 overflow-hidden bg-zinc-50 dark:bg-[#080812] transition-colors duration-500"
    >

      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{
            x: [0, 70, -30, 0],
            y: [0, -50, 40, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 30, 0],
            y: [0, 50, -30, 0],
            scale: [1, 0.9, 1.2, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute bottom-0 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-[140px]"
        />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.05]"
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
          CONTENT
      ====================================== */}

      <div
        ref={ref}
        className="relative z-10 max-w-6xl mx-auto px-6"
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
          className="text-center mb-24"
        >

          {/* Badge */}

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/20 mb-7">

            <Sparkles className="w-4 h-4 text-purple-500" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-purple-600 dark:text-purple-400">

              My Journey

            </span>

          </div>

          {/* Title */}

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-7">

            {t('experience.title')}

            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">

              Experience & Growth.

            </span>

          </h2>

          {/* Description */}

          <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">

            Every project, challenge, and learning experience has helped shape my journey as a software developer.

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
            TIMELINE
        ====================================== */}

        <div className="relative">

          {/* CENTER TIMELINE LINE */}

          <div className="absolute left-[14px] md:left-1/2 top-0 bottom-0 w-[2px] md:-translate-x-1/2 bg-zinc-300 dark:bg-white/10" />

          {/* ANIMATED TIMELINE */}

          <motion.div
            initial={{
              height: 0
            }}
            animate={inView ? {
              height: '100%'
            } : {}}
            transition={{
              duration: 2.5,
              ease: 'easeInOut'
            }}
            className="absolute left-[14px] md:left-1/2 top-0 w-[2px] md:-translate-x-1/2 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]"
          />

          {/* TIMELINE ITEMS */}

          <div className="relative space-y-14 md:space-y-20 pl-10 md:pl-0">

            {experiences.map((experience, index) => (

              <div
                key={experience.id}
                className="relative"
              >

                {/* TIMELINE NODE */}

                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0
                  }}
                  animate={inView ? {
                    opacity: 1,
                    scale: 1
                  } : {}}
                  transition={{
                    delay: index * 0.2 + 0.3,
                    duration: 0.5
                  }}
                  className="absolute -left-[39px] md:left-1/2 md:-translate-x-1/2 top-8 z-20"
                >

                  <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-white dark:bg-[#080812] border-2 border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.4)]">

                    <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-blue-500 to-purple-500" />

                    <div className="absolute inset-0 rounded-full border border-blue-500/50 animate-ping" />

                  </div>

                </motion.div>

                <ExperienceCard
                  experience={experience}
                  index={index}
                  inView={inView}
                />

              </div>

            ))}

          </div>

          {/* TIMELINE END */}

          <div className="relative flex justify-center mt-16 md:mt-20">

            <div className="absolute top-[-80px] left-[14px] md:left-1/2 -translate-x-1/2 w-[2px] h-20 bg-gradient-to-b from-cyan-400 to-transparent" />

            <div className="relative z-10 flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10 shadow-xl">

              <Sparkles className="w-4 h-4 text-purple-500" />

              <span className="text-sm font-bold text-zinc-700 dark:text-zinc-300">

                The Journey Continues

              </span>

            </div>

          </div>

        </div>

        {/* ======================================
            BOTTOM SKILLS BANNER
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
            delay: 0.8
          }}
          className="relative mt-28 p-[1px] rounded-[30px] bg-gradient-to-r from-blue-500/50 via-purple-500/50 to-cyan-500/50"
        >

          <div className="relative overflow-hidden rounded-[29px] bg-white dark:bg-[#11111e] p-8 md:p-10">

            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-purple-500/10 blur-[80px]" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

              <div className="text-center md:text-left">

                <div className="flex items-center justify-center md:justify-start gap-2 mb-4">

                  <Award className="w-5 h-5 text-blue-500" />

                  <span className="text-xs font-bold uppercase tracking-widest text-blue-500">

                    Always Improving

                  </span>

                </div>

                <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-3">

                  Learning Never Stops.

                </h3>

                <p className="max-w-xl text-sm md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">

                  Continuously exploring new technologies, improving my development skills, and building better digital experiences.

                </p>

              </div>

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
                className="shrink-0 w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-xl shadow-purple-500/20"
              >

                <Laptop className="w-10 h-10 text-white" />

              </motion.div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}
