/**
 * Lesson Loader — большой курс PHP для начинающих
 *
 * Структура: 16 уроков, 100+ задач
 * Каждый урок: theory (теория), starter code, multiple challenges с подсказками
 * BOSS-уровни (4, 7, 11, 14) — закрепление всех предыдущих тем
 *
 * Система проверки задач (check):
 *   { outputContains: 'строка' }              — вывод содержит строку
 *   { outputContainsAll: ['a', 'b'] }         — вывод содержит ВСЕ строки
 *   { outputContainsAny: ['a', 'b'] }         — вывод содержит ХОТЬ ОДНУ
 *   { outputNotContains: 'строка' }           — НЕ содержит
 *   { outputCount: { text: '⭐', min: 5 } }   — N или более вхождений
 *   { outputLines: { min: 3 } }               — N или более строк
 *   { codeContains: 'foreach' }               — код содержит
 *   { codeContainsAll: ['for', '$i'] }        — код содержит всё
 *   { codeContainsAny: ['for', 'while'] }     — хоть что-то
 *   { codeNotContains: 'старая строка' }      — изменили исходник
 *   { codeMatches: /регэксп/ }                — регулярка
 *   { custom: (code, output) => bool }        — своя проверка
 * Все условия из объекта должны выполниться (логическое И).
 */
