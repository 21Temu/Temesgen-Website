import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  Code2,
  Terminal,
  Cpu,
  Github,
  Sparkles,
  Zap,
  Award,
  GraduationCap,
  Users,
  Lightbulb,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  ShieldCheck,
  FileCode2,
  GitBranch,
  Layers
} from 'lucide-react';

// Counter component for smooth numbers animation to 100%
function AnimatedCounter({ from = 0, to = 100, duration = 1.8, inView = false }: { from?: number; to?: number; duration?: number; inView?: boolean }) {
  const nodeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!inView) return;
    const node = nodeRef.current;
    if (!node) return;

    const controls = animate(from, to, {
      duration,
      ease: 'easeOut',
      onUpdate(value) {
        node.textContent = `${Math.round(value)}%`;
      }
    });

    return () => controls.stop();
  }, [from, to, duration, inView]);

  return <span ref={nodeRef} className="font-mono font-bold text-indigo-600 text-xs">0%</span>;
}

export default function About() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imgFailed, setImgFailed] = useState(false);
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'stack'>('profile');

  useEffect(() => {
    let isMounted = true;
    fetch('https://api.github.com/users/21Temu')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch GitHub avatar');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Mouse Parallax Springs
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const smoothX = useSpring(pointerX, { stiffness: 100, damping: 20 });
  const smoothY = useSpring(pointerY, { stiffness: 100, damping: 20 });

  const gridRotateX = useTransform(smoothY, [-0.5, 0.5], [64, 52]);
  const gridRotateZ = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);
  const gridPanX = useTransform(smoothX, [-0.5, 0.5], [-40, 40]);
  const gridPanY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  const cardRotateX = useTransform(smoothY, [-0.5, 0.5], [8, -8]);
  const cardRotateY = useTransform(smoothX, [-0.5, 0.5], [-10, 10]);

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

  const codeSnippets = [
    { file: 'Developer.tsx', lang: 'TypeScript', code: 'const developer = {\n  name: "Temesgen Minwyelet",\n  role: "Full-Stack Software Engineer",\n  status: "Building Scalable Web & Mobile Apps",\n  location: "Addis Ababa, Ethiopia"\n};' },
    { file: 'Backend.py', lang: 'Python', code: '@app.route("/api/v1/build")\ndef deploy_architecture():\n    service = ServiceRegistry.get("core")\n    return jsonify(status="200 OK", metrics=service.health())' },
    { file: 'Database.sql', lang: 'SQL', code: 'SELECT user_id, role, status FROM system_engineers\nWHERE skill_level >= "Senior"\nORDER BY completed_projects DESC;' }
  ];

  // All technical skills updated to 100% proficiency
  const skills = [
    { name: 'React & React Native', level: 100, category: 'Frontend', color: 'from-cyan-500 to-blue-600', dotBg: 'bg-cyan-500' },
    { name: 'Vue.js & Inertia.js', level: 100, category: 'Frontend', color: 'from-emerald-400 to-teal-600', dotBg: 'bg-emerald-500' },
    { name: 'Django / DRF / Python', level: 100, category: 'Backend', color: 'from-teal-600 to-emerald-700', dotBg: 'bg-teal-600' },
    { name: 'Laravel & PHP', level: 100, category: 'Backend', color: 'from-rose-500 to-red-600', dotBg: 'bg-rose-500' },
    { name: 'PostgreSQL & MySQL', level: 100, category: 'Database', color: 'from-blue-600 to-indigo-700', dotBg: 'bg-blue-600' },
    { name: 'TypeScript & JavaScript', level: 100, category: 'Languages', color: 'from-amber-400 to-yellow-600', dotBg: 'bg-amber-500' },
    { name: 'Tailwind CSS & UI/UX', level: 100, category: 'Design', color: 'from-indigo-500 to-violet-600', dotBg: 'bg-indigo-500' }
  ];

  const softSkills = [
    { name: 'Problem Solving', icon: Lightbulb },
    { name: 'Team Collaboration', icon: Users },
    { name: 'Time Management', icon: Clock },
    { name: 'Adaptability', icon: Zap },
    { name: 'Leadership', icon: Award }
  ];

  const statistics = [
    { number: '5+', label: 'Years Experience', icon: GraduationCap },
    { number: '10+', label: 'Production Projects', icon: Code2 },
    { number: '5+', label: 'Core Frameworks', icon: Cpu }
  ];

  const codeRainColumns = [
    ['import React from "react"', 'const App = () => {', 'return <Engine />', '};', 'export default App;'],
    ['def main():', '  print("System Ready")', '  db.connect()', '  server.listen(8080)'],
    ['SELECT * FROM users', 'WHERE status = "ACTIVE"', 'JOIN roles ON id', 'ORDER BY rank ASC;'],
    ['git checkout -b feature', 'git commit -m "feat"', 'git push origin main', 'docker compose up -d']
  ];

  const resolvedAvatar = !imgFailed && avatarUrl ? avatarUrl : 'https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&q=80';

  return (
    <section
      ref={sectionRef}
      id="about"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: '1200px' }}
      className="relative py-24 bg-white text-slate-900 overflow-hidden border-t border-slate-100"
    >
      {/* ======================================
          SOFTWARE ANIMATED 3D BACKGROUND
      ====================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft Background Orbs */}
        <div className="absolute -top-32 left-[10%] w-[480px] h-[480px] rounded-full bg-indigo-100/60 blur-[130px]" />
        <div className="absolute bottom-10 right-[5%] w-[460px] h-[460px] rounded-full bg-emerald-100/50 blur-[130px]" />

        {/* 3D Perspective Grid */}
        <div
          className="absolute inset-x-0 bottom-[-24%] h-[75%] flex items-center justify-center"
          style={{
            perspective: '900px',
            maskImage: 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
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
            transition={{ backgroundPosition: { duration: 3.5, repeat: Infinity, ease: 'linear' } }}
            className="w-[180%] h-[180%] border-t border-indigo-200/70"
            ref={(el) => {
              if (el) {
                el.style.backgroundImage =
                  'linear-gradient(to right, rgba(79, 70, 229, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(16, 185, 129, 0.12) 1px, transparent 1px)';
                el.style.backgroundSize = '56px 56px';
              }
            }}
          />
        </div>

        {/* Animated Code Streams (Software Rain) */}
        <div className="hidden lg:grid grid-cols-4 gap-12 absolute inset-x-12 top-16 opacity-30 font-mono text-[11px] text-indigo-700 select-none">
          {codeRainColumns.map((col, colIdx) => (
            <motion.div
              key={colIdx}
              animate={{ y: [0, -60, 0], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 7 + colIdx * 2, repeat: Infinity, ease: 'easeInOut' }}
              className="space-y-3 bg-slate-50/50 p-4 rounded-xl border border-slate-200/60"
            >
              {col.map((line, lineIdx) => (
                <div key={lineIdx} className="whitespace-nowrap">
                  <span className="text-slate-400 mr-2">{lineIdx + 1}</span>
                  {line}
                </div>
              ))}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ======================================
          MAIN SECTION CONTENT
      ====================================== */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Centered Header Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/80 text-indigo-700 text-xs font-mono font-semibold tracking-wide mb-4">
            <Terminal className="w-3.5 h-3.5 text-indigo-600" />
            <span>sys.about // Temesgen Minwyelet</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-4">
            Engineered for <span className="text-indigo-600">Performance & Impact.</span>
          </h2>
        </motion.div>

        {/* Interactive Layout: Left Profile Bento + Right 3D Software Studio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left Column: Personal Identity & Bio */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-6 sm:p-8 shadow-sm"
          >
            <div>
              {/* Profile Image & Avatar Header */}
              <div className="flex items-center gap-4 pb-6 mb-6 border-b border-slate-100">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden border-2 border-indigo-500/30 bg-slate-100 shrink-0">
                  {isLoading ? (
                    <div className="w-full h-full animate-pulse bg-slate-200" />
                  ) : (
                    <img
                      src={resolvedAvatar}
                      alt="Temesgen Minwyelet"
                      onError={() => setImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Temesgen Minwyelet</h3>
                  <p className="text-xs font-mono text-indigo-600">@21Temu · Software Engineer</p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-slate-500">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verified Full Stack Developer</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-slate-600 text-sm leading-relaxed mb-6">
                <p>{t('about.story')}</p>
                <p>
                  Specializing in clean codebases, API integrations, responsive interfaces, and optimized database systems using React, Vue, Laravel, and Django.
                </p>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-100">
              {statistics.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="p-3 rounded-xl bg-slate-50 border border-slate-200/60 text-center">
                    <Icon className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                    <div className="text-lg font-black text-slate-900">{stat.number}</div>
                    <div className="text-[10px] text-slate-500 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive IDE Terminal Studio */}
          <div className="lg:col-span-7 flex" style={{ perspective: '1100px' }}>
            <motion.div
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                transformStyle: 'preserve-3d'
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="w-full flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-slate-900 text-slate-100 p-5 sm:p-6 shadow-xl"
            >
              {/* Window Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500" />
                  <span className="w-3 h-3 rounded-full bg-amber-500" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500" />
                  <span className="ml-2 font-mono text-xs text-slate-400">software-studio // vscode</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-[10px]">
                    ● RUNNING
                  </span>
                </div>
              </div>

              {/* Code File Tabs */}
              <div className="flex items-center gap-2 my-3 border-b border-slate-800 pb-2">
                {codeSnippets.map((snippet, idx) => (
                  <button
                    key={snippet.file}
                    onClick={() => setActiveTab(idx === 0 ? 'profile' : idx === 1 ? 'skills' : 'stack')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                      (activeTab === 'profile' && idx === 0) ||
                      (activeTab === 'skills' && idx === 1) ||
                      (activeTab === 'stack' && idx === 2)
                        ? 'bg-slate-800 text-white border border-slate-700'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <FileCode2 className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{snippet.file}</span>
                  </button>
                ))}
              </div>

              {/* Code Window Display */}
              <div className="flex-1 font-mono text-xs sm:text-sm bg-slate-950/80 rounded-xl p-4 border border-slate-800 overflow-x-auto text-emerald-400 leading-relaxed min-h-[220px]">
                <pre className="text-slate-300">
                  {activeTab === 'profile' && codeSnippets[0].code}
                  {activeTab === 'skills' && codeSnippets[1].code}
                  {activeTab === 'stack' && codeSnippets[2].code}
                </pre>
              </div>

              {/* Footer Status Bar */}
              <div className="flex items-center justify-between pt-4 mt-4 border-t border-slate-800 font-mono text-xs text-slate-400">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-indigo-400">
                    <GitBranch className="w-3.5 h-3.5" />
                    main
                  </span>
                  <span>UTF-8</span>
                </div>

                <a
                  href="https://github.com/21Temu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-slate-200 hover:text-white transition-colors"
                >
                  <Github className="w-4 h-4 text-white" />
                  <span>Explore Repos</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bento Section: Technical & Professional Skills */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Minimized & Compact Technical Skills Bento */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-7 rounded-3xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-5 sm:p-6 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-600">Technical Mastery</span>
                  <h4 className="text-lg font-black text-slate-900 mt-0.5">Core Stack Proficiency</h4>
                </div>
                <div className="w-8 h-8 rounded-xl bg-indigo-50 border border-indigo-200/60 flex items-center justify-center text-indigo-600">
                  <Code2 className="w-4 h-4" />
                </div>
              </div>

              {/* Minimized Skill Items List */}
              <div className="space-y-2.5">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    className="p-2.5 sm:p-3 rounded-xl bg-slate-50/80 border border-slate-200/60 hover:bg-white hover:shadow-2xs transition-all duration-200"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${skill.dotBg}`} />
                        <span className="text-xs font-extrabold text-slate-800">{skill.name}</span>
                        <span className="hidden sm:inline-block font-mono text-[10px] text-slate-400 font-semibold px-1.5 py-0.2 rounded bg-slate-100">
                          {skill.category}
                        </span>
                      </div>

                      {/* Motion Counter loading smoothly to 100% */}
                      <AnimatedCounter from={0} to={100} duration={1.6 + index * 0.1} inView={inView} />
                    </div>

                    {/* Compact Animated Progress Bar to 100% */}
                    <div className="h-1.5 w-full rounded-full bg-slate-200/80 overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={inView ? { width: '100%' } : { width: '0%' }}
                        transition={{ duration: 1.5 + index * 0.1, ease: 'easeOut' }}
                        className={`h-full rounded-full bg-gradient-to-r ${skill.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between font-mono text-[11px] text-slate-500">
              <span className="flex items-center gap-1 text-emerald-600 font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                All Core Stacks at 100%
              </span>
              <span>Production Ready</span>
            </div>
          </motion.div>

          {/* Professional Skills Bento */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-5 flex flex-col justify-between rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-5 sm:p-6 shadow-sm"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div>
                  <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-emerald-600">Soft Skills</span>
                  <h4 className="text-lg font-black text-slate-900 mt-0.5">Professional Strengths</h4>
                </div>
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600">
                  <Sparkles className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-2.5">
                {softSkills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <div key={skill.name} className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50/80 border border-slate-200/60">
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4 text-indigo-600" />
                        <span className="text-xs font-bold text-slate-800">{skill.name}</span>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Ready for team collaboration</span>
              <a href="#contact" className="font-bold text-indigo-600 hover:text-indigo-700">
                Let&apos;s Connect &rarr;
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}