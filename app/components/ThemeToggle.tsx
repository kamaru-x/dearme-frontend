'use client';

import { useTheme } from '../context/ThemeProvider';

const ThemeToggle = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="fixed bottom-4 right-4 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 focus:outline-none"
        >
            {theme === 'dark' ? (
                <i className="fas fa-sun text-gray-500 dark:text-gray-400 text-xl"></i>
            ) : (
                <i className="fas fa-moon text-gray-500 text-xl"></i>
            )}
        </button>
    );
};

export default ThemeToggle;