const LessonLoader = (() => {
    const LESSONS = [

// ============================================================
// LEVEL 1 — Hello World (echo)
// ============================================================
{
    id: 'lesson-01',
    title: 'Hello World — твой первый PHP!',
    icon: '👋',
    difficulty: 1,
    group: 'basics',
    badgeId: 'first_echo',
    concepts: ['echo', 'строки'],
    mascotSays: 'Привет! 👋 Сегодня мы научим компьютер говорить. Команда <code>echo</code> выводит текст на экран. Это твоё первое заклинание программиста!',
    scratchComparison: 'В Scratch блок «сказать» = в PHP <code>echo "текст";</code>',
    starterPhp: `<?php
// Это PHP-код. Всё начинается с <?php
// echo выводит текст на экран
// Не забудь точку с запятой ;

echo "Привет, мир!";
`,
    starterHtml: `<div style="text-align:center; padding:40px; font-family:Arial;">
  <h1>🌍 Мой первый сайт</h1>
  <p style="font-size:24px; color:#6C5CE7;">
    {{ output }}
  </p>
</div>`,
    challenges: [
        {
            task: 'Замени слово «мир» на своё имя — пусть программа поздоровается с тобой!',
            hint: 'Просто замени текст в кавычках: <code>echo "Привет, Игорь!";</code>',
            check: { outputContains: 'Привет', outputNotContains: 'мир!' }
        },
        {
            task: 'Добавь второй echo. Например: <code>echo "Я учу PHP!";</code>',
            hint: 'Напиши новую строку с echo. Не забудь <code>;</code> в конце!',
            check: { codeContainsAll: ['echo'], custom: (c) => (c.match(/echo/g) || []).length >= 2 }
        },
        {
            task: 'Сделай перенос строки между текстами. Используй HTML-тег <code>&lt;br&gt;</code> внутри echo: <code>echo "&lt;br&gt;";</code>',
            hint: 'Можно так: <code>echo "Строка 1&lt;br&gt;Строка 2";</code> или отдельным echo',
            check: { outputContains: '<br>' }
        },
        {
            task: 'Сделай слово жирным. Оберни его в тег <code>&lt;b&gt;слово&lt;/b&gt;</code>',
            hint: 'Внутри кавычек echo напиши: <code>"&lt;b&gt;Жирный текст&lt;/b&gt;"</code>',
            check: { outputContains: '<b>' }
        },
        {
            task: 'Сделай слово курсивным с тегом <code>&lt;i&gt;слово&lt;/i&gt;</code>',
            hint: 'Курсив — это <code>&lt;i&gt;текст&lt;/i&gt;</code>. Можно сочетать: <code>&lt;b&gt;&lt;i&gt;двойной&lt;/i&gt;&lt;/b&gt;</code>',
            check: { outputContains: '<i>' }
        },
        {
            task: 'Выведи минимум 3 строки текста с переносами. Например: имя, возраст, любимая еда',
            hint: 'Используй несколько echo с <code>&lt;br&gt;</code> между ними или один большой echo',
            check: { outputCount: { text: '<br>', min: 2 } }
        }
    ],
    hints: [
        '<b>echo</b> — это команда «покажи». Например: <code>echo "Текст";</code>',
        'Текст всегда пишется в кавычках: <code>"..."</code>',
        'Каждая команда заканчивается точкой с запятой <code>;</code> — как точка в предложении',
        '<code>&lt;br&gt;</code> — перенос строки. Используй его внутри echo для новых строк',
        '<code>&lt;b&gt;слово&lt;/b&gt;</code> делает текст жирным, <code>&lt;i&gt;слово&lt;/i&gt;</code> — курсивным'
    ]
},

// ============================================================
// LEVEL 2 — Variables
// ============================================================
{
    id: 'lesson-02',
    title: 'Переменные — коробки для данных',
    icon: '📦',
    difficulty: 1,
    group: 'basics',
    badgeId: 'variable_master',
    concepts: ['переменные', '$', 'интерполяция'],
    mascotSays: 'Переменная — это коробка с наклейкой. Положил что-то — потом достал. В PHP все переменные начинаются с <code>$</code>. Очень удобно!',
    scratchComparison: 'В Scratch ты создаёшь переменную в меню. В PHP пишешь: <code>$имя = "значение";</code>',
    starterPhp: `<?php
// Переменные — это коробки с именем
// Имя всегда начинается с $

$name = "Программист";
$age = 9;

// Используем переменные через точку (склейка)
echo "Меня зовут " . $name;
echo "<br>";
echo "Мне " . $age . " лет";
`,
    starterHtml: `<div style="text-align:center; padding:30px; font-family:Arial;">
  <h1>📋 Моя визитка</h1>
  <div style="display:inline-block; background:#f0f0ff; padding:20px 30px; border-radius:16px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Замени имя «Программист» на своё настоящее имя в переменной $name',
            hint: 'Найди строку <code>$name = "Программист";</code> и замени значение в кавычках',
            check: { codeNotContains: '"Программист"' }
        },
        {
            task: 'Замени возраст 9 на свой в переменной $age (числа без кавычек!)',
            hint: 'Числа пишут БЕЗ кавычек: <code>$age = 12;</code>. Только текст в кавычках!',
            check: { codeNotContains: '$age = 9;' }
        },
        {
            task: 'Создай новую переменную <code>$hobby</code> со своим хобби и выведи её',
            hint: 'Сначала создай: <code>$hobby = "футбол";</code>, потом выведи: <code>echo $hobby;</code>',
            check: { codeContains: '$hobby' }
        },
        {
            task: 'Используй интерполяцию — внутри двойных кавычек переменные подставляются автоматически. Напиши: <code>echo "Меня зовут $name";</code>',
            hint: 'В двойных кавычках можно писать <code>$переменную</code> прямо в тексте: <code>"Привет, $name!"</code>',
            check: { codeMatches: /"[^"]*\$[a-zA-Z_]\w*[^"]*"/ }
        },
        {
            task: 'Создай переменную <code>$city</code> со своим городом и выведи новой строкой',
            hint: 'Пример: <code>$city = "Москва"; echo "&lt;br&gt;Город: $city";</code>',
            check: { codeContains: '$city' }
        },
        {
            task: 'Используй переменную число в математике. Создай <code>$year = 2026;</code> и выведи через сколько лет тебе будет 100: <code>echo "В " . ($year + 100 - $age) . " году мне будет 100";</code>',
            hint: 'Числа можно складывать: <code>$age + 10</code>. В скобках для надёжности: <code>($a + $b)</code>',
            check: { codeContains: '$year' }
        }
    ],
    hints: [
        'Переменная: <code>$имя = значение;</code>. Знак <code>$</code> обязателен!',
        'Текст — в кавычках: <code>$x = "слово";</code>. Числа — без: <code>$x = 5;</code>',
        'Точка <code>.</code> склеивает строки: <code>echo "Привет, " . $name;</code>',
        'В двойных кавычках работает интерполяция: <code>echo "Привет, $name!";</code>',
        'Переменные можно использовать сколько хочешь раз!'
    ]
},

// ============================================================
// LEVEL 3 — Math
// ============================================================
{
    id: 'lesson-03',
    title: 'Математика — PHP-калькулятор',
    icon: '🧮',
    difficulty: 1,
    group: 'basics',
    badgeId: 'math_wizard',
    concepts: ['+', '-', '*', '/', '%'],
    mascotSays: 'PHP — крутой калькулятор! Складывает, вычитает, умножает, делит. Можно даже находить остаток от деления. Будем считать!',
    scratchComparison: 'В Scratch зелёные блоки (+, −, ×, ÷). В PHP пишем напрямую: <code>$x = 5 + 3;</code>',
    starterPhp: `<?php
$a = 10;
$b = 3;

echo "<b>Числа:</b> $a и $b<br><br>";

echo "Сложение: $a + $b = " . ($a + $b) . "<br>";
echo "Вычитание: $a - $b = " . ($a - $b) . "<br>";
echo "Умножение: $a * $b = " . ($a * $b) . "<br>";
echo "Деление: $a / $b = " . round($a / $b, 2) . "<br>";
`,
    starterHtml: `<div style="padding:30px; font-family:Arial;">
  <h1 style="text-align:center;">🧮 Мой калькулятор</h1>
  <div style="background:#1a1a2e; color:#0ff; padding:20px; border-radius:16px; font-size:18px; font-family:monospace; max-width:500px; margin:auto;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Поменяй числа $a и $b на свои любимые и посмотри, как пересчитается!',
            hint: 'Просто измени числа в первых двух строках, например: <code>$a = 25; $b = 4;</code>',
            check: { codeNotContains: '$a = 10;' }
        },
        {
            task: 'Добавь остаток от деления (оператор <code>%</code>). Например: <code>echo "Остаток: " . ($a % $b);</code>',
            hint: 'Остаток от деления: <code>10 % 3 = 1</code>, потому что 10 = 3*3 + 1',
            check: { codeContains: '%' }
        },
        {
            task: 'Создай переменную <code>$side = 5;</code> и посчитай площадь квадрата (<code>$side * $side</code>). Выведи результат',
            hint: 'Площадь квадрата = сторона × сторона. <code>$area = $side * $side;</code>',
            check: { codeContains: '$side' }
        },
        {
            task: 'Создай <code>$width = 8;</code> и <code>$height = 5;</code>. Посчитай и выведи <b>площадь</b> и <b>периметр</b> прямоугольника',
            hint: 'Площадь = $width * $height. Периметр = 2 * ($width + $height)',
            check: { codeContainsAll: ['$width', '$height'] }
        },
        {
            task: 'Задачка: у Маши было 24 конфеты, она съела 7 и поделила оставшиеся между 3 друзьями. Сколько досталось каждому? Используй переменные и вычисли в коде',
            hint: '<code>$total = 24; $eaten = 7; $friends = 3;</code><br>Тогда каждому: <code>($total - $eaten) / $friends</code>',
            check: { codeContainsAll: ['24', '7', '3'] }
        },
        {
            task: 'Используй <code>round($x, 2)</code> чтобы округлить деление до 2 знаков после запятой',
            hint: 'Пример: <code>echo round(10/3, 2);</code> выведет <code>3.33</code>',
            check: { codeContains: 'round(' }
        }
    ],
    hints: [
        'Операции: <code>+</code> сложение, <code>-</code> вычитание, <code>*</code> умножение, <code>/</code> деление',
        '<code>%</code> — остаток от деления. <code>10 % 3 = 1</code>',
        'Скобки работают как в математике: <code>2 * (3 + 4) = 14</code>',
        '<code>round($num, 2)</code> — округление до 2 знаков',
        'Можно сразу в echo: <code>echo (5 + 3 * 2);</code>'
    ]
},

// ============================================================
// LEVEL 4 — BOSS 1: первый блок (echo + переменные + математика)
// ============================================================
{
    id: 'lesson-04',
    title: 'BOSS 1 — закрепляем основы! 🎯',
    icon: '🎯',
    difficulty: 2,
    group: 'boss',
    badgeId: 'boss_basics',
    concepts: ['всё вместе', 'echo + переменные + математика'],
    mascotSays: 'Это БОСС-уровень! 🎯 Здесь ты соединишь всё, что узнал: <code>echo</code>, переменные, и математику. 8 интересных задач — ты справишься!',
    scratchComparison: 'Это как «финальный уровень» в игре Scratch — где надо использовать сразу много блоков!',
    starterPhp: `<?php
// 🎯 BOSS 1 — соединяем всё!
// Магазин конфет — давай посчитаем покупку

$item1 = "Шоколадка";
$price1 = 80;

$item2 = "Сок";
$price2 = 50;

echo "<h3>🛒 Чек</h3>";
echo "$item1 — $price1 руб.<br>";
echo "$item2 — $price2 руб.<br>";
echo "<b>Итого: " . ($price1 + $price2) . " руб.</b>";
`,
    starterHtml: `<div style="padding:30px; font-family:Arial;">
  <div style="max-width:380px; margin:auto; background:white; color:#333; padding:24px; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.15); border-top:4px solid #00B894;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Добавь третий товар: <code>$item3</code> и <code>$price3</code>. Включи его в чек и в итог',
            hint: 'Создай две переменные, добавь echo с товаром, и в сумму добавь <code>+ $price3</code>',
            check: { codeContains: '$item3' }
        },
        {
            task: 'Добавь количество. Например: <code>$qty1 = 2;</code> для первого товара. Умножь цену на количество и покажи это в чеке',
            hint: 'Сумма за товар: <code>$price1 * $qty1</code>. В чеке покажи: <code>"$item1 x $qty1 = " . ($price1 * $qty1)</code>',
            check: { codeContains: '$qty' }
        },
        {
            task: 'Посчитай скидку 10%. Создай <code>$discount = 10;</code> и вычисли итог со скидкой: <code>$total - ($total * $discount / 100)</code>',
            hint: '10% от числа = <code>число * 10 / 100</code>. Итог со скидкой = итог − скидка',
            check: { codeContains: '$discount' }
        },
        {
            task: 'Создай переменную <code>$customer</code> со своим именем и поприветствуй покупателя в чеке: «Спасибо, [имя]!»',
            hint: '<code>$customer = "Игорь"; echo "&lt;br&gt;Спасибо, $customer!";</code>',
            check: { codeContains: '$customer' }
        },
        {
            task: 'Сделай переменную <code>$money = 500;</code> (сколько у покупателя денег). Посчитай сдачу: деньги − итог',
            hint: 'Сдача = <code>$money - $totalSale</code>. Выведи: <code>"Сдача: " . ($money - $total) . " руб."</code>',
            check: { codeContains: '$money' }
        },
        {
            task: 'Добавь налог 5% к итоговой сумме (как в магазине)',
            hint: 'Налог: <code>$total * 5 / 100</code>. Итог с налогом: <code>$total + ($total * 5 / 100)</code>',
            check: { codeContainsAny: ['налог', 'tax', '* 5 /', '*5/'] }
        },
        {
            task: 'Заверни итог в красивый блок: используй <code>&lt;hr&gt;</code> (линия) перед итогом',
            hint: '<code>echo "&lt;hr&gt;";</code> — это горизонтальная линия. Поставь её перед итогом',
            check: { outputContains: '<hr>' }
        },
        {
            task: '🎁 СВОБОДНОЕ: добавь что-то своё! Иконку 🛒, эмодзи у товаров, цвет в стилях. Эксперементируй!',
            hint: 'Добавь эмодзи прямо в строку: <code>"🍫 $item1"</code>. Или новый стиль через <code>&lt;span style="color:red"&gt;...&lt;/span&gt;</code>',
            check: { custom: (c) => c.length > 700 }
        }
    ],
    hints: [
        'Все задачи опираются на уроки 1-3. Если что-то забыл — открой справочник 📖',
        'Переменные с числами можно складывать: <code>$total = $a + $b + $c;</code>',
        '10% от числа: <code>число * 10 / 100</code> или <code>число * 0.1</code>',
        'Можно использовать переменную внутри строки: <code>"Цена: $price руб."</code>',
        'Не бойся экспериментировать! Если ошибка — нажми СБРОС или просто исправь'
    ]
},

// ============================================================
// LEVEL 5 — Conditions (if/else)
// ============================================================
{
    id: 'lesson-05',
    title: 'Если... то... иначе',
    icon: '🔀',
    difficulty: 2,
    group: 'logic',
    badgeId: 'if_else_hero',
    concepts: ['if', 'else', 'elseif'],
    mascotSays: 'Программы умеют принимать решения! <code>if</code> = «если». Если условие верно — делает одно, если нет — другое. Как в жизни!',
    scratchComparison: 'В Scratch блок «если ... то ... иначе». В PHP: <code>if (...) { ... } else { ... }</code>',
    starterPhp: `<?php
$score = 85;

echo "<b>Твой счёт:</b> $score<br><br>";

if ($score >= 90) {
    echo "🏆 Отлично! Ты гений!";
} elseif ($score >= 70) {
    echo "👍 Хорошо! Молодец!";
} elseif ($score >= 50) {
    echo "😊 Нормально, но можно лучше!";
} else {
    echo "💪 Нужно больше практики!";
}
`,
    starterHtml: `<div style="text-align:center; padding:30px; font-family:Arial;">
  <h1>📊 Проверка результата</h1>
  <div style="background:linear-gradient(135deg,#667eea,#764ba2); color:white; padding:30px; border-radius:20px; font-size:20px; max-width:400px; margin:auto;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Поменяй $score на 95 — увидишь сообщение «Отлично!». Попробуй разные значения: 75, 55, 30',
            hint: 'Просто измени число в <code>$score = ...;</code>',
            check: { codeNotContains: '$score = 85;' }
        },
        {
            task: 'Добавь условие: если <code>$score == 100</code> — особое сообщение «🌟 МАКСИМУМ!»',
            hint: 'Добавь в начало: <code>if ($score == 100) { echo "🌟 МАКСИМУМ!"; } elseif ...</code>',
            check: { codeContains: '== 100' }
        },
        {
            task: 'Создай переменную <code>$age = 12;</code>. Выведи: «ребёнок» (до 12), «подросток» (12-17), «взрослый» (18+)',
            hint: '<code>if ($age < 12) { echo "ребёнок"; } elseif ($age < 18) { echo "подросток"; } else { echo "взрослый"; }</code>',
            check: { codeContains: '$age' }
        },
        {
            task: 'Создай переменную <code>$weather = "rain";</code>. Если <code>"rain"</code> — выведи «🌧 Возьми зонт!», если <code>"sun"</code> — «☀️ Возьми очки!»',
            hint: 'Сравнение строк: <code>if ($weather == "rain") { ... } elseif ($weather == "sun") { ... }</code>',
            check: { codeContains: '$weather' }
        },
        {
            task: 'Светофор! Создай <code>$color = "red";</code>. red = «🛑 СТОЙ», yellow = «⚠️ ВНИМАНИЕ», green = «✅ ИДИ»',
            hint: 'Три условия через if/elseif/else. Цвета сравнивай в кавычках: <code>$color == "red"</code>',
            check: { codeContains: '$color' }
        },
        {
            task: 'Цена с условием: <code>$total = 1500;</code>. Если больше 1000 — скидка 10%, иначе без скидки. Выведи итог',
            hint: '<code>if ($total > 1000) { $total = $total - $total * 0.1; }</code>. Потом: <code>echo "Итог: $total";</code>',
            check: { codeContainsAll: ['if', '$total'] }
        }
    ],
    hints: [
        '<code>if (условие) { ... }</code> — выполнит код в скобках, если условие истинно',
        'Сравнения: <code>></code>, <code>&lt;</code>, <code>&gt;=</code>, <code>&lt;=</code>, <code>==</code> (равно), <code>!=</code> (не равно)',
        '<code>else</code> = «иначе», <code>elseif</code> = «иначе если» (для нескольких вариантов)',
        'ВАЖНО: <code>=</code> присваивает, а <code>==</code> сравнивает. Это разное!',
        'Строки сравнивай в кавычках: <code>$x == "красный"</code>'
    ]
},

