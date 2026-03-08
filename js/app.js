/**
 * App — главный контроллер приложения
 */
(async function() {
    // ===== State =====
    let currentLesson = null;
    let currentChallengeIndex = 0;
    let currentHintIndex = 0;
    let lessonStartTime = 0;
    let isRunning = false;

    // ===== DOM Elements =====
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
        'PHP расшифровывается как "PHP: Hypertext Preprocessor"',
        'Символ PHP — милый слоник 🐘',
        '80% всех сайтов в мире используют PHP!',
        'WordPress, Wikipedia, Facebook — все написаны на PHP!',
        'Папа каждый день пишет на PHP — теперь и ты!',
    ];

    function showRandomTip() {
        loadingTip.textContent = tips[Math.floor(Math.random() * tips.length)];
    }

    // ===== Initialize =====
    showRandomTip();

    // Init PHP engine
    const phpReady = await PhpRunner.init((percent, msg) => {
        if (percent >= 0) {
            loadingBarFill.style.width = percent + '%';
        }
        if (percent === -1) {
            // Error — show fallback mode
            loadingTip.textContent = msg;
            loadingBarFill.style.background = '#E17055';
        }
    });

    // Init editors
    EditorManager.init();

    // Hide loading, show app
    loadingScreen.classList.add('fade-out');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
        app.classList.remove('hidden');
    }, 500);

    if (!phpReady) {
        runStatus.textContent = '⚠ PHP не загрузился. Проверь интернет и обнови страницу.';
        runStatus.classList.add('error');
    }

    // Render lesson grid
    renderLessonGrid();
    updateHeaderStats();

    // ===== Lesson Grid =====
    function renderLessonGrid() {
        const lessons = LessonLoader.getAll();
        lessonGrid.innerHTML = '';

        lessons.forEach((lesson, index) => {
            const stars = Achievements.getLessonStars(lesson.id);
            const starsStr = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);

            const card = document.createElement('div');
            card.className = 'lesson-card' + (stars === 3 ? ' completed' : '');
            card.innerHTML = `
                <span class="lesson-card-number">${index + 1}</span>
                <div class="lesson-card-icon">${lesson.icon}</div>
                <h3>${lesson.title}</h3>
                <p>${lesson.concepts.join(', ')}</p>
                <div class="lesson-card-stars">${starsStr}</div>
                <span class="lesson-card-difficulty">${'●'.repeat(lesson.difficulty)}${'○'.repeat(3 - lesson.difficulty)}</span>
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
        currentChallengeIndex = 0;
        currentHintIndex = 0;
        lessonStartTime = Date.now();

        // Update UI
        lessonTitle.textContent = `${lesson.icon} ${lesson.title}`;
        mascotText.innerHTML = lesson.mascotSays;

        if (lesson.scratchComparison) {
            scratchComparison.classList.remove('hidden');
            scratchText.innerHTML = lesson.scratchComparison;
        } else {
            scratchComparison.classList.add('hidden');
        }

        // Load saved code or starter code
        const saved = loadSavedCode(lessonId);
        EditorManager.setHtml(saved ? saved.html : lesson.starterHtml);
        EditorManager.setPhp(saved ? saved.php : lesson.starterPhp);

        // Show challenge
        updateChallenge();

        // Reset preview
        previewArea.innerHTML = '<div class="preview-placeholder">Нажми <strong>ЗАПУСТИТЬ!</strong> чтобы увидеть результат</div>';
        runStatus.textContent = '';
        runStatus.className = 'run-status';

        // Show workspace, hide selector
        lessonSelector.classList.add('hidden');
        workspace.classList.remove('hidden');

        EditorManager.focus('php');
    }

    // ===== Close Lesson =====
    function closeLesson() {
        // Save current code
        if (currentLesson) {
            saveCode(currentLesson.id);
        }

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

        // Save code
        saveCode(currentLesson.id);

        // Record run
        const curiousBadge = Achievements.recordRun(currentLesson.id);
        if (curiousBadge) {
            showBadgeUnlock('curious_coder');
        }

        const result = await PhpRunner.run(phpCode);

        isRunning = false;
        btnRun.classList.remove('running');
        btnRun.innerHTML = '<span class="run-icon">▶</span> ЗАПУСТИТЬ!';

        if (result.success) {
            // Render output into HTML template
            const rendered = TemplateEngine.render(htmlTemplate, result.output);
            previewArea.innerHTML = rendered;
            previewArea.classList.add('success-flash');
            setTimeout(() => previewArea.classList.remove('success-flash'), 500);

            runStatus.textContent = '✓ Готово!';
            runStatus.className = 'run-status success';

            // Check challenge
            checkChallenge(result.output, phpCode);
        } else {
            // Show error in preview
            previewArea.innerHTML = `
                <div style="padding: 20px; color: #E17055; font-family: monospace;">
                    <h3>😅 Ошибка в коде:</h3>
                    <pre style="white-space: pre-wrap; margin-top: 10px; background: #fff3f0; padding: 12px; border-radius: 8px;">${escapeHtml(result.error)}</pre>
                    <p style="margin-top: 12px; color: #666;">Не переживай, ошибки — это нормально! Проверь код и попробуй снова.</p>
                </div>
            `;
            runStatus.textContent = '✗ Есть ошибка';
            runStatus.className = 'run-status error';
        }
    }

    // ===== Challenge Checking =====
    function updateChallenge() {
        if (!currentLesson || !currentLesson.challenges) return;

        const challenges = currentLesson.challenges;
        if (currentChallengeIndex >= challenges.length) {
            challengeText.textContent = '🎉 Все задания выполнены! Можешь экспериментировать дальше!';
            challengeProgress.textContent = `${challenges.length}/${challenges.length}`;
            return;
        }

        const challenge = challenges[currentChallengeIndex];
        challengeText.textContent = challenge.task;
        challengeProgress.textContent = `${currentChallengeIndex + 1}/${challenges.length}`;
    }

    function checkChallenge(output, phpCode) {
        if (!currentLesson || !currentLesson.challenges) return;
        if (currentChallengeIndex >= currentLesson.challenges.length) return;

        const challenge = currentLesson.challenges[currentChallengeIndex];
        let passed = false;

        switch (challenge.check) {
            case 'contains':
                passed = output.includes(challenge.checkValue);
                break;
            case 'notContains':
                passed = !output.includes(challenge.checkValue);
                break;
            case 'notEquals':
                passed = !output.includes(challenge.checkValue);
                break;
            case 'containsWord':
                passed = phpCode.includes(challenge.checkValue);
                break;
            case 'containsAny':
                passed = challenge.checkValue.some(v => output.includes(v) || phpCode.includes(v));
                break;
            case 'outputLineCount':
                passed = output.split('<br>').length >= challenge.checkValue ||
                         output.split('\n').length >= challenge.checkValue;
                break;
            case 'countOccurrences': {
                const count = (output.match(new RegExp(escapeRegex(challenge.checkValue.text), 'g')) || []).length;
                passed = count >= challenge.checkValue.min;
                break;
            }
        }

        if (passed) {
            currentChallengeIndex++;
            const totalChallenges = currentLesson.challenges.length;

            // Update stars
            Achievements.setLessonStars(currentLesson.id, currentChallengeIndex);

            // Show success notification
            runStatus.textContent = `🎯 Задание выполнено! (${currentChallengeIndex}/${totalChallenges})`;
            runStatus.className = 'run-status success';

            // Check if all challenges completed
            if (currentChallengeIndex >= totalChallenges) {
                // Unlock badge
                const newBadge = Achievements.unlock(currentLesson.badgeId);
                if (newBadge) {
                    showBadgeUnlock(currentLesson.badgeId);
                }

                // Check speed badge
                const elapsed = (Date.now() - lessonStartTime) / 1000;
                if (elapsed < 120) {
                    const speedBadge = Achievements.unlock('speed_runner');
                    if (speedBadge) {
                        setTimeout(() => showBadgeUnlock('speed_runner'), 2000);
                    }
                }

                // Check if all lessons completed
                if (Achievements.getUnlockedCount() >= 10) {
                    setTimeout(() => showConfetti(), 1000);
                }
            }

            updateChallenge();
            updateHeaderStats();
        }
    }

    // ===== Hints =====
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

    // ===== Badge Unlock Animation =====
    function showBadgeUnlock(badgeId) {
        const badge = Achievements.BADGES.find(b => b.id === badgeId);
        if (!badge) return;

        showConfetti();

        // Show notification
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed; top: 20px; left: 50%; transform: translateX(-50%);
            background: linear-gradient(135deg, #6C5CE7, #A29BFE); color: white;
            padding: 16px 32px; border-radius: 16px; z-index: 300;
            font-size: 1.1rem; font-weight: 600; text-align: center;
            box-shadow: 0 8px 32px rgba(108,92,231,0.4);
            animation: slideDown 0.5s ease-out;
        `;
        notif.innerHTML = `<div style="font-size:2rem;">${badge.icon}</div>Бейдж: ${badge.name}!`;
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

        setTimeout(() => {
            container.innerHTML = '';
        }, 4000);
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
        } catch (e) {
            return null;
        }
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
        } catch (e) {
            return [];
        }
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
                    <p>${project.date}</p>
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
                    <h4>${badge.name}</h4>
                    <p>${badge.desc}</p>
                </div>
            `;
            body.appendChild(item);
        });
    }

    // ===== Preview Resize =====
    let lastPreviewContent = '';

    function initPreviewResize() {
        const handle = $('#preview-resize-handle');
        const container = $('#preview-container');
        let startY = 0;
        let startHeight = 0;
        let isDragging = false;

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
            // Тянем вверх — высота увеличивается (startY > clientY)
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

    // ===== Открыть в новом окне =====
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
    <style>
        body { margin: 0; padding: 16px; font-family: 'Segoe UI', sans-serif; }
    </style>
</head>
<body>${content}</body>
</html>`);
        newWin.document.close();
    }

    $('#btn-open-window').addEventListener('click', openInNewWindow);

    // ===== Utilities =====
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function escapeRegex(string) {
        return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    }

    // ===== Event Listeners =====
    btnRun.addEventListener('click', runCode);

    $('#btn-back-to-lessons').addEventListener('click', closeLesson);

    $('#btn-reset').addEventListener('click', () => {
        if (!currentLesson) return;
        if (confirm('Сбросить код к начальному? Твои изменения будут потеряны!')) {
            EditorManager.setHtml(currentLesson.starterHtml);
            EditorManager.setPhp(currentLesson.starterPhp);
            currentChallengeIndex = 0;
            updateChallenge();
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

    // Reference modal
    $('#btn-reference').addEventListener('click', () => {
        $('#reference-modal').classList.remove('hidden');
    });
    $('#reference-close').addEventListener('click', () => {
        $('#reference-modal').classList.add('hidden');
    });

    // Reference tabs
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

    // Close modals on backdrop click
    $$('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.classList.add('hidden');
        });
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            runCode();
        }
    });

    // ===== Global API for inline handlers =====
    window.App = {
        loadProject(index) {
            const projects = loadProjects();
            const project = projects[index];
            if (!project) return;

            // Open the lesson first
            openLesson(project.lessonId);

            // Then override with saved project code
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

    // Add slideDown animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from { transform: translateX(-50%) translateY(-100px); opacity: 0; }
            to { transform: translateX(-50%) translateY(0); opacity: 1; }
        }
    `;
    document.head.appendChild(style);

})();
