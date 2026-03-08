/**
 * Editor Manager — управление двумя редакторами Ace (HTML и PHP)
 */
const EditorManager = (() => {
    let htmlEditor = null;
    let phpEditor = null;

    function init() {
        // HTML Editor
        htmlEditor = ace.edit('html-editor');
        htmlEditor.setTheme('ace/theme/monokai');
        htmlEditor.session.setMode('ace/mode/html');
        configureEditor(htmlEditor);

        // PHP Editor
        phpEditor = ace.edit('php-editor');
        phpEditor.setTheme('ace/theme/monokai');
        phpEditor.session.setMode('ace/mode/php');
        configureEditor(phpEditor);
    }

    function configureEditor(editor) {
        editor.setOptions({
            fontSize: '16px',
            showPrintMargin: false,
            showGutter: true,
            highlightActiveLine: true,
            wrap: true,
            tabSize: 2,
            useSoftTabs: true,
            showFoldWidgets: false,
            displayIndentGuides: true,
            scrollPastEnd: 0.2
        });

        // Disable minimap-like features
        editor.renderer.setShowGutter(true);

        // Keyboard shortcut to run (Ctrl+Enter)
        editor.commands.addCommand({
            name: 'runCode',
            bindKey: { win: 'Ctrl-Enter', mac: 'Cmd-Enter' },
            exec: () => {
                document.getElementById('btn-run').click();
            }
        });
    }

    function getHtml() {
        return htmlEditor ? htmlEditor.getValue() : '';
    }

    function getPhp() {
        return phpEditor ? phpEditor.getValue() : '';
    }

    function setHtml(code) {
        if (htmlEditor) {
            htmlEditor.setValue(code, -1);
            htmlEditor.clearSelection();
        }
    }

    function setPhp(code) {
        if (phpEditor) {
            phpEditor.setValue(code, -1);
            phpEditor.clearSelection();
        }
    }

    function focus(which) {
        if (which === 'php' && phpEditor) phpEditor.focus();
        else if (which === 'html' && htmlEditor) htmlEditor.focus();
    }

    return { init, getHtml, getPhp, setHtml, setPhp, focus };
})();
