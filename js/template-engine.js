/**
 * Template Engine — подставляет результат PHP в HTML шаблон
 *
 * Два режима:
 * 1. Простой: весь вывод PHP идёт в {{ output }}
 * 2. Расширенный: PHP выводит KEY=VALUE, и каждый ключ подставляется в {{ KEY }}
 */
const TemplateEngine = (() => {

    /**
     * Парсит вывод PHP на пары ключ=значение
     * Если вывод не содержит KEY=VALUE формат, возвращает { output: весьВывод }
     */
    function parseOutput(phpOutput) {
        const lines = phpOutput.split('\n');
        const data = {};
        let hasKeyValue = false;
        let plainOutput = [];

        for (const line of lines) {
            const eqIndex = line.indexOf('=');
            if (eqIndex > 0) {
                const key = line.substring(0, eqIndex).trim();
                const value = line.substring(eqIndex + 1).trim();
                // Key must be a valid identifier (letters, digits, underscore)
                if (/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(key)) {
                    data[key] = value;
                    hasKeyValue = true;
                    continue;
                }
            }
            plainOutput.push(line);
        }

        // Always provide "output" with the full or remaining output
        if (!hasKeyValue) {
            return { output: phpOutput };
        }

        // If there was mixed content, add remaining as "output"
        if (plainOutput.length > 0) {
            data.output = plainOutput.join('\n');
        }
        if (!data.output) {
            data.output = phpOutput;
        }

        return data;
    }

    /**
     * Заменяет {{ placeholders }} в HTML шаблоне данными
     */
    function render(htmlTemplate, phpOutput) {
        const data = parseOutput(phpOutput);

        let result = htmlTemplate;

        // Replace {{ key }} placeholders
        result = result.replace(/\{\{\s*([a-zA-Z_][a-zA-Z0-9_]*)\s*\}\}/g, (match, key) => {
            if (key in data) {
                return data[key];
            }
            return match; // Keep original if no data
        });

        return result;
    }

    /**
     * Простой режим — весь вывод PHP вставляется как HTML
     */
    function renderSimple(htmlTemplate, phpOutput) {
        return htmlTemplate.replace(/\{\{\s*output\s*\}\}/g, phpOutput);
    }

    return { render, renderSimple, parseOutput };
})();
