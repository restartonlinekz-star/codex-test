import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Clock, HelpCircle, BarChart3, ArrowRight, Loader2 } from 'lucide-react';
import { getTests } from '@/services/api';
import type { Test } from '@/types';

const difficultyLabels = {
  beginner: { text: 'Бастапқы', color: 'text-green-400', bg: 'bg-green-400/10', border: 'border-green-400/30' },
  intermediate: { text: 'Орташа', color: 'text-yellow-400', bg: 'bg-yellow-400/10', border: 'border-yellow-400/30' },
  advanced: { text: 'Жоғары', color: 'text-red-400', bg: 'bg-red-400/10', border: 'border-red-400/30' }
};

export function TestSelection() {
  const [tests, setTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTests();
  }, []);

  const loadTests = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTests();
      setTests(data);
    } catch (err) {
      console.error('Error loading tests:', err);
      setError('Тесттерді жүктеу қатесі');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-primary mx-auto mb-4 animate-spin" />
          <p className="font-mono text-muted-foreground">Тесттер жүктелуде...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button onClick={loadTests} className="btn-primary">
            Қайталау
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="hero-grid opacity-30" />
      <div className="orb orb-cyan w-[500px] h-[500px] -top-[100px] -right-[100px] opacity-50" />
      
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="section-label justify-center">Тесттер тізімі</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Өзіңе <span className="text-primary">сай тест</span> танда
          </h1>
          <p className="font-mono text-muted-foreground max-w-xl mx-auto">
            IT мамандығының әртүрлі бағыттары бойынша тесттер. 
            Білім деңгейіңді анықтап, даму жолыңды жоспарла.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button className="px-5 py-2 border border-primary bg-primary/10 text-primary font-mono text-sm uppercase tracking-wider">
            Барлығы
          </button>
          <button className="px-5 py-2 border border-border bg-secondary text-muted-foreground font-mono text-sm uppercase tracking-wider hover:border-primary/40 hover:text-foreground transition-all">
            Frontend
          </button>
          <button className="px-5 py-2 border border-border bg-secondary text-muted-foreground font-mono text-sm uppercase tracking-wider hover:border-primary/40 hover:text-foreground transition-all">
            Backend
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tests.map((test, index) => {
            const diff = difficultyLabels[test.difficulty];
            return (
              <div 
                key={test.id}
                className="group relative border border-border bg-card p-6 md:p-8 transition-all duration-300 hover:border-primary/30 hover:-translate-y-1"
                style={{ 
                  animationDelay: `${index * 100}ms`,
                  boxShadow: 'none'
                }}
              >
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ 
                    background: `radial-gradient(circle at 50% 0%, ${test.color}10, transparent 60%)`
                  }}
                />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-5">
                    <div 
                      className="w-14 h-14 flex items-center justify-center text-2xl border transition-all duration-300"
                      style={{ 
                        borderColor: `${test.color}40`,
                        backgroundColor: `${test.color}10`
                      }}
                    >
                      {test.icon}
                    </div>
                    <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider border ${diff.bg} ${diff.color} ${diff.border}`}>
                      {diff.text}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-2 text-foreground group-hover:text-primary transition-colors">
                    {test.title}
                  </h3>
                  <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-5">
                    {test.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span className="font-mono">{test.duration} мин</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <HelpCircle className="w-4 h-4" />
                      <span className="font-mono">{test.questionsCount} сұрақ</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BarChart3 className="w-4 h-4" />
                      <span className="font-mono">{test.category}</span>
                    </div>
                  </div>

                  <Link 
                    to={`/test/${test.id}`}
                    className="inline-flex items-center gap-2 font-mono text-sm text-primary uppercase tracking-wider group/btn"
                  >
                    Тестті бастау
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 border border-border bg-secondary p-6 md:p-8">
          <div className="flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <div className="w-16 h-16 flex-shrink-0 flex items-center justify-center border border-primary/30 bg-primary/5 text-primary text-2xl">
              💡
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2 text-foreground">Кеңес</h3>
              <p className="font-mono text-sm text-muted-foreground leading-relaxed">
                Егер сіз жаңадан бастасаңыз, <span className="text-primary">HTML & CSS Негіздері</span> тестінен бастаңыз. 
                Frontend негіздерін меңгергеннен кейін JavaScript және React тесттеріне көшіңіз.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
