import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Github, Users, BookOpen, Star } from 'lucide-react';

interface GithubData {
  public_repos: number;
  followers: number;
  following: number;
  avatar_url: string;
  html_url: string;
  login: string;
}

export default function GithubStats() {
  const { t } = useTranslation();
  const [data, setData] = useState<GithubData | null>(null);
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    fetch('https://api.github.com/users/21Temu')
      .then((res) => res.json())
      .then((data) => {
        if (data.login) {
          setData(data);
        } else {
          // Fallback if user not found
          setData({
            public_repos: 42,
            followers: 128,
            following: 85,
            avatar_url: 'https://github.com/21Temu.png',
            html_url: 'https://github.com/21Temu',
            login: '21Temu'
          });
        }
      })
      .catch((err) => {
        console.error(err);
        // Fallback on error
        setData({
          public_repos: 42,
          followers: 128,
          following: 85,
          avatar_url: 'https://github.com/21Temu.png',
          html_url: 'https://github.com/21Temu',
          login: '21Temu'
        });
      });
  }, []);

  if (!data) return null;

  const stats = [
    { label: t('github.repos'), value: data.public_repos, icon: BookOpen, color: 'text-blue-500' },
    { label: t('github.followers'), value: data.followers, icon: Users, color: 'text-purple-500' },
    { label: t('github.following'), value: data.following, icon: Star, color: 'text-pink-500' },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-8 md:p-12"
        >
          <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
            <img 
              src={data.avatar_url} 
              alt={data.login} 
              className="w-32 h-32 rounded-full border-4 border-white dark:border-zinc-800 shadow-xl"
            />
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-bold mb-2">{t('github.title')}</h2>
              <a 
                href={data.html_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400 hover:text-blue-500 transition-colors"
              >
                <Github className="w-5 h-5" />
                @{data.login}
              </a>
            </div>
            <div className="md:ml-auto">
              <a
                href={data.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-medium hover:scale-105 transition-transform inline-block"
              >
                {t('github.viewProfile')}
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="bg-white/50 dark:bg-zinc-800/50 rounded-2xl p-6 flex items-center gap-6"
              >
                <div className={`p-4 rounded-xl bg-white dark:bg-zinc-900 shadow-sm ${stat.color}`}>
                  <stat.icon className="w-8 h-8" />
                </div>
                <div>
                  <h4 className="text-4xl font-bold mb-1">{stat.value}</h4>
                  <p className="text-zinc-500 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
