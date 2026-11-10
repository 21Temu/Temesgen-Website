
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';

import {
  Github,
  Users,
  BookOpen,
  Star,
  GitFork,
  Code2,
  ExternalLink,
  Sparkles,
  Trophy,
  Activity,
  GitBranch,
  RefreshCw,
  CalendarDays,
  ArrowUpRight,
  Terminal,
  Cpu
} from 'lucide-react';

// ==========================================
// GITHUB DATA INTERFACE
// ==========================================

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

// ==========================================
// STATISTICS INTERFACE
// ==========================================

interface StatItem {
  label: string;
  value: number;
  icon: React.ElementType;
  color: string;
  gradient: string;
  description: string;
}

// ==========================================
// ANIMATED COUNTER
// ==========================================

function AnimatedCounter({
  value,
  duration = 2
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

      const easedProgress = 1 - Math.pow(1 - progress, 4);

      setCount(Math.floor(easedProgress * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }

    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
    };

  }, [value, duration]);

  return <>{count.toLocaleString()}</>;

}

// ==========================================
// MAIN GITHUB STATS COMPONENT
// ==========================================

export default function GithubStats() {

  const { t } = useTranslation();

  // ==========================================
  // STATES
  // ==========================================

  const [data, setData] = useState<GithubData | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // ==========================================
  // FETCH GITHUB DATA
  // ==========================================

  const fetchGithubData = async () => {

    setIsLoading(true);

    setError(null);

    try {

      const response = await fetch(
        'https://api.github.com/users/21Temu'
      );

      if (!response.ok) {
        throw new Error(
          `GitHub API returned ${response.status}`
        );
      }

      const githubData: GithubData = await response.json();

      if (!githubData.login) {
        throw new Error('Invalid GitHub response');
      }

      setData(githubData);

    } catch (err) {

      console.error('GitHub API Error:', err);

      setError(
        'Unable to load GitHub statistics. Please try again later.'
      );

    } finally {

      setIsLoading(false);

    }

  };

  useEffect(() => {

    fetchGithubData();

  }, []);

  // ==========================================
  // STATISTICS
  // ==========================================

  const stats: StatItem[] = data ? [

    {
      label: t('github.repos'),
      value: data.public_repos,
      icon: BookOpen,
      color: 'text-cyan-400',
      gradient: 'from-cyan-500 to-blue-500',
      description: 'Public repositories'
    },

    {
      label: t('github.followers'),
      value: data.followers,
      icon: Users,
      color: 'text-purple-400',
      gradient: 'from-purple-500 to-pink-500',
      description: 'People following'
    },

    {
      label: t('github.following'),
      value: data.following,
      icon: Star,
      color: 'text-pink-400',
      gradient: 'from-pink-500 to-rose-500',
      description: 'Following developers'
    },

    {
      label: 'Public Gists',
      value: data.public_gists,
      icon: GitFork,
      color: 'text-emerald-400',
      gradient: 'from-emerald-500 to-teal-500',
      description: 'Public code snippets'
    }

  ] : [];

  // ==========================================
  // ACCOUNT AGE
  // ==========================================

  const accountAge = data
    ? Math.max(
        0,
        new Date().getFullYear() -
        new Date(data.created_at).getFullYear()
      )
    : 0;

  // ==========================================
  // LOADING STATE
  // ==========================================

  if (isLoading) {

    return (

      <section className="py-28 bg-zinc-50 dark:bg-[#080812]">

        <div className="max-w-7xl mx-auto px-6">

          <div className="rounded-[35px] p-10 bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10 animate-pulse">

            <div className="flex items-center gap-6">

              <div className="w-28 h-28 rounded-full bg-zinc-200 dark:bg-zinc-800" />

              <div className="space-y-4">

                <div className="w-48 h-7 rounded-lg bg-zinc-200 dark:bg-zinc-800" />

                <div className="w-32 h-4 rounded-lg bg-zinc-200 dark:bg-zinc-800" />

              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mt-12">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="h-36 rounded-2xl bg-zinc-200 dark:bg-zinc-800"
                />

              ))}

            </div>

          </div>

        </div>

      </section>

    );

  }

  // ==========================================
  // ERROR STATE
  // ==========================================

  if (error || !data) {

    return (

      <section className="py-28 bg-zinc-50 dark:bg-[#080812]">

        <div className="max-w-7xl mx-auto px-6">

          <div className="rounded-3xl p-12 text-center bg-white dark:bg-white/[0.03] border border-zinc-200 dark:border-white/10">

            <Github className="w-12 h-12 mx-auto mb-5 text-zinc-400" />

            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3">
              GitHub Statistics Unavailable
            </h3>

            <p className="text-zinc-500 dark:text-zinc-400 mb-7">
              {error || 'Unable to retrieve GitHub information.'}
            </p>

            <button
              onClick={fetchGithubData}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold"
            >

              <RefreshCw className="w-4 h-4" />

              Try Again

            </button>

          </div>

        </div>

      </section>

    );

  }

  // ==========================================
  // MAIN RENDER
  // ==========================================

  return (

    <section
      id="github"
      className="relative py-28 overflow-hidden bg-zinc-50 dark:bg-[#080812] transition-colors duration-500"
    >

      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="absolute inset-0 pointer-events-none overflow-hidden">

        <motion.div
          animate={{
            x: [0, 60, -40, 0],
            y: [0, -50, 30, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[140px]"
        />

        <motion.div
          animate={{
            x: [0, -60, 40, 0],
            y: [0, 50, -30, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-purple-500/10 dark:bg-purple-600/10 blur-[140px]"
        />

        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
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
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={inView ? {
            opacity: 1,
            y: 0
          } : {}}
          transition={{
            duration: 0.8
          }}
          className="text-center mb-16"
        >

          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6">

            <Github className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-indigo-600 dark:text-cyan-300">
              Developer Activity
            </span>

          </div>

          <h2 className="text-4xl md:text-6xl font-black tracking-tight text-zinc-900 dark:text-white mb-6">

            {t('github.title')}

            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500">
              GitHub Analytics.
            </span>

          </h2>

          <p className="max-w-2xl mx-auto text-zinc-500 dark:text-zinc-400 text-base md:text-lg leading-relaxed">
            Explore my open-source presence, repositories, and developer community statistics directly from GitHub.
          </p>

        </motion.div>

        {/* ======================================
            MAIN GITHUB PROFILE CARD
        ====================================== */}

        <motion.div
          initial={{
            opacity: 0,
            y: 60,
            rotateX: 8
          }}
          animate={inView ? {
            opacity: 1,
            y: 0,
            rotateX: 0
          } : {}}
          transition={{
            duration: 1,
            ease: 'easeOut'
          }}
          className="relative rounded-[35px] p-[1px] bg-gradient-to-br from-cyan-500/40 via-indigo-500/30 to-purple-500/40 shadow-[0_25px_100px_rgba(79,70,229,0.12)]"
        >

          <div className="relative overflow-hidden rounded-[34px] bg-white/90 dark:bg-[#0c0c1c]/95 backdrop-blur-2xl p-6 md:p-12">

            {/* Decorative Glow */}

            <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-purple-500/10 blur-[100px] pointer-events-none" />

            <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

            {/* Profile Information */}

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10">

              {/* ==================================
                  AVATAR
              ================================== */}

              <motion.div
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  rotateX: -5
                }}
                transition={{
                  type: 'spring',
                  stiffness: 200
                }}
                className="relative shrink-0"
                style={{
                  perspective: '1000px'
                }}
              >

                {/* Rotating Ring */}

                <motion.div
                  animate={{
                    rotate: 360
                  }}
                  transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                  className="absolute -inset-4 rounded-full border-2 border-dashed border-indigo-400/50 dark:border-cyan-400/40"
                />

                {/* Avatar Glow */}

                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-purple-500 blur-2xl opacity-30" />

                <img
                  src={data.avatar_url}
                  alt={data.login}
                  className="relative z-10 w-36 h-36 md:w-44 md:h-44 rounded-full object-cover border-4 border-white dark:border-[#15152a] shadow-[0_0_35px_rgba(99,102,241,0.3)]"
                />

                {/* GitHub Badge */}

                <div className="absolute z-20 -bottom-2 -right-2 w-12 h-12 flex items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-800 to-black border-4 border-white dark:border-[#0c0c1c] shadow-xl">

                  <Github className="w-6 h-6 text-white" />

                </div>

              </motion.div>

              {/* ==================================
                  PROFILE DETAILS
              ================================== */}

              <div className="flex-1 text-center lg:text-left">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-5">

                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                    GitHub Profile Connected
                  </span>

                </div>

                <h3 className="text-3xl md:text-5xl font-black text-zinc-900 dark:text-white mb-3">

                  {data.name || data.login}

                </h3>

                <a
                  href={data.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-lg font-semibold text-indigo-500 dark:text-cyan-400 hover:underline mb-5"
                >

                  <Github className="w-5 h-5" />

                  @{data.login}

                  <ExternalLink className="w-4 h-4" />

                </a>

                {data.bio && (

                  <p className="max-w-2xl text-zinc-500 dark:text-zinc-400 leading-relaxed mb-6">
                    {data.bio}
                  </p>

                )}

                <div className="flex flex-wrap justify-center lg:justify-start gap-3">

                  <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-sm font-medium text-zinc-600 dark:text-zinc-300">

                    <Code2 className="w-4 h-4 text-cyan-500" />

                    Software Development

                  </span>

                  <span className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 dark:bg-white/[0.05] border border-zinc-200 dark:border-white/10 text-sm font-medium text-zinc-600 dark:text-zinc-300">

                    <Cpu className="w-4 h-4 text-purple-500" />

                    Programming

                  </span>

                </div>

              </div>

              {/* ==================================
                  VIEW PROFILE BUTTON
              ================================== */}

              <div className="shrink-0">

                <motion.a
                  href={data.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{
                    scale: 1.06,
                    y: -4
                  }}
                  whileTap={{
                    scale: 0.96
                  }}
                  className="inline-flex items-center gap-3 px-7 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold shadow-xl shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-shadow"
                >

                  <Github className="w-5 h-5" />

                  {t('github.viewProfile')}

                  <ArrowUpRight className="w-5 h-5" />

                </motion.a>

              </div>

            </div>

            {/* Divider */}

            <div className="relative z-10 my-12 h-px bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

            {/* ======================================
                STATISTICS HEADING
            ====================================== */}

            <div className="relative z-10 flex items-center justify-between mb-8">

              <div>

                <div className="flex items-center gap-2 mb-2">

                  <Activity className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />

                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white">
                    GitHub Statistics
                  </h4>

                </div>

                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Live public account information
                </p>

              </div>

              <span className="hidden sm:flex items-center gap-2 text-xs font-semibold text-emerald-500">

                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />

                Live API Data

              </span>

            </div>

            {/* ======================================
                STATISTICS CARDS
            ====================================== */}

            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

              {stats.map((stat, index) => {

                const Icon = stat.icon;

                return (

                  <motion.div
                    key={stat.label}
                    initial={{
                      opacity: 0,
                      y: 40,
                      scale: 0.9
                    }}
                    animate={inView ? {
                      opacity: 1,
                      y: 0,
                      scale: 1
                    } : {}}
                    transition={{
                      duration: 0.7,
                      delay: 0.2 + index * 0.15
                    }}
                    whileHover={{
                      y: -10,
                      scale: 1.03
                    }}
                    className="group relative overflow-hidden rounded-3xl p-7 bg-zinc-100/80 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 hover:border-indigo-400/40 shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-500"
                  >

                    {/* Hover Glow */}

                    <div className={`absolute -right-16 -top-16 w-40 h-40 rounded-full bg-gradient-to-br ${stat.gradient} opacity-0 group-hover:opacity-10 blur-3xl transition-opacity duration-500`} />

                    <div className="relative z-10">

                      <div className="flex items-center justify-between mb-7">

                        <div className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-br ${stat.gradient} shadow-lg`}>

                          <Icon className="w-7 h-7 text-white" />

                        </div>

                        <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                          0{index + 1}
                        </span>

                      </div>

                      <h3 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-3 tabular-nums">

                        <AnimatedCounter value={stat.value} />

                      </h3>

                      <p className="text-base font-bold text-zinc-700 dark:text-zinc-200 mb-2">
                        {stat.label}
                      </p>

                      <p className="text-xs text-zinc-500 dark:text-zinc-500">
                        {stat.description}
                      </p>

                      <div className={`mt-6 h-1 rounded-full bg-gradient-to-r ${stat.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />

                    </div>

                  </motion.div>

                );

              })}

            </div>

            {/* ======================================
                ACCOUNT INFORMATION
            ====================================== */}

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">

              {/* Account Age */}

              <motion.div
                whileHover={{
                  y: -5
                }}
                className="flex items-center gap-5 p-6 rounded-2xl bg-zinc-100/80 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10"
              >

                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 shadow-lg">

                  <CalendarDays className="w-6 h-6 text-white" />

                </div>

                <div>

                  <p className="text-2xl font-black text-zinc-900 dark:text-white">
                    {accountAge}+ Years
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Since joining GitHub
                  </p>

                </div>

              </motion.div>

              {/* Public Profile */}

              <motion.div
                whileHover={{
                  y: -5
                }}
                className="flex items-center gap-5 p-6 rounded-2xl bg-zinc-100/80 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10"
              >

                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 shadow-lg">

                  <Trophy className="w-6 h-6 text-white" />

                </div>

                <div>

                  <p className="text-xl font-black text-zinc-900 dark:text-white">
                    Open Source
                  </p>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400">
                    Public GitHub presence
                  </p>

                </div>

              </motion.div>

            </div>

            {/* ======================================
                BOTTOM PROFILE LINK
            ====================================== */}

            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between gap-5 mt-10 pt-8 border-t border-zinc-200 dark:border-white/10">

              <div className="flex items-center gap-3">

                <Terminal className="w-5 h-5 text-indigo-500 dark:text-cyan-400" />

                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  Building, learning, and sharing through code.
                </p>

              </div>

              <a
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm font-bold text-indigo-500 dark:text-cyan-400 hover:text-purple-500 transition-colors"
              >

                Explore Repositories

                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

              </a>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}
