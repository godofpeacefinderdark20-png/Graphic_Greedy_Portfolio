import { useRouter } from '../hooks/useRouter';

export default function Header() {
  const { navigate, currentPath } = useRouter();

  const navItems = [
    { label: 'All', path: '/' },
    { label: 'Brand Identity', path: '/brand-identity' },
    { label: 'Posters', path: '/posters' },
    { label: 'Video', path: '/video' },
    { label: 'About', path: '/about' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-light tracking-tight text-white hover:text-white/80 transition-colors"
          >
            GRAPHIC GREEDY
          </button>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`text-sm tracking-wide transition-all relative group ${
                  currentPath === item.path
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {item.label}
                <span
                  className={`absolute -bottom-1 left-0 h-px bg-white transition-all ${
                    currentPath === item.path ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
