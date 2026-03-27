import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-8 lg:px-16 py-5 flex justify-between items-center backdrop-blur-xl bg-background/80 border-b border-border">
      <Link to="/" className="font-mono text-lg text-primary tracking-widest uppercase no-underline" style={{ textShadow: 'var(--neon-glow)' }}>
        CODE<span className="text-foreground">X</span>
        <span className="text-muted-foreground text-xs ml-2">TEST</span>
      </Link>
      
      <ul className="hidden md:flex gap-10 list-none">
        <li>
          <Link to="/" className={`nav-link ${isHome ? 'text-primary' : ''}`}>
            Басты бет
          </Link>
        </li>
        <li>
          <Link to="/tests" className={`nav-link ${location.pathname === '/tests' ? 'text-primary' : ''}`}>
            Тесттер
          </Link>
        </li>
        <li>
          <Link to="/results" className={`nav-link ${location.pathname === '/results' ? 'text-primary' : ''}`}>
            Нәтижелер
          </Link>
        </li>
      </ul>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <Link 
          to="/tests" 
          className="font-mono text-xs px-6 py-2.5 border border-primary text-primary uppercase tracking-widest transition-all duration-300 relative overflow-hidden group"
        >
          <span className="relative z-10 group-hover:text-primary-foreground transition-colors">Тестті бастау</span>
          <span className="absolute inset-0 bg-primary transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
        </Link>
      </div>
    </nav>
  );
}
