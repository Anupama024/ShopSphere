import { useEffect, useState } from 'react';

export default function useDarkModeSync(defaultValue = false) {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined' && window.document) {
      return document.body.classList.contains('dark-mode');
    }
    return defaultValue;
  });

  useEffect(() => {
    const handleThemeChanged = (event) => {
      const updated = event?.detail?.darkMode;
      setDarkMode(Boolean(updated));
    };

    window.addEventListener('themeChanged', handleThemeChanged);
    return () => {
      window.removeEventListener('themeChanged', handleThemeChanged);
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', darkMode);
  }, [darkMode]);

  return [darkMode, setDarkMode];
}
