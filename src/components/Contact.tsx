
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  Send,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Clock,
  Globe,
  Github,
  Linkedin,
  Loader2,
  AlertCircle,
  Copy,
  ExternalLink,
  Code2,
  Zap
} from 'lucide-react';
import { toast } from 'sonner';

// ==========================================
// TYPES
// ==========================================

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

type SubmissionStatus = 'idle' | 'success' | 'error';

// ==========================================
// CONTACT INFORMATION
// ==========================================

const CONTACT_EMAIL = 'temuclassic986@gmail.com';

const CONTACT_PHONES = [
  '0993702920',
  '0983063679'
];

// Configure VITE_WEB3FORMS_ACCESS_KEY in your frontend .env file.
// Remember: Vite variables are public in the browser bundle.
const WEB3FORMS_ACCESS_KEY =
  import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function Contact() {

  const { t } = useTranslation();

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>('idle');

  const [copiedEmail, setCopiedEmail] = useState(false);

  const formRef = useRef<HTMLFormElement>(null);

  // ==========================================
  // COPY EMAIL
  // ==========================================

  const copyEmail = async () => {

    try {

      await navigator.clipboard.writeText(CONTACT_EMAIL);

      setCopiedEmail(true);

      toast.success('Email address copied!');

      setTimeout(() => {
        setCopiedEmail(false);
      }, 2000);

    } catch {

      toast.error('Unable to copy email address.');

    }

  };

  // ==========================================
  // FORM SUBMISSION
  // ==========================================

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {

    event.preventDefault();

    if (isSubmitting) return;

    if (!WEB3FORMS_ACCESS_KEY) {

      toast.error(
        'Contact form is not configured. Please email me directly.'
      );

      return;

    }

    const form = event.currentTarget;

    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

    // Basic validation

    if (!name || !email || !message) {

      toast.error('Please complete all required fields.');

      return;

    }

    if (name.length < 2) {

      toast.error('Please enter a valid name.');

      return;

    }

    if (message.length < 10) {

      toast.error('Your message must contain at least 10 characters.');

      return;

    }

    setIsSubmitting(true);

    setSubmissionStatus('idle');

    try {

      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name,
        email,
        subject: subject || 'New Portfolio Contact Message',
        message,
        from_name: 'Portfolio Contact Form',
        botcheck: formData.get('botcheck') || ''
      };

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json'
          },
          body: JSON.stringify(payload)
        }
      );

      const data = await response.json();

      if (response.ok && data.success) {

        setSubmissionStatus('success');

        toast.success(t('contact.success'));

        form.reset();

      } else {

        setSubmissionStatus('error');

        toast.error(
          data.message || t('contact.error')
        );

      }

    } catch (error) {

      console.error('Contact form submission error:', error);

      setSubmissionStatus('error');

      toast.error(t('contact.error'));

    } finally {

      setIsSubmitting(false);

    }

  };

  // ==========================================
  // CONTACT LINKS
  // ==========================================

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email Address',
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      action: 'Send an email'
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: CONTACT_PHONES.join(' / '),
      href: `tel:${CONTACT_PHONES[0]}`,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      action: 'Call me'
    }
  ];

  // ==========================================
  // RENDER
  // ==========================================

  return (

    <section
      id="contact"
      className="relative py-28 md:py-36 overflow-hidden bg-zinc-50 dark:bg-[#080812] transition-colors duration-500"
    >

      {/* ======================================
          BACKGROUND EFFECTS
      ====================================== */}

      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{
            x: [0, 50, -30, 0],
            y: [0, -40, 30, 0],
            scale: [1, 1.15, 0.9, 1]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute -top-48 -left-48 w-[550px] h-[550px] rounded-full bg-blue-500/10 blur-[150px]"
        />

        <motion.div
          animate={{
            x: [0, -50, 30, 0],
            y: [0, 40, -30, 0],
            scale: [1, 0.9, 1.15, 1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-1/3 -right-48 w-[550px] h-[550px] rounded-full bg-purple-500/10 blur-[150px]"
        />

        <div
          className="absolute inset-0 opacity-[0.035] dark:opacity-[0.06]"
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
          MAIN CONTENT
      ====================================== */}

      <div
        ref={ref}
        className="relative z-10 max-w-7xl mx-auto px-6"
      >

        {/* ======================================
            SECTION HEADER
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >

          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-7">

            <MessageCircle className="w-4 h-4 text-blue-500" />

            <span className="text-xs font-bold uppercase tracking-[0.25em] text-blue-600 dark:text-blue-400">

              Get In Touch

            </span>

          </div>

          <h2 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-zinc-900 dark:text-white mb-7">

            {t('contact.title')}

            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">

              Let's Connect.

            </span>

          </h2>

          <p className="max-w-2xl mx-auto text-base md:text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">

            Have a project idea, a question, or an opportunity? I'd be happy to hear from you. Let's create something meaningful together.

          </p>

          <div className="flex items-center justify-center gap-3 mt-9">

            <div className="w-12 h-px bg-gradient-to-r from-transparent to-blue-500" />

            <div className="w-2 h-2 rounded-full bg-blue-500" />

            <div className="w-20 h-1 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400" />

            <div className="w-2 h-2 rounded-full bg-purple-500" />

            <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500" />

          </div>

        </motion.div>

        {/* ======================================
            CONTACT GRID
        ====================================== */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* ======================================
              LEFT SIDE
          ====================================== */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="space-y-9"
          >

            {/* INTRODUCTION */}

            <div>

              <div className="flex items-center gap-3 mb-6">

                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">

                  <Sparkles className="w-6 h-6 text-white" />

                </div>

                <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">

                  Let's Talk

                </span>

              </div>

              <h3 className="text-3xl md:text-4xl font-black leading-tight text-zinc-900 dark:text-white mb-6">

                Let's talk about your next project.

              </h3>

              <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-8">

                I'm interested in software development opportunities and exciting projects. If you have an idea or want to discuss a collaboration, feel free to reach out.

              </p>

            </div>

            {/* AVAILABILITY CARD */}

            <div className="relative overflow-hidden p-6 rounded-3xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10">

              <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-emerald-500/10 blur-3xl" />

              <div className="relative flex items-center gap-4">

                <div className="relative">

                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center">

                    <CheckCircle2 className="w-7 h-7 text-emerald-500" />

                  </div>

                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-4 border-white dark:border-[#11111e]" />

                </div>

                <div>

                  <h4 className="font-black text-zinc-900 dark:text-white">

                    Open to Opportunities

                  </h4>

                  <p className="text-sm text-zinc-500 mt-1">

                    Feel free to contact me about suitable projects.

                  </p>

                </div>

              </div>

            </div>

            {/* CONTACT METHODS */}

            <div className="space-y-4">

              {contactMethods.map((method, index) => {

                const Icon = method.icon;

                return (

                  <motion.a
                    key={method.label}
                    href={method.href}
                    initial={{ opacity: 0, y: 25 }}
                    animate={inView ? {
                      opacity: 1,
                      y: 0
                    } : {}}
                    transition={{
                      duration: 0.5,
                      delay: 0.35 + index * 0.15
                    }}
                    whileHover={{ x: 7 }}
                    className="group flex items-center gap-5 p-5 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/5 transition-all duration-300"
                  >

                    <div className={`w-14 h-14 rounded-2xl ${method.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>

                      <Icon className={`w-6 h-6 ${method.color}`} />

                    </div>

                    <div className="flex-1 min-w-0">

                      <p className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">

                        {method.label}

                      </p>

                      <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white break-all">

                        {method.value}

                      </p>

                    </div>

                    <ExternalLink className="w-5 h-5 flex-shrink-0 text-zinc-400 group-hover:text-blue-500 transition-colors" />

                  </motion.a>

                );

              })}

            </div>

            {/* COPY EMAIL */}

            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 font-bold text-sm hover:bg-blue-500/20 transition-colors"
            >

              {copiedEmail ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}

              {copiedEmail ? 'Copied!' : 'Copy Email Address'}

            </button>

            {/* QUICK INFORMATION */}

            <div className="grid grid-cols-2 gap-4">

              <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10">

                <Clock className="w-6 h-6 text-purple-500 mb-3" />

                <h4 className="font-black text-zinc-900 dark:text-white text-sm">

                  Flexible Communication

                </h4>

                <p className="text-xs text-zinc-500 mt-2 leading-5">

                  Reach out through email or phone.

                </p>

              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10">

                <Globe className="w-6 h-6 text-cyan-500 mb-3" />

                <h4 className="font-black text-zinc-900 dark:text-white text-sm">

                  Remote Friendly

                </h4>

                <p className="text-xs text-zinc-500 mt-2 leading-5">

                  Open to discussing remote projects.

                </p>

              </div>

            </div>

          </motion.div>

          {/* ======================================
              RIGHT SIDE - CONTACT FORM
          ====================================== */}

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.8,
              delay: 0.3
            }}
            className="relative"
          >

            {/* GRADIENT BORDER */}

            <div className="absolute -inset-[1px] rounded-[32px] bg-gradient-to-br from-blue-500/50 via-purple-500/30 to-cyan-500/50 blur-[1px]" />

            <div className="relative overflow-hidden rounded-[31px] bg-white dark:bg-[#11111e] border border-zinc-200 dark:border-white/10 shadow-2xl">

              {/* FORM HEADER */}

              <div className="relative overflow-hidden p-7 md:p-9 bg-gradient-to-br from-blue-600 to-purple-700">

                <div className="absolute -top-16 -right-16 w-52 h-52 rounded-full border border-white/10" />

                <div className="absolute -bottom-24 -right-5 w-64 h-64 rounded-full border border-white/10" />

                <div className="relative z-10">

                  <div className="flex items-center gap-3 mb-5">

                    <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-lg flex items-center justify-center">

                      <Send className="w-6 h-6 text-white" />

                    </div>

                    <span className="text-xs font-black uppercase tracking-[0.2em] text-white/80">

                      Contact Form

                    </span>

                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-white mb-3">

                    Send Me a Message

                  </h3>

                  <p className="text-sm text-white/75 leading-6">

                    Fill out the form below and I'll receive your message directly.

                  </p>

                </div>

              </div>

              {/* FORM BODY */}

              <div className="p-6 sm:p-8 md:p-9">

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >

                  {/* NAME */}

                  <div>

                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                    >

                      {t('contact.name')} *

                    </label>

                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      minLength={2}
                      maxLength={100}
                      placeholder="Enter your full name"
                      autoComplete="name"
                      className="w-full px-5 py-4 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />

                  </div>

                  {/* EMAIL */}

                  <div>

                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                    >

                      {t('contact.email')} *

                    </label>

                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      maxLength={150}
                      placeholder="your@email.com"
                      autoComplete="email"
                      className="w-full px-5 py-4 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />

                  </div>

                  {/* SUBJECT */}

                  <div>

                    <label
                      htmlFor="subject"
                      className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                    >

                      Subject

                    </label>

                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      maxLength={150}
                      placeholder="What would you like to discuss?"
                      className="w-full px-5 py-4 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all"
                    />

                  </div>

                  {/* MESSAGE */}

                  <div>

                    <label
                      htmlFor="message"
                      className="block text-sm font-bold text-zinc-800 dark:text-zinc-200 mb-2"
                    >

                      {t('contact.message')} *

                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      minLength={10}
                      maxLength={3000}
                      rows={5}
                      placeholder="Tell me about your project, idea, or opportunity..."
                      className="w-full px-5 py-4 rounded-xl bg-zinc-50 dark:bg-white/[0.04] border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all resize-none"
                    />

                    <p className="text-xs text-zinc-500 mt-2">

                      Please provide at least 10 characters.

                    </p>

                  </div>

                  {/* HONEYPOT SPAM PROTECTION */}

                  <div className="hidden" aria-hidden="true">

                    <label htmlFor="botcheck">

                      Leave this field empty

                    </label>

                    <input
                      type="checkbox"
                      id="botcheck"
                      name="botcheck"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                  </div>

                  {/* SUBMISSION STATUS */}

                  <AnimatePresence>

                    {submissionStatus === 'success' && (

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
                      >

                        <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />

                        <div>

                          <p className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">

                            Message sent successfully!

                          </p>

                          <p className="text-xs text-emerald-600/80 dark:text-emerald-400/80 mt-1">

                            Thank you for reaching out. Your message has been submitted.

                          </p>

                        </div>

                      </motion.div>

                    )}

                    {submissionStatus === 'error' && (

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20"
                      >

                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />

                        <div>

                          <p className="font-bold text-red-600 dark:text-red-400 text-sm">

                            Message could not be sent.

                          </p>

                          <p className="text-xs text-red-600/80 dark:text-red-400/80 mt-1">

                            Please try again or contact me directly by email.

                          </p>

                        </div>

                      </motion.div>

                    )}

                  </AnimatePresence>

                  {/* SUBMIT BUTTON */}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                    className="relative overflow-hidden w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-[length:200%_100%] hover:bg-right text-white font-black text-base shadow-xl shadow-blue-500/20 transition-all duration-500 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >

                    {isSubmitting ? (

                      <>

                        <Loader2 className="w-5 h-5 animate-spin" />

                        {t('contact.sending')}

                      </>

                    ) : (

                      <>

                        {t('contact.send')}

                        <Send className="w-5 h-5" />

                      </>

                    )}

                  </motion.button>

                  {/* PRIVACY NOTE */}

                  <p className="text-center text-xs text-zinc-500 leading-6">

                    Your information will only be used to respond to your message.

                  </p>

                </form>

              </div>

            </div>

          </motion.div>

        </div>

        {/* ======================================
            BOTTOM CTA
        ====================================== */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.6
          }}
          className="mt-24"
        >

          <div className="relative overflow-hidden rounded-[30px] p-[1px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400">

            <div className="relative overflow-hidden rounded-[29px] bg-white dark:bg-[#11111e] p-8 md:p-12">

              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-purple-500/10 blur-[100px]" />

              <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-blue-500/10 blur-[100px]" />

              <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">

                <div className="text-center md:text-left">

                  <div className="flex items-center justify-center md:justify-start gap-2 mb-4">

                    <Code2 className="w-5 h-5 text-blue-500" />

                    <span className="text-xs font-black uppercase tracking-[0.2em] text-blue-500">

                      Let's Create Something

                    </span>

                  </div>

                  <h3 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white mb-3">

                    Your Next Big Idea Starts Here.

                  </h3>

                  <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xl leading-7">

                    Let's turn your ideas into useful, creative, and powerful digital solutions.

                  </p>

                </div>

                <motion.a
                  href={`mailto:${CONTACT_EMAIL}`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex-shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black shadow-xl"
                >

                  Email Me

                  <ArrowRight className="w-5 h-5" />

                </motion.a>

              </div>

            </div>

          </div>

        </motion.div>

      </div>

    </section>

  );

}
