/**
 * App — главный контроллер
 *
 * Главные изменения от старой версии:
 *  - Навигация по задачам в уроке: ←/→/таб
 *  - Любое задание можно переделать (сохраняется в lessonChallenges)
 *  - Звёзды считаются как процент пройденных заданий
 *  - Подсказки на КАЖДУЮ задачу (challenge.hint)
 *  - Группировка уроков (basics / logic / loops / data / tools / final / boss)
 */
(async function() {
    // ===== State =====
    let currentLesson = null;
    let currentChallengeIndex = 0;
    let currentHintIndex = 0;
    let lessonStartTime = 0;
    let isRunning = false;

    // ===== DOM =====
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    const loadingScreen = $('#loading-screen');
    const loadingBarFill = $('#loading-bar-fill');
    const loadingTip = $('#loading-tip');
    const app = $('#app');

    const lessonSelector = $('#lesson-selector');
    const lessonGrid = $('#lesson-grid');
    const workspace = $('#workspace');

    const lessonTitle = $('#lesson-title');
    const mascotText = $('#mascot-text');
    const scratchComparison = $('#scratch-comparison');
    const scratchText = $('#scratch-text');
    const challengePanel = $('#challenge-panel');
    const challengeText = $('#challenge-text');
    const challengeProgress = $('#challenge-progress');
    const challengeTabs = $('#challenge-tabs');
    const challengeStatus = $('#challenge-status');
    const taskHintBtn = $('#task-hint-btn');
    const taskHintBubble = $('#task-hint-bubble');
    const taskPrev = $('#task-prev');
    const taskNext = $('#task-next');

    const btnRun = $('#btn-run');
    const runStatus = $('#run-status');
    const previewArea = $('#preview-area');

    const btnHint = $('#btn-hint');
    const hintModal = $('#hint-modal');
    const hintBody = $('#hint-body');
    const hintCounter = $('#hint-counter');

    const starsDisplay = $('#stars-display');
    const badgeCount = $('#badge-count');

    // ===== Loading Tips =====
    const tips = [
        'PHP создан Расмусом Лердорфом в 1995 году!',
        'Символ PHP — милый слоник 🐘',
        '80% всех сайтов используют PHP!',
        'WordPress, Wikipedia, ВКонтакте — все на PHP!',
        'PHP = "PHP: Hypertext Preprocessor"',
        'В PHP больше 1000 встроенных функций!',
        'PHP может работать как в браузере, так и через командную строку',
    ];

    function showRandomTip() {
        loadingTip.textContent = tips[Math.floor(Math.random() * tips.length)];
    }

    // ===== Initialize =====
    showRandomTip();

    const phpReady = await PhpRunner.init((percent, msg) => {
        if (percent >= 0) loadingBarFill.style.width = percent + '%';
        if (percent === -1) {
            loadingTip.textContent = msg;
            loadingBarFill.style.background = '#E17055';
        }
    });

    EditorManager.init();

    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        app.classList.remove('hidden');
    }, 500);

    if (!phpReady) {
        runStatus.textContent = '⚠ PHP не загрузился. Проверь интернет и обнови страницу.';
        runStatus.classList.add('error');
    }

    // ===== Lesson Grid =====
    const GROUP_LABELS = {
        basics: '🌱 Основы',
        logic: '🔀 Условия и логика',
        loops: '🔁 Циклы',
        data: '📋 Данные',
        tools: '⚡ Инструменты',
        final: '🏆 Финал',
        boss: '🎯 BOSS-уровни (закрепление)'
    };

    renderLessonGrid();
    updateHeaderStats();

    function renderLessonGrid() {
        const lessons = LessonLoader.getAll();
        lessonGrid.innerHTML = '';

        // Сгруппируем уроки по их group, сохраняя порядок
        let lastGroup = null;
        let groupIndex = 0;

        lessons.forEach((lesson, index) => {
            // Заголовок группы
            const group = lesson.group || 'basics';
            if (group !== lastGroup) {
                const header = document.createElement('div');
                header.className = 'lesson-group-header';
                header.textContent = GROUP_LABELS[group] || group;
                lessonGrid.appendChild(header);
                lastGroup = group;
                groupIndex = 0;
            }

            const fullLesson = LessonLoader.getLesson(lesson.id);
            const totalChallenges = fullLesson.challenges ? fullLesson.challenges.length : 3;
            const stars = Achievements.getLessonStars(lesson.id);
            const doneObj = Achievements.getDoneChallenges(lesson.id);
            const doneCount = Object.keys(doneObj).length;

            const starsStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

            const card = document.createElement('div');
            card.className = 'lesson-card';
            if (stars === 3) card.classList.add('completed');
            if (group === 'boss') card.classList.add('boss');

            card.innerHTML = `
                <span class="lesson-card-number">${index + 1}</span>
                <div class="lesson-card-icon">${lesson.icon}</div>
                <h3>${escapeHtml(lesson.title)}</h3>
                <p>${escapeHtml(lesson.concepts.join(', '))}</p>
                <div class="lesson-card-meta">
                    <div class="lesson-card-stars">${starsStr}</div>
                    <span class="lesson-card-tasks">${doneCount}/${totalChallenges} задач</span>
                </div>
            `;

            card.addEventListener('click', () => openLesson(lesson.id));
            lessonGrid.appendChild(card);
        });
    }

    // ===== Open Lesson =====
    function openLesson(lessonId) {
        const lesson = LessonLoader.getLesson(lessonId);
        if (!lesson) return;

        currentLesson = lesson;
        // Открываем первую НЕ пройденную задачу, или 0 если все пройдены
        const done = Achievements.getDoneChallenges(lessonId);
        currentChallengeIndex = 0;
        for (let i = 0; i < lesson.challenges.length; i++) {
            if (!done[i]) { currentChallengeIndex = i; break; }
            if (i === lesson.challenges.length - 1) currentChallengeIndex = 0;
        }
        currentHintIndex = 0;
        lessonStartTime = Date.now();

        lessonTitle.textContent = `${lesson.icon} ${lesson.title}`;
        mascotText.innerHTML = lesson.mascotSays;

        if (lesson.scratchComparison) {
            scratchComparison.classList.remove('hidden');
            scratchText.innerHTML = lesson.scratchComparison;
        } else {
            scratchComparison.classList.add('hidden');
        }

        const saved = loadSavedCode(lessonId);
        EditorManager.setHtml(saved ? saved.html : lesson.starterHtml);
        EditorManager.setPhp(saved ? saved.php : lesson.starterPhp);

        renderChallengeTabs();
        updateChallenge();

        previewArea.innerHTML = '<div class="preview-placeholder">Нажми <strong>ЗАПУСТИТЬ!</strong> чтобы увидеть результат</div>';
        runStatus.textContent = '';
        runStatus.className = 'run-status';
        taskHintBubble.classList.add('hidden');

        lessonSelector.classList.add('hidden');
        workspace.classList.remove('hidden');

        EditorManager.focus('php');
    }

    function closeLesson() {
        if (currentLesson) saveCode(currentLesson.id);

        workspace.classList.add('hidden');
        lessonSelector.classList.remove('hidden');
        hintModal.classList.add('hidden');
        currentLesson = null;

        renderLessonGrid();
        updateHeaderStats();
    }

    // ===== Run Code =====
    async function runCode() {
        if (!currentLesson || isRunning) return;
        if (!PhpRunner.ready()) {
            runStatus.textContent = '⚠ PHP ещё загружается...';
            runStatus.className = 'run-status error';
            return;
        }

        isRunning = true;
        btnRun.classList.add('running');
        btnRun.textContent = '⏳ Выполняю...';
        runStatus.textContent = '';
        runStatus.className = 'run-status';

        const phpCode = EditorManager.getPhp();
        const htmlTemplate = EditorManager.getHtml();

        saveCode(currentLesson.id);

        const newBadges = Achievements.recordRun(currentLesson.id);
        newBadges.forEach(b => showBadgeUnlock(b));

        const result = await PhpRunner.run(phpCode);

        isRunning = false;
        btnRun.classList.remove('running');
        btnRun.innerHTML = '<span class="run-icon">▶</span> ЗАПУСТИТЬ!';

        if (result.success) {
            const rendered = TemplateEngine.render(htmlTemplate, result.output);
            previewArea.innerHTML = rendered;
            previewArea.classList.add('success-flash');
            setTimeout(() => previewArea.classList.remove('success-flash'), 500);

            runStatus.textContent = '✓ Готово!';
            runStatus.className = 'run-status success';

            checkChallenge(result.output, phpCode);
        } else {
            previewArea.innerHTML = `
                <div style="padding:20px; color:#E17055; font-family:monospace;">
                    <h3>😅 Ошибка в коде:</h3>
                    <pre style="white-space:pre-wrap; margin-top:10px; background:#fff3f0; padding:12px; border-radius:8px;">${escapeHtml(result.error)}</pre>
                    <p style="margin-top:12px; color:#666;">Не переживай, ошибки — это нормально! Проверь код и попробуй снова.</p>
                </div>
            `;
            runStatus.textContent = '✗ Есть ошибка';
            runStatus.className = 'run-status error';
        }
    }

    // ===== Challenge logic =====
    function renderChallengeTabs() {
        if (!currentLesson || !currentLesson.challenges) return;
        const total = currentLesson.challenges.length;
        const done = Achievements.getDoneChallenges(currentLesson.id);

        challengeTabs.innerHTML = '';
        for (let i = 0; i < total; i++) {
            const tab = document.createElement('button');
            tab.className = 'challenge-tab';
            if (i === currentChallengeIndex) tab.classList.add('active');
            if (done[i]) tab.classList.add('done');
            tab.textContent = done[i] ? `✓ ${i + 1}` : `${i + 1}`;
            tab.title = `Задача ${i + 1}${done[i] ? ' (выполнена)' : ''}`;
            tab.addEventListener('click', () => goToChallenge(i));
            challengeTabs.appendChild(tab);
        }
    }

    function goToChallenge(index) {
        if (!currentLesson || !currentLesson.challenges) return;
        if (index < 0 || index >= currentLesson.challenges.length) return;
        currentChallengeIndex = index;
        taskHintBubble.classList.add('hidden');
        renderChallengeTabs();
        updateChallenge();
    }

    function updateChallenge() {
        if (!currentLesson || !currentLesson.challenges) return;

        const challenges = currentLesson.challenges;
        const ch = challenges[currentChallengeIndex];
        const done = Achievements.isChallengeDone(currentLesson.id, currentChallengeIndex);

        challengeText.innerHTML = ch.task;
        challengeProgress.textContent = `${currentChallengeIndex + 1}/${challenges.length}`;

        if (done) {
            challengeStatus.textContent = '✓ Уже выполнено — можно переделать';
            challengeStatus.classList.add('done');
        } else {
            challengeStatus.textContent = '';
            challengeStatus.classList.remove('done');
        }

        // Кнопка подсказки
        taskHintBtn.style.display = ch.hint ? 'inline-block' : 'none';

        // Стрелки
        taskPrev.disabled = currentChallengeIndex === 0;
        taskNext.disabled = currentChallengeIndex >= challenges.length - 1;

        // Активная вкладка
        $$('.challenge-tab').forEach((t, i) => {
            t.classList.toggle('active', i === currentChallengeIndex);
        });
    }

    function checkChallenge(output, phpCode) {
        if (!currentLesson || !currentLesson.challenges) return;
        const ch = currentLesson.challenges[currentChallengeIndex];
        if (!ch) return;

        const wasAlreadyDone = Achievements.isChallengeDone(currentLesson.id, currentChallengeIndex);
        const passed = LessonLoader.checkChallenge(ch, phpCode, output);

        if (!passed) {
            if (!wasAlreadyDone) {
                runStatus.textContent = '🔍 Код запущен. Задача ещё не выполнена — попробуй ещё!';
                runStatus.className = 'run-status';
            }
            return;
        }

        // Помечаем задачу пройденной
        Achievements.markChallenge(currentLesson.id, currentChallengeIndex);

        // Обновляем звёзды по проценту пройденных задач
        const total = currentLesson.challenges.length;
        const newStars = Achievements.updateLessonStars(currentLesson.id, total);

        if (!wasAlreadyDone) {
            runStatus.textContent = `🎯 Задание ${currentChallengeIndex + 1} выполнено!`;
            runStatus.className = 'run-status success';
        } else {
            runStatus.textContent = `✓ Задание ${currentChallengeIndex + 1} — снова правильно!`;
            runStatus.className = 'run-status success';
        }

        // Перерисовываем вкладки чтобы появилась галочка
        renderChallengeTabs();

        // Если все задачи выполнены — анимация и бейдж
        const doneCount = Object.keys(Achievements.getDoneChallenges(currentLesson.id)).length;

        if (doneCount === total) {
            // Бейдж урока
            if (currentLesson.badgeId) {
                const newBadge = Achievements.unlock(currentLesson.badgeId);
                if (newBadge) showBadgeUnlock(currentLesson.badgeId);
            }

            // Speed runner
            const elapsed = (Date.now() - lessonStartTime) / 1000;
            if (elapsed < 120) {
                if (Achievements.unlock('speed_runner')) {
                    setTimeout(() => showBadgeUnlock('speed_runner'), 1500);
                }
            }

            // Этапные бейджи
            checkMilestoneBadges();

            // Конфетти
            setTimeout(() => showConfetti(), 500);

            // Если есть следующая задача — авто-переход на неё через 2 сек
            // Но не переключаемся, если это последняя — пусть остаётся
        } else {
            // Авто-переход на следующую невыполненную задачу через 1.2 сек
            setTimeout(() => {
                if (!currentLesson) return;
                const done = Achievements.getDoneChallenges(currentLesson.id);
                for (let i = currentChallengeIndex + 1; i < total; i++) {
                    if (!done[i]) { goToChallenge(i); return; }
                }
                for (let i = 0; i < currentChallengeIndex; i++) {
                    if (!done[i]) { goToChallenge(i); return; }
                }
            }, 1200);
        }

        updateHeaderStats();
    }

    function checkMilestoneBadges() {
        const allLessons = LessonLoader.getAll();
        let basicsDone = 0;
        let totalDone = 0;
        let allThree = 0;

        allLessons.forEach(l => {
            const stars = Achievements.getLessonStars(l.id);
            if (stars >= 1) totalDone++;
            if (stars >= 3) allThree++;
            const idx = LessonLoader.getLessonIndex(l.id);
            if (idx < 4 && stars >= 1) basicsDone++;
        });

        if (basicsDone >= 4 && Achievements.unlock('all_basics')) {
            setTimeout(() => showBadgeUnlock('all_basics'), 2500);
        }
        if (totalDone >= 8 && Achievements.unlock('half_way')) {
            setTimeout(() => showBadgeUnlock('half_way'), 3000);
        }
        if (allThree >= allLessons.length && Achievements.unlock('all_complete')) {
            setTimeout(() => showBadgeUnlock('all_complete'), 3500);
        }
    }

    // ===== Hints (per-lesson, modal) =====
    function showHint() {
        if (!currentLesson || !currentLesson.hints) return;
        currentHintIndex = 0;
        updateHintDisplay();
        hintModal.classList.remove('hidden');
    }

    function updateHintDisplay() {
        const hints = currentLesson.hints;
        hintBody.innerHTML = hints[currentHintIndex];
        hintCounter.textContent = `${currentHintIndex + 1}/${hints.length}`;
    }

    // ===== Per-task hint =====
    function toggleTaskHint() {
        if (!currentLesson) return;
        const ch = currentLesson.challenges[currentChallengeIndex];
        if (!ch || !ch.hint) return;

        if (taskHintBubble.classList.contains('hidden')) {
            taskHintBubble.innerHTML = ch.hint;
            taskHintBubble.classList.remove('hidden');
        } else {
            taskHintBubble.classList.add('hidden');
        }
    }

    // ===== Badge Unlock =====
    function showBadgeUnlock(badgeId) {
        const badge = Achievements.BADGES.find(b => b.id === badgeId);
        if (!badge) return;

        showConfetti();

        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: linear-gradient(135deg, #6C5CE7, #A29BFE); color: white;
            padding: 16px 32px; border-radius: 16px; z-index: 300;
            font-size: 1.1rem; font-weight: 600; text-align: center;
            box-shadow: 0 8px 32px rgba(108,92,231,0.4);
            animation: slideDown 0.5s ease-out;
        `;
        notif.innerHTML = `<div style="font-size:2rem;">${badge.icon}</div>Бейдж: ${escapeHtml(badge.name)}!`;
        document.body.appendChild(notif);

        setTimeout(() => {
            notif.style.transition = 'opacity 0.5s';
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 500);
        }, 3000);

        updateHeaderStats();
    }

    // ===== Confetti =====
    function showConfetti() {
        const container = $('#confetti-container');
        const colors = ['#6C5CE7', '#00B894', '#FDCB6E', '#E17055', '#A29BFE', '#FF6B6B', '#4ECDC4'];

        for (let i = 0; i < 50; i++) {
            const piece = document.createElement('div');
            piece.className = 'confetti-piece';
            piece.style.left = Math.random() * 100 + '%';
            piece.style.background = colors[Math.floor(Math.random() * colors.length)];
            piece.style.animationDelay = Math.random() * 1 + 's';
            piece.style.animationDuration = (2 + Math.random() * 2) + 's';
            piece.style.width = (5 + Math.random() * 10) + 'px';
            piece.style.height = (5 + Math.random() * 10) + 'px';
            container.appendChild(piece);
        }

        setTimeout(() => { container.innerHTML = ''; }, 4000);
    }

    // ===== Header Stats =====
    function updateHeaderStats() {
        const totalStars = Achievements.getTotalStars();
        const maxStars = LessonLoader.getTotalLessons() * 3;
        starsDisplay.textContent = `⭐ ${totalStars}/${maxStars}`;
        badgeCount.textContent = `🏆 ${Achievements.getUnlockedCount()}`;
    }

    // ===== Save/Load Code =====
    function saveCode(lessonId) {
        try {
            const data = {
                html: EditorManager.getHtml(),
                php: EditorManager.getPhp()
            };
            localStorage.setItem('php-trainer-code-' + lessonId, JSON.stringify(data));
        } catch (e) {}
    }

    function loadSavedCode(lessonId) {
        try {
            const saved = localStorage.getItem('php-trainer-code-' + lessonId);
            return saved ? JSON.parse(saved) : null;
        } catch (e) { return null; }
    }

    // ===== Projects =====
    function saveProject() {
        if (!currentLesson) return;
        const name = prompt('Название проекта:');
        if (!name) return;

        const projects = loadProjects();
        projects.push({
            name,
            lessonId: currentLesson.id,
            html: EditorManager.getHtml(),
            php: EditorManager.getPhp(),
            date: new Date().toLocaleDateString('ru-RU')
        });

        localStorage.setItem('php-trainer-projects', JSON.stringify(projects));
        renderProjects();
    }

    function loadProjects() {
        try {
            return JSON.parse(localStorage.getItem('php-trainer-projects') || '[]');
        } catch (e) { return []; }
    }

    function renderProjects() {
        const projects = loadProjects();
        const list = $('#projects-list');
        list.innerHTML = '';

        if (projects.length === 0) {
            list.innerHTML = '<p style="color: var(--text-dim); text-align: center; padding: 20px;">Пока нет сохранённых проектов</p>';
            return;
        }

        projects.forEach((project, index) => {
            const item = document.createElement('div');
            item.className = 'project-item';
            item.innerHTML = `
                <div>
                    <h4>${escapeHtml(project.name)}</h4>
                    <p>${escapeHtml(project.date)}</p>
                </div>
                <div class="project-actions">
                    <button class="btn-small" onclick="App.loadProject(${index})">Открыть</button>
                    <button class="btn-danger" onclick="App.deleteProject(${index})">✕</button>
                </div>
            `;
            list.appendChild(item);
        });
    }

    // ===== Achievements Modal =====
    function renderAchievements() {
        const badges = Achievements.getAllBadges();
        const body = $('#achievements-body');
        body.innerHTML = '';

        badges.forEach(badge => {
            const item = document.createElement('div');
            item.className = 'achievement-item' + (badge.unlocked ? '' : ' locked');
            item.innerHTML = `
                <span class="achievement-icon">${badge.unlocked ? badge.icon : '🔒'}</span>
                <div class="achievement-info">
                    <h4>${escapeHtml(badge.name)}</h4>
                    <p>${escapeHtml(badge.desc)}</p>
                </div>
            `;
            body.appendChild(item);
        });
    }

    // ===== Preview Resize =====
    function initPreviewResize() {
        const handle = $('#preview-resize-handle');
        const container = $('#preview-container');
        let startY = 0, startHeight = 0, isDragging = false;

        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            startY = e.clientY;
            startHeight = container.offsetHeight;
            handle.classList.add('active');
            document.body.style.cursor = 'ns-resize';
            document.body.style.userSelect = 'none';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const delta = startY - e.clientY;
            const newHeight = Math.max(80, Math.min(window.innerHeight * 0.8, startHeight + delta));
            container.style.height = newHeight + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            handle.classList.remove('active');
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        });
    }
    initPreviewResize();

    // ===== Open in New Window =====
    function openInNewWindow() {
        const content = previewArea.innerHTML;
        if (!content || previewArea.querySelector('.preview-placeholder')) return;

        const newWin = window.open('', '_blank');
        if (!newWin) {
            runStatus.textContent = '⚠ Браузер заблокировал окно. Разреши всплывающие окна.';
            runStatus.className = 'run-status error';
            return;
        }

        newWin.document.write(`<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мой сайт — PHP Trainer</title>
    <style>body { margin: 0; padding: 16px; font-family: 'Segoe UI', sans-serif; }</style>
</head>
<body>${content}</body>
</html>`);
        newWin.document.close();
    }

    $('#btn-open-window').addEventListener('click', openInNewWindow);

    // ===== Utilities =====
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = String(text == null ? '' : text);
        return div.innerHTML;
    }

    // ===== Event Listeners =====
    btnRun.addEventListener('click', runCode);

    $('#btn-back-to-lessons').addEventListener('click', closeLesson);

    $('#btn-reset').addEventListener('click', () => {
        if (!currentLesson) return;
        if (confirm('Сбросить код к начальному? Прогресс по задачам сохранится, но код вернётся к исходному.')) {
            EditorManager.setHtml(currentLesson.starterHtml);
            EditorManager.setPhp(currentLesson.starterPhp);
            // Сбрасываем сохранённый код
            try { localStorage.removeItem('php-trainer-code-' + currentLesson.id); } catch (e) {}
            previewArea.innerHTML = '<div class="preview-placeholder">Нажми <strong>ЗАПУСТИТЬ!</strong> чтобы увидеть результат</div>';
        }
    });

    // Hints
    btnHint.addEventListener('click', showHint);
    $('#hint-close').addEventListener('click', () => hintModal.classList.add('hidden'));
    $('#hint-next').addEventListener('click', () => {
        if (!currentLesson) return;
        currentHintIndex = Math.min(currentHintIndex + 1, currentLesson.hints.length - 1);
        updateHintDisplay();
    });
    $('#hint-prev').addEventListener('click', () => {
        currentHintIndex = Math.max(currentHintIndex - 1, 0);
        updateHintDisplay();
    });

    // Per-task hint
    taskHintBtn.addEventListener('click', toggleTaskHint);

    // Task navigation
    taskPrev.addEventListener('click', () => goToChallenge(currentChallengeIndex - 1));
    taskNext.addEventListener('click', () => goToChallenge(currentChallengeIndex + 1));

    // Reference modal
    $('#btn-reference').addEventListener('click', () => {
        $('#reference-modal').classList.remove('hidden');
    });
    $('#reference-close').addEventListener('click', () => {
        $('#reference-modal').classList.add('hidden');
    });

    $$('.ref-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            $$('.ref-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            $$('.ref-section').forEach(s => s.classList.add('hidden'));
            $(`#ref-${tab.dataset.ref}`).classList.remove('hidden');
        });
    });

    // Achievements modal
    $('#btn-achievements').addEventListener('click', () => {
        renderAchievements();
        $('#achievements-modal').classList.remove('hidden');
    });
    $('#achievements-close').addEventListener('click', () => {
        $('#achievements-modal').classList.add('hidden');
    });

    // Projects modal
    $('#btn-projects').addEventListener('click', () => {
        renderProjects();
        $('#projects-modal').classList.remove('hidden');
    });
    $('#projects-close').addEventListener('click', () => {
        $('#projects-modal').classList.add('hidden');
    });
    $('#btn-save-project').addEventListener('click', saveProject);

    $$('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl+Enter — запуск
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
        // Alt + ← / → — переход между задачами
        if (e.altKey && e.key === 'ArrowLeft') {
            e.preventDefault();
            goToChallenge(currentChallengeIndex - 1);
        }
        if (e.altKey && e.key === 'ArrowRight') {
            e.preventDefault();
            goToChallenge(currentChallengeIndex + 1);
        }
    });

    // Global API
    window.App = {
        loadProject(index) {
            const projects = loadProjects();
            const project = projects[index];
            if (!project) return;

            openLesson(project.lessonId);
            EditorManager.setHtml(project.html);
            EditorManager.setPhp(project.php);

            $('#projects-modal').classList.add('hidden');
        },

        deleteProject(index) {
            if (!confirm('Удалить этот проект?')) return;
            const projects = loadProjects();
            projects.splice(index, 1);
            localStorage.setItem('php-trainer-projects', JSON.stringify(projects));
            renderProjects();
        }
    };

    // SlideDown animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

})();
