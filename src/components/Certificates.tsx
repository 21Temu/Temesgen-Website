import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Award, ExternalLink, X, ArrowLeft } from 'lucide-react';

export default function Certificates() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedCert, setSelectedCert] = useState<any>(null);

  useEffect(() => {
    if (selectedCert) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedCert]);

  const certificates = [
    {
      title: 'Advanced React Patterns & State Management',
      issuer: 'Frontend Masters',
      date: '2023',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
      icon: '⚛️',
      link: '#'
    },
    {
      title: 'Django & Django REST Framework Masterclass',
      issuer: 'Udemy',
      date: '2022',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&q=80',
      icon: '🐍',
      link: '#'
    },
    {
      title: 'PostgreSQL Database Administration & Design',
      issuer: 'Coursera',
      date: '2021',
      image: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&q=80',
      icon: '🐘',
      link: '#'
    }
  ];

  return (
    <section id="certificates" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Certificates</h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
              Continuous learning and professional certifications in modern web technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="group relative rounded-3xl overflow-hidden glass-card p-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative bg-white dark:bg-zinc-900 rounded-[22px] overflow-hidden h-full flex flex-col">
                  {/* Image Header */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={cert.image} 
                      alt={cert.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-2xl border border-white/20 shadow-xl">
                      {cert.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-sm text-blue-500 font-semibold mb-3">
                      <Award className="w-4 h-4" />
                      <span>{cert.issuer}</span>
                      <span className="text-zinc-400 dark:text-zinc-600 mx-1">•</span>
                      <span className="text-zinc-500 dark:text-zinc-400">{cert.date}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-4 leading-tight group-hover:text-blue-500 transition-colors">
                      {cert.title}
                    </h3>
                    
                    <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800">
                      <button 
                        onClick={() => setSelectedCert(cert)}
                        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      >
                        View Credential <ExternalLink className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Certificate Modal */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setSelectedCert(null)} 
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10">
                <button 
                  onClick={() => setSelectedCert(null)} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium hidden sm:block">Back</span>
                </button>
                <h3 className="text-xl font-bold truncate px-4">{selectedCert.title}</h3>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedCert(null)} 
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto bg-zinc-100 dark:bg-zinc-950 p-4 sm:p-6 flex flex-col items-center justify-center">
                <img 
                  src={selectedCert.image} 
                  alt={selectedCert.title} 
                  className="max-w-full max-h-[70vh] object-contain rounded-xl shadow-lg" 
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
