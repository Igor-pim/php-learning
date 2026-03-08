/**
 * Achievements — бейджи и звёзды
 */
const Achievements = (() => {
    const STORAGE_KEY = 'php-trainer-achievements';

    const BADGES = [
        { id: 'first_echo', icon: '📢', name: 'Первый echo', desc: 'Запустил свой первый PHP код' },
        { id: 'variable_master', icon: '📦', name: 'Мастер переменных', desc: 'Использовал переменные в PHP' },
        { id: 'math_wizard', icon: '🧮', name: 'Математик', desc: 'Выполнил математические операции' },
        { id: 'if_else_hero', icon: '🔀', name: 'Герой условий', desc: 'Использовал if/else' },
        { id: 'loop_lord', icon: '🔁', name: 'Повелитель циклов', desc: 'Написал цикл' },
        { id: 'array_ace', icon: '📋', name: 'Мастер массивов', desc: 'Работал с массивами' },
        { id: 'function_hero', icon: '⚡', name: 'Герой функций', desc: 'Создал свою функцию' },
        { id: 'form_builder', icon: '📝', name: 'Строитель форм', desc: 'Сделал интерактивную страницу' },
        { id: 'style_guru', icon: '🎨', name: 'Стиль-гуру', desc: 'Управлял стилями через PHP' },
        { id: 'like_dad', icon: '👨‍💻', name: 'Как папа!', desc: 'Прошёл все уроки — ты Junior PHP разработчик!' },
        { id: 'curious_coder', icon: '🔍', name: 'Любопытный кодер', desc: 'Запустил код 10 раз в одном уроке' },
        { id: 'speed_runner', icon: '⚡', name: 'Быстрый кодер', desc: 'Прошёл урок за 2 минуты' },
    ];

    let state = {
        unlockedBadges: [],
        lessonStars: {},  // lessonId -> starCount (0-3)
        totalRuns: 0,
        lessonRuns: {}    // lessonId -> count
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
        return true; // newly unlocked
    }

    function isUnlocked(badgeId) {
        return state.unlockedBadges.includes(badgeId);
    }

    function setLessonStars(lessonId, stars) {
        const current = state.lessonStars[lessonId] || 0;
        if (stars > current) {
            state.lessonStars[lessonId] = stars;
            save();
        }
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

        // Check for curious coder badge
        if (state.lessonRuns[lessonId] >= 10) {
            return unlock('curious_coder');
        }
        return false;
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

    // Initialize
    load();

    return {
        unlock, isUnlocked, setLessonStars, getLessonStars,
        getTotalStars, recordRun, getLessonRuns, getAllBadges,
        getUnlockedCount, BADGES
    };
})();
