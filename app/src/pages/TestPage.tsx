import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getTestById, saveTestResult } from '@/services/api';
import type { Test, TestResult } from '@/types';

export function TestPage() {
  const { testId } = useParams<{ testId: string }>();
  const navigate = useNavigate();
  
  const [test, setTest] = useState<Test | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    loadTest();
  }, [testId]);

  const loadTest = async () => {
    if (!testId) return;
    try {
      setLoading(true);
      setError(null);
      const data = await getTestById(testId);
      if (!data) {
        setError('Тест табылмады');
      } else {
        setTest(data);
      }
    } catch (err) {
      console.error('Error loading test:', err);
      setError('Тестті жүктеу қатесі');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (test && isStarted && !isFinished) {
      setTimeLeft(test.duration * 60);
    }
  }, [test, isStarted, isFinished]);

  useEffect(() => {
    if (timeLeft > 0 && isStarted && !isFinished) {
      const timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            setIsFinished(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, isStarted, isFinished]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleAnswer = (optionIndex: number) => {
    if (isFinished) return;
    setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
  };

  const handleNext = () => {
    if (test && currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    setIsFinished(true);
    setShowResults(true);
  };

  const calculateResults = useCallback((): TestResult => {
    if (!test) return {} as TestResult;
    
    let correct = 0;
    test.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) {
        correct++;
      }
    });

    return {
      testId: test.id,
      score: Math.round((correct / test.questions.length) * 100),
      totalQuestions: test.questions.length,
      correctAnswers: correct,
      timeSpent: test.duration * 60 - timeLeft,
      answers,
      completedAt: new Date().toISOString()
    };
  }, [test, answers, timeLeft]);

  useEffect(() => {
    if (isFinished && showResults) {
      const result = calculateResults();
      saveTestResult(result);
    }
  }, [isFinished, showResults, calculateResults]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <Loader2 className="w-16 h-16 text-primary mx-auto mb-4 animate-spin" />
          <p className="font-mono text-muted-foreground">Тест жүктелуде...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-codex-neon3 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Тест табылмады</h2>
          <p className="font-mono text-codex-muted mb-6">{error || 'Сұралған тест жоқ немесе жойылған'}</p>
          <button 
            onClick={() => navigate('/tests')}
            className="btn-primary"
          >
            Тесттерге қайту
          </button>
        </div>
      </div>
    );
  }

  if (!isStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-6">
        <div className="hero-grid opacity-30" />
        <div className="orb orb-cyan w-[400px] h-[400px] top-1/4 -left-[100px] opacity-50" />
        
        <div className="relative z-10 max-w-2xl w-full">
          <div className="border border-codex-border bg-codex-card p-8 md:p-12">
            <div className="text-center mb-8">
              <span className="text-5xl mb-4 block">{test.icon}</span>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-3">{test.title}</h1>
              <p className="font-mono text-codex-muted">{test.description}</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center p-4 border border-codex-border bg-codex-dark">
                <Clock className="w-5 h-5 text-codex-neon mx-auto mb-2" />
                <span className="block font-mono text-lg font-bold">{test.duration}</span>
                <span className="block font-mono text-xs text-codex-muted uppercase">минут</span>
              </div>
              <div className="text-center p-4 border border-codex-border bg-codex-dark">
                <span className="block font-mono text-lg font-bold text-codex-neon">{test.questionsCount}</span>
                <span className="block font-mono text-xs text-codex-muted uppercase">сұрақ</span>
              </div>
              <div className="text-center p-4 border border-codex-border bg-codex-dark">
                <span className="block font-mono text-lg font-bold text-codex-neon">{test.difficulty === 'beginner' ? '★' : test.difficulty === 'intermediate' ? '★★' : '★★★'}</span>
                <span className="block font-mono text-xs text-codex-muted uppercase">деңгей</span>
              </div>
            </div>

            <div className="space-y-3 mb-8">
              <h3 className="font-bold mb-3">Ережелер:</h3>
              <ul className="font-mono text-sm text-codex-muted space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-codex-neon">→</span>
                  Әр сұраққа бір ғана жауап беруге болады
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-codex-neon">→</span>
                  Уақыт шектелген — {test.duration} минут
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-codex-neon">→</span>
                  Тестті кез келген уақытта аяқтауға болады
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-codex-neon">→</span>
                  Нәтижелерді кейін қарауға болады
                </li>
              </ul>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => navigate('/tests')}
                className="btn-secondary flex-1 justify-center"
              >
                <ChevronLeft className="w-4 h-4" />
                Артқа
              </button>
              <button 
                onClick={() => setIsStarted(true)}
                className="btn-primary flex-1 justify-center"
              >
                Тестті бастау
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (showResults) {
    const result = calculateResults();
    const isPassed = result.score >= 70;

    return (
      <div className="min-h-screen pt-24 pb-16 px-6">
        <div className="hero-grid opacity-30" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="border border-codex-border bg-codex-card p-8 md:p-12">
            <div className="text-center mb-10">
              <div className={`w-24 h-24 mx-auto mb-6 flex items-center justify-center border-2 ${isPassed ? 'border-green-500 bg-green-500/10' : 'border-codex-neon3 bg-codex-neon3/10'}`}>
                {isPassed ? (
                  <CheckCircle className="w-12 h-12 text-green-500" />
                ) : (
                  <XCircle className="w-12 h-12 text-codex-neon3" />
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold mb-2">
                {isPassed ? 'Құттықтаймыз!' : 'Сәтсіз аяқталды'}
              </h1>
              <p className="font-mono text-codex-muted">
                {isPassed 
                  ? 'Сіз тестті сәтті өттіңіз' 
                  : 'Сіз тестті өте алмадыңыз. Қайта байқап көріңіз'}
              </p>
            </div>

            <div className="text-center mb-10">
              <div className={`text-7xl md:text-8xl font-extrabold ${isPassed ? 'text-green-500' : 'text-codex-neon3'}`}>
                {result.score}%
              </div>
              <p className="font-mono text-codex-muted mt-2">
                {result.correctAnswers} / {result.totalQuestions} дұрыс жауап
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
              <div className="text-center p-4 border border-codex-border bg-codex-dark">
                <span className="block font-mono text-xs text-codex-muted uppercase mb-1">Уақыт</span>
                <span className="block font-mono text-lg font-bold">{formatTime(result.timeSpent)}</span>
              </div>
              <div className="text-center p-4 border border-codex-border bg-codex-dark">
                <span className="block font-mono text-xs text-codex-muted uppercase mb-1">Дұрыс</span>
                <span className="block font-mono text-lg font-bold text-green-500">{result.correctAnswers}</span>
              </div>
              <div className="text-center p-4 border border-codex-border bg-codex-dark">
                <span className="block font-mono text-xs text-codex-muted uppercase mb-1">Қате</span>
                <span className="block font-mono text-lg font-bold text-codex-neon3">{result.totalQuestions - result.correctAnswers}</span>
              </div>
              <div className="text-center p-4 border border-codex-border bg-codex-dark">
                <span className="block font-mono text-xs text-codex-muted uppercase mb-1">Бос</span>
                <span className="block font-mono text-lg font-bold text-codex-muted">{result.totalQuestions - Object.keys(result.answers).length}</span>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="font-bold mb-4">Сұрақтарды талдау:</h3>
              <div className="space-y-3">
                {test.questions.map((q, idx) => {
                  const userAnswer = answers[idx];
                  const isCorrect = userAnswer === q.correctAnswer;
                  const isAnswered = userAnswer !== undefined;
                  
                  return (
                    <div 
                      key={q.id}
                      className={`p-4 border ${isCorrect ? 'border-green-500/30 bg-green-500/5' : isAnswered ? 'border-codex-neon3/30 bg-codex-neon3/5' : 'border-codex-muted/30 bg-codex-muted/5'}`}
                    >
                      <div className="flex items-start gap-3">
                        <span className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-xs ${isCorrect ? 'bg-green-500 text-black' : isAnswered ? 'bg-codex-neon3 text-white' : 'bg-codex-muted text-black'}`}>
                          {idx + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm mb-2">{q.question}</p>
                          {isAnswered && (
                            <p className="font-mono text-xs">
                              <span className="text-codex-muted">Сіздің жауабыңыз: </span>
                              <span className={isCorrect ? 'text-green-500' : 'text-codex-neon3'}>
                                {q.options[userAnswer]}
                              </span>
                            </p>
                          )}
                          {!isCorrect && (
                            <p className="font-mono text-xs mt-1">
                              <span className="text-codex-muted">Дұрыс жауап: </span>
                              <span className="text-green-500">{q.options[q.correctAnswer]}</span>
                            </p>
                          )}
                          {q.explanation && (
                            <p className="font-mono text-xs text-codex-muted mt-2 pt-2 border-t border-codex-border">
                              💡 {q.explanation}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => navigate('/tests')}
                className="btn-secondary"
              >
                Барлық тесттер
              </button>
              <button 
                onClick={() => {
                  setIsStarted(false);
                  setIsFinished(false);
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                }}
                className="btn-primary"
              >
                Қайта өту
              </button>
              <button 
                onClick={() => navigate('/results')}
                className="btn-primary"
              >
                Нәтижелерім
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const question = test.questions[currentQuestion];
  const progress = ((currentQuestion + 1) / test.questions.length) * 100;
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen pt-20 pb-8">
      <div className="fixed top-20 left-0 right-0 z-40 bg-codex-black/95 backdrop-blur-xl border-b border-codex-border">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="progress-bar mb-4">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="font-mono text-sm text-codex-muted">
                Сұрақ <span className="text-codex-text font-bold">{currentQuestion + 1}</span> / {test.questions.length}
              </span>
              <span className="font-mono text-xs text-codex-neon px-2 py-1 border border-codex-neon/30 bg-codex-neon/5">
                {answeredCount} жауап берілді
              </span>
            </div>
            <div className={`flex items-center gap-2 font-mono text-lg ${timeLeft < 60 ? 'text-codex-neon3 animate-pulse' : 'text-codex-neon'}`}>
              <Clock className="w-5 h-5" />
              {formatTime(timeLeft)}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-32">
        <div className="border border-codex-border bg-codex-card p-6 md:p-10 mb-6">
          <h2 className="text-xl md:text-2xl font-bold mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className={`answer-option ${answers[currentQuestion] === idx ? 'selected' : ''}`}
              >
                <span className={`option-indicator ${answers[currentQuestion] === idx ? 'border-codex-neon text-codex-neon' : ''}`}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span className="flex-1">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="flex items-center gap-2 px-6 py-3 border border-codex-border bg-codex-dark font-mono text-sm uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:border-codex-neon/40 hover:text-codex-neon"
          >
            <ChevronLeft className="w-4 h-4" />
            Алдыңғы
          </button>

          <div className="hidden md:flex items-center gap-1">
            {test.questions.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentQuestion(idx)}
                className={`w-8 h-8 font-mono text-xs transition-all ${
                  idx === currentQuestion 
                    ? 'bg-codex-neon text-codex-black' 
                    : answers[idx] !== undefined
                    ? 'bg-codex-neon/20 text-codex-neon border border-codex-neon/40'
                    : 'bg-codex-dark text-codex-muted border border-codex-border hover:border-codex-muted'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>

          {currentQuestion < test.questions.length - 1 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 border border-codex-neon bg-codex-neon text-codex-black font-mono text-sm uppercase tracking-wider font-bold transition-all hover:shadow-neon"
            >
              Келесі
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinish}
              className="flex items-center gap-2 px-6 py-3 border border-codex-neon bg-codex-neon text-codex-black font-mono text-sm uppercase tracking-wider font-bold transition-all hover:shadow-neon"
            >
              <Flag className="w-4 h-4" />
              Аяқтау
            </button>
          )}
        </div>

        <div className="flex md:hidden flex-wrap items-center justify-center gap-1 mt-6">
          {test.questions.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentQuestion(idx)}
              className={`w-8 h-8 font-mono text-xs transition-all ${
                idx === currentQuestion 
                  ? 'bg-codex-neon text-codex-black' 
                  : answers[idx] !== undefined
                  ? 'bg-codex-neon/20 text-codex-neon border border-codex-neon/40'
                  : 'bg-codex-dark text-codex-muted border border-codex-border'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
