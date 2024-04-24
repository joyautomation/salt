export function setTheme(form) {
    if (form?.context === 'setTheme') {
        if (form?.theme === 'themeDark') {
            document.body.classList.add('themeDark');
            document.body.classList.remove('themeLight');
        }
        else {
            document.body.classList.remove('themeDark');
            document.body.classList.add('themeLight');
        }
    }
}
