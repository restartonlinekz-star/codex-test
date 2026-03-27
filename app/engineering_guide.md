# Engineering Guide — Техникалық стандарт

## 🏗️ Архитектура

### Компоненттер иерархиясы

```
App (Router)
├── Navigation
├── Routes
│   ├── Home
│   ├── TestSelection
│   ├── TestPage
│   │   └── [Start | Quiz | Results]
│   └── Results
└── Footer
```

### React Router маршруттары

```tsx
// App.tsx
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/tests" element={<TestSelection />} />
  <Route path="/test/:testId" element={<TestPage />} />
  <Route path="/results" element={<Results />} />
</Routes>
```

### Динамикалық маршрут (testId)

```tsx
// TestPage.tsx
const { testId } = useParams<{ testId: string }>();
const test = getTestById(testId || '');
```

---

## 📊 TypeScript Типтері

### Question (Сұрақ)

```ts
export interface Question {
  id: number;
  question: string;           // Сұрақ мәтіні
  options: string[];          // Жауап нұсқалары
  correctAnswer: number;      // Дұрыс жауап индексі (0-ден басталады)
  explanation?: string;       // Түсіндірме (қосымша)
}
```

### Test (Тест)

```ts
export interface Test {
  id: string;                 // Уникалды ID (мысалы: 'html-css-basics')
  title: string;             // Тест атауы
  description: string;       // Сипаттама
  category: string;          // Категория ('Frontend', 'Backend')
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number;          // Минутпен уақыт
  questionsCount: number;    // Сұрақтар саны
  icon: string;              // Эмодзи иконка
  color: string;             // HEX түс (мысалы: '#00ffe0')
  questions: Question[];      // Сұрақтар массиві
}
```

### TestResult (Нәтиже)

```ts
export interface TestResult {
  testId: string;                    // Тест ID
  score: number;                     // Пайызбен баға (0-100)
  totalQuestions: number;           // Барлық сұрақтар
  correctAnswers: number;           // Дұрыс жауаптар саны
  timeSpent: number;                // Секундпен жұмсалған уақыт
  answers: Record<number, number>; // { сұрақ_индексі: жауап_индексі }
  completedAt: string;              // ISO форматтағы уақыт
}
```

---

## 📦 Деректер құрылымы

### tests.ts файлы

```ts
import type { Test } from '@/types';

// Барлық тесттер массиві
export const tests: Test[] = [
  {
    id: 'html-css-basics',
    title: 'HTML & CSS Негіздері',
    // ...
  },
  // ...
];

// ID бойынша тест іздеу
export const getTestById = (id: string): Test | undefined => {
  return tests.find(test => test.id === id);
};

// Категория бойынша сүзгілеу
export const getTestsByCategory = (category: string): Test[] => {
  return tests.filter(test => test.category === category);
};
```

### Жаңа тест қосу

```ts
{
  id: 'python-basics',
  title: 'Python Негіздері',
  description: 'Python тілінің негіздері...',
  category: 'Backend',
  difficulty: 'beginner',
  duration: 25,
  questionsCount: 10,
  icon: '🐍',
  color: '#3776ab',
  questions: [
    {
      id: 1,
      question: 'Сұрақ мәтіні?',
      options: ['A', 'B', 'C', 'D'],
      correctAnswer: 0,
      explanation: 'Түсіндірме...'
    },
    // ...
  ]
}
```

---

## ⚙️ Тест логикасы

### State басқару

```tsx
// TestPage.tsx
const [currentQuestion, setCurrentQuestion] = useState(0);  // Ағымдағы сұрақ
const [answers, setAnswers] = useState<Record<number, number>>({});  // Жауаптар
const [timeLeft, setTimeLeft] = useState(0);  // Уақыт
const [isStarted, setIsStarted] = useState(false);  // Тест басталды ма?
const [isFinished, setIsFinished] = useState(false);  // Тест аяқталды ма?
const [showResults, setShowResults] = useState(false);  // Нәтиже көрсету
```

### Жауап сақтау

```tsx
const handleAnswer = (optionIndex: number) => {
  if (isFinished) return;
  setAnswers(prev => ({ ...prev, [currentQuestion]: optionIndex }));
};
```

### Уақытты басқару

```tsx
// Таймерді бастау
useEffect(() => {
  if (test && isStarted && !isFinished) {
    setTimeLeft(test.duration * 60);
  }
}, [test, isStarted, isFinished]);

// Таймерді санау
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
```

### Нәтижені есептеу

```tsx
const calculateResults = useCallback((): TestResult | null => {
  if (!test) return null;
  
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
```

---

## 💾 localStorage қолдану

### Нәтижелерді сақтау

