import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  Github,
  Users,
  BookOpen,
  Star,
  GitFork,
  ExternalLink,
  RefreshCw,
  CalendarDays,
  ArrowUpRight,
  Terminal,
  Trophy
} from 'lucide-react';

interface GithubData {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  login: string;
  name: string | null;
  bio: string | null;
  public_gists: number;
  created_at: string;
}

interface StatItem {
  label: string;
  value: number;
  icon: React.ElementType;
  accentClass: string;
  description: string;
}

function AnimatedCounter({
  value,
  duration = 1.6
}: {
  value: number;
  duration?: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let animationFrame: number;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / (duration * 1000), 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, duration]);

  return <>{count.toLocaleString()}</>;
}

export default function GithubStats() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);

  const [data, setData] = useState<GithubData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

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

  const fetchGithubData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://api.github.com/users/21Temu');
      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }

      const githubData: GithubData = await response.json();
      if (!githubData.login) {
        throw new Error('Invalid GitHub response');
      }

      setData(githubData);
    } catch (err) {
      console.error('GitHub API Error:', err);
      setError('Unable to load GitHub statistics. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGithubData();
  }, []);

  const stats: StatItem[] = data
    ? [
        {
          label: t('github.repos'),
          value: data.public_repos,
          icon: BookOpen,
          accentClass: 'bg-indigo-600 text-white',
          description: 'Public repositories'
        },
        {
          label: t('github.followers'),
          value: data.followers,
          icon: Users,
          accentClass: 'bg-violet-600 text-white',
          description: 'People following'
        },
        {
          label: t('github.following'),
          value: data.following,
          icon: Star,
          accentClass: 'bg-emerald-600 text-white',
          description: 'Following developers'
        },
        {
          label: 'Public Gists',
          value: data.public_gists,
          icon: GitFork,
          accentClass: 'bg-slate-900 text-white',
          description: 'Public code snippets'
        }
      ]
    : [];

  const accountAge = data
    ? Math.max(
        0,
        new Date().getFullYear() - new Date(data.created_at).getFullYear()
      )
    : 0;

  const softwareStreams = [
    '0x5A1  GET /users/21Temu -> 200 OK',
    '11010  git log -n 1 --stat',
    '0x9E4  npm run build -> dist/ ready'
  ];

  // ==========================================
  // LOADING STATE (WHITE SURFACE)
  // ==========================================
  if (isLoading) {
    return (
      <section id="github" className="py-24 bg-white text-slate-900 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl p-8 sm:p-10 bg-white border border-slate-200 animate-pulse">
            <div className="flex items-center gap-6">
              <div className="w-24 h-24 rounded-2xl bg-slate-200 shrink-0" />
              <div className="space-y-3 flex-1">
                <div className="w-56 h-6 rounded-lg bg-slate-200" />
                <div className="w-36 h-4 rounded-lg bg-slate-200" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-10">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="h-36 rounded-2xl bg-slate-100 border border-slate-200/70" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // ERROR STATE (WHITE SURFACE)
  // ==========================================
  if (error || !data) {
    return (
      <section id="github" className="py-24 bg-white text-slate-900 border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="rounded-3xl p-10 text-center bg-white border border-slate-200 shadow-2xs">
            <Github className="w-11 h-11 mx-auto mb-4 text-slate-400" />
            <h3 className="text-2xl font-bold text-slate-900 mb-2">
              GitHub Statistics Unavailable
            </h3>
            <p className="text-slate-600 mb-6">
              {error || 'Unable to retrieve GitHub information.'}
            </p>
            <button
              onClick={fetchGithubData}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Try Again</span>
            </button>
          </div>
        </div>
      </section>
    );
  }

  // ==========================================
  // MAIN RENDER: WHITE + 3D SOFTWARE BACKGROUND
  // ==========================================
  return (
    <section
      ref={sectionRef}
      id="github"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: '1250px' }}
      className="relative py-24 bg-white text-slate-900 overflow-hidden border-t border-slate-100"
    >
      {/* ======================================
          SOFTWARE 3D ANIMATED BACKGROUND
      ====================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 right-[12%] w-[440px] h-[440px] rounded-full bg-indigo-200/35 blur-[120px]"
        />
        <motion.div
          style={{ x: depthFrontX, y: depthFrontY }}
          animate={{ scale: [1.08, 0.95, 1.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-10 -left-24 w-[420px] h-[420px] rounded-full bg-emerald-200/30 blur-[120px]"
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

        {/* Floating 3D Wireframe Cube */}
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
          0xGIT
        </motion.div>

        {/* Software Telemetry Streams */}
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          className="hidden xl:flex flex-col gap-2 absolute top-28 right-[24%] font-mono text-[11px] text-slate-600/80"
        >
          {softwareStreams.map((line, idx) => (
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
          MAIN CONTENT: CONSOLE + METRICS GRID
      ====================================== */}
      <div ref={ref} className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/90 text-indigo-700 text-xs font-mono font-semibold mb-4">
            <Github className="w-3.5 h-3.5" />
            <span>Developer Activity</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-slate-900 mb-3">
            {t('github.title')}{' '}
            <span className="text-indigo-600">GitHub Analytics.</span>
          </h2>
        </motion.div>

        {/* Top Console Strip: Profile Identity + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.1 }}
          className="rounded-3xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-6 sm:p-8 shadow-sm mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5">
              <img
                src={data.avatar_url}
                alt={data.login}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border border-slate-200 shadow-2xs shrink-0"
              />

              <div>
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[11px] font-semibold mb-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>LIVE API CONNECTED</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900">
                  {data.name || data.login}
                </h3>

                <a
                  href={data.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-mono text-sm font-semibold text-indigo-600 hover:underline mt-0.5"
                >
                  <span>@{data.login}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                {data.bio && (
                  <p className="text-sm text-slate-600 mt-2 max-w-2xl">
                    {data.bio}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-indigo-600 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>{t('github.viewProfile')}</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Stats Bento Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.15 + index * 0.08 }}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-slate-200/90 bg-white/90 backdrop-blur-md p-6 shadow-2xs transition-shadow hover:shadow-md"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.accentClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-slate-400">
                    0{index + 1}
                  </span>
                </div>

                <div className="text-3xl sm:text-4xl font-black text-slate-900 tabular-nums">
                  <AnimatedCounter value={stat.value} />
                </div>

                <div className="text-sm font-bold text-slate-800 mt-1.5">
                  {stat.label}
                </div>

                <div className="text-xs text-slate-500 mt-0.5">
                  {stat.description}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Metadata Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-4 rounded-2xl border border-slate-200/90 bg-white/90 p-5 flex items-center gap-4 shadow-2xs">
            <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center shrink-0">
              <CalendarDays className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-black text-slate-900">
                {accountAge}+ Years
              </div>
              <div className="text-xs text-slate-500">
                Since joining GitHub
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl border border-slate-200/90 bg-white/90 p-5 flex items-center gap-4 shadow-2xs">
            <div className="w-11 h-11 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center shrink-0">
              <Trophy className="w-5 h-5" />
            </div>
            <div>
              <div className="text-lg font-black text-slate-900">
                Open Source
              </div>
              <div className="text-xs text-slate-500">
                Public GitHub presence
              </div>
            </div>
          </div>

          <div className="md:col-span-4 rounded-2xl border border-slate-200/90 bg-white/90 p-5 flex items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2.5 text-xs text-slate-600 font-mono">
              <Terminal className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>Building &amp; shipping code</span>
            </div>
            <a
              href={data.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-700 shrink-0"
            >
              <span>Repos</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}