/**
 * Lesson Loader — загрузка и управление уроками
 */
const LessonLoader = (() => {
    // Все уроки встроены для работы без сервера (file:// протокол)
    const LESSONS = [
        {
            id: 'lesson-01',
            title: 'Hello World — Твой первый PHP!',
            icon: '👋',
            difficulty: 1,
            badgeId: 'first_echo',
            concepts: ['echo', 'строки'],
            mascotSays: 'Привет! Давай научим компьютер говорить! В PHP для этого есть команда <code>echo</code> — она выводит текст на экран.',
            scratchComparison: 'В Scratch ты используешь блок "сказать". В PHP мы пишем <code>echo "текст";</code> — это то же самое!',
            starterPhp: '<?php\n// Это твой первый PHP код!\n// echo — значит "покажи на экране"\n\necho "Привет, мир!";\n',
            starterHtml: '<div style="text-align: center; padding: 40px;">\n  <h1>🌍 Мой первый сайт</h1>\n  <p style="font-size: 24px; color: #6C5CE7;">\n    {{ output }}\n  </p>\n</div>',
            hints: [
                'Команда <code>echo</code> выводит текст. Текст нужно писать в кавычках: <code>echo "Привет!";</code>',
                'Не забудь точку с запятой <code>;</code> в конце строки — это как точка в конце предложения!',
                'Попробуй написать два <code>echo</code> подряд:\n<code>echo "Строка 1";</code>\n<code>echo "Строка 2";</code>',
                '🌐 <b>Что значит HTML слева?</b><br><code>&lt;div&gt;</code> — это "коробка", контейнер для других элементов<br><code>&lt;h1&gt;</code> — большой заголовок<br><code>&lt;p&gt;</code> — обычный текст<br><code>style="..."</code> — оформление (цвет, размер)<br><code>{{ output }}</code> — сюда подставится то, что выведет твой PHP!',
                '🎨 <b>Попробуй поменять HTML!</b><br>Замени <code>color: #6C5CE7</code> на <code>color: red</code> слева — текст станет красным!<br>Измени <code>&lt;h1&gt;</code> на <code>&lt;h2&gt;</code> — заголовок станет меньше'
            ],
            challenges: [
                { task: 'Измени текст — пусть программа скажет твоё имя!', check: 'notEquals', checkValue: 'Привет, мир!' },
                { task: 'Добавь второй echo с новой строкой. Подсказка: используй тег <br> между текстами', check: 'contains', checkValue: '<br>' },
                { task: 'Сделай текст жирным! Оберни слово в тег: echo "<b>слово</b>";', check: 'contains', checkValue: '<b>' }
            ]
        },
        {
            id: 'lesson-02',
            title: 'Переменные — Коробки для данных',
            icon: '📦',
            difficulty: 1,
            badgeId: 'variable_master',
            concepts: ['переменные', '$'],
            mascotSays: 'Переменная — это как коробка с наклейкой. Ты кладёшь в неё что-то, а потом используешь! В PHP переменные начинаются с <code>$</code>.',
            scratchComparison: 'В Scratch ты создаёшь переменную кнопкой "Создать переменную". В PHP пишешь: <code>$имя = "значение";</code>',
            starterPhp: '<?php\n// Переменные начинаются со знака $\n$name = "Программист";\n$age = 9;\n\n// Используем переменные в echo\necho "Меня зовут " . $name;\necho "<br>";\necho "Мне " . $age . " лет";\n',
            starterHtml: '<div style="text-align: center; padding: 30px; font-family: Arial;">\n  <h1>📋 Моя визитка</h1>\n  <div style="background: #f0f0ff; padding: 20px; border-radius: 16px; display: inline-block;">\n    {{ output }}\n  </div>\n</div>',
            hints: [
                'Переменная создаётся так: <code>$name = "Вася";</code>. Знак <code>$</code> — обязательный!',
                'Точка <code>.</code> склеивает текст: <code>echo "Привет, " . $name;</code>',
                'Числа пишут без кавычек: <code>$age = 9;</code>, а текст — в кавычках: <code>$name = "Макс";</code>',
                '🌐 <b>HTML слева:</b><br><code>&lt;div style="background: #f0f0ff; ..."&gt;</code> — коробка с голубым фоном<br><code>border-radius: 16px</code> — скруглённые углы<br><code>display: inline-block</code> — коробка подстраивается под содержимое<br>Попробуй поменять цвет фона!'
            ],
            challenges: [
                { task: 'Поменяй имя и возраст на свои!', check: 'notEquals', checkValue: 'Программист' },
                { task: 'Добавь новую переменную $hobby и выведи её!', check: 'containsWord', checkValue: '$hobby' },
                { task: 'Выведи всё красиво: имя, возраст и хобби на отдельных строках', check: 'outputLineCount', checkValue: 3 }
            ]
        },
        {
            id: 'lesson-03',
            title: 'Математика — PHP-калькулятор',
            icon: '🧮',
            difficulty: 1,
            badgeId: 'math_wizard',
            concepts: ['+', '-', '*', '/', '%'],
            mascotSays: 'PHP отлично считает! Ты можешь складывать, вычитать, умножать и делить — прямо как калькулятор. Давай построим свой!',
            scratchComparison: 'В Scratch ты используешь зелёные блоки-операторы (+, -, ×, ÷). В PHP пишешь прямо: <code>$result = 5 + 3;</code>',
            starterPhp: '<?php\n$a = 10;\n$b = 3;\n\n$sum = $a + $b;\n$diff = $a - $b;\n$mult = $a * $b;\n$div = $a / $b;\n\necho "<b>Числа:</b> $a и $b<br>";\necho "➕ Сложение: $sum<br>";\necho "➖ Вычитание: $diff<br>";\necho "✖️ Умножение: $mult<br>";\necho "➗ Деление: " . round($div, 2) . "<br>";\n',
            starterHtml: '<div style="padding: 30px; font-family: Arial;">\n  <h1 style="text-align:center;">🧮 Мой калькулятор</h1>\n  <div style="background: #1a1a2e; color: #0ff; padding: 20px; border-radius: 16px; font-size: 18px; font-family: monospace;">\n    {{ output }}\n  </div>\n</div>',
            hints: [
                'Операции: <code>+</code> сложение, <code>-</code> вычитание, <code>*</code> умножение, <code>/</code> деление',
                '<code>round($число, 2)</code> — округляет до 2 знаков после запятой',
                'Попробуй <code>$a % $b</code> — это остаток от деления! Например, 10 % 3 = 1',
                '🌐 <b>HTML слева:</b><br><code>background: #1a1a2e</code> — тёмный фон<br><code>color: #0ff</code> — бирюзовый текст (как в хакерских фильмах!)<br><code>font-family: monospace</code> — шрифт как в редакторе кода<br>Попробуй поменять цвета!'
            ],
            challenges: [
                { task: 'Поменяй числа $a и $b и посмотри, как изменятся результаты!', check: 'notContains', checkValue: 'Числа:</b> 10 и 3' },
                { task: 'Добавь вычисление остатка от деления (оператор %)', check: 'contains', checkValue: '%' },
                { task: 'Вычисли площадь комнаты: $width = 5; $height = 4; $area = $width * $height;', check: 'containsAny', checkValue: ['площадь', 'area', 'Площадь'] }
            ]
        },
        {
            id: 'lesson-04',
            title: 'Условия — Если... то... иначе',
            icon: '🔀',
            difficulty: 2,
            badgeId: 'if_else_hero',
            concepts: ['if', 'else', 'elseif', 'сравнение'],
            mascotSays: 'Программы умеют принимать решения! <code>if</code> проверяет условие: если оно верно — делает одно, если нет — другое.',
            scratchComparison: 'В Scratch есть блок "если ... то ... иначе". В PHP это: <code>if (...) { } else { }</code>',
            starterPhp: '<?php\n$score = 85;\n\necho "<b>Твой счёт: $score</b><br><br>";\n\nif ($score >= 90) {\n    echo "🏆 Отлично! Ты гений!";\n} elseif ($score >= 70) {\n    echo "👍 Хорошо! Молодец!";\n} elseif ($score >= 50) {\n    echo "😊 Нормально, но можно лучше!";\n} else {\n    echo "💪 Нужно больше практики!";\n}\n',
            starterHtml: '<div style="text-align: center; padding: 30px; font-family: Arial;">\n  <h1>📊 Проверка результатов</h1>\n  <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 30px; border-radius: 20px; font-size: 20px;">\n    {{ output }}\n  </div>\n</div>',
            hints: [
                '<code>if ($x > 10) { ... }</code> — выполнится, если $x больше 10',
                'Сравнения: <code>></code> больше, <code><</code> меньше, <code>>=</code> больше-равно, <code>==</code> равно, <code>!=</code> не равно',
                '<code>elseif</code> — добавляет ещё одну проверку. Можно использовать сколько угодно раз!',
                '🌐 <b>HTML слева:</b><br><code>background: linear-gradient(135deg, #667eea, #764ba2)</code> — красивый переход между двумя цветами!<br>Попробуй поменять цвета или угол (135deg → 90deg, 45deg)'
            ],
            challenges: [
                { task: 'Измени $score и проверь все варианты сообщений!', check: 'notEquals', checkValue: '85' },
                { task: 'Добавь проверку: если score == 100, покажи специальное сообщение!', check: 'contains', checkValue: '100' },
                { task: 'Создай переменную $weather и выведи совет: если "rain" — бери зонт, если "sun" — бери очки', check: 'containsWord', checkValue: '$weather' }
            ]
        },
        {
            id: 'lesson-05',
            title: 'Циклы — Повтори много раз!',
            icon: '🔁',
            difficulty: 2,
            badgeId: 'loop_lord',
            concepts: ['for', 'while', 'циклы'],
            mascotSays: 'Цикл повторяет код несколько раз. Представь, что нужно нарисовать 10 звёздочек — не будешь же писать echo 10 раз!',
            scratchComparison: 'В Scratch есть блок "повторить 10 раз". В PHP это: <code>for ($i = 0; $i < 10; $i++) { ... }</code>',
            starterPhp: '<?php\n// Цикл for — повторяет код несколько раз\n// $i начинается с 1, пока $i <= 5, увеличивается на 1\n\necho "<b>Мои звёзды:</b><br>";\n\nfor ($i = 1; $i <= 5; $i++) {\n    echo "⭐ Звезда #$i<br>";\n}\n\necho "<br><b>Обратный отсчёт:</b><br>";\n\nfor ($i = 10; $i >= 1; $i--) {\n    echo "$i... ";\n}\necho "🚀 Пуск!";\n',
            starterHtml: '<div style="text-align: center; padding: 30px; font-family: Arial;">\n  <h1>🔁 Сила повторений</h1>\n  <div style="background: #2d3436; color: #dfe6e9; padding: 20px; border-radius: 16px; font-size: 18px;">\n    {{ output }}\n  </div>\n</div>',
            hints: [
                '<code>for ($i = 1; $i <= 10; $i++)</code> — повторяет от 1 до 10. <code>$i++</code> значит "$i увеличивается на 1"',
                'Поменяй число 5 на 20 и получишь 20 звёзд! Но не ставь слишком большое число 😄',
                'Попробуй вложенный цикл:\n<code>for ($i = 1; $i <= 3; $i++) {\n  for ($j = 1; $j <= 3; $j++) {\n    echo "⭐";\n  }\n  echo "<br>";\n}</code>',
                '🌐 <b>HTML слева:</b><br><code>#2d3436</code> — тёмно-серый фон<br><code>#dfe6e9</code> — светло-серый текст<br>Можешь добавить <code>&lt;hr&gt;</code> в PHP — это горизонтальная линия-разделитель!'
            ],
            challenges: [
                { task: 'Измени цикл, чтобы было 10 звёзд!', check: 'countOccurrences', checkValue: { text: '⭐', min: 10 } },
                { task: 'Сделай таблицу умножения на 7: for ($i = 1; $i <= 10; $i++) echo "7 × $i = " . (7 * $i);', check: 'contains', checkValue: '× ' },
                { task: 'Нарисуй пирамидку из звёздочек (1, потом 2, потом 3...)', check: 'outputLineCount', checkValue: 3 }
            ]
        },
        {
            id: 'lesson-06',
            title: 'Массивы — Списки данных',
            icon: '📋',
            difficulty: 2,
            badgeId: 'array_ace',
            concepts: ['array', 'foreach', 'count'],
            mascotSays: 'Массив — это список! Как список покупок или список друзей. В PHP массив хранит много значений в одной переменной.',
            scratchComparison: 'В Scratch есть "Списки" — ты добавляешь элементы и обращаешься по номеру. В PHP это <code>$list = ["яблоко", "банан"];</code>',
            starterPhp: '<?php\n// Массив — список значений\n$fruits = ["🍎 Яблоко", "🍌 Банан", "🍊 Апельсин", "🍇 Виноград"];\n\necho "<b>Мои фрукты:</b><br>";\n\n// foreach проходит по каждому элементу\nforeach ($fruits as $fruit) {\n    echo "• $fruit<br>";\n}\n\necho "<br>Всего: " . count($fruits) . " фруктов";\n',
            starterHtml: '<div style="padding: 30px; font-family: Arial;">\n  <h1 style="text-align:center;">📋 Мой список</h1>\n  <div style="max-width: 400px; margin: auto; background: #ffeaa7; color: #2d3436; padding: 20px; border-radius: 16px; font-size: 18px;">\n    {{ output }}\n  </div>\n</div>',
            hints: [
                'Массив создаётся так: <code>$arr = ["один", "два", "три"];</code>',
                '<code>foreach ($arr as $item)</code> — проходит по каждому элементу списка',
                '<code>count($arr)</code> — считает, сколько элементов в массиве. <code>$arr[0]</code> — первый элемент (счёт с нуля!)',
                '🌐 <b>HTML слева:</b><br><code>#ffeaa7</code> — жёлтый фон, как стикер для заметок!<br><code>max-width: 400px</code> — ограничивает ширину<br><code>margin: auto</code> — ставит блок по центру<br>Попробуй изменить ширину или цвет фона!'
            ],
            challenges: [
                { task: 'Замени фрукты на своих друзей или любимые игры!', check: 'notContains', checkValue: 'Яблоко' },
                { task: 'Добавь ещё 3 элемента в массив!', check: 'countOccurrences', checkValue: { text: '•', min: 7 } },
                { task: 'Используй цикл for вместо foreach: for ($i = 0; $i < count($arr); $i++) и выведи номер элемента', check: 'contains', checkValue: '#' }
            ]
        },
        {
            id: 'lesson-07',
            title: 'Функции — Свои команды',
            icon: '⚡',
            difficulty: 3,
            badgeId: 'function_hero',
            concepts: ['function', 'return', 'параметры'],
            mascotSays: 'Функция — это твоя собственная команда! Ты даёшь ей имя, говоришь что делать, и потом вызываешь сколько хочешь раз.',
            scratchComparison: 'В Scratch ты создаёшь "Мои блоки" и потом используешь их. В PHP это <code>function myBlock() { ... }</code>',
            starterPhp: '<?php\n// Создаём функцию\nfunction greet($name) {\n    return "Привет, $name! 👋";\n}\n\nfunction makeStars($count) {\n    $stars = "";\n    for ($i = 0; $i < $count; $i++) {\n        $stars .= "⭐";\n    }\n    return $stars;\n}\n\n// Вызываем функции\necho greet("Программист") . "<br>";\necho greet("PHP") . "<br><br>";\n\necho "Рейтинг: " . makeStars(5) . "<br>";\necho "Рейтинг: " . makeStars(3) . "<br>";\n',
            starterHtml: '<div style="text-align:center; padding: 30px; font-family: Arial;">\n  <h1>⚡ Мои функции</h1>\n  <div style="background: linear-gradient(135deg, #a29bfe, #6c5ce7); color: white; padding: 25px; border-radius: 20px; font-size: 18px;">\n    {{ output }}\n  </div>\n</div>',
            hints: [
                '<code>function имя($параметр) { return результат; }</code> — создаёт функцию',
                '<code>return</code> — возвращает результат из функции. Без return функция ничего не вернёт',
                'Функцию можно вызывать много раз с разными данными: <code>greet("Мама")</code>, <code>greet("Папа")</code>'
            ],
            challenges: [
                { task: 'Вызови greet() со своим именем!', check: 'notContains', checkValue: 'Программист' },
                { task: 'Создай функцию add($a, $b), которая возвращает сумму двух чисел', check: 'containsWord', checkValue: 'function add' },
                { task: 'Создай функцию repeat($text, $times), которая повторяет текст N раз', check: 'containsWord', checkValue: 'function repeat' }
            ]
        },
        {
            id: 'lesson-08',
            title: 'Интерактивность — Данные из форм',
            icon: '📝',
            difficulty: 3,
            badgeId: 'form_builder',
            concepts: ['формы', 'данные', 'обработка'],
            mascotSays: 'На настоящих сайтах пользователи вводят данные в формы, а PHP их обрабатывает. Мы это сымитируем! PHP будет генерировать страницу с "данными пользователя".',
            scratchComparison: 'В Scratch есть блок "спросить" для ввода. В PHP данные приходят из форм на веб-странице.',
            starterPhp: '<?php\n// Имитируем данные из формы\n// Меняй эти значения — как будто пользователь ввёл их!\n$username = "SuperCoder";\n$color = "#6C5CE7";\n$emoji = "🚀";\n$motto = "Код — это моя суперсила!";\n\n// Генерируем карточку профиля\necho \'<div style="text-align:center;">\'; \necho \'<div style="font-size:64px;">\'.$emoji.\'</div>\';\necho \'<h2 style="color:\'.$color.\'">\'. $username .\'</h2>\';\necho \'<p style="font-style:italic">"\'.$motto.\'"</p>\';\necho \'<p>Уровень: \';\n\n$level = strlen($username); // длина имени = уровень :)\nfor ($i = 0; $i < $level; $i++) {\n    echo "⭐";\n}\n\necho \'</p></div>\';\n',
            starterHtml: '<div style="padding: 30px; font-family: Arial;">\n  <h1 style="text-align:center;">📝 Генератор профилей</h1>\n  <div style="max-width: 400px; margin: auto; background: white; padding: 30px; border-radius: 20px; box-shadow: 0 8px 24px rgba(0,0,0,0.1);">\n    {{ output }}\n  </div>\n</div>',
            hints: [
                'Меняй значения переменных вверху — это как будто пользователь заполняет форму!',
                '<code>strlen($text)</code> — считает количество символов в тексте',
                'Попробуй разные эмодзи: 🎮 🎨 🎵 🏀 🐱 🦊 🌈'
            ],
            challenges: [
                { task: 'Заполни профиль своими данными!', check: 'notContains', checkValue: 'SuperCoder' },
                { task: 'Добавь новое поле $hobby и выведи его в карточку', check: 'containsWord', checkValue: '$hobby' },
                { task: 'Добавь условие: если уровень > 5, покажи "🏆 Мастер!", иначе "🌱 Новичок"', check: 'contains', checkValue: 'if' }
            ]
        },
        {
            id: 'lesson-09',
            title: 'Стили через PHP — Управляй дизайном!',
            icon: '🎨',
            difficulty: 3,
            badgeId: 'style_guru',
            concepts: ['CSS', 'стили', 'динамический дизайн'],
            mascotSays: 'Круто! PHP может менять внешний вид страницы! Цвета, размеры, шрифты — всё это можно задать переменными!',
            scratchComparison: 'В Scratch ты меняешь костюм спрайта. В PHP+CSS ты меняешь "костюм" всей страницы!',
            starterPhp: '<?php\n// Настройки дизайна — меняй и смотри что будет!\n$bgColor = "#1a1a2e";\n$textColor = "#eaf0fb";\n$accentColor = "#e94560";\n$fontSize = 18;\n$borderRadius = 20;\n$title = "Мой крутой сайт";\n$items = ["Главная", "Обо мне", "Проекты", "Контакты"];\n\n// Генерируем страницу с этими стилями\necho \'<div style="background:\'.$bgColor.\'; color:\'.$textColor.\'; padding:30px; border-radius:\'.$borderRadius.\'px; font-size:\'.$fontSize.\'px;">\';\necho \'<h1 style="color:\'.$accentColor.\'; text-align:center;">\'.$title.\'</h1>\';\necho \'<nav style="display:flex; justify-content:center; gap:16px; margin:20px 0;">\';\n\nforeach ($items as $item) {\n    echo \'<a style="color:\'.$accentColor.\'; text-decoration:none; padding:8px 16px; border:1px solid \'.$accentColor.\'; border-radius:8px;">\'.$item.\'</a>\';\n}\n\necho \'</nav>\';\necho \'<p style="text-align:center; opacity:0.7;">Этот сайт создан с помощью PHP! 🐘</p>\';\necho \'</div>\';\n',
            starterHtml: '<div style="padding: 20px;">\n  {{ output }}\n</div>',
            hints: [
                'Цвета можно писать по-английски (<code>"red"</code>, <code>"blue"</code>) или кодом (<code>"#FF0000"</code>)',
                'Попробуй разные размеры шрифта: от 12 до 32. Большой шрифт = заголовок!',
                'Добавь <code>$fontFamily = "Comic Sans MS";</code> и используй в стиле: <code>font-family:\'.$fontFamily.\'</code>'
            ],
            challenges: [
                { task: 'Поменяй цветовую схему — задай свои цвета!', check: 'notContains', checkValue: '#1a1a2e' },
                { task: 'Добавь раздел "footer" внизу с текстом "Сделано [твоё имя]"', check: 'containsAny', checkValue: ['footer', 'Footer', 'Сделано'] },
                { task: 'Добавь в меню ещё пункты и измени массив $items', check: 'countOccurrences', checkValue: { text: '</a>', min: 6 } }
            ]
        },
        {
            id: 'lesson-10',
            title: 'Финальный проект — Как папа! 👨‍💻',
            icon: '🏆',
            difficulty: 3,
            badgeId: 'like_dad',
            concepts: ['всё вместе', 'проект'],
            mascotSays: 'Ты прошёл все уроки! Теперь ты знаешь: echo, переменные, математику, условия, циклы, массивы, функции и стили. Это — настоящие инструменты разработчика! Создай свой мини-сайт!',
            scratchComparison: 'Ты уже знаешь больше, чем в Scratch! PHP + HTML — это то, из чего сделаны настоящие сайты. Папа гордится! 🎉',
            starterPhp: '<?php\n// 🏆 ФИНАЛЬНЫЙ ПРОЕКТ — Мой персональный сайт!\n// Здесь ты используешь ВСЁ, что узнал\n\n// === НАСТРОЙКИ ===\n$siteName = "Мой сайт";\n$author = "Junior Developer";\n$year = 2026;\n$theme = "dark"; // Попробуй: "dark" или "light"\n\n// === ЦВЕТА ТЕМЫ ===\nfunction getThemeColors($theme) {\n    if ($theme == "dark") {\n        return ["bg" => "#1e1e2e", "text" => "#cdd6f4", "accent" => "#89b4fa"];\n    } else {\n        return ["bg" => "#ffffff", "text" => "#333333", "accent" => "#6C5CE7"];\n    }\n}\n\n$colors = getThemeColors($theme);\n\n// === НАВИГАЦИЯ ===\n$pages = [\n    ["icon" => "🏠", "name" => "Главная"],\n    ["icon" => "👤", "name" => "Обо мне"],\n    ["icon" => "🎮", "name" => "Хобби"],\n    ["icon" => "📬", "name" => "Контакты"]\n];\n\n// === МОИ НАВЫКИ ===\n$skills = [\n    ["name" => "PHP", "level" => 5],\n    ["name" => "HTML", "level" => 4],\n    ["name" => "Scratch", "level" => 5],\n    ["name" => "CSS", "level" => 3]\n];\n\nfunction renderStars($level) {\n    $stars = "";\n    for ($i = 0; $i < 5; $i++) {\n        $stars .= $i < $level ? "⭐" : "☆";\n    }\n    return $stars;\n}\n\n// === ГЕНЕРИРУЕМ HTML ===\necho \'<div style="background:\'.$colors["bg"].\'; color:\'.$colors["text"].\'; min-height:100%; padding:0;">\';\n\n// Шапка\necho \'<header style="background:\'.$colors["accent"].\'; color:white; padding:20px; text-align:center;">\';\necho \'<h1>\'.$siteName.\'</h1>\';\necho \'<nav style="margin-top:12px;">\';\nforeach ($pages as $page) {\n    echo \'<span style="margin:0 12px; cursor:pointer;">\'.$page["icon"].\' \'.$page["name"].\'</span>\';\n}\necho \'</nav></header>\';\n\n// Основной контент\necho \'<main style="padding:30px; max-width:600px; margin:auto;">\';\necho \'<h2>👋 Привет! Я — \'.$author.\'</h2>\';\necho \'<p>Добро пожаловать на мой сайт! Я учусь программировать и уже знаю PHP!</p>\';\n\n// Навыки\necho \'<h3 style="margin-top:24px;">💪 Мои навыки:</h3>\';\nforeach ($skills as $skill) {\n    echo \'<div style="margin:8px 0;">\';\n    echo \'<b>\'.$skill["name"].\'</b> \';\n    echo renderStars($skill["level"]);\n    echo \'</div>\';\n}\n\n// Футер\necho \'</main>\';\necho \'<footer style="text-align:center; padding:20px; opacity:0.6;">\';\necho \'© \'.$year.\' \'.$author.\' — Сделано с 🐘 PHP\';\necho \'</footer></div>\';\n',
            starterHtml: '<div style="height: 100%;">\n  {{ output }}\n</div>',
            hints: [
                'Это свободный проект — делай что хочешь! Меняй цвета, добавляй разделы, экспериментируй!',
                'Попробуй переключить тему: поменяй <code>$theme = "light";</code>',
                'Добавь раздел "Мои проекты" с массивом и циклом — покажи все свои работы!'
            ],
            challenges: [
                { task: 'Сделай сайт своим: поменяй имя, навыки и оформление!', check: 'notContains', checkValue: 'Junior Developer' },
                { task: 'Добавь раздел "Мои хобби" с массивом хобби и циклом', check: 'containsAny', checkValue: ['hobbi', 'hobby', 'Хобби', 'хобби'] },
                { task: 'Создай новую функцию и используй её на сайте!', check: 'containsWord', checkValue: 'function ' }
            ]
        }
    ];

    function getAll() {
        return LESSONS.map(l => ({
            id: l.id,
            title: l.title,
            icon: l.icon,
            difficulty: l.difficulty,
            concepts: l.concepts
        }));
    }

    function getLesson(id) {
        return LESSONS.find(l => l.id === id) || null;
    }

    function getLessonIndex(id) {
        return LESSONS.findIndex(l => l.id === id);
    }

    function getNextLesson(currentId) {
        const idx = getLessonIndex(currentId);
        if (idx >= 0 && idx < LESSONS.length - 1) {
            return LESSONS[idx + 1];
        }
        return null;
    }

    function getTotalLessons() {
        return LESSONS.length;
    }

    return { getAll, getLesson, getLessonIndex, getNextLesson, getTotalLessons };
})();
