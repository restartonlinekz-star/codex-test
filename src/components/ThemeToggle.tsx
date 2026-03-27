import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-10 h-10 flex items-center justify-center border border-codex-border rounded-lg transition-all duration-300 hover:border-codex-neon/50 group"
      aria-label="Теманы ауыстыру"
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-4 h-4 text-codex-neon transition-transform duration-300 group-hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-codex-muted transition-transform duration-300 group-hover:-rotate-12" />
      )}
    </button>
  );
}
