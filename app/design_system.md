# Design System — Визуалды ережелер

> **Маңызды:** Бұл файл визуалды мәселелер үшін негізгі анықтама. Әрбір стильді өзгерту алдында осы файлды тексеріңіз.

---

## 🎨 Түс палитрасы

### Негізгі түстер

| Атауы | HEX | HSL | Қолданылуы |
|-------|-----|-----|------------|
| `codex-black` | `#020204` | 240 33% 1% | Негізгі фон |
| `codex-dark` | `#0a0a12` | - | Card фон |
| `codex-card` | `#0e0e1a` | 240 33% 5% | Карточкалар |
| `codex-border` | `#1a1a2e` | 240 20% 14% | Шеттер |
| `codex-text` | `#e8e8f0` | 240 20% 93% | Негізгі мәтін |
| `codex-muted` | `#5a5a7a` | 240 10% 42% | Ескертілген мәтін |

### Neon түстері

| Атауы | HEX | Қолданылуы |
|-------|-----|------------|
| `codex-neon` | `#00ffe0` | Негізгі акцент, сәттілік |
| `codex-neon2` | `#bf00ff` | Екінші акцент |
| `codex-neon3` | `#ff006e` | Қате, деструктивті |

### CSS Variables

```css
:root {
  /* HSL түстері (index.css-те анықталған) */
  --background: 240 33% 1%;
  --foreground: 240 20% 93%;
  --card: 240 33% 5%;
  --primary: 168 100% 50%;
  --primary-foreground: 240 33% 1%;
  --secondary: 240 20% 8%;
  --muted: 240 20% 8%;
  --muted-foreground: 240 10% 42%;
  --accent: 168 100% 50%;
  --destructive: 328 100% 50%;
  --border: 240 20% 14%;
  --ring: 168 100% 50%;
  --radius: 0.625rem;

  /* Neon түстері */
  --neon: #00ffe0;
  --neon2: #bf00ff;
  --neon3: #ff006e;
  --neon-glow: 0 0 20px rgba(0,255,224,0.4), 0 0 60px rgba(0,255,224,0.15);
  --purple-glow: 0 0 20px rgba(191,0,255,0.4);
}
```

### Tailwind конфигурациясы

```js
// tailwind.config.js
module.exports = {
  darkMode: ["class"],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        codex: {
          black: '#020204',
          dark: '#0a0a12',
          card: '#0e0e1a',
          border: '#1a1a2e',
          neon: '#00ffe0',
          neon2: '#bf00ff',
          neon3: '#ff006e',
          text: '#e8e8f0',
          muted: '#5a5a7a',
        }
      },
      borderRadius: {
        xl: "calc(var(--radius) + 4px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        xs: "calc(var(--radius) - 6px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### Theme Toggle

```tsx
// src/components/ThemeToggle.tsx
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/hooks/use-theme';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}>
      {resolvedTheme === 'dark' ? <Sun /> : <Moon />}
    </button>
  );
}
```

### Theme Hook

```ts
// src/hooks/use-theme.ts
// Қайтарады: { theme, setTheme, resolvedTheme }
// localStorage: 'codex-theme'
// System media: prefers-color-scheme
```

---

## 🌙/☀️ Light/Dark Theme

### Theme түстері

| Тема | Фон | Мәтін | Border |
|------|-----|-------|--------|
| **Dark** | #020204 | #e8e8f0 | #1a1a2e |
| **Light** | #ffffff | #0f172a | #e2e8f0 |

### Neon түстері (екі темде де сақталады)

| Түс | HEX | Қолданылуы |
|-----|-----|------------|
| Neon | #00ffe0 | Негізгі акцент |
| Neon2 | #bf00ff | Екінші акцент |
| Neon3 | #ff006e | Қате, деструктивті |

### CSS Variables (.light class)

```css
.light {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 168 100% 50%;  /* Neon сақталады */
  --border: 220 13% 91%;
  --muted: 220 14% 96%;
  --muted-foreground: 240 5% 35%;
  --card: 0 0% 100%;
  --secondary: 220 14% 96%;
}
```

### Theme қолдану

```tsx
// Беттік класстар
<div className="bg-background text-foreground">
  {/* Фон мен мәтін автоматты түрде өзгереді */}
</div>

// Neon акцент (екі темде де жұмыс істейді)
<span className="text-primary">Мәтін</span>
```

### Theme-aware компоненттер

```tsx
// Нашар
<div className="bg-codex-black text-codex-text">