// ============================================================
// LEVEL 6 — Comparisons & Logical (was unclear before!)
// ============================================================
{
    id: 'lesson-06',
    title: 'Сравнения и логика — И, ИЛИ',
    icon: '🤝',
    difficulty: 2,
    group: 'logic',
    badgeId: 'logic_master',
    concepts: ['&&', '||', 'сложные условия'],
    mascotSays: 'Условия можно соединять! <code>&&</code> = «И» (оба должны быть верны), <code>||</code> = «ИЛИ» (хоть одно). Как в жизни: «если ХОЧУ И МОГУ — делаю».',
    scratchComparison: 'В Scratch есть блоки «и» / «или» / «не». В PHP: <code>&&</code>, <code>||</code>, <code>!</code>',
    starterPhp: `<?php
$age = 14;
$hasTicket = true;

// && = И (оба условия)
if ($age >= 12 && $hasTicket) {
    echo "🎢 Можно на аттракцион!";
} else {
    echo "⛔ Не пускают";
}

echo "<br>";

// || = ИЛИ (хотя бы одно)
$day = "суббота";
if ($day == "суббота" || $day == "воскресенье") {
    echo "🎉 Выходной!";
} else {
    echo "📚 Учебный день";
}
`,
    starterHtml: `<div style="text-align:center; padding:30px; font-family:Arial;">
  <h1>🤝 Логика</h1>
  <div style="background:#fff; color:#333; padding:30px; border-radius:20px; font-size:20px; max-width:400px; margin:auto; box-shadow:0 4px 16px rgba(0,0,0,0.1);">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Поставь <code>$hasTicket = false;</code> — увидишь, что не пустят. Поменяй обратно на <code>true</code>',
            hint: '<code>true</code> = да/правда, <code>false</code> = нет/ложь. Без кавычек!',
            check: { codeContains: 'false' }
        },
        {
            task: 'Создай условие: если возраст от 7 до 12 — выведи «школьник младших классов». Используй <code>&&</code>',
            hint: '<code>if ($age >= 7 && $age &lt;= 12) { echo "школьник младших классов"; }</code>',
            check: { codeContainsAll: ['&&', '$age'] }
        },
        {
            task: 'Используй <code>||</code>: если день «суббота» ИЛИ «воскресенье» — выведи «Спим до обеда!»',
            hint: '<code>if ($day == "суббота" || $day == "воскресенье") { echo "Спим!"; }</code>',
            check: { codeContains: '||' }
        },
        {
            task: 'Проверка пароля. <code>$user = "admin"; $pass = "1234";</code>. Если оба правильные (admin и 1234) — «✅ Доступ», иначе «❌ Отказ»',
            hint: '<code>if ($user == "admin" && $pass == "1234") { echo "✅ Доступ"; } else { echo "❌ Отказ"; }</code>',
            check: { codeContainsAll: ['$user', '$pass'] }
        },
        {
            task: 'Используй <code>!</code> (НЕ): создай <code>$isRaining = false;</code> и проверь <code>if (!$isRaining) { echo "Можно гулять!"; }</code>',
            hint: '<code>!</code> переворачивает: <code>!true</code> = false, <code>!false</code> = true',
            check: { codeContains: '!$' }
        },
        {
            task: 'Игра «Угадай число». Загадано <code>$secret = 7;</code>. Создай <code>$guess = 5;</code>. Выведи: «больше», «меньше» или «🎉 Угадал!»',
            hint: '<code>if ($guess == $secret) {...} elseif ($guess &lt; $secret) {...} else {...}</code>',
            check: { codeContainsAll: ['$secret', '$guess'] }
        }
    ],
    hints: [
        '<code>&&</code> = И. Оба условия должны быть истинны. Пример: <code>$age >= 18 && $hasMoney</code>',
        '<code>||</code> = ИЛИ. Хотя бы одно условие истинно',
        '<code>!</code> = НЕ. Переворачивает: <code>!true</code> = false',
        '<code>true</code> и <code>false</code> — без кавычек!',
        'Можно объединять много: <code>$a && ($b || $c)</code>'
    ]
},

// ============================================================
// LEVEL 7 — BOSS 2: уроки 1-6
// ============================================================
{
    id: 'lesson-07',
    title: 'BOSS 2 — логика и решения 🎯',
    icon: '🎯',
    difficulty: 2,
    group: 'boss',
    badgeId: 'boss_logic',
    concepts: ['всё вместе', 'echo+переменные+if+логика'],
    mascotSays: 'БОСС 2! 🎯 Соединяй echo, переменные, математику и условия. Здесь будут реальные ситуации — как в настоящих программах!',
    scratchComparison: 'Это как сделать «настоящий проект» в Scratch — со многими блоками и сценариями',
    starterPhp: `<?php
// 🎯 BOSS 2 — Калькулятор с условиями
// Магазин со скидкой для постоянных покупателей

$total = 1200;
$isVip = true;

echo "<h3>💰 Расчёт покупки</h3>";
echo "Сумма: $total руб.<br>";

if ($isVip && $total >= 1000) {
    $discount = 15;
    echo "🌟 VIP-скидка: $discount%<br>";
    $total = $total - ($total * $discount / 100);
} elseif ($total >= 500) {
    $discount = 5;
    echo "Скидка: $discount%<br>";
    $total = $total - ($total * $discount / 100);
}

echo "<b>К оплате: $total руб.</b>";
`,
    starterHtml: `<div style="padding:30px; font-family:Arial;">
  <div style="max-width:400px; margin:auto; background:white; color:#333; padding:24px; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.15);">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Поменяй <code>$isVip</code> на <code>false</code> — увидишь обычную скидку 5%',
            hint: 'true / false — это специальные значения, без кавычек',
            check: { codeContains: '$isVip = false' }
        },
        {
            task: 'Калькулятор оценок. <code>$mark = 4;</code>. 5 = «отлично», 4 = «хорошо», 3 = «удовл.», 2 = «плохо»',
            hint: 'Используй if/elseif/else или сравнение через <code>==</code>',
            check: { codeContainsAll: ['$mark'] }
        },
        {
            task: 'Возрастной фильтр. <code>$age = 13;</code>. Если 18+ — «можно купить», 12-17 — «спроси родителей», иначе — «нельзя»',
            hint: 'Три условия: <code>$age >= 18</code>, <code>$age >= 12</code>, иначе',
            check: { codeContainsAll: ['$age', 'if', 'elseif'] }
        },
        {
            task: 'Билет в кино. <code>$ageMovie = 14;</code>, <code>$rating = 16;</code>. Если возраст больше или равен возрастному рейтингу — пускают',
            hint: '<code>if ($ageMovie >= $rating) { echo "Пропуск"; } else { echo "Нельзя"; }</code>',
            check: { codeContainsAll: ['$ageMovie', '$rating'] }
        },
        {
            task: 'НДС: <code>$price = 1000;</code>, <code>$includesTax = true;</code>. Если уже включает — выведи как есть, иначе добавь 20%',
            hint: '<code>if ($includesTax) { echo $price; } else { echo $price * 1.2; }</code>',
            check: { codeContains: '$includesTax' }
        },
        {
            task: 'Сценарий «погода»: <code>$temp = -5;</code>. Если ниже 0 — «🧥 шуба», 0-15 — «🧥 куртка», 16-25 — «👕 футболка», выше — «🩳 шорты»',
            hint: 'Несколько elseif. Можно использовать <code>&&</code>: <code>$temp >= 0 && $temp &lt;= 15</code>',
            check: { codeContains: '$temp' }
        },
        {
            task: 'Магазин с минимальной суммой. <code>$cart = 250;</code>, <code>$min = 500;</code>. Если меньше минимума — «доберите ещё [сколько]» иначе «оформляем!»',
            hint: '<code>if ($cart &lt; $min) { echo "Добери " . ($min - $cart); } else { echo "Готово!"; }</code>',
            check: { codeContainsAll: ['$cart', '$min'] }
        },
        {
            task: '🎁 СВОБОДНОЕ: придумай свою задачу с условиями! Например, «робот выбирает обед» или «настроение по дню недели»',
            hint: 'Любая идея с переменными, условиями и выводом текста — годится!',
            check: { custom: (c) => c.length > 800 && (c.match(/if/g) || []).length >= 3 }
        }
    ],
    hints: [
        'Объединяй знания: переменные → проверка через if → вывод echo',
        'Числа: <code>$x = 5;</code>. Текст: <code>$x = "слово";</code>. Логика: <code>$x = true;</code>',
        '<code>&&</code> и <code>||</code> для сложных условий',
        'Скобки помогают: <code>if (($a > 0) && ($b > 0))</code>',
        'Если код большой — используй пустые строки для разделения блоков'
    ]
},

