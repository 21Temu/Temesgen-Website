import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Briefcase, GraduationCap } from 'lucide-react';

export default function Experience() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  const experiences = [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Innovators Inc.',
      date: `2017 - ${t('experience.present')}`,
      description: 'Leading frontend development for enterprise applications. Architecting scalable solutions using React and Next.js.',
      icon: Briefcase,
    },
    {
      title: 'Full Stack Developer',
      company: 'Digital Solutions LLC',
      date: '2018',
      description: 'Developed and maintained multiple client projects. Implemented RESTful APIs and responsive UI components.',
      icon: Briefcase,
    },
    {
      title: 'BSc in Computer Science',
      company: 'Addis Ababa University',
      date: '2014 - 2019',
      description: 'Graduated with honors. Specialized in Software Engineering and Algorithms.',
      icon: GraduationCap,
    },
  ];

  return (
    <section id="experience" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{t('experience.title')}</h2>
          
          <div className="relative border-l-2 border-blue-500/30 ml-4 md:ml-0 md:left-1/2 md:-translate-x-1/2 space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col md:flex-row items-center ${
                  index % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-[-9px] md:left-1/2 md:-translate-x-1/2 w-4 h-4 rounded-full bg-blue-500 border-4 border-white dark:border-zinc-950 z-10"></div>
                
                {/* Content */}
                <div className={`w-full md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 text-left md:text-right' : 'md:pl-12 text-left'}`}>
                  <div className="glass-card p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                    <div className={`flex items-center gap-3 mb-2 ${index % 2 === 0 ? 'md:justify-end' : ''}`}>
                      <exp.icon className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-bold text-blue-500">{exp.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                    <h4 className="text-zinc-500 font-medium mb-4">{exp.company}</h4>
                    <p className="text-zinc-600 dark:text-zinc-400">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
