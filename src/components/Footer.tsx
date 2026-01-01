import { useRouter } from '../hooks/useRouter';
import { Instagram, Linkedin, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  const { navigate } = useRouter();

  const navigation = [
    { label: 'All', path: '/' },
    { label: 'Posters', path: '/posters' },
    { label: 'Brand Identity', path: '/brand-identity' },
    { label: 'Video', path: '/video' },
    { label: 'About Me', path: '/about' },
  ];

  const skills = [
    'Graphic Designing',
    'Brand Identity Systems',
    'Posters & Visual Communication',
    'Performance Marketing',
  ];

  const socials = [
    { icon: Instagram, label: 'Instagram' },
    { icon: Linkedin, label: 'LinkedIn' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Mail, label: 'Email' },
  ];

  return (
    <footer className="relative bg-black border-t border-white/10">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
          <div>
            <h3 className="text-2xl font-light tracking-tight text-white mb-6">
              GRAPHIC GREEDY
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Where visual excellence meets conversion-focused strategy.
              Creating brands that look premium, communicate clearly,
              and perform commercially.
            </p>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">
              Navigation
            </h4>
            <nav className="space-y-3">
              {navigation.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className="block text-white/70 hover:text-white transition-colors text-sm"
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-white/40 mb-6">
              Expertise
            </h4>
            <ul className="space-y-3">
              {skills.map((skill) => (
                <li key={skill} className="text-white/70 text-sm">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4">
            {socials.map((social) => (
              <button
                key={social.label}
                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all hover:scale-110"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4" />
              </button>
            ))}
          </div>

          <p className="text-white/40 text-xs">
            © 2024 Graphic Greedy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
