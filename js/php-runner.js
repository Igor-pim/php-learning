/**
 * PHP Runner — обёртка над php-wasm для запуска PHP в браузере
 */
const PhpRunner = (() => {
    let php = null;
    let isReady = false;
    let onProgress = null;

    const TIMEOUT_MS = 5000;

    async function init(progressCallback) {
        onProgress = progressCallback;

        if (onProgress) onProgress(10, 'Загружаю PHP движок...');

        try {
            const { PhpWeb } = await import(
                'https://cdn.jsdelivr.net/npm/php-wasm@0.0.8/PhpWeb.mjs'
            );

            if (onProgress) onProgress(50, 'Инициализирую PHP...');

            php = new PhpWeb();

            // Wait for PHP to be ready
            await new Promise((resolve, reject) => {
                const timeout = setTimeout(() => {
                    reject(new Error('PHP init timeout'));
                }, 30000);

                php.addEventListener('ready', () => {
                    clearTimeout(timeout);
                    resolve();
                });

                php.addEventListener('error', (e) => {
                    clearTimeout(timeout);
                    reject(e);
                });
            });

            isReady = true;
            if (onProgress) onProgress(100, 'PHP готов!');
            return true;
        } catch (err) {
            console.error('PHP init error:', err);
            if (onProgress) onProgress(-1, 'Ошибка загрузки PHP: ' + err.message);
            return false;
        }
    }

    async function run(code) {
        if (!isReady || !php) {
            return {
                output: '',
                error: 'PHP движок не загружен. Подожди немного...',
                success: false
            };
        }

        // Collect output
        let output = '';
        let error = '';

        const outputHandler = (event) => {
            output += event.detail;
        };
        const errorHandler = (event) => {
            error += event.detail;
        };

        php.addEventListener('output', outputHandler);
        php.addEventListener('error', errorHandler);

        try {
            // Add timeout protection
            const result = await Promise.race([
                php.run(code),
                new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('TIMEOUT')), TIMEOUT_MS)
                )
            ]);

            php.removeEventListener('output', outputHandler);
            php.removeEventListener('error', errorHandler);

            return {
                output: output,
                error: error || '',
                success: !error,
                exitCode: result
            };
        } catch (err) {
            php.removeEventListener('output', outputHandler);
            php.removeEventListener('error', errorHandler);

            if (err.message === 'TIMEOUT') {
                return {
                    output: '',
                    error: '⏰ Код выполнялся слишком долго! Возможно, у тебя бесконечный цикл. Проверь условие цикла.',
                    success: false
                };
            }

            return {
                output: output,
                error: err.message || 'Неизвестная ошибка',
                success: false
            };
        }
    }

    function ready() {
        return isReady;
    }

    return { init, run, ready };
})();
