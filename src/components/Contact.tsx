import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import { Send, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const { t } = useTranslation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      toast.error("Email service not configured. Please add VITE_WEB3FORMS_ACCESS_KEY to your secrets.");
      setIsSubmitting(false);
      return;
    }

    const object = Object.fromEntries(formData);
    const json = JSON.stringify({
      ...object,
      access_key: accessKey,
      subject: "New Contact Form Submission from Portfolio"
    });

    try {
      console.log("Sending email via Web3Forms...");
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      });

      const data = await response.json();
      console.log("Web3Forms response:", data);

      if (response.status === 200) {
        toast.success(t('contact.success'));
        (e.target as HTMLFormElement).reset();
      } else {
        console.error("Web3Forms error:", data);
        toast.error(data.message || t('contact.error'));
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">{t('contact.title')}</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl font-bold mb-6">Let's talk about your next project.</h3>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12">
                I'm currently available for freelance work and full-time opportunities. 
                If you have a project that needs some creative touch, I'd love to hear about it.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-medium">Email</p>
                    <a href="mailto:temuclassic986@gmail.com" className="text-lg font-bold hover:text-blue-500 transition-colors">
                      temuclassic986@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm text-zinc-500 font-medium">Phone</p>
                    <a href="tel:0993702920" className="text-lg font-bold hover:text-purple-500 transition-colors">
                      0993702920 / 0983063679
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="glass-card p-8 rounded-3xl">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">{t('contact.name')}</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">{t('contact.email')}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">{t('contact.message')}</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    className="w-full px-4 py-3 rounded-xl bg-white/50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-bold text-lg hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? t('contact.sending') : t('contact.send')}
                  {!isSubmitting && <Send className="w-5 h-5" />}
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
