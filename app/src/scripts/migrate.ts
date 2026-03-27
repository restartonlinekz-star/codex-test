import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://gznnnfdowhochxovnaeh.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd6bm5uZmRvd2hvY2h4b3ZuYWVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ1ODc0NDIsImV4cCI6MjA5MDE2MzQ0Mn0.MEJbKmmO0dKk082qdWd2Gl5HfZqmfVZJTagGbzvr9mc';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const tests = [
  {
    id: 'html-css-basics',
    title: 'HTML & CSS Негіздері',
    description: 'Веб-разработканың негіздері. HTML тегтері, CSS селекторлары, флексбокс және грид жүйелері.',
    category: 'Frontend',
    difficulty: 'beginner',
    duration: 20,
    questionsCount: 10,
    icon: '🌐',
    color: '#00ffe0',
    questions: [
      { id: 1, question: 'HTML дегеніміз не?', options: ['Hyper Text Markup Language — гипермәтінді белгілеу тілі', 'High Tech Modern Language — жоғары технологиялы заманауи тіл', 'Home Tool Management Language — үй құралдарын басқару тілі', 'Hyper Transfer Mode Link — гипер тасымалдау режімі'], correctAnswer: 0, explanation: 'HTML (HyperText Markup Language) — веб-беттерді құру үшін қолданылатын стандартты белгілеу тілі.' },
      { id: 2, question: 'CSS-те элементті горизонтальды орталау үшін қандай қасиет қолданылады?', options: ['vertical-align: center', 'margin: 0 auto', 'align: center', 'position: center'], correctAnswer: 1, explanation: 'margin: 0 auto — блок элементін горизонтальды орталаудың стандартты тәсілі.' },
      { id: 3, question: 'HTML-де сілтеме жасау үшін қандай тег қолданылады?', options: ['<link>', '<a>', '<href>', '<url>'], correctAnswer: 1, explanation: '<a> (anchor) тегі — гиперсілтемелер жасау үшін қолданылады.' },
      { id: 4, question: 'CSS-те id селекторы қалай белгіленеді?', options: ['.idName', '#idName', '@idName', '*idName'], correctAnswer: 1, explanation: 'Id селекторы # (решетка) белгісімен басталады, мысалы: #header' },
      { id: 5, question: 'Flexbox-та элементтерді вертикальды орталау үшін қандай қасиет қолданылады?', options: ['justify-content: center', 'align-items: center', 'flex-direction: column', 'text-align: center'], correctAnswer: 1, explanation: 'align-items: center — флекс контейнердегі элементтерді кросс осі бойынша орталауды қамтамасыз етеді.' },
      { id: 6, question: 'HTML-де тізім жасау үшін қандай тегтер қолданылады?', options: ['<list> және <item>', '<ul>, <ol> және <li>', '<array> және <element>', '<dl> және <dt> ғана'], correctAnswer: 1, explanation: '<ul> — тәртіпсіз тізім, <ol> — тәртіпті тізім, <li> — тізім элементі.' },
      { id: 7, question: 'CSS-те !important деген не?', options: ['Қасиетті маңызды деп белгілеу', 'Басқа барлық стильдерді елемеу', 'Қасиетке жоғары приоритет беру', 'Стильді импорттау'], correctAnswer: 2, explanation: '!important — CSS қасиетіне ең жоғары спецификалықтық береді, басқа стильдерді басып тастайды.' },
      { id: 8, question: 'CSS Grid-те 3 бағанadan тұратын тор жасау үшін қандай код дұрыс?', options: ['grid-template-columns: 3;', 'grid-columns: 3;', 'grid-template-columns: repeat(3, 1fr);', 'columns: 3;'], correctAnswer: 2, explanation: 'grid-template-columns: repeat(3, 1fr) — 3 тең көлемді бағанадан тұратын тор жасайды.' },
      { id: 9, question: 'HTML-де сурет қою үшін қандай тег қолданылады?', options: ['<picture>', '<image>', '<img>', '<src>'], correctAnswer: 2, explanation: '<img> тегі — веб-бетке сурет қою үшін қолданылады, src атрибутымен сурет жолы көрсетіледі.' },
      { id: 10, question: 'CSS-те псевдо-класс :hover не істейді?', options: ['Элементті басқанда стильді өзгертеді', 'Элементтің үстіне тышқан әкелгенде стильді өзгертеді', 'Элементті жоюда стильді өзгертеді', 'Бет жүктелгенде стильді қолданады'], correctAnswer: 1, explanation: ':hover — тышқан курсоры элементтің үстінде болғанда стильді қолданатын псевдо-класс.' }
    ]
  },
  {
    id: 'javascript-basics',
    title: 'JavaScript Негіздері',
    description: 'JavaScript тілінің негіздері. Айнымалылар, функциялар, циклдар, массивтер және объектілер.',
    category: 'Frontend',
    difficulty: 'beginner',
    duration: 25,
    questionsCount: 10,
    icon: '⚡',
    color: '#f7df1e',
    questions: [
      { id: 1, question: 'JavaScript-те айнымалыны жариялау үшін қандай кілт сөзі қолданылады?', options: ['var', 'let', 'const', 'Барлығы дұрыс'], correctAnswer: 3, explanation: 'var, let және const — барлығы айнымалыларды жариялау үшін қолданылады, бірақ let және const заманауи тәсіл.' },
      { id: 2, question: 'console.log(typeof "Hello") нені шығарады?', options: ['"string"', '"text"', '"char"', '"object"'], correctAnswer: 0, explanation: 'typeof операторы мәннің типін қайтарады. "Hello" — string типі.' },
      { id: 3, question: 'Массивке жаңа элемент қосу үшін қандай әдіс қолданылады?', options: ['add()', 'append()', 'push()', 'insert()'], correctAnswer: 2, explanation: 'push() — массив соңына бір немесе бірнеше элемент қосу әдісі.' },
      { id: 4, question: 'Стрелкалық функцияның дұрыс синтаксисі қайсы?', options: ['function => () {}', '() => {}', 'function -> () {}', '=> function() {}'], correctAnswer: 1, explanation: '() => {} — стрелкалық функцияның стандартты синтаксисі.' },
      { id: 5, question: 'JavaScript-те === операторы не істейді?', options: ['Тек мәнді салыстырады', 'Мән мен типті салыстырады', 'Типті салыстырады', 'Тең емес деп тексереді'], correctAnswer: 1, explanation: '=== (қатаң теңдік) — мәнді ғана емес, типті де салыстырады. Мысалы: 5 === "5" → false' },
      { id: 6, question: 'for циклінің дұрыс синтаксисі қайсы?', options: ['for (i = 0; i < 5; i++) {}', 'for i = 0 to 5 {}', 'for (i < 5; i++) {}', 'loop (i = 0; i < 5; i++) {}'], correctAnswer: 0, explanation: 'for (бастапқы; шарт; инкремент) {} — for циклінің стандартты синтаксисі.' },
      { id: 7, question: 'Объектінің қасиетіне қалай қол жеткізуге болады?', options: ['Тек obj.property', 'Тек obj["property"]', 'obj.property немесе obj["property"]', 'obj->property'], correctAnswer: 2, explanation: 'Екі тәсіл де дұрыс: нүкте нотациясы (obj.name) немесе жақша нотациясы (obj["name"]).' },
      { id: 8, question: 'map() әдісі не істейді?', options: ['Массивті сүзгілеу', 'Массивтің әр элементіне функция қолданып, жаңа массив қайтарады', 'Массивті сұрыптау', 'Массивтен элементті табу'], correctAnswer: 1, explanation: 'map() — әр элементке функция қолданып, жаңа массив қайтаратын жоғарғы деңгейлі функция.' },
      { id: 9, question: 'null дегеніміз не?', options: ['Белгісіз мән', 'Нөл мәнін білдіреді', 'Мәннің жоқтығын білдіретін арнайы мән', 'Бос мәтін'], correctAnswer: 2, explanation: 'null — мәннің әдейі жоқ екенін білдіретін арнайы мән. undefined-тан айырмашылығы — бұл әдейі беріледі.' },
      { id: 10, question: 'setTimeout() функциясы не істейді?', options: ['Кодты бірден орындайды', 'Кодты белгілі уақыттан кейін орындайды', 'Кодты әр уақытта қайталайды', 'Кодты тоқтатады'], correctAnswer: 1, explanation: 'setTimeout() — функцияны немесе кодты белгілі уақыттан кейін (милисекундпен) орындауды жоспарлайды.' }
    ]
  },
  {
    id: 'react-basics',
    title: 'React Негіздері',
    description: 'React кітапханасы. Компоненттер, JSX, state, props және hook-тар.',
    category: 'Frontend',
    difficulty: 'intermediate',
    duration: 30,
    questionsCount: 10,
    icon: '⚛️',
    color: '#61dafb',
    questions: [
      { id: 1, question: 'React дегеніміз не?', options: ['JavaScript фреймворкі', 'JavaScript кітапханасы', 'CSS фреймворкі', 'Бэкенд платформасы'], correctAnswer: 1, explanation: 'React — пайдаланушы интерфейстерін құру үшін қолданылатын JavaScript кітапханасы.' },
      { id: 2, question: 'JSX дегеніміз не?', options: ['JavaScript XML — JavaScript-ке HTML синтаксисін енгізу', 'Java Syntax Extension — Java кеңейтімі', 'JSON XML Format — деректер форматы', 'JavaScript Extension — браузер кеңейтімі'], correctAnswer: 0, explanation: 'JSX (JavaScript XML) — React-те HTML-ге ұқсас синтаксисті JavaScript кодында қолдануға мүмкіндік беретін синтаксис кеңейтімі.' },
      { id: 3, question: 'useState() hook-ы не істейді?', options: ['Серверден деректер алады', 'Компонентте күйді (state) сақтауға мүмкіндік береді', 'Маршруттауды басқарады', 'DOM-ға тікелей қол жеткізеді'], correctAnswer: 1, explanation: 'useState() — функционалды компоненттерде күйді сақтау және жаңарту үшін қолданылатын React hook-ы.' },
      { id: 4, question: 'Props дегеніміз не?', options: ['Компоненттің ішкі күйі', 'Ата-ана компоненттен балама компонентке берілетін деректер', 'Браузер параметрлері', 'Глобалды айнымалылар'], correctAnswer: 1, explanation: 'Props (properties) — React компоненттері арасында деректер беру механизмі. Тек оқуға арналған.' },
      { id: 5, question: 'useEffect() hook-ы не істейді?', options: ['Компоненттің көрінісін өзгертеді', 'Жанама әсерлерді (side effects) басқарады', 'State-ті тазартады', 'Props-ты жаңартады'], correctAnswer: 1, explanation: 'useEffect() — жанама әсерлерді (API шақырулар, DOM манипуляциялары, таймерлер) басқару үшін қолданылады.' },
      { id: 6, question: 'Компонентті қайта рендерлеуге не себеп болады?', options: ['Тек props өзгергенде', 'Тек state өзгергенде', 'Props немесе state өзгергенде', 'Ешқашан қайта рендерленбейді'], correctAnswer: 2, explanation: 'Компонент props немесе state өзгергенде қайта рендерленеді.' },
      { id: 7, question: 'React-те key пропсы не үшін қажет?', options: ['Компонент стилі үшін', 'Тізім элементтерін тану және оңтайландыру үшін', 'Маршруттау үшін', 'Форма валидациясы үшін'], correctAnswer: 1, explanation: 'key — React-ке тізім элементтерін тануға және қайта рендерлеуді оңтайландыруға көмектеседі.' },
      { id: 8, question: 'useContext() hook-ы не істейді?', options: ['Контекстті жасайды', 'Контекст мәнін оқуға мүмкіндік береді', 'Жаңа компонент жасайды', 'DOM элементін табады'], correctAnswer: 1, explanation: 'useContext() — React контекстінен мәнді оқу үшін қолданылатын hook.' },
      { id: 9, question: 'React.Fragment не үшін қолданылады?', options: ['Көп балалық элементтерді қосымша DOM түйінсіз қайтару', 'Фрагментті жүктеу', 'Маршруттау', 'State басқару'], correctAnswer: 0, explanation: 'Fragment — қосымша div-терсіз бірнеше элементті қайтаруға мүмкіндік береді.' },
      { id: 10, question: 'React-те controlled component дегеніміз не?', options: ['Тек оқуға арналған компонент', 'Мәнін React state басқаратын компонент', 'Серверден басқарылатын компонент', 'Автоматты рендерленетін компонент'], correctAnswer: 1, explanation: 'Controlled component — мәнін React күйі басқаратын форма элементі (input, select т.б.).' }
    ]
  },
  {
    id: 'backend-basics',
    title: 'Backend Негіздері',
    description: 'Backend әзірлеу негіздері. Node.js, Express, API және дерекқорлар.',
    category: 'Backend',
    difficulty: 'intermediate',
    duration: 30,
    questionsCount: 10,
    icon: '🔧',
    color: '#68a063',
    questions: [
      { id: 1, question: 'HTTP дегеніміз не?', options: ['HyperText Transfer Protocol — гипермәтінді тасымалдау хаттамасы', 'High Tech Transfer Process — жоғары технологиялы тасымалдау', 'Home Tool Text Protocol — үй құралдары мәтін хаттамасы', 'HyperText Template Protocol — гипермәтін шаблон хаттамасы'], correctAnswer: 0, explanation: 'HTTP (HyperText Transfer Protocol) — веб-браузер мен сервер арасында деректер алмасу хаттамасы.' },
      { id: 2, question: 'REST API дегеніміз не?', options: ['Бағдарламалау тілі', 'Архитектуралық стиль — ресурстарды HTTP арқылы басқару', 'Дерекқор түрі', 'Браузер кеңейтімі'], correctAnswer: 1, explanation: 'REST API — ресурстарды HTTP әдістері (GET, POST, PUT, DELETE) арқылы басқару архитектурасы.' },
      { id: 3, question: 'Node.js дегеніміз не?', options: ['JavaScript фреймворкі', 'JavaScript орындау ортасы (runtime)', 'Браузер қозғалтқышы', 'Операциялық жүйе'], correctAnswer: 1, explanation: 'Node.js — JavaScript кодын браузерден тыс жерде (серверде) орындауға мүмкіндік беретін runtime.' },
      { id: 4, question: 'Express.js не үшін қолданылады?', options: ['Frontend әзірлеу', 'Node.js веб-фреймворкі — API жасау', 'Дерекқор басқару', 'CSS препроцессор'], correctAnswer: 1, explanation: 'Express.js — Node.js үшін минималды және икемді веб-фреймворк.' },
      { id: 5, question: 'HTTP GET әдісі не істейді?', options: ['Деректерді жібереді', 'Деректерді серверден алады', 'Деректерді жояды', 'Деректерді жаңартады'], correctAnswer: 1, explanation: 'GET — серверден деректерді сұрау үшін қолданыланды HTTP әдісі.' },
      { id: 6, question: 'JSON дегеніміз не?', options: ['JavaScript Object Notation — деректер алмасу форматы', 'Java Script Object Network — желі хаттамасы', 'Java Syntax Object Notation — синтаксис форматы', 'Java System Object Name — жүйелік атау'], correctAnswer: 0, explanation: 'JSON (JavaScript Object Notation) — адам оқуға ыңғайлы деректер алмасу форматы.' },
      { id: 7, question: 'Middleware дегеніміз не?', options: ['Дерекқор түрі', 'Сұраным мен жауап арасында орындалатын функция', 'Браузер кеңейтімі', 'CSS файлы'], correctAnswer: 1, explanation: 'Middleware — сұранымды өңдеу барысында орындалатын функция (аутентификация, логтау т.б.).' },
      { id: 8, question: 'SQL дегеніміз не?', options: ['NoSQL дерекқоры', 'Structured Query Language — құрылымды сұраныс тілі', 'Simple Query Language — қарапайым сұраныс тілі', 'System Query Language — жүйелік сұраныс тілі'], correctAnswer: 1, explanation: 'SQL (Structured Query Language) — реляциялық дерекқорлармен жұмыс істеу тілі.' },
      { id: 9, question: 'HTTP 404 статус коды не білдіреді?', options: ['Сервер қатесі', 'Сұраным сәтті орындалды', 'Ресурс табылмады', 'Рұқсат жоқ'], correctAnswer: 2, explanation: '404 Not Found — сұралған ресурс (бет, файл) серверде табылмады.' },
      { id: 10, question: 'npm дегеніміз не?', options: ['Node Package Manager — Node.js пакеттер менеджері', 'New Project Manager — жаңа жоба менеджері', 'Node Program Module — Node программа модулі', 'Network Package Manager — желі пакеттер менеджері'], correctAnswer: 0, explanation: 'npm (Node Package Manager) — Node.js пакеттерін басқару құралы.' }
    ]
  }
];

