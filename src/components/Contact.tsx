import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform
} from 'motion/react';
import { useInView } from 'react-intersection-observer';
import {
  Send,
  Mail,
  Phone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  MessageCircle,
  Clock,
  Globe,
  Loader2,
  AlertCircle,
  Copy,
  ExternalLink,
  Code2,
  Terminal
} from 'lucide-react';
import { toast } from 'sonner';

type SubmissionStatus = 'idle' | 'success' | 'error';

const CONTACT_EMAIL = 'temuclassic986@gmail.com';
const CONTACT_PHONES = ['0993702920', '0983063679'];
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '';

export default function Contact() {
  const { t } = useTranslation();
  const sectionRef = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    if (!WEB3FORMS_ACCESS_KEY) {
      toast.error('Contact form is not configured. Please email me directly.');
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || '').trim();
    const message = String(formData.get('message') || '').trim();

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

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmissionStatus('success');
        toast.success(t('contact.success'));
        form.reset();
      } else {
        setSubmissionStatus('error');
        toast.error(data.message || t('contact.error'));
      }
    } catch (error) {
      console.error('Contact form submission error:', error);
      setSubmissionStatus('error');
      toast.error(t('contact.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      label: 'Email Address',
      value: CONTACT_EMAIL,
      href: `mailto:${CONTACT_EMAIL}`,
      badgeClass: 'bg-indigo-600 text-white'
    },
    {
      icon: Phone,
      label: 'Phone Number',
      value: CONTACT_PHONES.join(' / '),
      href: `tel:${CONTACT_PHONES[0]}`,
      badgeClass: 'bg-violet-600 text-white'
    }
  ];

  const contactLogs = [
    '0xM01  web3forms.endpoint [READY]',
    '10110  tls: encrypted · spam guard on',
    '0x6C4  response: open to projects'
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      onMouseMove={handlePointerMove}
      onMouseLeave={handlePointerLeave}
      style={{ perspective: '1250px' }}
      className="relative py-20 bg-white text-slate-900 overflow-hidden border-t border-slate-100"
    >
      {/* ======================================
          SOFTWARE 3D ANIMATED BACKGROUND
      ====================================== */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-24 left-[14%] w-[440px] h-[440px] rounded-full bg-indigo-200/35 blur-[120px]"
        />
        <motion.div
          style={{ x: depthFrontX, y: depthFrontY }}
          animate={{ scale: [1.08, 0.95, 1.08] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-12 right-[10%] w-[420px] h-[420px] rounded-full bg-emerald-200/30 blur-[120px]"
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

        {/* Floating 3D Wireframe Node */}
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
          0xMSG
        </motion.div>

        {/* Software Telemetry Streams */}
        <motion.div
          style={{ x: depthBackX, y: depthBackY }}
          className="hidden xl:flex flex-col gap-2 absolute top-28 right-[24%] font-mono text-[11px] text-slate-600/80"
        >
          {contactLogs.map((line, idx) => (
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
          MAIN CONTENT
      ====================================== */}
      <div ref={ref} className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Centered Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-200 bg-indigo-50/90 text-indigo-700 text-xs font-mono font-semibold mb-3.5">
            <MessageCircle className="w-3.5 h-3.5" />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 mb-3.5">
            {t('contact.title')}{' '}
            <span className="text-indigo-600">Let&apos;s Connect.</span>
          </h2>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed">
            Have a project idea, technical question, or collaboration opportunity? Send a message or reach out directly.
          </p>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Compact Direct Contact & Info */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-4"
          >
            <div className="rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-5 shadow-2xs">
              <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Let&apos;s Talk</span>
              </div>

              <h3 className="text-xl font-black text-slate-900 mb-1.5">
                Start a conversation about your next build.
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                Open to full-stack web projects, REST APIs, and software engineering opportunities.
              </p>

              <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/80 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-slate-900">
                    Open to Opportunities
                  </p>
                  <p className="text-xs text-slate-600">
                    Available for suitable projects and roles.
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Contact Method Cards */}
            <div className="space-y-3">
              {contactMethods.map((method) => {
                const Icon = method.icon;
                return (
                  <a
                    key={method.label}
                    href={method.href}
                    className="group flex items-center gap-3.5 p-4 rounded-2xl border border-slate-200/90 bg-white/95 hover:border-indigo-300 hover:shadow-xs transition-all duration-200"
                  >
                    <div
                      className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${method.badgeClass}`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        {method.label}
                      </p>
                      <p className="text-xs sm:text-sm font-bold text-slate-900 break-all">
                        {method.value}
                      </p>
                    </div>

                    <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 shrink-0 transition-colors" />
                  </a>
                );
              })}
            </div>

            {/* Copy Email Action */}
            <button
              type="button"
              onClick={copyEmail}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl border border-indigo-200 bg-indigo-50/80 text-indigo-700 font-semibold text-xs hover:bg-indigo-100/80 transition-colors"
            >
              {copiedEmail ? (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
            </button>

            {/* Compact Quick Info Tiles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-white/95">
                <Clock className="w-4 h-4 text-indigo-600 mb-1.5" />
                <h4 className="text-xs sm:text-sm font-black text-slate-900">
                  Flexible Communication
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Reach out by email or phone.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-slate-200/90 bg-white/95">
                <Globe className="w-4 h-4 text-emerald-600 mb-1.5" />
                <h4 className="text-xs sm:text-sm font-black text-slate-900">
                  Remote Friendly
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Open to remote collaboration.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Compact Contact / Message Card */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 max-w-xl w-full mx-auto lg:ml-auto rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md shadow-xs overflow-hidden"
          >
            <div className="px-5 py-4 border-b border-slate-200/80 bg-slate-50/70 flex items-center justify-between gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 font-mono text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                  <Terminal className="w-3 h-3" />
                  <span>Contact Form</span>
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900">
                  Send Me a Message
                </h3>
              </div>

              <div className="w-9 h-9 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0">
                <Send className="w-4 h-4" />
              </div>
            </div>

            <div className="p-5 sm:p-6">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-3.5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10 transition-all"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
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
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    maxLength={150}
                    placeholder="What would you like to discuss?"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10 transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5"
                  >
                    {t('contact.message')} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={10}
                    maxLength={3000}
                    rows={4}
                    placeholder="Tell me about your project, idea, or opportunity..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:bg-white focus:border-indigo-600 focus:ring-3 focus:ring-indigo-600/10 transition-all resize-none"
                  />
                  <p className="font-mono text-[10px] text-slate-500 mt-1">
                    Minimum 10 characters required.
                  </p>
                </div>

                {/* Honeypot Spam Protection */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="botcheck">Leave this field empty</label>
                  <input
                    type="checkbox"
                    id="botcheck"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <AnimatePresence>
                  {submissionStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-emerald-800 text-xs sm:text-sm">
                          Message sent successfully!
                        </p>
                        <p className="text-xs text-emerald-700 mt-0.5">
                          Thank you for reaching out. Your message has been submitted.
                        </p>
                      </div>
                    </motion.div>
                  )}

                  {submissionStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 border border-red-200"
                    >
                      <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                      <div>
                        <p className="font-bold text-red-800 text-xs sm:text-sm">
                          Message could not be sent.
                        </p>
                        <p className="text-xs text-red-700 mt-0.5">
                          Please try again or contact me directly by email.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-5 rounded-xl bg-slate-900 hover:bg-indigo-600 text-white font-bold text-xs sm:text-sm transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{t('contact.sending')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('contact.send')}</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>

                <p className="text-center text-[11px] text-slate-500">
                  Your information is only used to respond to your message.
                </p>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.25 }}
          className="mt-12 rounded-2xl border border-slate-200/90 bg-white/95 backdrop-blur-md p-6 sm:p-7 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-5"
        >
          <div className="flex items-start gap-3.5 max-w-2xl">
            <div className="w-11 h-11 rounded-xl bg-indigo-600 text-white flex items-center justify-center shrink-0">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <span className="block font-mono text-[11px] font-bold uppercase tracking-wider text-indigo-600 mb-0.5">
                Let&apos;s Create Something
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                Your Next Big Idea Starts Here.
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                Turn your project goals into clean, dependable web and backend software.
              </p>
            </div>
          </div>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold text-xs sm:text-sm hover:bg-indigo-600 transition-colors shrink-0"
          >
            <span>Email Me</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}