import { useTranslation } from 'react-i18next';
import { Github, Linkedin, MessageCircle, Send } from 'lucide-react';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: Github, href: 'https://github.com/21Temu' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'TikTok', icon: MessageCircle, href: '#' },
    { name: 'Telegram', icon: Send, href: 'https://t.me/abu_orthodox' },
  ];

  return (
    <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-2xl font-bold tracking-tighter">
          TM<span className="text-blue-500">.</span>
        </div>
        
        <div className="flex items-center gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-blue-500 transition-colors"
              title={link.name}
            >
              <link.icon className="w-6 h-6" />
            </a>
          ))}
        </div>
        
        <div className="text-zinc-500 text-sm">
          &copy; {currentYear} Temesgen Minwyelet. {t('footer.rights')}
        </div>
      </div>
    </footer>
  );
}