// ============================================================
// LEVEL 8 — for loop
// ============================================================
{
    id: 'lesson-08',
    title: 'Цикл for — повтори много раз',
    icon: '🔁',
    difficulty: 2,
    group: 'loops',
    badgeId: 'loop_for',
    concepts: ['for', 'циклы', 'счётчик'],
    mascotSays: 'Цикл повторяет код несколько раз. Не будешь же писать <code>echo</code> 100 раз! <code>for</code> — самый популярный цикл со счётчиком.',
    scratchComparison: 'Блок «повторить N раз». В PHP: <code>for ($i = 1; $i &lt;= N; $i++) { ... }</code>',
    starterPhp: `<?php
// for = ПОВТОРЯТЬ
// $i — счётчик: начинается с 1, увеличивается на 1, пока $i <= 5

echo "<b>⭐ Звёзды:</b><br>";

for ($i = 1; $i <= 5; $i++) {
    echo "Звезда #$i ⭐<br>";
}

echo "<br><b>🚀 Обратный отсчёт:</b><br>";

for ($i = 10; $i >= 1; $i--) {
    echo "$i... ";
}
echo "Пуск!";
`,
    starterHtml: `<div style="text-align:center; padding:30px; font-family:Arial;">
  <h1>🔁 Сила повторений</h1>
  <div style="background:#2d3436; color:#dfe6e9; padding:20px; border-radius:16px; font-size:18px; max-width:400px; margin:auto; text-align:left;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Поменяй цикл, чтобы вывело 10 звёзд (а не 5)',
            hint: 'В <code>$i &lt;= 5</code> замени 5 на 10',
            check: { outputCount: { text: '⭐', min: 10 } }
        },
        {
            task: 'Сделай новый цикл с 20 сердечками ❤️ подряд (без номеров)',
            hint: '<code>for ($i = 1; $i &lt;= 20; $i++) { echo "❤️"; }</code>',
            check: { outputCount: { text: '❤️', min: 20 } }
        },
        {
            task: 'Выведи только чётные числа от 2 до 20: 2, 4, 6, 8...',
            hint: 'Можно использовать шаг 2: <code>for ($i = 2; $i &lt;= 20; $i = $i + 2)</code>. Или умножение: <code>$i * 2</code>',
            check: { outputContainsAll: ['2', '4', '6', '8', '10'] }
        },
        {
            task: 'Таблица умножения на 7: <code>7 × 1 = 7</code>, <code>7 × 2 = 14</code>, ... до 10',
            hint: 'В цикле: <code>echo "7 × $i = " . (7 * $i) . "&lt;br&gt;";</code>',
            check: { outputContainsAll: ['7 × 1', '7 × 10'] }
        },
        {
            task: 'Лесенка из звёзд: 1 звезда, потом 2, потом 3... до 5. Используй <code>str_repeat</code> или внутренний echo',
            hint: 'Можно так: <code>for ($i = 1; $i &lt;= 5; $i++) { echo str_repeat("⭐", $i) . "&lt;br&gt;"; }</code>',
            check: { codeContains: 'str_repeat' }
        },
        {
            task: 'Посчитай сумму от 1 до 100. Создай <code>$sum = 0;</code>, в цикле прибавляй: <code>$sum = $sum + $i;</code>. Выведи итог',
            hint: 'Перед циклом: <code>$sum = 0;</code>. В цикле: <code>$sum = $sum + $i;</code> (или <code>$sum += $i;</code>)',
            check: { outputContains: '5050' }
        }
    ],
    hints: [
        '<code>for ($i = 1; $i &lt;= 10; $i++)</code> — счётчик от 1 до 10 включительно',
        '<code>$i++</code> = увеличить $i на 1. <code>$i--</code> = уменьшить',
        'Внутри цикла можно использовать $i как обычную переменную',
        '<code>str_repeat("⭐", 5)</code> — повторить «⭐» 5 раз',
        '<code>$sum += $i</code> = <code>$sum = $sum + $i</code> (короче!)'
    ]
},

// ============================================================
// LEVEL 9 — while loop
// ============================================================
{
    id: 'lesson-09',
    title: 'Цикл while — пока условие верно',
    icon: '⏳',
    difficulty: 2,
    group: 'loops',
    badgeId: 'loop_while',
    concepts: ['while', 'условие'],
    mascotSays: '<code>while</code> = «пока». Повторяет, ПОКА условие верно. Удобно, когда не знаешь точное число повторов.',
    scratchComparison: 'Блок «повторять пока ...» в Scratch — это и есть <code>while</code>',
    starterPhp: `<?php
// while повторяет, ПОКА условие верно

$health = 100;
$round = 1;

echo "<b>⚔️ Битва началась!</b><br>";

while ($health > 0) {
    $damage = 25;
    $health = $health - $damage;
    echo "Раунд $round: -$damage HP. Осталось: $health<br>";
    $round++;
}

echo "<b>💀 Герой пал в раунде " . ($round - 1) . "</b>";
`,
    starterHtml: `<div style="text-align:center; padding:30px; font-family:Arial;">
  <h1>⏳ Цикл while</h1>
  <div style="background:#1e1e2e; color:#cdd6f4; padding:20px; border-radius:16px; font-size:16px; max-width:450px; margin:auto; text-align:left; font-family:monospace;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Сделай героя сильнее: <code>$health = 200;</code>. Битва станет дольше',
            hint: 'Просто измени стартовое здоровье',
            check: { codeContains: '$health = 200' }
        },
        {
            task: 'Меньше урон: <code>$damage = 10;</code>. Битва будет ещё длиннее. Но осторожно — не делай 0!',
            hint: 'Если урон = 0, цикл будет бесконечным! Тренажёр остановит через 5 секунд, но лучше не доводить',
            check: { codeContains: '$damage = 10' }
        },
        {
            task: 'Накопи денег. <code>$money = 0; $goal = 100;</code>. В цикле: <code>$money += 15;</code>. Выводи каждый раз. Закончи когда $money >= $goal',
            hint: '<code>while ($money &lt; $goal) { $money += 15; echo "Накоплено: $money&lt;br&gt;"; }</code>',
            check: { codeContains: '$goal' }
        },
        {
            task: 'Удвоение. <code>$num = 1;</code>. В цикле умножай на 2 (<code>$num *= 2;</code>). Останавливайся когда $num > 1000. Выводи каждое число',
            hint: '<code>while ($num &lt;= 1000) { echo "$num&lt;br&gt;"; $num *= 2; }</code> — выведет 1, 2, 4, 8, 16, 32...',
            check: { codeContains: '*= 2' }
        },
        {
            task: 'Кубик. <code>$attempts = 0;</code>. Имитация: <code>$dice = 1;</code> в цикле прибавляй 1 (<code>$dice++</code>). Останавливайся когда $dice == 6',
            hint: '<code>while ($dice != 6) { $dice++; $attempts++; echo "Бросок $attempts: $dice&lt;br&gt;"; }</code>',
            check: { codeContains: '!= 6' }
        }
    ],
    hints: [
        '<code>while (условие) { ... }</code> — повторяет, пока условие true',
        'ВАЖНО: внутри цикла обязательно ИЗМЕНЯЙ переменную из условия — иначе бесконечный цикл!',
        '<code>$x++</code> = +1, <code>$x--</code> = -1, <code>$x += 5</code> = +5, <code>$x *= 2</code> = ×2',
        'Если код «зависает» больше 5 секунд — система остановит и покажет ошибку',
        '<code>while</code> отличается от <code>for</code> тем, что нет встроенного счётчика'
    ]
},

