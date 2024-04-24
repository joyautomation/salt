export const setTheme = async ({ request, cookies }) => {
    const data = await request.formData();
    const theme = data.get('theme');
    cookies.set(`theme`, theme, {
        path: '/',
        secure: false,
    });
    const themeName = theme === 'themeDark' ? 'dark mode' : 'light mode';
    return {
        context: 'setTheme',
        type: 'success',
        message: `You are now in ${themeName}.`,
        theme,
    };
};
