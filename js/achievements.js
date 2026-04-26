/**
 * Achievements — бейджи и звёзды
 */
const Achievements = (() => {
    const STORAGE_KEY = 'php-trainer-achievements';
    const VERSION_KEY = 'php-trainer-version';
    const CURRENT_VERSION = 'v2-2026';

    // Миграция: старая версия имела 10 уроков с другим содержанием.
    // Если в storage старая версия — чистим прогресс, чтобы курс начался с чистого листа.
    function migrate() {
        const ver = localStorage.getItem(VERSION_KEY);
        if (ver === CURRENT_VERSION) return;

        // Чистим старые ключи кода и прогресса
        try {
            const oldKeys = [];
            for (let i = 0; i < localStorage.length; i++) {
                const k = localStorage.key(i);
                if (!k) continue;
                if (k === STORAGE_KEY) oldKeys.push(k);
                if (k.startsWith('php-trainer-code-')) oldKeys.push(k);
            }
            oldKeys.forEach(k => localStorage.removeItem(k));
            localStorage.setItem(VERSION_KEY, CURRENT_VERSION);
        } catch (e) {
            console.warn('Migration failed:', e);
        }
    }
    migrate();

    const BADGES = [
        // === по урокам ===
        { id: 'first_echo',     icon: '📢', name: 'Первый echo',         desc: 'Прошёл урок 1: вывод текста' },
        { id: 'variable_master',icon: '📦', name: 'Мастер переменных',   desc: 'Прошёл урок 2: переменные' },
        { id: 'math_wizard',    icon: '🧮', name: 'Математик',           desc: 'Прошёл урок 3: математика' },
        { id: 'boss_basics',    icon: '🥉', name: 'BOSS Основы',          desc: 'Прошёл BOSS-уровень 1' },
        { id: 'if_else_hero',   icon: '🔀', name: 'Герой условий',        desc: 'Прошёл урок 5: if/else' },
        { id: 'logic_master',   icon: '🤝', name: 'Магистр логики',       desc: 'Прошёл урок 6: && и ||' },
        { id: 'boss_logic',     icon: '🥈', name: 'BOSS Логика',          desc: 'Прошёл BOSS-уровень 2' },
        { id: 'loop_for',       icon: '🔁', name: 'Король for',           desc: 'Прошёл урок 8: цикл for' },
        { id: 'loop_while',     icon: '⏳', name: 'Властелин while',      desc: 'Прошёл урок 9: цикл while' },
        { id: 'array_ace',      icon: '📋', name: 'Мастер массивов',      desc: 'Прошёл урок 10: массивы' },
        { id: 'boss_data',      icon: '🥇', name: 'BOSS Данные',          desc: 'Прошёл BOSS-уровень 3' },
        { id: 'assoc_master',   icon: '🔑', name: 'Ключ → Значение',      desc: 'Прошёл урок 12: ассоциативные массивы' },
        { id: 'function_hero',  icon: '⚡', name: 'Герой функций',         desc: 'Прошёл урок 13: функции' },
        { id: 'boss_master',    icon: '👑', name: 'BOSS МАСТЕР',           desc: 'Прошёл BOSS-уровень 4' },
        { id: 'style_guru',     icon: '🎨', name: 'Стиль-гуру',            desc: 'Прошёл урок 15: дизайн через PHP' },
        { id: 'like_dad',       icon: '👨‍💻', name: 'Как папа!',            desc: 'Прошёл МЕГА-проект — Junior PHP разработчик!' },

        // === за активность ===
        { id: 'curious_coder',  icon: '🔍', name: 'Любопытный кодер',     desc: 'Запустил код 10 раз в одном уроке' },
        { id: 'speed_runner',   icon: '⚡', name: 'Быстрый кодер',         desc: 'Прошёл урок за 2 минуты' },
        { id: 'persistent',     icon: '💪', name: 'Упорный',              desc: 'Запустил код 50 раз всего' },
        { id: 'all_basics',     icon: '🌱', name: 'Основы',               desc: 'Прошёл первые 4 урока' },
        { id: 'half_way',       icon: '🚀', name: 'На полпути',           desc: 'Прошёл 8 уроков' },
        { id: 'all_complete',   icon: '🏆', name: 'ЛЕГЕНДА',              desc: 'Прошёл все уроки на 3 звезды!' }
    ];

    let state = {
        unlockedBadges: [],
        lessonStars: {},        // lessonId -> max stars achieved (0-3)
        lessonChallenges: {},   // lessonId -> { '0': true, '1': true } - какие задания пройдены
        totalRuns: 0,
        lessonRuns: {}          // lessonId -> count
    };

    function load() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                state = { ...state, ...JSON.parse(saved) };
            }
        } catch (e) {
            console.warn('Failed to load achievements:', e);
        }
    }

    function save() {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.warn('Failed to save achievements:', e);
        }
    }

    function unlock(badgeId) {
        if (state.unlockedBadges.includes(badgeId)) return false;
        state.unlockedBadges.push(badgeId);
        save();
        return true;
    }

    function isUnlocked(badgeId) {
        return state.unlockedBadges.includes(badgeId);
    }

    /**
     * Помечаем конкретное задание пройденным.
     */
    function markChallenge(lessonId, challengeIndex) {
        if (!state.lessonChallenges[lessonId]) state.lessonChallenges[lessonId] = {};
        state.lessonChallenges[lessonId][challengeIndex] = true;
        save();
    }

    function isChallengeDone(lessonId, challengeIndex) {
        return !!(state.lessonChallenges[lessonId] && state.lessonChallenges[lessonId][challengeIndex]);
    }

    function getDoneChallenges(lessonId) {
        return state.lessonChallenges[lessonId] || {};
    }

    /**
     * Звёзды (0-3) на основе процента пройденных заданий.
     */
    function calcStars(lessonId, totalChallenges) {
        const done = state.lessonChallenges[lessonId] || {};
        const doneCount = Object.keys(done).length;
        if (totalChallenges <= 0) return 0;
        const ratio = doneCount / totalChallenges;
        if (ratio >= 1) return 3;
        if (ratio >= 0.66) return 2;
        if (ratio >= 0.33) return 1;
        return 0;
    }

    function setLessonStars(lessonId, stars) {
        const current = state.lessonStars[lessonId] || 0;
        if (stars > current) {
            state.lessonStars[lessonId] = stars;
            save();
        }
    }

    function updateLessonStars(lessonId, totalChallenges) {
        const stars = calcStars(lessonId, totalChallenges);
        setLessonStars(lessonId, stars);
        return stars;
    }

    function getLessonStars(lessonId) {
        return state.lessonStars[lessonId] || 0;
    }

    function getTotalStars() {
        return Object.values(state.lessonStars).reduce((a, b) => a + b, 0);
    }

    function recordRun(lessonId) {
        state.totalRuns++;
        state.lessonRuns[lessonId] = (state.lessonRuns[lessonId] || 0) + 1;
        save();

        const newBadges = [];
        if (state.lessonRuns[lessonId] >= 10) {
            if (unlock('curious_coder')) newBadges.push('curious_coder');
        }
        if (state.totalRuns >= 50) {
            if (unlock('persistent')) newBadges.push('persistent');
        }
        return newBadges;
    }

    function getLessonRuns(lessonId) {
        return state.lessonRuns[lessonId] || 0;
    }

    function getAllBadges() {
        return BADGES.map(b => ({
            ...b,
            unlocked: state.unlockedBadges.includes(b.id)
        }));
    }

    function getUnlockedCount() {
        return state.unlockedBadges.length;
    }

    /**
     * Сбросить прогресс по конкретному уроку.
     */
    function resetLesson(lessonId) {
        delete state.lessonStars[lessonId];
        delete state.lessonChallenges[lessonId];
        delete state.lessonRuns[lessonId];
        save();
    }

    /**
     * Полный сброс всех достижений (для тестирования или новых пользователей).
     */
    function resetAll() {
        state = {
            unlockedBadges: [],
            lessonStars: {},
            lessonChallenges: {},
            totalRuns: 0,
            lessonRuns: {}
        };
        save();
    }

    // Init
    load();

    return {
        unlock, isUnlocked, setLessonStars, getLessonStars,
        getTotalStars, recordRun, getLessonRuns, getAllBadges,
        getUnlockedCount, BADGES,
        markChallenge, isChallengeDone, getDoneChallenges,
        updateLessonStars, calcStars,
        resetLesson, resetAll
    };
})();