// ============================================================
// LEVEL 10 — Arrays (REWRITTEN CLEARLY)
// ============================================================
{
    id: 'lesson-10',
    title: 'Массивы — список значений',
    icon: '📋',
    difficulty: 2,
    group: 'data',
    badgeId: 'array_ace',
    concepts: ['array', '[]', 'foreach', 'count'],
    mascotSays: 'Массив — это <b>СПИСОК</b> в одной переменной! Представь полку с ящичками: каждый ящик пронумерован, в каждом — что-то лежит. Очень удобно для группы данных.',
    scratchComparison: 'В Scratch есть «Списки». В PHP это массив: <code>$list = ["a", "b", "c"];</code>',
    starterPhp: `<?php
// 📦 МАССИВ = список ящичков с номерами
//   Ящик 0    Ящик 1    Ящик 2
//  ┌─────┐  ┌─────┐  ┌─────┐
//  │ 🍎  │  │ 🍌  │  │ 🍊  │
//  └─────┘  └─────┘  └─────┘

$fruits = ["🍎 Яблоко", "🍌 Банан", "🍊 Апельсин"];

// Достаём элемент по НОМЕРУ (с 0!)
echo "Первый фрукт: " . $fruits[0] . "<br>";
echo "Второй фрукт: " . $fruits[1] . "<br>";
echo "Третий фрукт: " . $fruits[2] . "<br>";

echo "<br>Всего фруктов: " . count($fruits);
`,
    starterHtml: `<div style="padding:30px; font-family:Arial;">
  <h1 style="text-align:center;">📋 Мой список</h1>
  <div style="max-width:400px; margin:auto; background:#ffeaa7; color:#2d3436; padding:24px; border-radius:16px; font-size:18px; box-shadow:0 4px 16px rgba(0,0,0,0.1);">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'ВАЖНО: индексы начинаются с НУЛЯ! Выведи только третий фрукт (индекс <code>[2]</code>)',
            hint: '<code>echo $fruits[2];</code>. Запомни: 1-й = [0], 2-й = [1], 3-й = [2]',
            check: { codeContains: '$fruits[2]' }
        },
        {
            task: 'Замени фрукты на свои любимые: например, твои 3 любимых блюда',
            hint: 'Просто измени слова в кавычках: <code>$fruits = ["Пицца", "Бургер", "Мороженое"];</code>',
            check: { codeNotContains: 'Яблоко' }
        },
        {
            task: 'Добавь четвёртый элемент в массив. Например: <code>"🍇 Виноград"</code>',
            hint: 'Допиши через запятую: <code>$fruits = ["🍎", "🍌", "🍊", "🍇"];</code>',
            check: { custom: (c) => {
                const m = c.match(/\$fruits\s*=\s*\[([^\]]*)\]/);
                if (!m) return false;
                return (m[1].match(/,/g) || []).length >= 3;
            }}
        },
        {
            task: 'Используй <code>count($fruits)</code> чтобы вывести количество. Уже есть в стартовом коде, но попробуй с новым массивом',
            hint: '<code>count($fruits)</code> возвращает число элементов. <code>count($fruits) - 1</code> — индекс последнего',
            check: { codeContains: 'count(' }
        },
        {
            task: 'Цикл <code>foreach</code> — лучший способ пройти по всем! Замени все три echo на: <code>foreach ($fruits as $f) { echo "• $f&lt;br&gt;"; }</code>',
            hint: '<code>foreach</code> сам берёт каждый элемент и кладёт в переменную ($f)',
            check: { codeContains: 'foreach' }
        },
        {
            task: 'Добавь элемент через <code>$fruits[] = "Что-то";</code> ПОСЛЕ создания массива. Это добавит в конец',
            hint: '<code>$fruits[] = "🥝 Киви";</code> — добавит новый элемент в конец массива',
            check: { codeContains: '$fruits[] =' }
        },
        {
            task: 'Используй цикл <code>for</code> с массивом. Выведи все элементы с НОМЕРАМИ: <code>for ($i = 0; $i &lt; count($fruits); $i++) { echo "#$i: " . $fruits[$i] . "&lt;br&gt;"; }</code>',
            hint: '<code>count($fruits)</code> — длина. <code>$fruits[$i]</code> — элемент по индексу',
            check: { codeContainsAll: ['for', '$fruits['] }
        }
    ],
    hints: [
        'Массив = список: <code>$arr = ["a", "b", "c"];</code>',
        'НУМЕРАЦИЯ С НУЛЯ: первый элемент = <code>$arr[0]</code>, второй = <code>$arr[1]</code>',
        '<code>count($arr)</code> = сколько элементов',
        '<code>foreach ($arr as $item) { ... }</code> — пройти по всем',
        '<code>$arr[] = "новый";</code> — добавить элемент в конец'
    ]
},

// ============================================================
// LEVEL 11 — BOSS 3: уроки 1-10
// ============================================================
{
    id: 'lesson-11',
    title: 'BOSS 3 — данные и циклы 🎯',
    icon: '🎯',
    difficulty: 3,
    group: 'boss',
    badgeId: 'boss_data',
    concepts: ['всё вместе', 'массивы+циклы+условия+математика'],
    mascotSays: 'БОСС 3! 🎯 Самый интересный пока — обрабатываем СПИСКИ данных. Магазин товаров, рейтинги, статистика. Как настоящие программы!',
    scratchComparison: 'Это похоже на работу со списками в Scratch — добавляешь, перебираешь, считаешь',
    starterPhp: `<?php
// 🎯 BOSS 3 — Магазин товаров
// Список товаров и их цен

$items = ["Хлеб", "Молоко", "Сыр", "Яйца"];
$prices = [40, 80, 350, 120];

echo "<h3>🛒 Корзина</h3>";

$total = 0;
for ($i = 0; $i < count($items); $i++) {
    echo $items[$i] . " — " . $prices[$i] . " руб.<br>";
    $total += $prices[$i];
}

echo "<hr><b>Итого: $total руб.</b>";
`,
    starterHtml: `<div style="padding:30px; font-family:Arial;">
  <div style="max-width:380px; margin:auto; background:white; color:#333; padding:24px; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.15); border-top:4px solid #6C5CE7;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Поменяй товары и цены на 5 своих любимых продуктов',
            hint: 'Меняй и в $items, и в $prices. Должно быть одинаковое количество элементов!',
            check: { codeNotContains: '"Хлеб"' }
        },
        {
            task: 'Найди самый дорогой товар. Создай <code>$max = $prices[0];</code> и в цикле проверяй, если больше — обновляй',
            hint: '<code>foreach ($prices as $p) { if ($p > $max) { $max = $p; } }</code>. Выведи <code>echo "Самый дорогой: $max";</code>',
            check: { codeContainsAny: ['$max', 'max('] }
        },
        {
            task: 'Покажи только дорогие товары (>100 руб). Используй <code>if</code> внутри цикла',
            hint: '<code>for (...) { if ($prices[$i] > 100) { echo $items[$i] . "&lt;br&gt;"; } }</code>',
            check: { codeContainsAll: ['if', '> 100'] }
        },
        {
            task: 'Пронумеруй товары: <code>1. Хлеб</code>, <code>2. Молоко</code>... Используй <code>$i + 1</code>',
            hint: '<code>echo ($i + 1) . ". " . $items[$i];</code>. Скобки важны!',
            check: { outputContainsAll: ['1.', '2.'] }
        },
        {
            task: 'Скидка 10% на всё. Покажи и обычную цену, и со скидкой: <code>"100 руб. → 90 руб."</code>',
            hint: '<code>echo $prices[$i] . " руб. → " . ($prices[$i] * 0.9) . " руб.";</code>',
            check: { codeContainsAny: ['* 0.9', '/ 10', '* 90 / 100'] }
        },
        {
            task: 'Средняя цена. Раздели сумму на количество: <code>$total / count($prices)</code>. Округли через <code>round()</code>',
            hint: '<code>echo "Средняя: " . round($total / count($prices), 2) . " руб.";</code>',
            check: { codeContainsAll: ['count(', 'round('] }
        },
        {
            task: 'Топ-3. Выведи только первые 3 товара. Используй <code>break;</code> когда $i >= 3 или ограничь цикл',
            hint: '<code>for ($i = 0; $i &lt; 3; $i++)</code> или <code>if ($i >= 3) break;</code>',
            check: { codeContainsAny: ['break', '< 3', '<= 2'] }
        },
        {
            task: '🎁 СВОБОДНОЕ: придумай свой топ-список (фильмы, игры, друзья) и выведи его красиво',
            hint: 'Используй массив + цикл + условия. Можно эмодзи и стили!',
            check: { custom: (c) => c.length > 800 }
        }
    ],
    hints: [
        'Два параллельных массива: $items и $prices. Доступ по индексу <code>$arr[$i]</code>',
        'В цикле for можно работать сразу с обоими массивами',
        '<code>foreach</code> удобнее для одного массива, <code>for</code> — когда нужен номер',
        '<code>break;</code> прерывает цикл сразу',
        '<code>continue;</code> пропускает только эту итерацию'
    ]
},

