import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';

export default function About() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://api.github.com/users/21Temu')
      .then((res) => res.json())
      .then((data) => {
        if (data.avatar_url) {
          setAvatarUrl(data.avatar_url);
        }
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const skills = [
    { name: 'React', level: 100 },
    { name: 'Vue.js', level: 100 },
    { name: 'Django / DRF', level: 100 },
    { name: 'Laravel', level: 100 },
    { name: 'UI/UX Design', level: 100 },
  ];

  const softSkills = [
    'Communication',
    'Teamwork & Collaboration',
    'Problem Solving',
    'Time Management',
    'Adaptability',
    'Leadership'
  ];

  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
        >
          {/* Image Section */}
          <div className="lg:col-span-4 relative flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden glass-card p-2 z-10 border-4 border-white/50 dark:border-zinc-800/50 shadow-2xl">
              {isLoading ? (
                <div className="w-full h-full rounded-full bg-zinc-200/50 dark:bg-zinc-800/50 animate-pulse"></div>
              ) : (
                <img 
                  src={avatarUrl || "https://images.unsplash.com/photo-1549692520-acc6669e2f0c?w=800&q=80"} 
                  alt="Temesgen Minwyelet" 
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full pointer-events-none"></div>
            </div>
            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-3xl z-0"></div>
          </div>

          {/* Text & Skills Section */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">{t('about.title')}</h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                {t('about.story')}
              </p>
            </div>

            <div className="glass-card p-8 rounded-3xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {/* Technical Skills */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">{t('about.skills')}</h3>
                  <div className="space-y-6">
                    {skills.map((skill, index) => (
                      <div key={skill.name}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-zinc-500">{skill.level}%</span>
                        </div>
                        <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={inView ? { width: `${skill.level}%` } : {}}
                            transition={{ duration: 1, delay: index * 0.1 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Soft Skills */}
                <div>
                  <h3 className="text-2xl font-bold mb-6">Soft Skills</h3>
                  <div className="flex flex-wrap gap-3">
                    {softSkills.map((skill) => (
                      <span 
                        key={skill} 
                        className="px-4 py-3 bg-white/50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-xl font-medium text-sm hover:scale-105 transition-transform cursor-default shadow-sm flex-grow text-center"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
