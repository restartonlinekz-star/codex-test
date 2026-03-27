import { Link } from 'react-router-dom';
import { ArrowRight, Code, Zap, Target, Trophy } from 'lucide-react';

export function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6 pt-20 overflow-hidden">
        {/* Grid Background */}
        <div className="hero-grid" />
        
        {/* Orbs */}
        <div className="orb orb-cyan w-[600px] h-[600px] -top-[200px] -right-[100px] animate-orb-float" />
        <div className="orb orb-purple w-[400px] h-[400px] -bottom-[100px] -left-[100px] animate-float-reverse" />

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Tag */}
          <div className="inline-flex items-center gap-3 font-mono text-xs text-primary uppercase tracking-[4px] mb-8 px-5 py-2 border border-primary/20 bg-primary/5">
            <span className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse-glow" />
            Қазақстандағы №1 IT тесттері
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight mb-4">
            <span className="block text-foreground">Біліміңді</span>
            <span className="block text-primary" style={{ textShadow: '0 0 40px rgba(0,255,224,0.5), 0 0 80px rgba(0,255,224,0.2)' }}>
              Тексер
            </span>
            <span className="block neon-stroke text-foreground">Жетілдір.</span>
          </h1>

          {/* Subtitle */}
          <p className="font-mono text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto mt-8 mb-10">
            IT мамандығына қадамыңды тексер. 
            <span className="text-primary"> Frontend, Backend, React </span> 
            және басқа да бағыттар бойынша тесттер.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/tests" className="btn-primary">
              Тестті бастау
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/tests" className="btn-secondary">
              Барлық тесттер
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mt-16 pt-12 border-t border-border">
            <div className="text-center">
              <span className="block font-mono text-3xl md:text-4xl font-bold text-primary" style={{ textShadow: 'var(--neon-glow)' }}>
                4+
              </span>
              <span className="block text-xs text-muted-foreground uppercase tracking-widest mt-2 font-mono">Тесттер</span>
            </div>
            <div className="text-center">
              <span className="block font-mono text-3xl md:text-4xl font-bold text-primary" style={{ textShadow: 'var(--neon-glow)' }}>
                40+
              </span>
              <span className="block text-xs text-muted-foreground uppercase tracking-widest mt-2 font-mono">Сұрақтар</span>
            </div>
            <div className="text-center">
              <span className="block font-mono text-3xl md:text-4xl font-bold text-primary" style={{ textShadow: 'var(--neon-glow)' }}>
                3
              </span>
              <span className="block text-xs text-muted-foreground uppercase tracking-widest mt-2 font-mono">Бағыт</span>
            </div>
            <div className="text-center">
              <span className="block font-mono text-3xl md:text-4xl font-bold text-primary" style={{ textShadow: 'var(--neon-glow)' }}>
                100%
              </span>
              <span className="block text-xs text-muted-foreground uppercase tracking-widest mt-2 font-mono">Тегін</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-secondary border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="section-label justify-center">Мүмкіндіктер</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
              Неліктен <span className="text-primary">CodeX Test?</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="codex-card text-center group">
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-primary/30 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary group-hover:shadow-neon">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Нақты сұрақтар</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Нарықта сұранысқа ие технологиялар бойынша дайындалған сұрақтар
              </p>
            </div>

            <div className="codex-card text-center group">
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-primary/30 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary group-hover:shadow-neon">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Жедел нәтиже</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Тестті аяқтағаннан кейін дереу нәтижелерді және талдауды ал
              </p>
            </div>

            <div className="codex-card text-center group">
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-primary/30 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary group-hover:shadow-neon">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Деңгейлер</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Бастапқы, орташа және жоғары деңгейдегі тесттер
              </p>
            </div>

            <div className="codex-card text-center group">
              <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-primary/30 bg-primary/5 text-primary transition-all duration-300 group-hover:border-primary group-hover:shadow-neon">
                <Trophy className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Тегін қолдану</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Барлық тесттер толықтай тегін және шектеусіз
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="hero-grid opacity-50" />
        <div className="orb orb-cyan w-[400px] h-[400px] top-0 left-1/4 opacity-50" />
        
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-foreground">
            Дайынсың ба? <span className="text-primary">Бастайық!</span>
          </h2>
          <p className="font-mono text-muted-foreground mb-10 max-w-xl mx-auto">
            Білім деңгейіңді тексеріп, қай салаларды жетілдіру керектігін біл.
            Тестті өту 15-30 минут уақыт алады.
          </p>
          <Link to="/tests" className="btn-primary inline-flex">
            Тесттерді көру
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
