import { useEffect, useState } from 'react';

const STORAGE_KEY = 'svd-theme';

// Figures out which theme to start with:
// 1) whatever the user picked last time (saved in localStorage), otherwise
// 2) whatever their operating system / browser prefers.
function getInitialTheme() {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark') return stored;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

export function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme);

  // Whenever the theme changes, put it on the <html> tag (so our CSS
  // variables in tokens.css can react to it) and remember it for next time.
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  function toggleTheme() {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return { theme, toggleTheme };
}
