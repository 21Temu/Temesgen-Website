import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, ArrowRight, X, ArrowLeft } from 'lucide-react';

export default function Projects() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<any>(null);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack e-commerce solution with seamless checkout, inventory management, and modern UI.',
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&q=80',
      tags: ['React', 'Django DRF', 'PostgreSQL'],
      liveUrl: 'https://melakeshop.vercel.app',
      githubUrl: '#',
    },
    {
      title: 'Personal Website',
      description: 'A highly interactive, multi-language personal portfolio with dark mode and dynamic integrations.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      tags: ['React', 'Django DRF', 'PostgreSQL'],
      liveUrl: 'https://abraham-dereje-mekonnen.vercel.app',
      githubUrl: '#',
    },
    {
      title: 'Distance Education Management System',
      description: 'A comprehensive platform for online learning, student tracking, and course management.',
      image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80',
      tags: ['React', 'Django DRF', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
    },
  ];

  return (
    <section id="projects" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{t('projects.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group glass-card rounded-3xl overflow-hidden hover:-translate-y-2 transition-transform duration-300"
              >
                <div className="relative h-64 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                    <button 
                      onClick={() => setSelectedProject(project)} 
                      className="px-6 py-3 bg-white text-black font-bold rounded-full hover:scale-105 transition-transform"
                    >
                      View Project
                    </button>
                  </div>
                </div>
                
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                  <p className="text-zinc-600 dark:text-zinc-400 mb-6 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-sm font-medium bg-zinc-100 dark:bg-zinc-800 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stylish CTA Banner */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-24 relative rounded-3xl overflow-hidden glass-card p-1"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 dark:opacity-40"></div>
            <div className="relative bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl rounded-[22px] p-12 text-center">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">Need a Custom Website?</h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-2xl mx-auto">
                If you need a website, e-commerce platform, or a complex web application, I'm available for freelance work. Let's build something amazing together!
              </p>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-full font-bold text-lg hover:scale-105 transition-transform duration-300"
              >
                Please Contact Me <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setSelectedProject(null)} 
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-6xl h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10">
                <button 
                  onClick={() => setSelectedProject(null)} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium hidden sm:block">Back</span>
                </button>
                <h3 className="text-xl font-bold truncate px-4">{selectedProject.title}</h3>
                <div className="flex items-center gap-2">
                  {selectedProject.liveUrl !== '#' && (
                    <a 
                      href={selectedProject.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      <span className="font-medium hidden sm:block">Open Site</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-6 flex flex-col">
                {selectedProject.liveUrl !== '#' ? (
                  <div className="flex-1 w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-inner bg-white relative">
                    <iframe 
                      src={selectedProject.liveUrl} 
                      className="absolute inset-0 w-full h-full border-0 bg-white" 
                      title={selectedProject.title}
                      sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                    />
                  </div>
                ) : (
                  <div className="flex-1 w-full flex flex-col items-center justify-center gap-8">
                    <img 
                      src={selectedProject.image} 
                      alt={selectedProject.title} 
                      className="max-w-full max-h-[60vh] object-contain rounded-2xl shadow-xl" 
                    />
                    <div className="max-w-2xl text-center">
                      <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-6">
                        {selectedProject.description}
                      </p>
                      <div className="flex flex-wrap justify-center gap-2">
                        {selectedProject.tags.map((tag: string) => (
                          <span key={tag} className="px-4 py-2 text-sm font-medium bg-zinc-200 dark:bg-zinc-800 rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