// Жақсы
<div className="bg-background text-foreground">
```

---

## 🌍 Глобалды стильдер

### index.css негізгі стильдер

```css
@layer base {
  :root {
    /* HSL түстер */
  }
  
  * {
    @apply border-border;
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  body {
    @apply bg-codex-black text-codex-text font-sans antialiased;
    overflow-x: hidden;
  }
}
```

### Scrollbar стильдері

```css
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a12;
}

::-webkit-scrollbar-thumb {
  background: #1a1a2e;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #2a2a3e;
}
```

### Selection стильдері

```css
::selection {
  background: rgba(0,255,224,0.3);
  color: #e8e8f0;
}
```

---

## ✍️ Типография

### Шрифттер

| Типі | Шрифт | Қолданылуы |
|------|-------|------------|
| Моноширинный | `Space Mono` | Код, мәтін, сандар |
| Негізгі | `Inter` | Тақырыптар, батырмалар (кириллицаны жақсы қолдайды) |

```css
fontFamily: {
  mono: ['"Space Mono"', 'monospace'],
  sans: ['Inter', 'sans-serif'],
}
```

### Google Fonts сілтемесі

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

### Өлшемдер

| Класы | Өлшемі | Қолданылуы |
|-------|--------|------------|
| `text-xs` | 12px | Мәтін, ескертулер |
| `text-sm` | 14px | Негізгі мәтін |
| `text-base` | 16px | Параграф |
| `text-lg` | 18px | Кіші тақырып |
| `text-xl` | 20px | Тақырыпша |
| `text-2xl` | 24px | Тақырып |
| `text-4xl` | 36px | Ірі тақырып |
| `text-7xl` | 72px | Hero тақырып |

### Трекинг (letter-spacing)

| Класы | Мәні | Қолданылуы |
|-------|------|------------|
| `tracking-wider` | 0.05em | Мәтін |
| `tracking-widest` | 0.1em | Батырмалар, labels |
| `tracking-[5px]` | 5px | Секция labels |

---

## 🧩 Компонент стильдері

### Buttons (Батырмалар)

#### btn-primary
```css
.btn-primary {
  @apply inline-flex items-center gap-3 px-10 py-4 
         bg-codex-neon text-codex-black 
         font-mono text-sm font-bold uppercase tracking-widest 
         transition-all duration-300;
}

.btn-primary:hover {
  box-shadow: 0 0 40px rgba(0,255,224,0.5), 0 0 80px rgba(0,255,224,0.2);
  transform: translateY(-2px);
}
```

#### btn-secondary
```css
.btn-secondary {
  @apply inline-flex items-center gap-3 px-10 py-4 
         border border-codex-muted text-codex-text 
         font-mono text-sm uppercase tracking-widest 
         transition-all duration-300;
}

.btn-secondary:hover {
  @apply border-codex-neon text-codex-neon;
}
```

### Cards (Карточкалар)

#### codex-card
```css
.codex-card {
  @apply border border-codex-border bg-codex-card p-6 
         transition-all duration-300;
}

.codex-card:hover {
  @apply border-codex-neon/20;
  box-shadow: 0 20px 60px rgba(0,0,0,0.4);
}
```

### Navigation (Навигация)

#### nav-link
```css
.nav-link {
  @apply font-mono text-xs text-codex-muted uppercase 
         tracking-widest transition-colors duration-300 relative;
}

.nav-link::after {
  content: '';
  @apply absolute -bottom-1 left-0 right-0 h-px bg-codex-neon 
         scale-x-0 transition-transform duration-300;
}

.nav-link:hover {
  @apply text-codex-neon;
}

.nav-link:hover::after {
  @apply scale-x-100;
}
```

### Answer Options (Жауап нұсқалары)

```css
.answer-option {
  @apply w-full p-5 border border-codex-border bg-codex-dark 
         text-left font-mono text-sm transition-all duration-300 
         flex items-center gap-4;
}

.answer-option:hover {
  @apply border-codex-neon/40 bg-codex-neon/5;
}

.answer-option.selected {
  @apply border-codex-neon bg-codex-neon/10;
}

.answer-option.correct {
  @apply border-green-500 bg-green-500/10;
}

.answer-option.wrong {
  @apply border-codex-neon3 bg-codex-neon3/10;
}
```

### Progress Bar (Прогресс жолы)

```css
.progress-bar {
  @apply h-1 bg-codex-border rounded-full overflow-hidden;
}

