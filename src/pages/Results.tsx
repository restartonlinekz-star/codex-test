import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, CheckCircle, TrendingUp, Award, Trash2, Eye } from 'lucide-react';
import type { TestResult } from '@/types';
import { getTestById } from '@/data/tests';

export function Results() {
  const [results, setResults] = useState<TestResult[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('codex-test-results');
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.sort((a: TestResult, b: TestResult) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      setResults(parsed);
    }
  }, []);

  const clearResults = () => {
    if (confirm('Барлық нәтижелерді жоюға сенімдісіз бе?')) {
      localStorage.removeItem('codex-test-results');
      setResults([]);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('kk-KZ', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}м ${secs}с`;
  };

  const stats = {
    totalTests: results.length,
    averageScore: results.length > 0 
      ? Math.round(results.reduce((acc, r) => acc + r.score, 0) / results.length)
      : 0,
    passedTests: results.filter(r => r.score >= 70).length,
    totalQuestions: results.reduce((acc, r) => acc + r.totalQuestions, 0),
    totalCorrect: results.reduce((acc, r) => acc + r.correctAnswers, 0)
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="hero-grid opacity-30" />
      <div className="orb orb-purple w-[400px] h-[400px] top-1/4 -right-[100px] opacity-40" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <p className="section-label justify-center">Нәтижелер</p>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-foreground">
            Менің <span className="text-primary">нәтижелерім</span>
          </h1>
          <p className="font-mono text-muted-foreground max-w-xl mx-auto">
            Өткен тесттеріңнің нәтижелері мен статистикасы
          </p>
        </div>

        {results.length === 0 ? (
          <div className="text-center py-16 border border-border bg-card">
            <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center border border-muted/30 bg-muted/5">
              <Award className="w-10 h-10 text-muted-foreground" />
            </div>
            <h2 className="text-2xl font-bold mb-3 text-foreground">Әлі тест өткен жоқсыз</h2>
            <p className="font-mono text-muted-foreground mb-8 max-w-md mx-auto">
              Білім деңгейіңізді тексеру үшін алғашқы тестті өтіңіз. 
              Нәтижелеріңіз осында сақталады.
            </p>
            <Link to="/tests" className="btn-primary">
              Тесттерді көру
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="border border-border bg-card p-5 text-center">
                <TrendingUp className="w-6 h-6 text-primary mx-auto mb-3" />
                <span className="block font-mono text-2xl font-bold text-foreground">{stats.totalTests}</span>
                <span className="block font-mono text-xs text-muted-foreground uppercase mt-1">Тест өтілді</span>
              </div>
              <div className="border border-border bg-card p-5 text-center">
                <Award className="w-6 h-6 text-primary mx-auto mb-3" />
                <span className={`block font-mono text-2xl font-bold ${stats.averageScore >= 70 ? 'text-green-500' : 'text-destructive'}`}>
                  {stats.averageScore}%
                </span>
                <span className="block font-mono text-xs text-muted-foreground uppercase mt-1">Орташа балл</span>
              </div>
              <div className="border border-border bg-card p-5 text-center">
                <CheckCircle className="w-6 h-6 text-green-500 mx-auto mb-3" />
                <span className="block font-mono text-2xl font-bold text-green-500">{stats.passedTests}</span>
                <span className="block font-mono text-xs text-muted-foreground uppercase mt-1">Сәтті өтілді</span>
              </div>
              <div className="border border-border bg-card p-5 text-center">
                <div className="w-6 h-6 mx-auto mb-3 flex items-center justify-center text-primary text-lg">🎯</div>
                <span className="block font-mono text-2xl font-bold text-foreground">
                  {Math.round((stats.totalCorrect / stats.totalQuestions) * 100) || 0}%
                </span>
                <span className="block font-mono text-xs text-muted-foreground uppercase mt-1">Дұрыс жауап</span>
              </div>
            </div>

            <div className="flex justify-end mb-6">
              <button
                onClick={clearResults}
                className="flex items-center gap-2 px-4 py-2 border border-destructive/50 text-destructive font-mono text-sm uppercase tracking-wider transition-all hover:bg-destructive/10"
              >
                <Trash2 className="w-4 h-4" />
                Нәтижелерді тазалау
              </button>
            </div>

            <div className="space-y-4">
              {results.map((result, index) => {
                const test = getTestById(result.testId);
                const isPassed = result.score >= 70;
                
                return (
                  <div 
                    key={index}
                    className="border border-border bg-card p-5 md:p-6 transition-all hover:border-primary/20"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div 
                          className="w-12 h-12 flex-shrink-0 flex items-center justify-center text-xl border"
                          style={{ 
                            borderColor: `${test?.color || '#00ffe0'}40`,
                            backgroundColor: `${test?.color || '#00ffe0'}10`
                          }}
                        >
                          {test?.icon || '📝'}
                        </div>
                        <div>
                          <h3 className="font-bold text-lg mb-1 text-foreground">
                            {test?.title || 'Белгісіз тест'}
                          </h3>
                          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3 h-3" />
                              {formatDate(result.completedAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {formatTime(result.timeSpent)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className={`text-3xl font-extrabold ${isPassed ? 'text-green-500' : 'text-destructive'}`}>
                            {result.score}%
                          </div>
                          <div className="font-mono text-xs text-muted-foreground">
                            {result.correctAnswers}/{result.totalQuestions} дұрыс
                          </div>
                        </div>
                        <Link
                          to={`/test/${result.testId}`}
                          className="flex items-center gap-2 px-4 py-2 border border-primary text-primary font-mono text-sm uppercase tracking-wider transition-all hover:bg-primary hover:text-primary-foreground"
                        >
                          <Eye className="w-4 h-4" />
                          Қарау
                        </Link>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all ${isPassed ? 'bg-green-500' : 'bg-destructive'}`}
                          style={{ width: `${result.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