// ============================================================
// LEVEL 12 — Associative arrays (key => value)
// ============================================================
{
    id: 'lesson-12',
    title: 'Ассоциативные массивы — ключ → значение',
    icon: '🔑',
    difficulty: 3,
    group: 'data',
    badgeId: 'assoc_master',
    concepts: ['key => value', 'ассоциативные'],
    mascotSays: 'Ассоциативный массив = словарь! Вместо номеров — <b>ключи</b>. Например, имя → возраст. Очень удобно для карточек товаров, профилей, настроек.',
    scratchComparison: 'В Scratch такого нет напрямую. Это как «настройки» с подписями',
    starterPhp: `<?php
// Обычный массив:    [1, 2, 3]      → доступ по [0], [1], [2]
// Ассоциативный:     ["имя" => "Вася", "возраст" => 9]
//                    → доступ по ["имя"]

$person = [
    "name" => "Игорь",
    "age" => 9,
    "city" => "Москва"
];

echo "Имя: " . $person["name"] . "<br>";
echo "Возраст: " . $person["age"] . "<br>";
echo "Город: " . $person["city"] . "<br>";

echo "<br><b>Все данные:</b><br>";
foreach ($person as $key => $value) {
    echo "$key: $value<br>";
}
`,
    starterHtml: `<div style="text-align:center; padding:30px; font-family:Arial;">
  <h1>🔑 Карточка</h1>
  <div style="display:inline-block; background:white; color:#333; padding:24px 40px; border-radius:16px; box-shadow:0 6px 20px rgba(0,0,0,0.15); text-align:left;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Замени данные в $person на свои (имя, возраст, город)',
            hint: 'Просто измени значения справа от <code>=></code>',
            check: { codeNotContains: '"Игорь"' }
        },
        {
            task: 'Добавь новый ключ <code>"hobby"</code> со своим хобби и выведи его',
            hint: 'В массиве добавь: <code>"hobby" => "футбол",</code>. Потом: <code>echo $person["hobby"];</code>',
            check: { codeContains: '"hobby"' }
        },
        {
            task: 'Создай новый массив <code>$car</code> с ключами: brand, color, year. Выведи описание машины',
            hint: '<code>$car = ["brand" => "Tesla", "color" => "красный", "year" => 2024];</code>',
            check: { codeContains: '$car' }
        },
        {
            task: 'Используй цикл <code>foreach ($arr as $key => $value)</code> чтобы вывести все ключи и значения <code>$car</code>',
            hint: '<code>foreach ($car as $k => $v) { echo "$k = $v&lt;br&gt;"; }</code>',
            check: { codeContains: '=> $' }
        },
        {
            task: 'Сделай меню сайта. <code>$menu = ["Главная" => "/", "О нас" => "/about", "Контакты" => "/contact"];</code>. Выведи как ссылки',
            hint: '<code>foreach ($menu as $name => $link) { echo "&lt;a href=\\"$link\\"&gt;$name&lt;/a&gt; | "; }</code>',
            check: { codeContains: '$menu' }
        },
        {
            task: 'Создай товар: <code>$product = ["name" => "iPhone", "price" => 80000, "color" => "чёрный"];</code>. Выведи в виде карточки с заголовком, ценой и цветом',
            hint: 'Доступ: <code>$product["name"]</code>. Можно красиво оформить с <code>&lt;h3&gt;</code> и стилями',
            check: { codeContains: '$product' }
        }
    ],
    hints: [
        'Создание: <code>$arr = ["ключ" => "значение"];</code>',
        'Доступ: <code>$arr["ключ"]</code>',
        'Цикл с ключом: <code>foreach ($arr as $key => $value) { ... }</code>',
        'Можно вкладывать: <code>$users = ["вася" => ["age" => 9, "city" => "СПб"]];</code>',
        'Ключ может быть строкой ИЛИ числом'
    ]
},

// ============================================================
// LEVEL 13 — Functions
// ============================================================
{
    id: 'lesson-13',
    title: 'Функции — свои команды',
    icon: '⚡',
    difficulty: 3,
    group: 'tools',
    badgeId: 'function_hero',
    concepts: ['function', 'return', 'параметры'],
    mascotSays: 'Функция = твоя ЛИЧНАЯ команда! Один раз написал — потом вызывай сколько угодно. Как магическое заклинание, которое ты сам придумал!',
    scratchComparison: 'В Scratch — «Мои блоки». В PHP — <code>function имя($параметры) { ... }</code>',
    starterPhp: `<?php
// Функция = твоя команда

function greet($name) {
    return "Привет, $name! 👋";
}

function makeStars($count) {
    return str_repeat("⭐", $count);
}

// Вызываем — сколько хотим раз!
echo greet("Игорь") . "<br>";
echo greet("Маша") . "<br>";
echo greet("PHP") . "<br><br>";

echo "Рейтинг 5: " . makeStars(5) . "<br>";
echo "Рейтинг 3: " . makeStars(3) . "<br>";
`,
    starterHtml: `<div style="text-align:center; padding:30px; font-family:Arial;">
  <h1>⚡ Мои функции</h1>
  <div style="background:linear-gradient(135deg,#a29bfe,#6c5ce7); color:white; padding:25px; border-radius:20px; font-size:18px; max-width:400px; margin:auto;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Вызови greet() со своим именем и именами друзей (3+ раза)',
            hint: '<code>echo greet("Имя");</code> — повтори с разными именами',
            check: { custom: (c) => (c.match(/greet\(/g) || []).length >= 4 }
        },
        {
            task: 'Создай функцию <code>add($a, $b)</code>, которая возвращает сумму. Используй <code>return</code>',
            hint: '<code>function add($a, $b) { return $a + $b; }</code>. Потом: <code>echo add(5, 3);</code>',
            check: { codeContains: 'function add' }
        },
        {
            task: 'Функция <code>area($w, $h)</code> — площадь прямоугольника. Используй её 3 раза с разными числами',
            hint: '<code>function area($w, $h) { return $w * $h; }</code>',
            check: { codeContains: 'function area' }
        },
        {
            task: 'Функция <code>isAdult($age)</code> — возвращает true если возраст >= 18, иначе false',
            hint: '<code>function isAdult($age) { return $age >= 18; }</code>. Используй: <code>if (isAdult(20)) ...</code>',
            check: { codeContains: 'function isAdult' }
        },
        {
            task: 'Функция <code>greetTime($hour)</code>: до 12 = «Доброе утро!», до 18 = «Добрый день!», иначе «Добрый вечер!»',
            hint: 'Используй if/elseif/else внутри функции и return',
            check: { codeContains: 'function greetTime' }
        },
        {
            task: 'Функция <code>renderButton($text, $color)</code> возвращает HTML-кнопку: <code>&lt;button style="background:цвет"&gt;текст&lt;/button&gt;</code>',
            hint: '<code>return "&lt;button style=\\"background:$color\\"&gt;$text&lt;/button&gt;";</code>',
            check: { codeContains: 'function renderButton' }
        },
        {
            task: 'Функция <code>sumAll($numbers)</code> принимает МАССИВ и возвращает сумму всех чисел',
            hint: '<code>function sumAll($numbers) { $sum = 0; foreach ($numbers as $n) { $sum += $n; } return $sum; }</code>',
            check: { codeContains: 'function sumAll' }
        }
    ],
    hints: [
        'Создание: <code>function имя($параметр1, $параметр2) { ... }</code>',
        '<code>return</code> = возвращает результат. Без return функция вернёт null',
        'Вызов: <code>имя(значение1, значение2);</code>',
        'Параметры — это переменные ВНУТРИ функции',
        'Хорошие функции делают ОДНО конкретное дело'
    ]
},