```tsx
const saveResult = (result: TestResult) => {
  const saved = localStorage.getItem('codex-test-results');
  const results: TestResult[] = saved ? JSON.parse(saved) : [];
  results.push(result);
  localStorage.setItem('codex-test-results', JSON.stringify(results));
};

// Тест аяқталғанда сақтау
useEffect(() => {
  if (isFinished && showResults) {
    const result = calculateResults();
    saveResult(result);
  }
}, [isFinished, showResults, calculateResults]);
```

### Нәтижелерді оқу

```tsx
const [results, setResults] = useState<TestResult[]>([]);

useEffect(() => {
  const saved = localStorage.getItem('codex-test-results');
  if (saved) {
    const parsed = JSON.parse(saved);
    // Жаңадан ескіге қарай сұрыптау
    parsed.sort((a: TestResult, b: TestResult) => 
      new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
    );
    setResults(parsed);
  }
}, []);
```

### Нәтижелерді жою

```tsx
const clearResults = () => {
  if (confirm('Барлық нәтижелерді жоюға сенімдісіз бе?')) {
    localStorage.removeItem('codex-test-results');
    setResults([]);
  }
};
```

---

## 🔧 Hooks

### useIsMobile (Мобильді құрылғы)

```ts
// src/hooks/use-mobile.ts
// Экран ені 768px-ден кіші болса true қайтарады
// Брейкпоинт: 768px (768px жоғары = десктоп, 768px төмен = мобильді)

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}
```

### Қолдану

```tsx
import { useIsMobile } from '@/hooks/use-mobile';

function Component() {
  const isMobile = useIsMobile();
  
  return isMobile ? <MobileView /> : <DesktopView />;
}
```

---

## 📋 Компоненттер туралы

### Navigation.tsx
- Фиксированный header
- Активті бетті көрсету
- Logo басқа бетке сілтеме

### Home.tsx
- Hero секциясы
- Мүмкіндіктер карточкалары
- CTA секциясы

### TestSelection.tsx
- Тесттер тізімі
- Категория фильтрі
- Кеңес карточкасы

### TestPage.tsx
- 3 күй: бастау экраны, тест, нәтиже
- Таймер
- Сұрақ навигаторы
- Жауап талдауы

### Results.tsx
- Статистика карточкалары
- Нәтижелер тізімі
- Нәтижелерді жою

---

## 🚀 Өнімділік оңтайландыру

### React optimization tips

1. **useCallback қолдану** — функцияларды memoизациялау
2. **useMemo қолдану** — есептеулерді кэштеу
3. **React.memo** — компоненттерді memoизациялау
4. **Key prop** — тізім элементтеріне дұрыс key беру

### Мысал

```tsx
// Нашар
const calculateResults = (): TestResult => { ... }

// Жақсы
const calculateResults = useCallback((): TestResult => { ... }, [test, answers, timeLeft]);
```

---

## ⚙️ Конфигурация файлдары

### ESLint (eslint.config.js)

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
  },
])
```

### TypeScript (tsconfig.json)

```json
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.node.json" }
  ],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Vite (vite.config.ts)
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
})
```

---

## ✅ Әдебиеттер

### React Router
```tsx
// navigate
const navigate = useNavigate();
navigate('/tests');
navigate(`/test/${testId}`);
```

### Lucide React иконкалары
```tsx
import { IconName } from 'lucide-react';
<IconName className="w-5 h-5" />
```

### Tailwind @apply
```css
@apply bg-codex-neon text-codex-black font-bold;
```

---

## 🐛 Жіберілген қателер

### Таймер 0-ден басталса
```tsx
if (prev <= 1) {
  setIsFinished(true);
  return 0;
}
```

### ID табылмаса
```tsx
const test = getTestById(testId || '');
if (!test) {
  return (
    <div className="min-h-screen flex items-center justify-center pt-20">
      <div className="text-center">
        <AlertCircle className="w-16 h-16 text-codex-neon3 mx-auto mb-4" />
        <h2 className="text-2xl font-bold mb-2">Тест табылмады</h2>
        <button onClick={() => navigate('/tests')} className="btn-primary">
          Тесттерге қайту
        </button>
      </div>
    </div>
  );
}
```

### localStorage parse қатесі
```tsx
useEffect(() => {
  const saved = localStorage.getItem('codex-test-results');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      parsed.sort((a: TestResult, b: TestResult) => 
        new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime()
      );
      setResults(parsed);
    } catch {
      localStorage.removeItem('codex-test-results');
      setResults([]);
    }
  }
}, []);
```

### Нәтиже есептеу қатесі
```tsx
// Нашар - type assertion қауіпті
if (!test) return {} as TestResult;

// Жақсы - null қайтару
if (!test) return null;

// Нәтижені қолданған жерде тексеру
const result = calculateResults();
if (!result) return null;
```