.progress-fill {
  @apply h-full bg-codex-neon transition-all duration-500;
  box-shadow: var(--neon-glow);
}
```

### Section Label

```css
.section-label {
  @apply font-mono text-xs text-codex-neon uppercase tracking-[5px] 
         flex items-center gap-3 mb-4;
}

.section-label::before {
  content: '';
  @apply w-10 h-px bg-codex-neon;
  box-shadow: var(--neon-glow);
}
```

---

## ✨ Эффекттер

### Neon Glow

```css
/* Текст glow */
.neon-text {
  color: var(--neon);
  text-shadow: var(--neon-glow);
}

/* Border glow */
box-shadow: 'neon': '0 0 20px rgba(0,255,224,0.4), 0 0 60px rgba(0,255,224,0.15)';

/* Hero текст */
text-shadow: '0 0 40px rgba(0,255,224,0.5), 0 0 80px rgba(0,255,224,0.2)';
```

### Orbs (Шарлар)

```css
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}

.orb-cyan {
  background: radial-gradient(circle, rgba(0,255,224,0.12), transparent);
}

.orb-purple {
  background: radial-gradient(circle, rgba(191,0,255,0.1), transparent);
}
```

### Hero Grid

```css
.hero-grid {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(0,255,224,0.04) 1px, transparent 1px),
    linear-gradient(90deg, rgba(0,255,224,0.04) 1px, transparent 1px);
  background-size: 60px 60px;
  mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent);
  pointer-events: none;
}
```

### Noise Overlay

```css
.noise-overlay::before {
  content: '';
  @apply fixed inset-0 pointer-events-none z-[1000];
  background-image: url("data:image/svg+xml,...");
  opacity: 0.4;
}
```

### Neon Stroke

```css
.neon-stroke {
  color: transparent;
  -webkit-text-stroke: 1px var(--neon);
}
```

---

## 🎬 Анимациялар

### Tailwind конфигурациясы

```js
keyframes: {
  "pulse-glow": {
    "0%, 100%": { opacity: "1", transform: "scale(1)" },
    "50%": { opacity: "0.5", transform: "scale(0.8)" },
  },
  "orb-float": {
    "0%, 100%": { transform: "translate(0,0)" },
    "50%": { transform: "translate(30px, -30px)" },
  },
  "float-reverse": {
    "0%, 100%": { transform: "translate(0,0)" },
    "50%": { transform: "translate(-30px, 30px)" },
  },
  "caret-blink": {
    "0%,70%,100%": { opacity: "1" },
    "20%,50%": { opacity: "0" },
  },
},
animation: {
  "pulse-glow": "pulse-glow 2s infinite",
  "orb-float": "orb-float 8s ease-in-out infinite",
  "float-reverse": "float-reverse 10s ease-in-out infinite",
  "caret-blink": "caret-blink 1.25s ease-out infinite",
}
```

---

## 📱 Response дизайн

### Breakpoints

| Breakpoint | Ширинасы | Қолданылуы |
|------------|----------|------------|
| `sm` | 640px | Үлкен телефондар |
| `md` | 768px | Планшеттер |
| `lg` | 1024px | Ноутбуктар |
| `xl` | 1280px | Үлкен ноутбуктар |

### Container

```css
max-w-4xl mx-auto  /* Тест беті */
max-w-5xl mx-auto  /* Нәтижелер беті */
max-w-6xl mx-auto  /* Негізгі беттер */
```

### Бөлімше Padding

```css
px-6          /* Мобильді */
md:px-8       /* Планшет */
lg:px-16      /* Десктоп */

py-24         /* Секциялар арасы */
```

---

## 🔧 Пайдалану мысалдары

### Hero секциясы
```tsx
<section className="min-h-screen flex items-center relative px-6">
  <div className="hero-grid" />
  <div className="orb orb-cyan w-[600px] h-[600px] -top-[200px] -right-[100px] animate-orb-float" />
  <div className="orb orb-purple w-[400px] h-[400px] -bottom-[100px] -left-[100px] animate-float-reverse" />
  
  <div className="relative z-10 max-w-4xl mx-auto text-center">
    <h1 className="text-5xl md:text-7xl font-extrabold">
      <span className="text-codex-neon">Neon</span> Text
    </h1>
  </div>
</section>
```

### Card мысалы
```tsx
<div className="codex-card text-center group">
  <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center border border-codex-neon/30 bg-codex-neon/5 text-codex-neon">
    <Icon className="w-6 h-6" />
  </div>
  <h3 className="text-lg font-bold mb-2">Тақырып</h3>
  <p className="font-mono text-sm text-codex-muted">Мәтін</p>
</div>
```