// ============================================================
// LEVEL 14 — BOSS 4: всё вместе
// ============================================================
{
    id: 'lesson-14',
    title: 'BOSS 4 — мощь PHP! 🎯',
    icon: '🎯',
    difficulty: 3,
    group: 'boss',
    badgeId: 'boss_master',
    concepts: ['всё вместе', 'функции+массивы+условия+циклы'],
    mascotSays: 'БОСС 4! 🎯 Высший уровень — ВСЕ инструменты PHP вместе. Магазин с функциями, турнир, викторина. Это уже почти настоящие программы!',
    scratchComparison: 'Это уровень мастера — больше, чем большинство Scratch-проектов!',
    starterPhp: `<?php
// 🎯 BOSS 4 — Интернет-магазин

$products = [
    ["name" => "Книга", "price" => 500, "qty" => 2],
    ["name" => "Чашка", "price" => 300, "qty" => 1],
    ["name" => "Ручка", "price" => 50, "qty" => 5]
];

function calcItem($product) {
    return $product["price"] * $product["qty"];
}

function formatLine($product) {
    $sum = calcItem($product);
    return $product["name"] . " x" . $product["qty"] . " = $sum руб.<br>";
}

echo "<h3>🛒 Магазин</h3>";

$total = 0;
foreach ($products as $p) {
    echo formatLine($p);
    $total += calcItem($p);
}

echo "<hr><b>Итого: $total руб.</b>";
`,
    starterHtml: `<div style="padding:30px; font-family:Arial;">
  <div style="max-width:400px; margin:auto; background:white; color:#333; padding:24px; border-radius:12px; box-shadow:0 6px 20px rgba(0,0,0,0.15); border-top:4px solid #6C5CE7;">
    {{ output }}
  </div>
</div>`,
    challenges: [
        {
            task: 'Добавь в массив 2 свои товара',
            hint: 'Добавь новые элементы в массив: <code>["name" => "...", "price" => ..., "qty" => ...]</code>',
            check: { custom: (c) => {
                const matches = c.match(/"name"\s*=>/g) || [];
                return matches.length >= 5;
            }}
        },
        {
            task: 'Создай функцию <code>applyDiscount($total, $percent)</code> — возвращает сумму со скидкой',
            hint: '<code>function applyDiscount($total, $percent) { return $total - ($total * $percent / 100); }</code>',
            check: { codeContains: 'function applyDiscount' }
        },
        {
            task: 'Используй <code>applyDiscount</code> для итога. Например, <code>applyDiscount($total, 15)</code>',
            hint: '<code>echo "Со скидкой 15%: " . applyDiscount($total, 15);</code>',
            check: { codeContains: 'applyDiscount(' }
        },
        {
            task: 'Турнир. Создай <code>$players = [["name" => "Иван", "score" => 95], ["name" => "Мария", "score" => 87], ["name" => "Алекс", "score" => 92]];</code>. Выведи всех',
            hint: 'foreach по $players, выводи $p["name"] и $p["score"]',
            check: { codeContains: '$players' }
        },
        {
            task: 'Найди ПОБЕДИТЕЛЯ турнира (с максимальным score). Используй цикл и переменную $winner',
            hint: '<code>$winner = $players[0]; foreach ($players as $p) { if ($p["score"] > $winner["score"]) $winner = $p; }</code>',
            check: { codeContainsAny: ['$winner', 'победит'] }
        },
        {
            task: 'Викторина. Массив <code>$quiz = [["q" => "2+2?", "a" => 4], ["q" => "Сколько ног у паука?", "a" => 8]];</code>. Выведи вопросы. Сделай <code>$answers = [4, 6];</code> и проверь правильность',
            hint: 'foreach по индексам, сравнивай $quiz[$i]["a"] == $answers[$i]',
            check: { codeContainsAll: ['$quiz', '$answers'] }
        },
        {
            task: 'Конвертер валют. Функция <code>toUSD($rub, $rate)</code>. Курс <code>$rate = 90;</code>. Преобразуй 5 разных сумм',
            hint: '<code>function toUSD($rub, $rate) { return round($rub / $rate, 2); }</code>',
            check: { codeContains: 'function toUSD' }
        },
        {
            task: 'Прогресс-бар. Функция <code>progressBar($percent)</code> возвращает строку из <code>█</code> и <code>░</code>',
            hint: '<code>function progressBar($p) { $filled = floor($p / 5); return str_repeat("█", $filled) . str_repeat("░", 20 - $filled) . " $p%"; }</code>',
            check: { codeContains: 'progressBar' }
        },
        {
            task: '🎁 СВОБОДНОЕ: придумай мини-приложение! Идеи: дневник дел, рейтинг фильмов, игра с очками',
            hint: 'Используй функции, массивы, циклы, условия. Дай волю фантазии!',
            check: { custom: (c) => c.length > 1000 && c.includes('function') }
        }
    ],
    hints: [
        'Функции делают код понятнее. Каждая функция — одна задача',
        'Массивы массивов: <code>[["a" => 1], ["a" => 2]]</code>',
        'Сочетай foreach + функции: чисто и красиво',
        'Если функция возвращает строку — её можно сразу в echo',
        'Чем больше функций — тем легче читать код'
    ]
},

// ============================================================
// LEVEL 15 — PHP + CSS dynamic design
// ============================================================
{
    id: 'lesson-15',
    title: 'Дизайн через PHP — управляй стилями',
    icon: '🎨',
    difficulty: 3,
    group: 'final',
    badgeId: 'style_guru',
    concepts: ['CSS', 'динамический дизайн', 'темы'],
    mascotSays: 'PHP может менять весь ВНЕШНИЙ ВИД сайта! Цвета, размеры, темы — всё через переменные. Так работают настоящие сайты!',
    scratchComparison: 'В Scratch меняешь костюм спрайта. В PHP+CSS меняешь «костюм» сайта!',
    starterPhp: `<?php
// Настройки дизайна
$theme = "dark"; // попробуй "light"
$accent = "#e94560";
$title = "Мой сайт";
$items = ["Главная", "О нас", "Проекты", "Контакты"];

// Темы
if ($theme == "dark") {
    $bg = "#1a1a2e";
    $text = "#eaf0fb";
} else {
    $bg = "#ffffff";
    $text = "#222222";
}

echo '<div style="background:'.$bg.'; color:'.$text.'; padding:30px; border-radius:20px;">';
echo '<h1 style="color:'.$accent.'; text-align:center;">'.$title.'</h1>';
echo '<nav style="text-align:center; margin:20px 0;">';

foreach ($items as $item) {
    echo '<a style="color:'.$accent.'; padding:8px 16px; border:1px solid '.$accent.'; border-radius:8px; margin:0 4px; text-decoration:none; display:inline-block;">'.$item.'</a>';
}

echo '</nav>';
echo '<p style="text-align:center; opacity:0.7;">🐘 Создано в PHP</p>';
echo '</div>';
`,
    starterHtml: `<div style="padding:20px; font-family:Arial;">
  {{ output }}
</div>`,
    challenges: [
        {
            task: 'Переключи на светлую тему: <code>$theme = "light";</code>',
            hint: 'Меняешь только одну строку — а вся страница другая!',
            check: { codeContains: '$theme = "light"' }
        },
        {
            task: 'Поменяй акцентный цвет на свой любимый. Например: <code>$accent = "#00B894";</code>',
            hint: 'Цвета: <code>#FF6B6B</code> красный, <code>#4ECDC4</code> бирюза, <code>#FFD93D</code> жёлтый, <code>#A29BFE</code> фиолет',
            check: { codeNotContains: '#e94560' }
        },
        {
            task: 'Добавь третью тему «pink». Если <code>$theme == "pink"</code> — фон <code>#ffe4f1</code>, текст <code>#3d0c25</code>',
            hint: 'Добавь elseif: <code>elseif ($theme == "pink") { $bg = "#ffe4f1"; $text = "#3d0c25"; }</code>',
            check: { codeContains: '"pink"' }
        },
        {
            task: 'Добавь в меню ещё пункты: «Блог», «Магазин», «Помощь»',
            hint: 'В массиве <code>$items</code> добавь новые элементы через запятую',
            check: { custom: (c) => {
                const m = c.match(/\$items\s*=\s*\[([^\]]*)\]/);
                if (!m) return false;
                return (m[1].match(/,/g) || []).length >= 4;
            }}
        },
        {
            task: 'Создай функцию <code>card($title, $color)</code> которая возвращает HTML карточку с цветным фоном и заголовком. Выведи 3 карточки',
            hint: '<code>function card($t, $c) { return "&lt;div style=\\"background:$c; padding:20px; border-radius:12px; margin:8px;\\"&gt;$t&lt;/div&gt;"; }</code>',
            check: { codeContains: 'function card' }
        },
        {
            task: 'Прогресс-бар через CSS. Создай <code>$progress = 75;</code> и нарисуй полоску шириной <code>$progress%</code>',
            hint: '<code>echo "&lt;div style=\\"background:#eee;height:20px;\\"&gt;&lt;div style=\\"width:$progress%;background:green;height:100%;\\"&gt;&lt;/div&gt;&lt;/div&gt;";</code>',
            check: { codeContains: '$progress' }
        }
    ],
    hints: [
        'CSS внутри PHP: <code>echo \'&lt;div style="color:\'.$color.\'"&gt;...&lt;/div&gt;\';</code>',
        'Переменные → стили → меняешь одну → меняется всё',
        'Внутри одинарных кавычек переменные НЕ работают, нужна склейка через <code>.</code>',
        'Можно делать темы через массивы цветов',
        'CSS-свойства: <code>background</code>, <code>color</code>, <code>padding</code>, <code>border-radius</code>, <code>font-size</code>'
    ]
},

