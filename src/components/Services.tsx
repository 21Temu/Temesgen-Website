import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Code2, Database, Layout, Smartphone, X, ArrowLeft } from 'lucide-react';

export default function Services() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [selectedService, setSelectedService] = useState<any>(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  const services = [
    {
      title: 'Web Development',
      description: 'Building fast, responsive, and accessible websites using modern frameworks like React and Next.js.',
      definition: 'Web Development involves creating and maintaining websites. It encompasses everything from a simple static page of plain text to complex web applications, electronic businesses, and social network services.',
      whatIWillBuild: 'I will build high-performance, responsive web applications tailored to your business needs. This includes crafting pixel-perfect UIs with React/Vue, ensuring cross-browser compatibility, and optimizing for SEO and speed.',
      icon: Layout,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
    {
      title: 'Backend Development',
      description: 'Designing robust and scalable APIs with Django, DRF, and modern database solutions.',
      definition: 'Backend Development refers to the server-side of an application and everything that communicates between the database and the browser. It focuses on databases, scripting, and website architecture.',
      whatIWillBuild: 'I will architect secure, scalable RESTful APIs using Django REST Framework or Laravel. I will design efficient PostgreSQL database schemas, implement robust authentication, and ensure your server infrastructure can handle high traffic.',
      icon: Database,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
    },
    {
      title: 'Full-stack Solutions',
      description: 'End-to-end application development from database design to frontend implementation.',
      definition: 'Full-Stack Development is the practice of working on both the front-end (client-side) and back-end (server-side) portions of a web application. It requires a comprehensive understanding of the entire development process.',
      whatIWillBuild: 'I will deliver a complete, end-to-end product. From setting up the database and server logic to building a dynamic, interactive user interface, I handle the entire lifecycle to bring your vision to life seamlessly.',
      icon: Code2,
      color: 'text-pink-500',
      bg: 'bg-pink-500/10',
    },
    {
      title: 'UI/UX Design',
      description: 'Creating intuitive and visually stunning user interfaces with a focus on user experience.',
      definition: 'UI (User Interface) Design focuses on the visual elements of an application, while UX (User Experience) Design focuses on the overall feel and usability. Together, they ensure a product is both beautiful and easy to use.',
      whatIWillBuild: 'I will design modern, user-centric interfaces that not only look stunning but also provide an intuitive journey for your users. This includes wireframing, prototyping, and creating a cohesive design system for your brand.',
      icon: Smartphone,
      color: 'text-orange-500',
      bg: 'bg-orange-500/10',
    },
  ];

  return (
    <section id="services" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{t('services.title')}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setSelectedService(service)}
                className="glass-card p-8 rounded-3xl hover:-translate-y-2 transition-transform duration-300 group cursor-pointer"
              >
                <div className={`w-16 h-16 rounded-2xl ${service.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-8 h-8 ${service.color}`} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Service Modal */}
      <AnimatePresence>
        {selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          >
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm" 
              onClick={() => setSelectedService(null)} 
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl overflow-hidden flex flex-col"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 z-10">
                <button 
                  onClick={() => setSelectedService(null)} 
                  className="flex items-center gap-2 px-4 py-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span className="font-medium hidden sm:block">Back</span>
                </button>
                <div className="flex items-center gap-3 px-4">
                  <div className={`w-8 h-8 rounded-lg ${selectedService.bg} flex items-center justify-center`}>
                    <selectedService.icon className={`w-4 h-4 ${selectedService.color}`} />
                  </div>
                  <h3 className="text-xl font-bold truncate">{selectedService.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setSelectedService(null)} 
                    className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="flex-1 overflow-auto bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-8 flex flex-col gap-8">
                <div>
                  <h4 className="text-lg font-bold mb-3 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                    Definition
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    {selectedService.definition}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg font-bold mb-3 text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                    What I Will Build
                  </h4>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-zinc-100 dark:border-zinc-800 shadow-sm">
                    {selectedService.whatIWillBuild}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
