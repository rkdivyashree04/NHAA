import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // Theme: 'light' | 'dark' | 'system' - default MUST BE LIGHT
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('nhaa_theme') || 'light';
  });

  // Font size: 'normal' | 'large' | 'larger'
  const [fontSize, setFontSizeState] = useState(() => {
    return localStorage.getItem('nhaa_fontsize') || 'normal';
  });

  // High contrast mode
  const [highContrast, setHighContrastState] = useState(() => {
    return localStorage.getItem('nhaa_highcontrast') === 'true';
  });

  // Reduced motion
  const [reducedMotion, setReducedMotionState] = useState(() => {
    return localStorage.getItem('nhaa_reducedmotion') === 'true';
  });

  // Layout density: 'comfortable' | 'compact'
  const [density, setDensityState] = useState(() => {
    return localStorage.getItem('nhaa_density') || 'comfortable';
  });

  const setTheme = (val) => {
    setThemeState(val);
    localStorage.setItem('nhaa_theme', val);
  };

  const setFontSize = (val) => {
    setFontSizeState(val);
    localStorage.setItem('nhaa_fontsize', val);
  };

  const setHighContrast = (val) => {
    setHighContrastState(val);
    localStorage.setItem('nhaa_highcontrast', val);
  };

  const setReducedMotion = (val) => {
    setReducedMotionState(val);
    localStorage.setItem('nhaa_reducedmotion', val);
  };

  const setDensity = (val) => {
    setDensityState(val);
    localStorage.setItem('nhaa_density', val);
  };

  // Synchronize CSS attributes on root document
  useEffect(() => {
    const root = document.documentElement;

    let effectiveTheme = theme;
    if (theme === 'system') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      effectiveTheme = prefersDark ? 'dark' : 'light';
    }

    root.setAttribute('data-theme', effectiveTheme);
    root.setAttribute('data-font-size', fontSize);
    root.setAttribute('data-contrast', highContrast ? 'high' : 'normal');
    root.setAttribute('data-motion', reducedMotion ? 'reduced' : 'normal');
    root.setAttribute('data-density', density);
  }, [theme, fontSize, highContrast, reducedMotion, density]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        reducedMotion,
        setReducedMotion,
        density,
        setDensity
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