async function migrateData() {
  console.log('🚀 Supabase миграциясы басталды...\n');

  console.log('📂 Categories жариялануда...');
  const { data: existingCategories } = await supabase.from('categories').select('id, name');
  
  const categoryMap: Record<string, string> = {};
  if (existingCategories && existingCategories.length > 0) {
    existingCategories.forEach((c: { id: string; name: string }) => {
      categoryMap[c.name] = c.id;
    });
    console.log('  ℹ️ Categories бурыннан бар:', categoryMap);
  } else {
    await supabase.from('categories').insert([
      { name: 'Frontend', icon: '💻', color: '#00ffe0' },
      { name: 'Backend', icon: '⚙️', color: '#68a063' }
    ]);
    const { data: newCategories } = await supabase.from('categories').select('id, name');
    if (newCategories) {
      newCategories.forEach((c: { id: string; name: string }) => {
        categoryMap[c.name] = c.id;
      });
    }
    console.log('  ✅ Categories жарияланды');
  }
  console.log('');

  for (const test of tests) {
    console.log(`📝 "${test.title}" өңделуде...`);

    const categoryId = categoryMap[test.category];
    if (!categoryId) {
      console.error(`  ❌ Category "${test.category}" табылмады`);
      continue;
    }

    const { error: testError } = await supabase
      .from('tests')
      .upsert({
        id: test.id,
        title: test.title,
        description: test.description,
        category_id: categoryId,
        difficulty: test.difficulty,
        duration: test.duration,
        questions_count: test.questionsCount
      }, { onConflict: 'id' });

    if (testError) {
      console.error(`  ❌ Test жариялауда қате: ${testError.message}`);
      continue;
    }
    console.log('  ✅ Test жарияланды');

    await supabase.from('questions').delete().eq('test_id', test.id);

    const questionsToInsert = test.questions.map((q, idx) => ({
      test_id: test.id,
      question: q.question,
      options: q.options,
      correct_answer: q.correctAnswer,
      explanation: q.explanation,
      order_index: idx
    }));

    const { error: qError } = await supabase.from('questions').insert(questionsToInsert);
    if (qError) {
      console.error(`  ❌ Questions жариялауда қате: ${qError.message}`);
    } else {
      console.log(`  ✅ ${test.questions.length} сұрақ жарияланды`);
    }

    console.log('');
  }

  console.log('🎉 Миграция аяқталды!');
  console.log('\nДеректер Supabase-ке сәтті жүктелді!');
}

migrateData().catch(console.error);
