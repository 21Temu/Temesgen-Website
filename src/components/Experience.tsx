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
  Briefcase,
  GraduationCap,
  Code2,
  Rocket,
  CalendarDays,
  MapPin,
  ArrowUpRight,
  ChevronRight,
  Laptop,
  Award,
  GitBranch,
  X,
  ArrowLeft
} from 'lucide-react';

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  date: string;
  type: string;
  description: string;
  details: string[];
  icon: typeof Briefcase;
  badgeClass: string;
  category: 'education' | 'experience' | 'development';
  current?: boolean;
}

function ExperienceCard({
  experience,
  index,
  inView,
  onSelect
}: {
  experience: ExperienceItem;
  index: number;
  inView: boolean;
  onSelect: (item: ExperienceItem) => void;
}) {
  const Icon = experience.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.45, delay: index * 0.08, ease: 'easeOut' }}
    >
      <button
        type="button"
        onClick={() => onSelect(experience)}
        aria-label={`Open details for ${experience.title}`}
        className="group w-full text-left rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md px-4 py-3.5 sm:px-5 sm:py-4 shadow-2xs hover:border-indigo-400 hover:shadow-md transition-all duration-200 flex items-center justify-between gap-3.5 cursor-pointer"
      >
        <div className="flex items-center gap-3.5 min-w-0">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105 ${experience.badgeClass}`}
          >
            <Icon className="w-4 h-4" />
          </div>

          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors truncate">
            {experience.title}
          </h3>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {experience.current && (
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[10px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>ACTIVE</span>
            </span>
          )}
          <span className="w-7 h-7 rounded-lg bg-slate-50 group-hover:bg-indigo-50 border border-slate-200/80 group-hover:border-indigo-200 flex items-center justify-center text-slate-500 group-hover:text-indigo-600 transition-colors">
            <ChevronRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </button>
    </motion.div>
  );
}

export default function Experience() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [selectedExperience, setSelectedExperience] =
    useState<ExperienceItem | null>(null);

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
    if (selectedExperience) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedExperience]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedExperience(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

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
      badgeClass: 'bg-indigo-600 text-white',
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
      badgeClass: 'bg-violet-600 text-white',
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
      badgeClass: 'bg-slate-900 text-white',
      category: 'experience',
      current: true
    }
  ];

  const expLogs = [
    '0xE01  timeline.init(3 milestones)',
    '11001  stack: react · django · postgres',
    '0x9A3  status: continuous learning'
  ];

  const closeModal = () => setSelectedExperience(null);

  return (
    <section
      ref={sectionRef}
      id="experience"
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
          className="absolute -top-24 right-[14%] w-[440px] h-[440px] rounded-full bg-indigo-200/35 blur-[120px]"
        />
        <motion.div
          style={{ x: depthFrontX, y: depthFrontY }}
          animate={{ scale: [1.08, 0.95, 1.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 -left-24 w-[420px] h-[420px] rounded-full bg-emerald-200/30 blur-[120px]"
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
          0xEXP
        </motion.div>

        {/* Software Telemetry Streams */}
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          className="hidden xl:flex flex-col gap-2 absolute top-28 right-[24%] font-mono text-[11px] text-slate-600/80"
        >
          {expLogs.map((line, idx) => (
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
      <div ref={ref} className="relative z-10 max-w-4xl mx-auto px-6">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/90 text-indigo-700 text-xs font-mono font-semibold mb-3.5">
            <GitBranch className="w-3.5 h-3.5" />
            <span>My Journey</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3">
            {t('experience.title')}{' '}
            <span className="text-indigo-600">Experience &amp; Growth.</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            Click any milestone card to view full details, role scope, and key highlights.
          </p>
        </motion.div>

        {/* Compact Title-Only Cards List */}
        <div className="max-w-2xl mx-auto space-y-3">
          {experiences.map((experience, index) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              index={index}
              inView={inView}
              onSelect={setSelectedExperience}
            />
          ))}
        </div>

        {/* Bottom Continuous Learning Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="max-w-2xl mx-auto mt-10 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-2xs flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
            <Laptop className="w-5 h-5" />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
              <Award className="w-3.5 h-3.5" />
              <span>Always Improving</span>
            </div>
            <h3 className="text-lg sm:text-xl font-black text-slate-900">
              Learning Never Stops.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
              Continuously exploring modern web and backend architectures, API design, and practical software delivery.
            </p>
          </div>
        </motion.div>
      </div>

      {/* ======================================
          EXPERIENCE DETAIL MODAL
      ====================================== */}
      <AnimatePresence>
        {selectedExperience && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
              onClick={closeModal}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 14 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="relative w-full max-w-xl rounded-3xl bg-white text-slate-900 border border-slate-200 shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between gap-3 px-5 py-4 border-b border-slate-200 bg-slate-50/70">
                <button
                  type="button"
                  onClick={closeModal}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back</span>
                </button>

                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-600">
                  {selectedExperience.type}
                </span>

                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Close details"
                  className="w-8 h-8 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-600 hover:bg-slate-900 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
                <div>
                  <h3 className="text-2xl font-black text-slate-900 leading-snug">
                    {selectedExperience.title}
                  </h3>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs sm:text-sm text-slate-500 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>{selectedExperience.company}</span>
                    </span>

                    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-indigo-600">
                      <CalendarDays className="w-3.5 h-3.5 shrink-0" />
                      <span>{selectedExperience.date}</span>
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedExperience.description}
                </p>

                <div className="pt-4 border-t border-slate-100">
                  <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                    Key Highlights
                  </h4>
                  <ul className="space-y-2.5">
                    {selectedExperience.details.map((detail, detailIndex) => (
                      <li
                        key={detailIndex}
                        className="flex items-start gap-2.5 text-sm text-slate-700"
                      >
                        <ArrowUpRight className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}