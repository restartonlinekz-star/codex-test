import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Home } from '@/pages/Home';
import { TestSelection } from '@/pages/TestSelection';
import { TestPage } from '@/pages/TestPage';
import { Results } from '@/pages/Results';

function App() {
  useEffect(() => {
    const storedTheme = localStorage.getItem('codex-theme');
    if (storedTheme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else if (storedTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefersDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.add('light');
      }
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground noise-overlay scanlines">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tests" element={<TestSelection />} />
            <Route path="/test/:testId" element={<TestPage />} />
            <Route path="/results" element={<Results />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="border-t border-border bg-secondary py-12 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-10">
              <div className="md:col-span-2">
                <div className="font-mono text-lg text-primary tracking-widest uppercase mb-4" style={{ textShadow: 'var(--neon-glow)' }}>
                  CODE<span className="text-foreground">X</span>
                  <span className="text-muted-foreground text-xs ml-2">TEST</span>
                </div>
                <p className="font-mono text-sm text-muted-foreground leading-relaxed max-w-sm">
                  Қазақстандағы IT білімді тексеру платформасы. 
                  Frontend, Backend және басқа да бағыттар бойынша тесттер.
                </p>
              </div>
              
              <div>
                <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Бөлімдер</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">Басты бет</a>
                  </li>
                  <li>
                    <a href="/tests" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">Тесттер</a>
                  </li>
                  <li>
                    <a href="/results" className="font-mono text-sm text-muted-foreground hover:text-primary transition-colors">Нәтижелер</a>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-mono text-xs text-primary uppercase tracking-widest mb-4">Байланыс</h4>
                <ul className="space-y-2">
                  <li>
                    <span className="font-mono text-sm text-muted-foreground">hello@codex.kz</span>
                  </li>
                  <li>
                    <span className="font-mono text-sm text-muted-foreground">Алматы, Қазақстан</span>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-mono text-xs text-muted-foreground">
                © 2025 CodeX Test. Барлық құқықтар қорғалған.
              </p>
              <div className="flex gap-6">
                <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Telegram</a>
                <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">Instagram</a>
                <a href="#" className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">GitHub</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