// ============================================================
// LEVEL 16 — MEGA PROJECT
// ============================================================
{
    id: 'lesson-16',
    title: 'МЕГА-ПРОЕКТ — твой персональный сайт! 🏆',
    icon: '🏆',
    difficulty: 3,
    group: 'final',
    badgeId: 'like_dad',
    concepts: ['финал', 'весь PHP', 'твой сайт'],
    mascotSays: 'ПОСЛЕДНИЙ УРОВЕНЬ! 🏆 Ты теперь знаешь: echo, переменные, математику, условия, циклы, массивы, ассоциативные массивы, функции, стили. Это арсенал настоящего разработчика. Создай свой сайт!',
    scratchComparison: 'Это твой выпускной проект! Покажи папе и маме — они будут гордиться 🎉',
    starterPhp: `<?php
// 🏆 МЕГА-ПРОЕКТ — Твой сайт
// Используй ВСЁ что знаешь!

$me = [
    "name" => "Junior Dev",
    "age" => 9,
    "city" => "Москва",
    "motto" => "Учусь, расту, кодю!"
];

$theme = "dark";

$skills = [
    ["name" => "PHP", "level" => 5],
    ["name" => "HTML", "level" => 4],
    ["name" => "Scratch", "level" => 5],
    ["name" => "CSS", "level" => 3]
];

$hobbies = ["⚽ Футбол", "🎮 Игры", "📚 Книги"];

// Темы
$colors = $theme == "dark"
    ? ["bg" => "#1e1e2e", "text" => "#cdd6f4", "accent" => "#89b4fa", "card" => "#313244"]
    : ["bg" => "#ffffff", "text" => "#222", "accent" => "#6C5CE7", "card" => "#f8f8ff"];

function stars($level) {
    return str_repeat("⭐", $level) . str_repeat("☆", 5 - $level);
}

function section($title, $content, $colors) {
    return '<div style="background:'.$colors["card"].'; padding:20px; border-radius:12px; margin:16px 0;">
        <h3 style="color:'.$colors["accent"].'; margin-bottom:12px;">'.$title.'</h3>
        '.$content.'
    </div>';
}

// Шапка
echo '<div style="background:'.$colors["bg"].'; color:'.$colors["text"].'; padding:30px; border-radius:20px;">';
echo '<header style="text-align:center; padding-bottom:20px; border-bottom:1px solid '.$colors["accent"].';">';
echo '<h1 style="color:'.$colors["accent"].';">'.$me["name"].'</h1>';
echo '<p style="opacity:0.7;">'.$me["age"].' лет, '.$me["city"].'</p>';
echo '<p style="font-style:italic; margin-top:8px;">"'.$me["motto"].'"</p>';
echo '</header>';

// Навыки
$skillsHtml = '';
foreach ($skills as $s) {
    $skillsHtml .= '<div style="margin:6px 0;"><b>'.$s["name"].'</b> '.stars($s["level"]).'</div>';
}
echo section('💪 Навыки', $skillsHtml, $colors);

// Хобби
$hobbyHtml = '';
foreach ($hobbies as $h) {
    $hobbyHtml .= '<span style="background:'.$colors["accent"].'; color:white; padding:4px 12px; border-radius:12px; margin:4px; display:inline-block;">'.$h.'</span>';
}
echo section('🎮 Хобби', $hobbyHtml, $colors);

echo '<footer style="text-align:center; opacity:0.6; margin-top:20px;">© 2026 — сделано на PHP 🐘</footer>';
echo '</div>';
`,
    starterHtml: `<div style="padding:20px; font-family:Arial;">
  {{ output }}
</div>`,
    challenges: [
        {
            task: 'Сделай сайт СВОИМ: замени имя, возраст, город, девиз в массиве $me',
            hint: 'Меняешь значения в <code>$me</code>',
            check: { codeNotContains: '"Junior Dev"' }
        },
        {
            task: 'Замени список навыков на свои реальные. Можно добавить «Английский», «Математика», «Гитара»',
            hint: 'Меняй <code>$skills</code>. Каждый навык: <code>["name" => "...", "level" => 1-5]</code>',
            check: { codeNotContains: '"Scratch"' }
        },
        {
            task: 'Замени хобби на свои',
            hint: 'Меняй массив <code>$hobbies</code>. Можно добавить эмодзи',
            check: { codeNotContains: 'Футбол' }
        },
        {
            task: 'Переключи на светлую тему: <code>$theme = "light";</code>. Сравни оба варианта',
            hint: 'Темы переключаются одной строкой',
            check: { codeContains: '$theme = "light"' }
        },
        {
            task: 'Добавь новый раздел «Достижения» — список твоих достижений (массив + foreach + section())',
            hint: '<code>$achievements = ["Прошёл курс PHP", "Сделал свой сайт"];</code>. Сделай foreach и используй <code>section()</code>',
            check: { codeContainsAny: ['Достижения', 'achievements'] }
        },
        {
            task: 'Добавь возрастной фильтр: если <code>$me["age"] >= 14</code> — покажи раздел «Контакты», иначе — раздел «Учусь у родителей»',
            hint: 'Используй <code>if</code> вокруг блока с echo section()',
            check: { codeContainsAll: ['if', '$me["age"]'] }
        },
        {
            task: 'Создай свою функцию (что-то полезное!). Например, <code>badge($text)</code> — возвращает красивый бейдж',
            hint: 'Любая функция, которая что-то возвращает и используется для оформления',
            check: { custom: (c) => (c.match(/^function /gm) || []).length >= 3 }
        },
        {
            task: '🎁 СВОБОДНОЕ: добавь любую свою фишку! Любимые цвета, цитаты, музыку, фотографию (через эмодзи)',
            hint: 'Это ТВОЙ сайт — делай как нравится!',
            check: { custom: (c) => c.length > 1500 }
        }
    ],
    hints: [
        'Это финал — соединяешь ВСЁ что узнал',
        'Меняй переменные сверху — они влияют на весь сайт',
        'Темы через тернарный оператор: <code>$x = условие ? "А" : "Б";</code>',
        'Функции делают код в 10 раз чище',
        '🎉 Ты дошёл до конца! Покажи маме и папе!'
    ]
}

    ];

    function getAll() {
        return LESSONS.map(l => ({
            id: l.id,
            title: l.title,
            icon: l.icon,
            difficulty: l.difficulty,
            group: l.group,
            concepts: l.concepts,
            challengesCount: l.challenges ? l.challenges.length : 0
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

    /**
     * Проверка задания. Возвращает true если все условия выполнены.
     * @param {object} challenge — объект задания с .check
     * @param {string} code — PHP код пользователя
     * @param {string} output — результат выполнения
     */
    function checkChallenge(challenge, code, output) {
        if (!challenge || !challenge.check) return false;
        const ch = challenge.check;

        // Поддержка старого формата: { check: 'contains', checkValue: '...' }
        if (typeof ch === 'string') {
            return checkLegacy(challenge, code, output);
        }

        const text = (output || '') + '\n___PHP___\n' + (code || '');
        const out = output || '';
        const cd = code || '';

        for (const [key, value] of Object.entries(ch)) {
            if (!checkOne(key, value, cd, out)) return false;
        }
        return true;
    }

    function checkOne(key, value, code, output) {
        switch (key) {
            case 'outputContains':
                return output.includes(value);
            case 'outputContainsAll':
                return value.every(v => output.includes(v));
            case 'outputContainsAny':
                return value.some(v => output.includes(v));
            case 'outputNotContains':
                return !output.includes(value);
            case 'outputCount':
                return countOccurrences(output, value.text) >= value.min;
            case 'outputLines':
                return (output.split(/<br>|\n/).filter(s => s.trim()).length) >= value.min;
            case 'codeContains':
                return code.includes(value);
            case 'codeContainsAll':
                return value.every(v => code.includes(v));
            case 'codeContainsAny':
                return value.some(v => code.includes(v));
            case 'codeNotContains':
                return !code.includes(value);
            case 'codeMatches':
                return value.test(code);
            case 'custom':
                try { return value(code, output); }
                catch (e) { return false; }
            default:
                return true; // unknown rule — skip
        }
    }

    function countOccurrences(str, substr) {
        if (!substr) return 0;
        let count = 0;
        let pos = 0;
        while ((pos = str.indexOf(substr, pos)) !== -1) {
            count++;
            pos += substr.length;
        }
        return count;
    }

    function checkLegacy(challenge, code, output) {
        // Backwards compat — wrap old API
        const v = challenge.checkValue;
        switch (challenge.check) {
            case 'contains': return output.includes(v) || code.includes(v);
            case 'notContains': return !output.includes(v);
            case 'notEquals': return !output.includes(v);
            case 'containsWord': return code.includes(v);
            case 'containsAny': return v.some(x => output.includes(x) || code.includes(x));
            case 'outputLineCount':
                return output.split('<br>').length >= v || output.split('\n').length >= v;
            case 'countOccurrences':
                return countOccurrences(output, v.text) >= v.min;
        }
        return false;
    }

    return {
        getAll, getLesson, getLessonIndex, getNextLesson,
        getTotalLessons, checkChallenge
    };
})();
